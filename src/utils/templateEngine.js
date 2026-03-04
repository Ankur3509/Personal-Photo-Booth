export const templates = [
    {
        id: "pastel_dream",
        name: "Pastel Dream",
        requiredPhotos: 4,
        canvasWidth: 380,
        canvasHeight: 1100,
        theme: {
            type: 'pastel_dream',
            bgGradient: ['#fce4ec', '#f3e5f5', '#e8eaf6'],
            accentColor: '#e91e63',
            fontStyle: "bold 28px 'Outfit', sans-serif",
            label: '✧ dream ✧',
            borderRadius: 18,
            stickers: ['🌸', '✨', '💖', '🦋', '🌷', '⭐'],
            stickerPositions: [
                { x: 30, y: 15, size: 28, rotate: -15 },
                { x: 340, y: 20, size: 24, rotate: 20 },
                { x: 15, y: 500, size: 22, rotate: 10 },
                { x: 350, y: 700, size: 26, rotate: -10 },
                { x: 50, y: 1040, size: 20, rotate: 5 },
                { x: 310, y: 1050, size: 22, rotate: -5 }
            ]
        },
        slots: [
            { x: 25, y: 55, width: 330, height: 230 },
            { x: 25, y: 300, width: 330, height: 230 },
            { x: 25, y: 545, width: 330, height: 230 },
            { x: 25, y: 790, width: 330, height: 230 }
        ]
    },
    {
        id: "retro_film",
        name: "Retro Film",
        requiredPhotos: 4,
        canvasWidth: 380,
        canvasHeight: 1100,
        theme: {
            type: 'retro_film',
            bgColor: '#1a1a1a',
            accentColor: '#ffffff',
            isFilm: true,
            borderRadius: 4,
            filmColor: '#f5f5dc',
            stickers: ['🎬', '⭐', '🎞️', '🍿'],
            stickerPositions: [
                { x: 170, y: 1050, size: 26, rotate: 0 },
                { x: 210, y: 1055, size: 20, rotate: 15 },
                { x: 150, y: 1060, size: 18, rotate: -10 },
                { x: 240, y: 1050, size: 16, rotate: 5 }
            ]
        },
        slots: [
            { x: 55, y: 80, width: 270, height: 200 },
            { x: 55, y: 310, width: 270, height: 200 },
            { x: 55, y: 540, width: 270, height: 200 },
            { x: 55, y: 770, width: 270, height: 200 }
        ]
    },
    {
        id: "kawaii_pop",
        name: "Kawaii Pop",
        requiredPhotos: 3,
        canvasWidth: 400,
        canvasHeight: 950,
        theme: {
            type: 'kawaii_pop',
            bgGradient: ['#fff0f5', '#ffe4e9', '#ffd6e0'],
            accentColor: '#ff69b4',
            fontStyle: "bold 30px 'Outfit', sans-serif",
            label: '♡ kawaii ♡',
            borderRadius: 22,
            isKawaii: true,
            stickers: ['🍓', '🌟', '🎀', '🐰', '💗', '🍭', '⭐', '🌈'],
            stickerPositions: [
                { x: 20, y: 10, size: 30, rotate: -10 },
                { x: 360, y: 15, size: 26, rotate: 15 },
                { x: 370, y: 300, size: 24, rotate: 5 },
                { x: 10, y: 450, size: 28, rotate: -15 },
                { x: 380, y: 600, size: 22, rotate: 10 },
                { x: 30, y: 890, size: 26, rotate: -5 },
                { x: 350, y: 890, size: 22, rotate: 8 },
                { x: 190, y: 900, size: 20, rotate: 0 }
            ]
        },
        slots: [
            { x: 35, y: 60, width: 330, height: 260 },
            { x: 35, y: 340, width: 330, height: 260 },
            { x: 35, y: 620, width: 330, height: 260 }
        ]
    },
    {
        id: "golden_hour",
        name: "Golden Hour",
        requiredPhotos: 3,
        canvasWidth: 400,
        canvasHeight: 900,
        theme: {
            type: 'golden_hour',
            bgGradient: ['#ffecd2', '#fcb69f'],
            accentColor: '#8B4513',
            fontStyle: "italic 32px 'Outfit', sans-serif",
            label: 'golden hour',
            borderRadius: 25,
            stickers: ['☀️', '🌻', '✨', '🌾', '🍂'],
            stickerPositions: [
                { x: 190, y: 12, size: 32, rotate: 0 },
                { x: 30, y: 850, size: 24, rotate: -10 },
                { x: 360, y: 850, size: 22, rotate: 10 },
                { x: 370, y: 400, size: 20, rotate: 15 },
                { x: 15, y: 350, size: 22, rotate: -5 }
            ]
        },
        slots: [
            { x: 30, y: 50, width: 340, height: 250 },
            { x: 30, y: 320, width: 340, height: 250 },
            { x: 30, y: 590, width: 340, height: 250 }
        ]
    },
    {
        id: "comic_boom",
        name: "Comic Boom",
        requiredPhotos: 3,
        canvasWidth: 400,
        canvasHeight: 1000,
        theme: {
            type: 'comic_boom',
            bgColor: '#ffeb3b',
            accentColor: '#d32f2f',
            isComic: true,
            label: 'BOOM!',
            fontStyle: "bold 42px 'Outfit', sans-serif",
            borderRadius: 8,
            stickers: ['💥', '⚡', '🔥', '💫', '🌟'],
            stickerPositions: [
                { x: 30, y: 15, size: 32, rotate: -20 },
                { x: 350, y: 20, size: 28, rotate: 20 },
                { x: 15, y: 500, size: 24, rotate: 10 },
                { x: 375, y: 700, size: 26, rotate: -15 },
                { x: 200, y: 945, size: 30, rotate: 0 }
            ]
        },
        slots: [
            { x: 30, y: 60, width: 340, height: 270 },
            { x: 30, y: 370, width: 340, height: 270 },
            { x: 30, y: 680, width: 340, height: 270 }
        ]
    },
    {
        id: "love_letter",
        name: "Love Letter",
        requiredPhotos: 4,
        canvasWidth: 380,
        canvasHeight: 1100,
        theme: {
            type: 'love_letter',
            bgGradient: ['#fce4ec', '#f8bbd0', '#f48fb1'],
            accentColor: '#c62828',
            fontStyle: "italic 30px 'Outfit', sans-serif",
            label: '♥ xoxo ♥',
            borderRadius: 16,
            isLoveLetter: true,
            stickers: ['💌', '💕', '💋', '🌹', '💝', '💗'],
            stickerPositions: [
                { x: 25, y: 10, size: 28, rotate: -10 },
                { x: 340, y: 15, size: 24, rotate: 15 },
                { x: 10, y: 400, size: 22, rotate: 5 },
                { x: 360, y: 550, size: 26, rotate: -5 },
                { x: 180, y: 1050, size: 30, rotate: 0 },
                { x: 320, y: 1050, size: 24, rotate: 10 }
            ]
        },
        slots: [
            { x: 25, y: 55, width: 330, height: 230 },
            { x: 25, y: 300, width: 330, height: 230 },
            { x: 25, y: 545, width: 330, height: 230 },
            { x: 25, y: 790, width: 330, height: 230 }
        ]
    },
    {
        id: "neon_nights",
        name: "Neon Nights",
        requiredPhotos: 3,
        canvasWidth: 400,
        canvasHeight: 950,
        theme: {
            type: 'neon_nights',
            bgColor: '#0a0015',
            accentColor: '#00ffff',
            fontStyle: "bold 28px 'Outfit', sans-serif",
            label: '✦ NEON ✦',
            borderRadius: 12,
            isNeon: true,
            stickers: ['🌃', '💜', '🔮', '⚡', '🎇', '✨'],
            stickerPositions: [
                { x: 25, y: 10, size: 26, rotate: -5 },
                { x: 360, y: 15, size: 22, rotate: 10 },
                { x: 15, y: 480, size: 24, rotate: -10 },
                { x: 380, y: 620, size: 20, rotate: 5 },
                { x: 50, y: 900, size: 24, rotate: -5 },
                { x: 330, y: 905, size: 22, rotate: 10 }
            ]
        },
        slots: [
            { x: 35, y: 55, width: 330, height: 270 },
            { x: 35, y: 340, width: 330, height: 270 },
            { x: 35, y: 625, width: 330, height: 270 }
        ]
    },
    {
        id: "polaroid_stack",
        name: "Polaroid Stack",
        requiredPhotos: 3,
        canvasWidth: 420,
        canvasHeight: 950,
        theme: {
            type: 'polaroid_stack',
            bgGradient: ['#e8d5b7', '#c9b896'],
            accentColor: '#5d4037',
            fontStyle: "italic 24px 'Outfit', sans-serif",
            label: 'memories',
            borderRadius: 4,
            isPolaroid: true,
            stickers: ['📸', '🖼️', '🌿', '🤍', '☕'],
            stickerPositions: [
                { x: 30, y: 880, size: 22, rotate: -10 },
                { x: 370, y: 880, size: 20, rotate: 10 },
                { x: 200, y: 895, size: 24, rotate: 0 },
                { x: 380, y: 400, size: 18, rotate: 15 },
                { x: 15, y: 300, size: 20, rotate: -5 }
            ]
        },
        slots: [
            { x: 50, y: 40, width: 320, height: 250 },
            { x: 50, y: 320, width: 320, height: 250 },
            { x: 50, y: 600, width: 320, height: 250 }
        ]
    },
    {
        id: "y2k_vibes",
        name: "Y2K Vibes",
        requiredPhotos: 4,
        canvasWidth: 400,
        canvasHeight: 1150,
        theme: {
            type: 'y2k_vibes',
            bgGradient: ['#e0c3fc', '#8ec5fc', '#f093fb'],
            accentColor: '#7c4dff',
            fontStyle: "bold 26px 'Outfit', sans-serif",
            label: '★ y2k ★',
            borderRadius: 20,
            isY2K: true,
            stickers: ['🦄', '💿', '🌟', '👽', '🔮', '💜', '⭐', '🎶'],
            stickerPositions: [
                { x: 25, y: 10, size: 30, rotate: -15 },
                { x: 360, y: 15, size: 26, rotate: 15 },
                { x: 380, y: 350, size: 22, rotate: 5 },
                { x: 10, y: 550, size: 24, rotate: -10 },
                { x: 380, y: 750, size: 20, rotate: 10 },
                { x: 30, y: 1090, size: 26, rotate: -5 },
                { x: 360, y: 1095, size: 24, rotate: 8 },
                { x: 190, y: 1100, size: 22, rotate: 0 }
            ]
        },
        slots: [
            { x: 30, y: 55, width: 340, height: 245 },
            { x: 30, y: 315, width: 340, height: 245 },
            { x: 30, y: 575, width: 340, height: 245 },
            { x: 30, y: 835, width: 340, height: 245 }
        ]
    },
    {
        id: "heart_grid",
        name: "Heart Collage",
        requiredPhotos: 6,
        canvasWidth: 500,
        canvasHeight: 750,
        theme: {
            type: 'heart_grid',
            bgGradient: ['#ff9a9e', '#fad0c4', '#ffecd2'],
            accentColor: '#ffffff',
            isHeart: true,
            borderRadius: 12,
            fontStyle: "bold 24px 'Outfit', sans-serif",
            label: '♥',
            stickers: ['💖', '💗', '💝', '💕', '💘', '💓', '🩷', '❣️'],
            stickerPositions: [
                { x: 20, y: 10, size: 26, rotate: -10 },
                { x: 460, y: 15, size: 24, rotate: 10 },
                { x: 245, y: 8, size: 28, rotate: 0 },
                { x: 15, y: 700, size: 22, rotate: -5 },
                { x: 470, y: 700, size: 24, rotate: 5 },
                { x: 240, y: 710, size: 26, rotate: 0 },
                { x: 15, y: 370, size: 20, rotate: -15 },
                { x: 475, y: 380, size: 22, rotate: 15 }
            ]
        },
        slots: [
            { x: 25, y: 45, width: 220, height: 200 },
            { x: 255, y: 45, width: 220, height: 200 },
            { x: 25, y: 260, width: 220, height: 200 },
            { x: 255, y: 260, width: 220, height: 200 },
            { x: 25, y: 475, width: 220, height: 200 },
            { x: 255, y: 475, width: 220, height: 200 }
        ]
    }
];

