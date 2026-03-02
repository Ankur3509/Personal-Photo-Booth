import { state, navigateTo } from '../main';
import { getCamera, stopCamera, countdown } from '../utils/camera';
import { drawFilteredFrame, filterPresets } from '../utils/filters';
import { composeFinalImage } from '../utils/templateEngine';
import { savePhoto } from '../utils/gallery';

export function createBoothScreen() {
    const template = state.selectedTemplate;
    if (!template) {
        navigateTo('template');
        return document.createElement('div');
    }

    const section = document.createElement('section');
    section.className = "w-full max-w-7xl flex flex-col items-center gap-4 py-2 px-2 h-full justify-start md:justify-center";

    // Header / Progress
    const header = document.createElement('div');
    header.className = "w-full flex justify-between items-center px-4 mb-2";

    const backBtn = document.createElement('button');
    backBtn.className = "text-sm text-gray-400 hover:text-white flex items-center gap-1";
    backBtn.innerHTML = `&larr; Exit`;
    backBtn.onclick = () => {
        if (confirm("Exit booth? Progress will be lost.")) {
            navigateTo('template');
        }
    };

    const progress = document.createElement('div');
    progress.className = "flex gap-2";
    for (let i = 0; i < template.requiredPhotos; i++) {
        const dot = document.createElement('div');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i < state.photos.length ? 'bg-blue-500 scale-110 shadow-lg' : 'bg-white/10'}`;
        progress.appendChild(dot);
    }

    header.appendChild(backBtn);
    header.appendChild(progress);

    // Camera Container
    const boothContainer = document.createElement('div');
    boothContainer.className = "relative aspect-square md:aspect-video w-full max-w-5xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-white/10";

    const canvas = document.createElement('canvas');
    canvas.className = "w-full h-full object-cover";
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const video = document.createElement('video');
    video.autoplay = true;
    video.playsinline = true;
    video.style.display = 'none';

    const overlay = document.createElement('div');
    overlay.className = "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300 z-50";
    const timerText = document.createElement('span');
    timerText.className = "text-9xl md:text-[15rem] font-bold text-white drop-shadow-2xl";
    overlay.appendChild(timerText);

    const banner = document.createElement('div');
    banner.className = "absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full font-bold text-xs tracking-widest uppercase z-40";
    banner.innerText = `PH ${state.photos.length + 1} / ${template.requiredPhotos}`;

    boothContainer.appendChild(canvas);
    boothContainer.appendChild(video);
    boothContainer.appendChild(overlay);
    boothContainer.appendChild(banner);

    // Filter Selector (Snapchat Style Horizontal Scroll)
    const filterSection = document.createElement('div');
    filterSection.className = "w-full flex flex-col gap-3 mt-4";

    const filterLabel = document.createElement('span');
    filterLabel.className = "text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-4";
    filterLabel.innerText = "Select Filter";

    const filterList = document.createElement('div');
    filterList.className = "flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar scroll-smooth";

    filterPresets.forEach(preset => {
        const btn = document.createElement('button');
        const isActive = state.filterSettings.id === preset.id || (preset.id === 'normal' && !state.filterSettings.id);

        btn.className = `flex-shrink-0 w-16 h-16 rounded-full border-2 transition-all flex flex-col items-center justify-center gap-1 ${isActive ? 'border-blue-500 bg-blue-500/20 scale-110' : 'border-white/10 hover:border-white/30'}`;
        btn.innerHTML = `
      <span class="text-[10px] font-bold">${preset.name}</span>
    `;

        btn.onclick = () => {
            state.filterSettings = { ...preset.settings, id: preset.id };
            Array.from(filterList.children).forEach(child => child.classList.remove('border-blue-500', 'bg-blue-500/20', 'scale-110'));
            btn.classList.add('border-blue-500', 'bg-blue-500/20', 'scale-110');
        };
        filterList.appendChild(btn);
    });

    filterSection.appendChild(filterLabel);
    filterSection.appendChild(filterList);

    // Capture Bottom Bar
    const bottomBar = document.createElement('div');
    bottomBar.className = "w-full flex justify-center py-6 mt-auto md:mt-0";

    const captureBtn = document.createElement('button');
    captureBtn.className = "w-20 h-20 md:w-24 md:h-24 rounded-full border-[6px] md:border-8 border-white bg-transparent active:bg-blue-500 transition-all flex items-center justify-center p-1 group";
    captureBtn.innerHTML = `<div class="w-full h-full bg-white rounded-full transition-transform group-hover:scale-95"></div>`;

    captureBtn.onclick = () => {
        if (state.isCapturing) return;
        state.isCapturing = true;
        captureBtn.disabled = true;
        captureBtn.classList.add('opacity-50', 'scale-90');

        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');

        countdown(3, (tick) => {
            timerText.innerText = tick;
        }, async () => {
            overlay.classList.remove('opacity-100', 'opacity-0');
            overlay.classList.add('opacity-0');

            // Visual Flash
            const flash = document.createElement('div');
            flash.className = "absolute inset-0 bg-white z-[60]";
            boothContainer.appendChild(flash);
            setTimeout(() => flash.remove(), 100);

            // Capture frame
            const photoData = canvas.toDataURL('image/png', 0.9);
            state.photos.push(photoData);

            if (state.photos.length >= template.requiredPhotos) {
                banner.innerText = "Processing...";
                captureBtn.innerHTML = `<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>`;

                // Stop camera immediately
                stopCamera(state.cameraStream);
                state.cameraStream = null;

                try {
                    console.log("Photos captured:", state.photos.length);
                    const finalImg = await composeFinalImage(template, state.photos);
                    console.log("Final image composed");
                    await savePhoto(finalImg, template.id, { ...state.filterSettings });
                    console.log("Photo saved to gallery");

                    state.isCapturing = false;
                    navigateTo('gallery');
                } catch (err) {
                    console.error("Composition error:", err);
                    alert("Oops! Something went wrong during composition. Try again.");
                    navigateTo('template');
                }
            } else {
                banner.innerText = `PH ${state.photos.length + 1} / ${template.requiredPhotos}`;
                state.isCapturing = false;
                captureBtn.disabled = false;
                captureBtn.classList.remove('opacity-50', 'scale-90');
            }
        });
    };

    // Lifecycle
    let animationFrame;
    getCamera().then(stream => {
        state.cameraStream = stream;
        video.srcObject = stream;

        const loop = () => {
            if (state.cameraStream) {
                drawFilteredFrame(video, canvas, ctx, state.filterSettings);
                animationFrame = requestAnimationFrame(loop);
            }
        };
        loop();
    }).catch(err => {
        console.error(err);
        alert("Camera Error: " + err.message);
        navigateTo('template');
    });

    section.onremove = () => {
        cancelAnimationFrame(animationFrame);
        stopCamera(state.cameraStream);
    };

    bottomBar.appendChild(captureBtn);

    section.appendChild(header);
    section.appendChild(boothContainer);
    section.appendChild(filterSection);
    section.appendChild(bottomBar);

    return section;
}
