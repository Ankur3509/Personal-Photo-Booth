import { state, navigateTo } from '../main';
import { getCamera, stopCamera, countdown, isMobileDevice } from '../utils/camera';
import { drawFilteredFrame, filterPresets } from '../utils/filters';
import { effectPresets } from '../utils/effects';
import { composeFinalImage } from '../utils/templateEngine';
import { savePhoto } from '../utils/gallery';

export function createBoothScreen() {
    const template = state.selectedTemplate;
    if (!template) {
        navigateTo('template');
        return document.createElement('div');
    }

    const mobile = isMobileDevice();
    let activeEffect = effectPresets[0]; // 'none' by default

    const section = document.createElement('section');
    section.className = mobile
        ? "w-full h-[100dvh] flex flex-col items-center bg-black fixed inset-0 z-50"
        : "w-full max-w-7xl flex flex-col items-center gap-4 py-2 px-2 h-full justify-start md:justify-center";

    // ═══ HEADER / PROGRESS ═══
    const header = document.createElement('div');
    header.className = mobile
        ? "w-full flex justify-between items-center px-4 py-2 absolute top-0 left-0 right-0 z-40"
        : "w-full flex justify-between items-center px-4 mb-2";

    const backBtn = document.createElement('button');
    backBtn.className = "text-sm text-white/70 hover:text-white flex items-center gap-1 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-full";
    backBtn.innerHTML = `&larr; Exit`;
    backBtn.onclick = () => {
        if (confirm("Exit booth? Progress will be lost.")) {
            navigateTo('template');
        }
    };

    const progress = document.createElement('div');
    progress.className = "flex gap-2 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-full";
    for (let i = 0; i < template.requiredPhotos; i++) {
        const dot = document.createElement('div');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i < state.photos.length ? 'bg-pink-400 scale-110 shadow-lg shadow-pink-400/50' : 'bg-white/20'}`;
        progress.appendChild(dot);
    }

    header.appendChild(backBtn);
    header.appendChild(progress);

    // ═══ CAMERA CONTAINER ═══
    const boothContainer = document.createElement('div');
    boothContainer.className = mobile
        ? "relative w-full flex-1 overflow-hidden bg-black"
        : "relative aspect-square md:aspect-video w-full max-w-5xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-white/10";

    const canvas = document.createElement('canvas');
    canvas.className = "w-full h-full object-cover";
    // Dynamic canvas sizing for mobile
    if (mobile) {
        canvas.width = 720;
        canvas.height = 1280;
    } else {
        canvas.width = 1280;
        canvas.height = 720;
    }
    const ctx = canvas.getContext('2d');

    const video = document.createElement('video');
    video.autoplay = true;
    video.playsinline = true;
    video.style.display = 'none';

    // Countdown overlay
    const overlay = document.createElement('div');
    overlay.className = "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300 z-50";
    const timerText = document.createElement('span');
    timerText.className = mobile
        ? "text-[8rem] font-black text-white drop-shadow-2xl"
        : "text-9xl md:text-[15rem] font-bold text-white drop-shadow-2xl";
    timerText.style.textShadow = '0 0 40px rgba(255,255,255,0.5)';
    overlay.appendChild(timerText);

    // Photo counter banner
    const banner = document.createElement('div');
    banner.className = mobile
        ? "absolute top-14 left-1/2 -translate-x-1/2 backdrop-blur-md bg-black/40 px-4 py-1.5 rounded-full font-bold text-xs tracking-widest uppercase z-40 text-white/80"
        : "absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full font-bold text-xs tracking-widest uppercase z-40";
    banner.innerText = `📷 ${state.photos.length + 1} / ${template.requiredPhotos}`;

    boothContainer.appendChild(canvas);
    boothContainer.appendChild(video);
    boothContainer.appendChild(overlay);
    boothContainer.appendChild(banner);

    // ═══ BOTTOM CONTROLS (Snapchat style - overlaid on camera for mobile) ═══
    const controlsWrapper = document.createElement('div');
    controlsWrapper.className = mobile
        ? "absolute bottom-0 left-0 right-0 z-40 flex flex-col items-center pb-6 pt-2"
        : "w-full flex flex-col items-center gap-3 mt-2";

    // ── Effect Selector (Snapchat style circles) ──
    const effectRow = document.createElement('div');
    effectRow.className = "w-full flex flex-col gap-1 mb-3";

    const effectLabel = document.createElement('span');
    effectLabel.className = "text-[9px] uppercase tracking-widest text-white/40 font-bold ml-4";
    effectLabel.innerText = "Effects";

    const effectList = document.createElement('div');
    effectList.className = "flex overflow-x-auto gap-3 px-4 pb-1 no-scrollbar scroll-smooth";

    effectPresets.forEach(preset => {
        const btn = document.createElement('button');
        const isActive = activeEffect.id === preset.id;

        btn.className = `flex-shrink-0 w-12 h-12 rounded-full border-2 transition-all flex flex-col items-center justify-center ${isActive
            ? 'border-pink-400 bg-pink-500/20 scale-110 shadow-lg shadow-pink-400/30'
            : 'border-white/15 bg-white/5 hover:border-white/30'}`;
        btn.innerHTML = `
            <span class="text-lg">${preset.icon}</span>
            <span class="text-[7px] font-bold text-white/60 mt-0.5">${preset.name}</span>
        `;

        btn.onclick = () => {
            activeEffect = preset;
            Array.from(effectList.children).forEach(child => {
                child.classList.remove('border-pink-400', 'bg-pink-500/20', 'scale-110', 'shadow-lg', 'shadow-pink-400/30');
                child.classList.add('border-white/15', 'bg-white/5');
            });
            btn.classList.remove('border-white/15', 'bg-white/5');
            btn.classList.add('border-pink-400', 'bg-pink-500/20', 'scale-110', 'shadow-lg', 'shadow-pink-400/30');
        };
        effectList.appendChild(btn);
    });

    effectRow.appendChild(effectLabel);
    effectRow.appendChild(effectList);

    // ── Filter Selector ──
    const filterRow = document.createElement('div');
    filterRow.className = "w-full flex flex-col gap-1 mb-3";

    const filterLabel = document.createElement('span');
    filterLabel.className = "text-[9px] uppercase tracking-widest text-white/40 font-bold ml-4";
    filterLabel.innerText = "Filters";

    const filterList = document.createElement('div');
    filterList.className = "flex overflow-x-auto gap-3 px-4 pb-1 no-scrollbar scroll-smooth";

    filterPresets.forEach(preset => {
        const btn = document.createElement('button');
        const isActive = state.filterSettings.id === preset.id || (preset.id === 'normal' && !state.filterSettings.id);

        btn.className = `flex-shrink-0 w-12 h-12 rounded-full border-2 transition-all flex flex-col items-center justify-center ${isActive
            ? 'border-blue-400 bg-blue-500/20 scale-110 shadow-lg shadow-blue-400/30'
            : 'border-white/15 bg-white/5 hover:border-white/30'}`;
        btn.innerHTML = `
            <span class="text-lg">${preset.icon}</span>
            <span class="text-[7px] font-bold text-white/60 mt-0.5">${preset.name}</span>
        `;

        btn.onclick = () => {
            state.filterSettings = { ...preset.settings, id: preset.id };
            Array.from(filterList.children).forEach(child => {
                child.classList.remove('border-blue-400', 'bg-blue-500/20', 'scale-110', 'shadow-lg', 'shadow-blue-400/30');
                child.classList.add('border-white/15', 'bg-white/5');
            });
            btn.classList.remove('border-white/15', 'bg-white/5');
            btn.classList.add('border-blue-400', 'bg-blue-500/20', 'scale-110', 'shadow-lg', 'shadow-blue-400/30');
        };
        filterList.appendChild(btn);
    });

    filterRow.appendChild(filterLabel);
    filterRow.appendChild(filterList);

    // ── Capture Button ──
    const captureRow = document.createElement('div');
    captureRow.className = "flex justify-center pt-2";

    const captureBtn = document.createElement('button');
    captureBtn.className = mobile
        ? "w-18 h-18 rounded-full border-[5px] border-white bg-transparent active:bg-pink-500 transition-all flex items-center justify-center p-1 group"
        : "w-20 h-20 md:w-24 md:h-24 rounded-full border-[6px] md:border-8 border-white bg-transparent active:bg-pink-500 transition-all flex items-center justify-center p-1 group";
    captureBtn.style.width = mobile ? '72px' : '';
    captureBtn.style.height = mobile ? '72px' : '';
    captureBtn.innerHTML = `<div class="w-full h-full bg-white rounded-full transition-transform group-hover:scale-95 group-active:scale-90"></div>`;

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
            setTimeout(() => flash.remove(), 120);

            // Capture frame
            const photoData = canvas.toDataURL('image/png', 0.9);
            state.photos.push(photoData);

            if (state.photos.length >= template.requiredPhotos) {
                banner.innerText = "✨ Processing...";
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
                banner.innerText = `📷 ${state.photos.length + 1} / ${template.requiredPhotos}`;
                state.isCapturing = false;
                captureBtn.disabled = false;
                captureBtn.classList.remove('opacity-50', 'scale-90');
            }
        });
    };

    captureRow.appendChild(captureBtn);

    controlsWrapper.appendChild(effectRow);
    controlsWrapper.appendChild(filterRow);
    controlsWrapper.appendChild(captureRow);

    // ═══ LIFECYCLE ═══
    let animationFrame;
    getCamera().then(stream => {
        state.cameraStream = stream;
        video.srcObject = stream;

        const loop = () => {
            if (state.cameraStream) {
                const effectFn = activeEffect.draw || null;
                drawFilteredFrame(video, canvas, ctx, state.filterSettings, effectFn);
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

    // ═══ ASSEMBLE ═══
    section.appendChild(header);
    section.appendChild(boothContainer);

    if (mobile) {
        // On mobile, controls are overlaid on the camera
        boothContainer.appendChild(controlsWrapper);
    } else {
        section.appendChild(controlsWrapper);
    }

    return section;
}