export async function composeFinalImage(template, photos) {
    const canvas = document.createElement('canvas');
    canvas.width = template.canvasWidth;
    canvas.height = template.canvasHeight;
    const ctx = canvas.getContext('2d');

    // Draw background
    drawBackground(ctx, canvas.width, canvas.height, template.theme);

    // Draw theme-specific decorations UNDER photos
    drawThemeDecorations(ctx, canvas, template.theme, 'under');

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

        // Subtle border on photos
        ctx.save();
        if (template.theme.borderRadius > 0) {
            drawRoundedRect(ctx, slot.x, slot.y, slot.width, slot.height, template.theme.borderRadius);
            ctx.strokeStyle = template.theme.accentColor + '33';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.restore();
    }

    // Draw theme-specific decorations OVER photos   
    drawThemeDecorations(ctx, canvas, template.theme, 'over');

    // Draw stickers
    drawStickers(ctx, template.theme);

    // Label
    if (template.theme.label) {
        drawLabel(ctx, canvas, template);
    }

    return canvas.toDataURL('image/jpeg', 0.85);
}

// ─── Background Drawing ───
function drawBackground(ctx, w, h, theme) {
    if (theme.bgGradient) {
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        theme.bgGradient.forEach((color, i) => {
            gradient.addColorStop(i / (theme.bgGradient.length - 1), color);
        });
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = theme.bgColor || '#ffffff';
    }
    ctx.fillRect(0, 0, w, h);

    // Add subtle pattern overlay
    if (!theme.isFilm && !theme.isComic && !theme.isNeon) {
        drawSubtlePattern(ctx, w, h, theme);
    }
}

