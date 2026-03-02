export const filterPresets = [
    { id: 'normal', name: 'Normal', settings: { brightness: 100, contrast: 100, saturation: 100, sepia: 0, hueRotate: 0, blur: 0 } },
    { id: 'vivid', name: 'Vivid', settings: { brightness: 110, contrast: 110, saturation: 130, sepia: 0, hueRotate: 0, blur: 0 } },
    { id: 'vintage', name: 'Vintage', settings: { brightness: 100, contrast: 90, saturation: 80, sepia: 30, hueRotate: 0, blur: 0 } },
    { id: 'bw', name: 'Mono', settings: { brightness: 100, contrast: 120, saturation: 0, sepia: 0, hueRotate: 0, blur: 0 } },
    { id: 'dreamy', name: 'Dreamy', settings: { brightness: 110, contrast: 90, saturation: 90, sepia: 10, hueRotate: 0, blur: 1.5 } },
    { id: 'sunset', name: 'Sunset', settings: { brightness: 100, contrast: 100, saturation: 120, sepia: 0, hueRotate: 340, blur: 0 } },
    { id: 'cool', name: 'Cool', settings: { brightness: 100, contrast: 100, saturation: 110, sepia: 0, hueRotate: 180, blur: 0 } }
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

export function drawFilteredFrame(video, canvas, ctx, settings) {
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
}
