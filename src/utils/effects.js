/**
 * Snapchat-style visual effects that draw overlays on the canvas.
 */

export const effectPresets = [
    {
        id: 'none',
        name: 'None',
        icon: '🚫',
        draw: () => { } // no-op
    },
    {
        id: 'sparkles',
        name: 'Sparkles',
        icon: '✨',
        draw: (ctx, w, h, t) => drawSparkles(ctx, w, h, t)
    },
    {
        id: 'hearts_rain',
        name: 'Hearts',
        icon: '💕',
        draw: (ctx, w, h, t) => drawHeartsRain(ctx, w, h, t)
    },
    {
        id: 'butterfly',
        name: 'Butterflies',
        icon: '🦋',
        draw: (ctx, w, h, t) => drawButterflies(ctx, w, h, t)
    },
    {
        id: 'star_crown',
        name: 'Star Crown',
        icon: '👑',
        draw: (ctx, w, h, t, trackingData) => drawStarCrown(ctx, w, h, t, trackingData)
    },
    {
        id: 'neon_frame',
        name: 'Neon Frame',
        icon: '🔲',
        draw: (ctx, w, h, t) => drawNeonFrame(ctx, w, h, t)
    },
    {
        id: 'snow',
        name: 'Snowfall',
        icon: '❄️',
        draw: (ctx, w, h, t) => drawSnowfall(ctx, w, h, t)
    },
    // ─── NEW CUTE FACE FILTERS ───
    {
        id: 'face_glow',
        name: 'Face Glow',
        icon: '🌟',
        draw: (ctx, w, h, t, trackingData) => drawFaceGlow(ctx, w, h, t, trackingData)
    },
    {
        id: 'flower_crown',
        name: 'Flowers',
        icon: '🌸',
        draw: (ctx, w, h, t, trackingData) => drawFlowerCrown(ctx, w, h, t, trackingData)
    },
    {
        id: 'bunny_face',
        name: 'Bunny',
        icon: '🐰',
        draw: (ctx, w, h, t, trackingData) => drawBunnyFace(ctx, w, h, t, trackingData)
    },
    {
        id: 'cat_face',
        name: 'Kitty',
        icon: '🐱',
        draw: (ctx, w, h, t, trackingData) => drawCatFace(ctx, w, h, t, trackingData)
    },
    {
        id: 'curly_sparkles',
        name: 'Curls',
        icon: '💫',
        draw: (ctx, w, h, t, trackingData) => drawCurlySparkles(ctx, w, h, t, trackingData)
    },
    {
        id: 'cute_nose_dots',
        name: 'Freckles',
        icon: '🐾',
        draw: (ctx, w, h, t, trackingData) => drawCuteNoseDots(ctx, w, h, t, trackingData)
    }
];

// ─── Sparkles Effect ───
const sparkleParticles = [];
function initSparkles(w, h) {
    if (sparkleParticles.length === 0) {
        for (let i = 0; i < 40; i++) {
            sparkleParticles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 4 + 2,
                speed: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                phase: Math.random() * Math.PI * 2
            });
        }
    }
}

function drawSparkles(ctx, w, h, t) {
    initSparkles(w, h);
    sparkleParticles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(t / 500 + p.phase) * 0.8;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }

        const twinkle = Math.abs(Math.sin(t / 300 + p.phase));
        ctx.save();
        ctx.globalAlpha = twinkle * 0.9;
        ctx.translate(p.x, p.y);
        ctx.rotate(t / 1000 + p.phase);

        // Draw 4-pointed star
        const s = p.size * (0.8 + twinkle * 0.5);
        ctx.fillStyle = `hsl(${(t / 20 + p.phase * 60) % 360}, 100%, 85%)`;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.lineTo(Math.cos(angle) * s * 2, Math.sin(angle) * s * 2);
            ctx.lineTo(Math.cos(angle + Math.PI / 4) * s * 0.5, Math.sin(angle + Math.PI / 4) * s * 0.5);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    });
}