function drawSubtlePattern(ctx, w, h, theme) {
    ctx.save();
    ctx.globalAlpha = 0.04;
    for (let x = 0; x < w; x += 20) {
        for (let y = 0; y < h; y += 20) {
            if ((x + y) % 40 === 0) {
                ctx.fillStyle = theme.accentColor || '#000';
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    ctx.restore();
}

// ─── Theme Decorations ───
function drawThemeDecorations(ctx, canvas, theme, layer) {
    const w = canvas.width;
    const h = canvas.height;

    if (theme.isFilm && layer === 'under') {
        drawFilmSprockets(ctx, w, h, theme.filmColor || '#f5f5dc');
    }
    if (theme.isComic && layer === 'under') {
        drawComicStyle(ctx, w, h, theme);
    }
    if (theme.isHeart && layer === 'under') {
        drawHeartPatternBg(ctx, w, h);
    }
    if (theme.isKawaii && layer === 'over') {
        drawKawaiiDecorations(ctx, w, h);
    }
    if (theme.isNeon && layer === 'under') {
        drawNeonBackground(ctx, w, h);
    }
    if (theme.isNeon && layer === 'over') {
        drawNeonBorders(ctx, w, h);
    }
    if (theme.isLoveLetter && layer === 'over') {
        drawLoveLetterDecorations(ctx, w, h);
    }
    if (theme.isPolaroid && layer === 'under') {
        drawPolaroidStyle(ctx, w, h);
    }
    if (theme.isY2K && layer === 'over') {
        drawY2KDecorations(ctx, w, h);
    }
}

// ─── Film Sprockets ───
function drawFilmSprockets(ctx, w, h, filmColor) {
    ctx.fillStyle = filmColor;
    // Sprocket holes along edges
    for (let y = 40; y < h; y += 55) {
        // Left sprockets
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;
        drawRoundedRect(ctx, 8, y, 22, 16, 3);
        ctx.fill();
        // Right sprockets
        drawRoundedRect(ctx, w - 30, y, 22, 16, 3);
        ctx.fill();
        ctx.restore();
    }
    // Film edge lines
    ctx.strokeStyle = filmColor + '44';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(38, 0); ctx.lineTo(38, h);
    ctx.moveTo(w - 38, 0); ctx.lineTo(w - 38, h);
    ctx.stroke();
}

// ─── Comic Style ───
function drawComicStyle(ctx, w, h, theme) {
    // Thick comic border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, w - 10, h - 10);

    // Halftone dots in corners
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = theme.accentColor;
    for (let x = 10; x < 80; x += 8) {
        for (let y = 10; y < 50; y += 8) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w - x, h - y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.restore();

    // POW/ZAP speech bubbles
    drawSpeechBubble(ctx, w - 70, h - 70, 'ZAP!', '#ff1744');
}

function drawSpeechBubble(ctx, x, y, text, color) {
    ctx.save();
    ctx.translate(x, y);
    // Starburst
    ctx.fillStyle = color;
    ctx.beginPath();
    const points = 12;
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const r = i % 2 === 0 ? 35 : 20;
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();
    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = "bold 14px 'Outfit', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0);
    ctx.restore();
}

// ─── Heart Pattern BG ───
function drawHeartPatternBg(ctx, w, h) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    for (let x = 20; x < w; x += 50) {
        for (let y = 20; y < h; y += 50) {
            drawSmallHeart(ctx, x + Math.sin(y) * 5, y, 10, '#ff1744');
        }
    }
    ctx.restore();
}

function drawSmallHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, size * 0.3);
    ctx.bezierCurveTo(-size / 2, size * 0.6, 0, size * 0.8, 0, size);
    ctx.bezierCurveTo(0, size * 0.8, size / 2, size * 0.6, size / 2, size * 0.3);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, size * 0.3);
    ctx.fill();
    ctx.restore();
}

