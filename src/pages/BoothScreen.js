import { state, navigateTo } from '../main';
import { getCamera, stopCamera, countdown } from '../utils/camera';
import { drawFilteredFrame, defaultFilters } from '../utils/filters';
import { composeFinalImage } from '../utils/templateEngine';
import { savePhoto } from '../utils/gallery';

export function createBoothScreen() {
    const template = state.selectedTemplate;
    if (!template) {
        navigateTo('template');
        return document.createElement('div');
    }

    const section = document.createElement('section');
    section.className = "w-full max-w-7xl flex flex-col items-center gap-8 py-4 px-2 h-full justify-center";

    // Progress Bar
    const progress = document.createElement('div');
    progress.className = "flex gap-3 mb-2";
    for (let i = 0; i < template.requiredPhotos; i++) {
        const dot = document.createElement('div');
        dot.className = `w-4 h-4 rounded-full transition-all duration-300 ${i < state.photos.length ? 'bg-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'bg-white/10'}`;
        progress.appendChild(dot);
    }

    // Camera + Overlay Container
    const boothContainer = document.createElement('div');
    boothContainer.className = "relative aspect-video w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-white/10 group";

    const canvas = document.createElement('canvas');
    canvas.className = "w-full h-full object-cover grayscale-0 transition-all duration-500";
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const video = document.createElement('video');
    video.autoplay = true;
    video.playsinline = true;
    video.style.display = 'none';

    // Countdown Overlay
    const overlay = document.createElement('div');
    overlay.className = "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300";
    const timerText = document.createElement('span');
    timerText.className = "text-[12rem] font-bold text-white drop-shadow-2xl translate-y-[-2rem]";
    overlay.appendChild(timerText);

    // Status Banner
    const banner = document.createElement('div');
    banner.className = "absolute top-6 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity";
    banner.innerText = `PHOTO ${state.photos.length + 1} / ${template.requiredPhotos}`;

    boothContainer.appendChild(canvas);
    boothContainer.appendChild(video);
    boothContainer.appendChild(overlay);
    boothContainer.appendChild(banner);

    // Controls Container
    const controls = document.createElement('div');
    controls.className = "w-full max-w-xl flex flex-col gap-8";

    // Filter Sliders
    const filterGrid = document.createElement('div');
    filterGrid.className = "glass-dark p-6 rounded-3xl grid grid-cols-2 sm:grid-cols-3 gap-6 border border-white/5";

    const filterParams = [
        { id: 'brightness', label: 'Bright', min: 0, max: 200, unit: '%' },
        { id: 'contrast', label: 'Con', min: 0, max: 200, unit: '%' },
        { id: 'saturation', label: 'Sat', min: 0, max: 200, unit: '%' },
        { id: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%' },
        { id: 'hueRotate', label: 'Hue', min: 0, max: 360, unit: '°' },
        { id: 'blur', label: 'Soft', min: 0, max: 10, unit: 'px' }
    ];

    filterParams.forEach(f => {
        const wrapper = document.createElement('div');
        wrapper.className = "flex flex-col gap-2";

        const label = document.createElement('label');
        label.className = "text-xs font-bold text-gray-400 flex justify-between";
        label.innerHTML = `<span>${f.label}</span> <span class="text-blue-400 font-mono">${state.filterSettings[f.id]}${f.unit}</span>`;

        const input = document.createElement('input');
        input.type = "range";
        input.min = f.min;
        input.max = f.max;
        input.step = f.id === 'blur' ? 0.2 : 1;
        input.value = state.filterSettings[f.id];
        input.className = "w-full accent-blue-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer";

        input.oninput = (e) => {
            state.filterSettings[f.id] = parseFloat(e.target.value);
            label.querySelector('.text-blue-400').innerText = `${state.filterSettings[f.id]}${f.unit}`;
        };

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        filterGrid.appendChild(wrapper);
    });

    // Capture Action
    const captureBtn = document.createElement('button');
    captureBtn.className = "w-24 h-24 rounded-full border-8 border-white bg-white/20 active:bg-blue-500 hover:scale-110 active:scale-95 transition-all mx-auto shadow-2xl relative flex items-center justify-center";
    captureBtn.innerHTML = `<div class="w-16 h-16 bg-white rounded-full group-hover:scale-105 transition-transform shadow-lg"></div>`;

    captureBtn.onclick = () => {
        if (state.isCapturing) return;
        state.isCapturing = true;
        captureBtn.disabled = true;
        captureBtn.classList.add('opacity-50');

        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');

        countdown(3, (tick) => {
            timerText.innerText = tick;
        }, async () => {
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');

            // Visual Flash
            const flash = document.createElement('div');
            flash.className = "absolute inset-0 bg-white z-[60]";
            boothContainer.appendChild(flash);
            setTimeout(() => flash.remove(), 150);

            const photoData = canvas.toDataURL('image/png', 0.9);
            state.photos.push(photoData);

            if (state.photos.length >= template.requiredPhotos) {
                stopCamera(state.cameraStream);
                state.cameraStream = null;

                banner.innerText = "COMPOSING...";
                const finalImg = await composeFinalImage(template, state.photos);
                await savePhoto(finalImg, template.id, { ...state.filterSettings });

                state.isCapturing = false;
                navigateTo('gallery');
            } else {
                banner.innerText = `PHOTO ${state.photos.length + 1} / ${template.requiredPhotos}`;
                state.isCapturing = false;
                captureBtn.disabled = false;
                captureBtn.classList.remove('opacity-50');
            }
        });
    };

    // Lifecycle
    let animationFrame;
    getCamera().then(stream => {
        state.cameraStream = stream;
        video.srcObject = stream;

        const loop = () => {
            drawFilteredFrame(video, canvas, ctx, state.filterSettings);
            animationFrame = requestAnimationFrame(loop);
        };
        loop();
    }).catch(err => {
        alert(err.message);
        navigateTo('template');
    });

    section.onremove = () => {
        cancelAnimationFrame(animationFrame);
        stopCamera(state.cameraStream);
    };

    section.appendChild(progress);
    section.appendChild(boothContainer);
    section.appendChild(filterGrid);
    section.appendChild(captureBtn);

    return section;
}
