export const filterPresets = [
    { id: 'normal', name: 'Normal', icon: '🔘', settings: { brightness: 100, contrast: 100, saturation: 100, sepia: 0, hueRotate: 0, blur: 0 } },
    { id: 'vivid', name: 'Vivid', icon: '🌈', settings: { brightness: 110, contrast: 110, saturation: 130, sepia: 0, hueRotate: 0, blur: 0 } },
    { id: 'vintage', name: 'Vintage', icon: '📷', settings: { brightness: 100, contrast: 90, saturation: 80, sepia: 30, hueRotate: 0, blur: 0 } },
    { id: 'bw', name: 'Mono', icon: '🖤', settings: { brightness: 100, contrast: 120, saturation: 0, sepia: 0, hueRotate: 0, blur: 0 } },
    { id: 'dreamy', name: 'Dreamy', icon: '☁️', settings: { brightness: 110, contrast: 90, saturation: 90, sepia: 10, hueRotate: 0, blur: 1.5 } },
    { id: 'sunset', name: 'Sunset', icon: '🌅', settings: { brightness: 100, contrast: 100, saturation: 120, sepia: 0, hueRotate: 340, blur: 0 } },
    { id: 'cool', name: 'Cool', icon: '🧊', settings: { brightness: 100, contrast: 100, saturation: 110, sepia: 0, hueRotate: 180, blur: 0 } },
    { id: 'warm', name: 'Warm', icon: '🔥', settings: { brightness: 105, contrast: 105, saturation: 115, sepia: 15, hueRotate: 10, blur: 0 } },
    { id: 'glow', name: 'Glow', icon: '💡', settings: { brightness: 120, contrast: 95, saturation: 105, sepia: 0, hueRotate: 0, blur: 0.8 } }
];

export function applyFiltersToCtx(ctx, settings) {
    const { brightness = 100, contrast = 100, saturation = 100, sepia = 0, hueRotate = 0, blur = 0 } = settings;
    ctx.filter = `
    brightness(${brightness}%) 
    contrast(${contrast}%) 
    saturate(${saturation}%) 
    sepia(${sepia}%) 
    hue-rotate(${hueRotate}deg) 
    blur(${blur}px)
  `.trim().replace(/\s+/g, ' ');
}

export function drawFilteredFrame(video, canvas, ctx, settings, effectFn) {
    if (!video || !canvas || !ctx || video.readyState < 2) return;

    ctx.save();
    // Mirror for selfie mode
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    applyFiltersToCtx(ctx, settings);

    const videoAspect = video.videoWidth / video.videoHeight;
    const canvasAspect = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (videoAspect > canvasAspect) {
        drawHeight = video.videoHeight;
        drawWidth = video.videoHeight * canvasAspect;
        offsetX = (video.videoWidth - drawWidth) / 2;
        offsetY = 0;
    } else {
        drawWidth = video.videoWidth;
        drawHeight = video.videoWidth / canvasAspect;
        offsetX = 0;
        offsetY = (video.videoHeight - drawHeight) / 2;
    }

    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Draw effect overlay (not mirrored)
    if (effectFn && typeof effectFn === 'function') {
        ctx.save();
        ctx.filter = 'none';
        effectFn(ctx, canvas.width, canvas.height, performance.now());
        ctx.restore();
    }
}