// ─── Kawaii Decorations ───
function drawKawaiiDecorations(ctx, w, h) {
    // Draw cute stars 
    ctx.save();
    ctx.globalAlpha = 0.15;
    const starPositions = [
        [30, 30], [w - 30, 30], [30, h - 30], [w - 30, h - 30],
        [w / 2, 25], [50, h / 2], [w - 50, h / 2]
    ];
    starPositions.forEach(([x, y]) => {
        drawCuteStar(ctx, x, y, 12, '#ff69b4');
    });
    ctx.restore();

    // Sparkle lines
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = '#ff69b4';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    // Corner decorative lines
    ctx.beginPath();
    ctx.moveTo(10, 40); ctx.lineTo(40, 10);
    ctx.moveTo(w - 10, 40); ctx.lineTo(w - 40, 10);
    ctx.stroke();
    ctx.restore();
}

function drawCuteStar(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const next = ((i + 1) * 4 * Math.PI) / 5 - Math.PI / 2;
        if (i === 0) ctx.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        else ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.lineTo(x + Math.cos((angle + next) / 2) * size * 0.4, y + Math.sin((angle + next) / 2) * size * 0.4);
    }
    ctx.closePath();
    ctx.fill();
}

// ─── Neon Background & Borders ───
function drawNeonBackground(ctx, w, h) {
    // Starfield
    ctx.save();
    for (let i = 0; i < 80; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.5 + 0.5;
        ctx.globalAlpha = Math.random() * 0.6 + 0.2;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();

    // Glowing grid lines
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.restore();
}

function drawNeonBorders(ctx, w, h) {
    // Neon glow border
    ctx.save();
    const colors = ['#ff00ff', '#00ffff', '#ff00ff'];
    colors.forEach((color, i) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3 - i * 0.08;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15 + i * 5;
        drawRoundedRect(ctx, 8 + i * 3, 8 + i * 3, w - 16 - i * 6, h - 16 - i * 6, 12);
        ctx.stroke();
    });
    ctx.restore();
}