// ─── Hearts Rain Effect ───
const heartParticles = [];
function initHearts(w, h) {
    if (heartParticles.length === 0) {
        for (let i = 0; i < 25; i++) {
            heartParticles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 18 + 10,
                speed: Math.random() * 2 + 1,
                wobble: Math.random() * Math.PI * 2,
                hue: Math.random() * 40 + 330 // pink-red range
            });
        }
    }
}

function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.7, x, y + size);
    ctx.bezierCurveTo(x, y + size * 0.7, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
    ctx.closePath();
}

function drawHeartsRain(ctx, w, h, t) {
    initHearts(w, h);
    heartParticles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(t / 800 + p.wobble) * 1.2;
        if (p.y < -30) { p.y = h + 30; p.x = Math.random() * w; }

        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.sin(t / 1000 + p.wobble) * 0.2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, 0.8)`;
        drawHeart(ctx, 0, 0, p.size);
        ctx.fill();

        // Soft glow
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    });
}

// ─── Butterfly Effect ───
const butterflyParticles = [];
function initButterflies(w, h) {
    if (butterflyParticles.length === 0) {
        for (let i = 0; i < 8; i++) {
            butterflyParticles.push({
                x: Math.random() * w,
                y: Math.random() * h * 0.6 + h * 0.1,
                size: Math.random() * 20 + 15,
                speed: Math.random() * 1 + 0.5,
                phase: Math.random() * Math.PI * 2,
                hue: Math.random() * 60 + 260 // purple-blue range
            });
        }
    }
}

function drawButterfly(ctx, x, y, size, wingAngle, hue) {
    ctx.save();
    ctx.translate(x, y);

    // Left wing
    ctx.save();
    ctx.scale(Math.cos(wingAngle), 1);
    ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.7)`;
    ctx.beginPath();
    ctx.ellipse(-size * 0.4, -size * 0.2, size * 0.6, size * 0.4, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `hsla(${hue + 30}, 90%, 70%, 0.5)`;
    ctx.beginPath();
    ctx.ellipse(-size * 0.3, size * 0.2, size * 0.4, size * 0.3, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right wing
    ctx.save();
    ctx.scale(Math.cos(wingAngle), 1);
    ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.7)`;
    ctx.beginPath();
    ctx.ellipse(size * 0.4, -size * 0.2, size * 0.6, size * 0.4, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `hsla(${hue + 30}, 90%, 70%, 0.5)`;
    ctx.beginPath();
    ctx.ellipse(size * 0.3, size * 0.2, size * 0.4, size * 0.3, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Body
    ctx.fillStyle = `hsla(${hue - 20}, 50%, 30%, 0.8)`;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.06, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawButterflies(ctx, w, h, t) {
    initButterflies(w, h);
    butterflyParticles.forEach(p => {
        p.x += Math.sin(t / 2000 + p.phase) * p.speed * 2;
        p.y += Math.cos(t / 3000 + p.phase) * p.speed;
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40 || p.y > h + 40) p.y = Math.random() * h * 0.6 + h * 0.1;

        const wingAngle = Math.sin(t / 150 + p.phase) * 0.8;
        drawButterfly(ctx, p.x, p.y, p.size, wingAngle, p.hue);
    });
}

// ─── Star Crown Effect ───
function drawStarCrown(ctx, w, h, t, trackingData) {
    const face = trackingData ? getFaceCoordsFromTracking(trackingData) : getFaceRegion(w, h);
    const crownY = face.foreheadY || (h * 0.08);
    const centerX = face.cx || (w / 2);
    const crownWidth = face.faceW * 1.5 || (w * 0.5);

    ctx.save();
    ctx.globalAlpha = 0.85;

    // Stars along an arc
    const starCount = 7;
    for (let i = 0; i < starCount; i++) {
        const frac = i / (starCount - 1);
        const angle = Math.PI * 0.2 + frac * Math.PI * 0.6;
        const rx = crownWidth * 0.6;
        const ry = crownWidth * 0.25;
        const sx = centerX + Math.cos(Math.PI - angle) * rx;
        const sy = crownY + h * 0.02 - Math.sin(angle) * ry;
        const bounce = Math.sin(t / 500 + i * 0.8) * 4;
        const starSize = 8 + Math.sin(t / 400 + i) * 3;

        drawStar(ctx, sx, sy + bounce, starSize, `hsla(${45 + i * 5}, 100%, ${65 + Math.sin(t / 300 + i) * 15}%, 0.9)`);
    }

    ctx.restore();
}

function drawStar(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const next = ((i + 1) * 4 * Math.PI) / 5 - Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(angle) * size, Math.sin(angle) * size);
        else ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.lineTo(Math.cos((angle + next) / 2) * size * 0.4, Math.sin((angle + next) / 2) * size * 0.4);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// ─── Neon Frame Effect ───
function drawNeonFrame(ctx, w, h, t) {
    const pad = 20;
    const hue = (t / 15) % 360;

    ctx.save();

    // Outer neon glow
    for (let i = 3; i >= 0; i--) {
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${0.15 - i * 0.03})`;
        ctx.lineWidth = 8 + i * 6;
        ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.8)`;
        ctx.shadowBlur = 20 + i * 10;
        roundedRectPath(ctx, pad + i, pad + i, w - pad * 2 - i * 2, h - pad * 2 - i * 2, 20);
        ctx.stroke();
    }

    // Inner crisp line
    ctx.strokeStyle = `hsla(${hue}, 100%, 80%, 0.9)`;
    ctx.lineWidth = 2;
    ctx.shadowColor = `hsla(${hue}, 100%, 80%, 1)`;
    ctx.shadowBlur = 15;
    roundedRectPath(ctx, pad, pad, w - pad * 2, h - pad * 2, 20);
    ctx.stroke();

    // Corner sparkle dots
    const corners = [
        [pad + 10, pad + 10], [w - pad - 10, pad + 10],
        [pad + 10, h - pad - 10], [w - pad - 10, h - pad - 10]
    ];
    corners.forEach(([cx, cy], idx) => {
        const pulse = Math.sin(t / 300 + idx * Math.PI / 2) * 0.4 + 0.6;
        ctx.fillStyle = `hsla(${(hue + idx * 90) % 360}, 100%, 80%, ${pulse})`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(cx, cy, 4 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
}

function roundedRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// ─── Snowfall Effect ───
const snowParticles = [];
function initSnow(w, h) {
    if (snowParticles.length === 0) {
        for (let i = 0; i < 60; i++) {
            snowParticles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 4 + 2,
                speed: Math.random() * 2 + 0.5,
                wobble: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.5 + 0.4
            });
        }
    }
}

function drawSnowfall(ctx, w, h, t) {
    initSnow(w, h);
    snowParticles.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(t / 1500 + p.wobble) * 0.6;
        if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(200, 220, 255, 0.8)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Small cross detail for snowflake look
        if (p.size > 4) {
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x - p.size, p.y);
            ctx.lineTo(p.x + p.size, p.y);
            ctx.moveTo(p.x, p.y - p.size);
            ctx.lineTo(p.x, p.y + p.size);
            ctx.stroke();
        }

        ctx.restore();
    });
}

// ═══════════════════════════════════════════════════════
// ─── TRACKING HELPERS ──────────
// ═══════════════════════════════════════════════════════

function getFaceCoordsFromTracking(track) {
    // 0: Right Eye (appears right-ish on screen)
    // 1: Left Eye (appears left-ish on screen)
    const rightEye = track.landmarks[0];
    const leftEye = track.landmarks[1];

    // Rotation: Angle between the eyes
    // Using (Right - Left) to get a natural rotation angle for the head tilt
    const dy = rightEye.y - leftEye.y;
    const dx = rightEye.x - leftEye.x;
    const rotation = Math.atan2(dy, dx);

    return {
        cx: track.cx,
        cy: track.cy,
        faceW: track.w,
        faceH: track.h,
        eyeY: (rightEye.y + leftEye.y) / 2,
        noseY: track.landmarks[2].y,
        mouthY: track.landmarks[3].y,
        foreheadY: track.cy - track.h * 0.55,
        rotation: rotation
    };
}

function getFaceRegion(w, h) {
    return {
        cx: w * 0.5,
        cy: h * 0.40,
        faceW: w * 0.35,
        faceH: h * 0.35,
        eyeY: h * 0.35,
        noseY: h * 0.45,
        mouthY: h * 0.52,
        foreheadY: h * 0.25,
        rotation: 0
    };
}

// ═══════════════════════════════════════════════════════
// ─── CUTE FACE FILTERS with TRACKING ──────────
// ═══════════════════════════════════════════════════════

// ─── Face Glow / Beauty Enhance ───
function drawFaceGlow(ctx, w, h, t, trackingData) {
    const face = trackingData ? getFaceCoordsFromTracking(trackingData) : getFaceRegion(w, h);
    ctx.save();
    // Radial glow on face
    const glowRadius = face.faceW * 1.5;
    const gradient = ctx.createRadialGradient(face.cx, face.cy, 0, face.cx, face.cy, glowRadius);
    gradient.addColorStop(0, 'rgba(255, 220, 240, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 150, 200, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Sparkle halo around head
    const sparkleCount = 10;
    for (let i = 0; i < sparkleCount; i++) {
        const angle = (i / sparkleCount) * Math.PI * 2 + t / 2000;
        const radius = face.faceW * 0.75;
        const sx = face.cx + Math.cos(angle) * radius;
        const sy = face.cy + Math.sin(angle) * radius * 0.8;
        ctx.fillStyle = `hsla(${(t / 20 + i * 40) % 360}, 100%, 90%, 0.6)`;
        ctx.beginPath();
        ctx.arc(sx, sy, 3 + Math.sin(t / 300 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

// ─── Flower Crown ───
function drawFlowerCrown(ctx, w, h, t, trackingData) {
    const face = trackingData ? getFaceCoordsFromTracking(trackingData) : getFaceRegion(w, h);
    const crownY = face.foreheadY;
    const crownWidth = face.faceW * 1.4;

    ctx.save();
    ctx.translate(face.cx, face.cy);
    ctx.rotate(face.rotation);
    ctx.translate(-face.cx, -face.cy);

    // Flowers along an arc on forehead
    const flowerCount = 6;
    for (let i = 0; i < flowerCount; i++) {
        const frac = i / (flowerCount - 1);
        const angle = Math.PI + frac * Math.PI;
        const ax = face.cx + Math.cos(angle) * (crownWidth * 0.45);
        const ay = crownY + 10 - Math.sin(frac * Math.PI) * 20;
        const fSize = 15 + Math.sin(t / 400 + i) * 3;

        ctx.fillStyle = `hsla(${330 + i * 15}, 80%, 70%, 0.9)`;
        ctx.beginPath();
        for (let p = 0; p < 5; p++) {
            const pa = (p / 5) * Math.PI * 2;
            ctx.ellipse(ax + Math.cos(pa) * fSize * 0.5, ay + Math.sin(pa) * fSize * 0.5, fSize * 0.4, fSize * 0.2, pa, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(ax, ay, fSize * 0.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
}

// ─── Bunny Face ───
function drawBunnyFace(ctx, w, h, t, trackingData) {
    const face = trackingData ? getFaceCoordsFromTracking(trackingData) : getFaceRegion(w, h);
    ctx.save();
    ctx.translate(face.cx, face.cy);
    ctx.rotate(face.rotation);
    ctx.translate(-face.cx, -face.cy);

    const earH = face.faceH * 0.8;
    const earW = face.faceW * 0.2;

    // Ears
    for (let side of [-1, 1]) {
        const ex = face.cx + side * face.faceW * 0.25;
        // Anchoring the bottom of the ear to foreheadY
        const ey = face.foreheadY - earH * 0.85;
        const bounce = Math.sin(t / 300 + side) * 5;

        ctx.fillStyle = '#fffafb';
        ctx.beginPath();
        // Ellipse center is ey, so we draw it completely above the forehead
        ctx.ellipse(ex, ey + bounce, earW, earH, side * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffc0cb';
        ctx.beginPath();
        ctx.ellipse(ex, ey + bounce + earH * 0.1, earW * 0.5, earH * 0.7, side * 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    // Nose
    const noseY = face.noseY;
    ctx.fillStyle = '#ff82aa';
    ctx.beginPath();
    ctx.ellipse(face.cx, noseY, face.faceW * 0.08, face.faceW * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = '#ffc0cb77'; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        for (let s of [-1, 1]) {
            ctx.beginPath();
            ctx.moveTo(face.cx + s * 10, noseY);
            ctx.lineTo(face.cx + s * face.faceW * 0.5, noseY + (i - 1) * 10);
            ctx.stroke();
        }
    }
    ctx.restore();
}

// ─── Cat Face ───
function drawCatFace(ctx, w, h, t, trackingData) {
    const face = trackingData ? getFaceCoordsFromTracking(trackingData) : getFaceRegion(w, h);
    ctx.save();
    ctx.translate(face.cx, face.cy);
    ctx.rotate(face.rotation);
    ctx.translate(-face.cx, -face.cy);

    // Triangle ears
    const earS = face.faceW * 0.3;
    for (let s of [-1, 1]) {
        const ex = face.cx + s * face.faceW * 0.35;
        const ey = face.foreheadY;
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - s * earS * 0.5, ey - earS);
        ctx.lineTo(ex + s * earS * 0.5, ey);
        ctx.fill();
        ctx.fillStyle = '#ffc0cb';
        ctx.beginPath();
        ctx.moveTo(ex, ey - 5);
        ctx.lineTo(ex - s * earS * 0.3, ey - earS * 0.7);
        ctx.lineTo(ex + s * earS * 0.3, ey - 5);
        ctx.fill();
    }

    // Nose & Whiskers
    const ny = face.noseY;
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(face.cx, ny, 8, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#ffffffaa'; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        for (let s of [-1, 1]) {
            ctx.beginPath();
            ctx.moveTo(face.cx + s * 5, ny + 5);
            ctx.lineTo(face.cx + s * face.faceW * 0.6, ny + (i - 1) * 15);
            ctx.stroke();
        }
    }
    ctx.restore();
}

// ─── Curly Sparkles ───
function drawCurlySparkles(ctx, w, h, t, trackingData) {
    const face = trackingData ? getFaceCoordsFromTracking(trackingData) : getFaceRegion(w, h);
    ctx.save();
    const count = 8;
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t / 4000;
        const radius = face.faceW * 0.75 + Math.sin(t / 800 + i) * 10;
        const cx = face.cx + Math.cos(angle) * radius;
        const cy = face.cy + Math.sin(angle) * radius * 0.8;

        ctx.strokeStyle = `hsla(${(t / 10 + i * 45) % 360}, 80%, 80%, 0.6)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let s = 0; s < 10; s++) {
            const sa = s * 0.6; const sr = s * 1.5;
            ctx.lineTo(cx + Math.cos(sa) * sr, cy + Math.sin(sa) * sr);
        }
        ctx.stroke();
    }
    ctx.restore();
}

// ─── Cute Nose Dots / Freckles ───
function drawCuteNoseDots(ctx, w, h, t, trackingData) {
    const face = trackingData ? getFaceCoordsFromTracking(trackingData) : getFaceRegion(w, h);
    ctx.save();
    const dots = 12;
    for (let i = 0; i < dots; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const dx = face.cx + side * (face.faceW * 0.15 + Math.random() * 20);
        const dy = face.noseY + (Math.random() - 0.5) * 15;
        ctx.fillStyle = `rgba(255, 150, 180, ${0.4 + Math.sin(t / 500 + i) * 0.2})`;
        ctx.beginPath(); ctx.arc(dx, dy, 3, 0, Math.PI * 2); ctx.fill();
    }
    // Pink heart nose
    ctx.fillStyle = '#ff7bac';
    drawHeart(ctx, face.cx, face.noseY - 5, 12);
    ctx.fill();
    ctx.restore();
}
