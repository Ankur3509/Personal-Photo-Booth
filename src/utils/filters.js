export const defaultFilters = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    hueRotate: 0,
    blur: 0
};

export function applyFiltersToCtx(ctx, settings) {
    const { brightness, contrast, saturation, sepia, hueRotate, blur } = settings;
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
    if (!video || !canvas || !ctx) return;

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