// ─── Love Letter ───
function drawLoveLetterDecorations(ctx, w, h) {
    // Draw scattered small hearts
    ctx.save();
    ctx.globalAlpha = 0.12;
    const heartPositions = [];
    for (let i = 0; i < 20; i++) {
        heartPositions.push([
            Math.random() * w,
            Math.random() * h,
            Math.random() * 8 + 5
        ]);
    }
    heartPositions.forEach(([x, y, s]) => {
        drawSmallHeart(ctx, x, y, s, '#ff1744');
    });
    ctx.restore();

    // Wavy line dividers between slots (decorative)
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = '#c62828';
    ctx.lineWidth = 1;
    [280, 520, 760].forEach(y => {
        ctx.beginPath();
        for (let x = 20; x < w - 20; x += 2) {
            ctx.lineTo(x, y + Math.sin(x / 10) * 3);
        }
        ctx.stroke();
    });
    ctx.restore();
}

// ─── Polaroid Style ───
function drawPolaroidStyle(ctx, w, h) {
    // Draw fake polaroid frames (white border effect)
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    // Slightly rotated polaroid backgrounds
    const rotations = [-2, 1, -1.5];
    const yPositions = [25, 305, 585];
    rotations.forEach((rot, i) => {
        ctx.save();
        ctx.translate(w / 2, yPositions[i] + 140);
        ctx.rotate(rot * Math.PI / 180);
        ctx.fillRect(-175, -145, 350, 310);
        ctx.restore();
    });
    ctx.restore();

    // Decorative tape strips on top of polaroids  
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#c4a35a44';
    yPositions.forEach(y => {
        ctx.save();
        ctx.translate(w / 2, y + 5);
        ctx.rotate(-0.05);
        ctx.fillRect(-25, -6, 50, 12);
        ctx.restore();
    });
    ctx.restore();
}

