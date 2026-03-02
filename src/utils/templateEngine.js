export const templates = [
    {
        id: "fearless",
        name: "Fearless",
        requiredPhotos: 4,
        canvasWidth: 350,
        canvasHeight: 1000,
        theme: {
            bgColor: "#d4c8c2",
            accentColor: "#ffffff",
            fontStyle: "32px 'Outfit', sans-serif",
            label: "Fearless",
            borderRadius: 15
        },
        slots: [
            { x: 20, y: 50, width: 310, height: 210 },
            { x: 20, y: 270, width: 310, height: 210 },
            { x: 20, y: 490, width: 310, height: 210 },
            { x: 20, y: 710, width: 310, height: 210 }
        ]
    },
    {
        id: "film_classic",
        name: "Classic Film",
        requiredPhotos: 4,
        canvasWidth: 350,
        canvasHeight: 1000,
        theme: {
            bgColor: "#111111",
            accentColor: "#ffffff",
            isFilm: true,
            borderRadius: 0
        },
        slots: [
            { x: 50, y: 100, width: 250, height: 180 },
            { x: 50, y: 310, width: 250, height: 180 },
            { x: 50, y: 520, width: 250, height: 180 },
            { x: 50, y: 730, width: 250, height: 180 }
        ]
    },
    {
        id: "boom_comic",
        name: "Boom Comic",
        requiredPhotos: 3,
        canvasWidth: 350,
        canvasHeight: 1000,
        theme: {
            bgColor: "#ffdd44",
            accentColor: "#000000",
            isComic: true,
            label: "BOOM!",
            borderRadius: 8
        },
        slots: [
            { x: 30, y: 60, width: 290, height: 260 },
            { x: 30, y: 380, width: 290, height: 260 },
            { x: 30, y: 700, width: 290, height: 260 }
        ]
    },
    {
        id: "memories_vibe",
        name: "Memories",
        requiredPhotos: 3,
        canvasWidth: 400,
        canvasHeight: 800,
        theme: {
            bgColor: "#aeb0a2",
            accentColor: "#ffffff",
            label: "Memories",
            fontStyle: "italic 40px 'Outfit', sans-serif",
            borderRadius: 30
        },
        slots: [
            { x: 170, y: 60, width: 200, height: 210 },
            { x: 170, y: 290, width: 200, height: 210 },
            { x: 170, y: 520, width: 200, height: 210 }
        ]
    },
    {
        id: "heart_grid",
        name: "Heart Grid",
        requiredPhotos: 8,
        canvasWidth: 500,
        canvasHeight: 700,
        theme: {
            bgColor: "#f7a5a4",
            accentColor: "#ffffff",
            isHeart: true,
            borderRadius: 10
        },
        slots: [
            { x: 40, y: 50, width: 120, height: 140 },
            { x: 190, y: 50, width: 120, height: 140 },
            { x: 340, y: 50, width: 120, height: 140 },
            { x: 40, y: 220, width: 120, height: 140 },
            { x: 340, y: 220, width: 120, height: 140 },
            { x: 40, y: 390, width: 120, height: 140 },
            { x: 190, y: 390, width: 120, height: 140 },
            { x: 340, y: 390, width: 120, height: 140 }
        ]
    }
];

export async function composeFinalImage(template, photos) {
    const canvas = document.createElement('canvas');
    canvas.width = template.canvasWidth;
    canvas.height = template.canvasHeight;
    const ctx = canvas.getContext('2d');

    // Draw Base Background
    ctx.fillStyle = template.theme.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Theme Specific Ornaments
    if (template.theme.isFilm) {
        drawFilmSprockets(ctx, canvas);
    } else if (template.theme.isComic) {
        drawComicStyle(ctx, canvas);
    } else if (template.theme.isHeart) {
        drawHeartShape(ctx, canvas);
    }

    // Draw Photos
    for (let i = 0; i < template.slots.length; i++) {
        const slot = template.slots[i];
        const photoDataUrl = photos[i];
        if (!photoDataUrl) continue;

        const img = await loadImage(photoDataUrl);
        const sAspect = slot.width / slot.height;
        const iAspect = img.width / img.height;

        let sx, sy, sw, sh;
        if (iAspect > sAspect) {
            sh = img.height; sw = img.height * sAspect;
            sx = (img.width - sw) / 2; sy = 0;
        } else {
            sw = img.width; sh = img.width / sAspect;
            sx = 0; sy = (img.height - sh) / 2;
        }

        ctx.save();
        if (template.theme.borderRadius > 0) {
            drawRoundedRect(ctx, slot.x, slot.y, slot.width, slot.height, template.theme.borderRadius);
            ctx.clip();
        }
        ctx.drawImage(img, sx, sy, sw, sh, slot.x, slot.y, slot.width, slot.height);
        ctx.restore();

        ctx.strokeStyle = template.theme.accentColor + "44";
        ctx.lineWidth = 2;
        ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
    }

    // Label
    if (template.theme.label) {
        ctx.fillStyle = template.theme.accentColor;
        ctx.font = template.theme.fontStyle || "bold 40px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        if (template.id === 'fearless') {
            ctx.fillText(template.theme.label, canvas.width / 2, canvas.height - 40);
        } else if (template.id === 'boom_comic') {
            ctx.fillText(template.theme.label, canvas.width / 2, canvas.height - 30);
        } else if (template.id === 'memories_vibe') {
            ctx.save(); ctx.translate(50, canvas.height / 2); ctx.rotate(-Math.PI / 2);
            ctx.fillText(template.theme.label, 0, 0); ctx.restore();
        }
    }

    return canvas.toDataURL('image/jpeg', 0.5);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function drawFilmSprockets(ctx, canvas) {
    ctx.fillStyle = "#ffffff";
    for (let y = 50; y < canvas.height; y += 80) {
        ctx.fillRect(10, y, 20, 30);
        ctx.fillRect(canvas.width - 30, y, 20, 30);
    }
}

function drawComicStyle(ctx, canvas) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawHeartShape(ctx, canvas) {
    ctx.save(); ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath(); ctx.moveTo(0, 20);
    ctx.bezierCurveTo(-30, -30, -70, 10, 0, 80);
    ctx.bezierCurveTo(70, 10, 30, -30, 0, 20);
    ctx.fill(); ctx.restore();
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = src;
    });
}
