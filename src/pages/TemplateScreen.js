import { state, navigateTo } from '../main';
import { templates } from '../utils/templateEngine';

// Template preview colors/emojis for visual cards 
const templateVisuals = {
    pastel_dream: { emoji: '🌸', gradient: 'linear-gradient(135deg, #fce4ec, #f3e5f5, #e8eaf6)' },
    retro_film: { emoji: '🎬', gradient: 'linear-gradient(135deg, #1a1a1a, #333)' },
    kawaii_pop: { emoji: '🎀', gradient: 'linear-gradient(135deg, #fff0f5, #ffd6e0)' },
    golden_hour: { emoji: '☀️', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
    comic_boom: { emoji: '💥', gradient: 'linear-gradient(135deg, #ffeb3b, #ff9800)' },
    love_letter: { emoji: '💌', gradient: 'linear-gradient(135deg, #fce4ec, #f48fb1)' },
    neon_nights: { emoji: '🔮', gradient: 'linear-gradient(135deg, #0a0015, #1a0030, #0a0015)' },
    polaroid_stack: { emoji: '📸', gradient: 'linear-gradient(135deg, #e8d5b7, #c9b896)' },
    y2k_vibes: { emoji: '🦄', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc, #f093fb)' },
    heart_grid: { emoji: '💖', gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #ffecd2)' }
};

export function createTemplateScreen() {
    const section = document.createElement('section');
    section.className = "w-full max-w-6xl py-6 flex flex-col items-center px-3 md:px-4";

    const title = document.createElement('h2');
    title.className = "text-3xl md:text-4xl font-black mb-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent";
    title.innerText = "PICK A VIBE ✨";

    const subtitle = document.createElement('p');
    subtitle.className = "text-gray-400 mb-6 md:mb-10 text-center text-sm md:text-base";
    subtitle.innerText = "Select a cute template for your photo strip";

    const grid = document.createElement('div');
    grid.className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full";

    templates.forEach(template => {
        const visuals = templateVisuals[template.id] || { emoji: '📷', gradient: `linear-gradient(135deg, ${template.theme.bgColor || '#666'}, #333)` };

        const card = document.createElement('div');
        card.className = "group relative cursor-pointer active:scale-[0.97] transition-all duration-200";

        const container = document.createElement('div');
        container.className = "relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden border-2 border-transparent group-hover:border-pink-400/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-pink-500/10";
        container.style.background = visuals.gradient;

        // Slot preview - shows layout shape
        const slotsPreview = document.createElement('div');
        slotsPreview.className = "absolute inset-0 p-4 flex flex-col items-center justify-center gap-2";

        // Calculate how template slots look
        const maxSlots = Math.min(template.requiredPhotos, 4);
        if (template.requiredPhotos <= 4) {
            // Vertical strip preview
            for (let i = 0; i < maxSlots; i++) {
                const s = document.createElement('div');
                s.className = "w-3/4 aspect-[3/2] bg-white/15 backdrop-blur-sm rounded-lg border border-white/10";
                slotsPreview.appendChild(s);
            }
        } else {
            // Grid preview
            const gridPreview = document.createElement('div');
            gridPreview.className = "grid grid-cols-2 gap-2 w-full p-2";
            for (let i = 0; i < Math.min(template.requiredPhotos, 6); i++) {
                const s = document.createElement('div');
                s.className = "aspect-[3/2] bg-white/15 backdrop-blur-sm rounded-md border border-white/10";
                gridPreview.appendChild(s);
            }
            slotsPreview.appendChild(gridPreview);
        }

        // Big emoji
        const emojiOverlay = document.createElement('div');
        emojiOverlay.className = "absolute top-3 right-3 text-2xl md:text-3xl opacity-80 group-hover:scale-125 transition-transform";
        emojiOverlay.innerText = visuals.emoji;

        // Sticker previews (show a couple of template stickers)
        if (template.theme.stickers && template.theme.stickers.length > 0) {
            const stickerPreview = document.createElement('div');
            stickerPreview.className = "absolute top-2 left-2 flex gap-1";
            template.theme.stickers.slice(0, 3).forEach(s => {
                const span = document.createElement('span');
                span.className = "text-sm opacity-60";
                span.innerText = s;
                stickerPreview.appendChild(span);
            });
            container.appendChild(stickerPreview);
        }

        // Content Info
        const info = document.createElement('div');
        info.className = "absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent";

        const name = document.createElement('h3');
        name.className = "text-sm md:text-lg font-black uppercase text-white drop-shadow-lg";
        name.innerText = template.name;

        const countRow = document.createElement('div');
        countRow.className = "flex items-center gap-2 mt-1";

        const count = document.createElement('div');
        count.className = "px-2.5 py-0.5 bg-pink-500/80 text-[9px] md:text-[10px] font-bold rounded-full text-white backdrop-blur-sm";
        count.innerText = `${template.requiredPhotos} PHOTOS`;

        const labelPreview = document.createElement('div');
        labelPreview.className = "text-[9px] md:text-[10px] text-white/50 font-medium truncate";
        labelPreview.innerText = template.theme.label || '';

        countRow.appendChild(count);
        countRow.appendChild(labelPreview);

        info.appendChild(name);
        info.appendChild(countRow);

        container.appendChild(slotsPreview);
        container.appendChild(emojiOverlay);
        container.appendChild(info);
        card.appendChild(container);

        card.onclick = () => {
            state.selectedTemplate = template;
            state.photos = [];
            navigateTo('booth');
        };

        grid.appendChild(card);
    });

    section.appendChild(title);
    section.appendChild(subtitle);
    section.appendChild(grid);

    return section;
}