// ─── Y2K Style ───
function drawY2KDecorations(ctx, w, h) {
    // Holographic shimmer lines
    ctx.save();
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 15; i++) {
        const y = Math.random() * h;
        const gradient = ctx.createLinearGradient(0, y, w, y);
        gradient.addColorStop(0, '#ff00ff');
        gradient.addColorStop(0.5, '#00ffff');
        gradient.addColorStop(1, '#ff00ff');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
    ctx.restore();

    // Small star decorations
    ctx.save();
    ctx.globalAlpha = 0.2;
    const starPos = [
        [20, 25, 8], [w - 20, 30, 10], [w / 2, 15, 7],
        [15, h - 20, 9], [w - 15, h - 25, 8], [w / 2, h - 15, 10]
    ];
    starPos.forEach(([x, y, s]) => {
        drawCuteStar(ctx, x, y, s, '#7c4dff');
    });
    ctx.restore();
}

// ─── Draw Stickers ───
function drawStickers(ctx, theme) {
    if (!theme.stickers || !theme.stickerPositions) return;

    theme.stickerPositions.forEach((pos, i) => {
        const sticker = theme.stickers[i % theme.stickers.length];
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate((pos.rotate || 0) * Math.PI / 180);
        ctx.font = `${pos.size || 24}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sticker, 0, 0);
        ctx.restore();
    });
}

// ─── Draw Label ───
function drawLabel(ctx, canvas, template) {
    ctx.save();
    ctx.fillStyle = template.theme.accentColor;
    ctx.font = template.theme.fontStyle || "bold 32px 'Outfit', sans-serif";
    ctx.textAlign = 'center';

    // Position label at the bottom
    const bottomY = canvas.height - 30;
    ctx.fillText(template.theme.label, canvas.width / 2, bottomY);
    ctx.restore();
}

// ─── Utility ───
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

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = src;
    });
}
