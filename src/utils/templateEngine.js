export const templates = [
    {
        id: "classic_strip",
        name: "Classic Strip",
        requiredPhotos: 3,
        canvasWidth: 600,
        canvasHeight: 1800,
        aspectRatio: 1 / 3,
        slots: [
            { x: 50, y: 100, width: 500, height: 500 },
            { x: 50, y: 650, width: 500, height: 500 },
            { x: 50, y: 1200, width: 500, height: 500 }
        ],
        background: "#ffffff"
    },
    {
        id: "square_quad",
        name: "Modern 4-Square",
        requiredPhotos: 4,
        canvasWidth: 1200,
        canvasHeight: 1200,
        aspectRatio: 1,
        slots: [
            { x: 80, y: 80, width: 500, height: 500 },
            { x: 620, y: 80, width: 500, height: 500 },
            { x: 80, y: 620, width: 500, height: 500 },
            { x: 620, y: 620, width: 500, height: 500 }
        ],
        background: "#121212"
    }
];

export async function composeFinalImage(template, photos) {
    const canvas = document.createElement('canvas');
    canvas.width = template.canvasWidth;
    canvas.height = template.canvasHeight;
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = template.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < template.slots.length; i++) {
        const slot = template.slots[i];
        const photoDataUrl = photos[i];

        const img = await loadImage(photoDataUrl);

        // Calculate aspect ratio crop (cover center)
        const imgAspect = img.width / img.height;
        const slotAspect = slot.width / slot.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > slotAspect) {
            drawHeight = img.height;
            drawWidth = img.height * slotAspect;
            offsetX = (img.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = img.width;
            drawHeight = img.width / slotAspect;
            offsetX = 0;
            offsetY = (img.height - drawHeight) / 2;
        }

        ctx.drawImage(
            img,
            offsetX, offsetY, drawWidth, drawHeight, // Source crop
            slot.x, slot.y, slot.width, slot.height // Destination
        );
    }

    return canvas.toDataURL('image/png', 0.92);
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}
