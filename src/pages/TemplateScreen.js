import { state, navigateTo } from '../main';
import { templates } from '../utils/templateEngine';

export function createTemplateScreen() {
    const section = document.createElement('section');
    section.className = "w-full max-w-4xl py-12 flex flex-col items-center";

    const title = document.createElement('h2');
    title.className = "text-3xl font-bold mb-4";
    title.innerText = "CHOOSE YOUR LAYOUT";

    const subtitle = document.createElement('p');
    subtitle.className = "text-gray-400 mb-12 text-lg";
    subtitle.innerText = "Select a template for your photo session";

    const grid = document.createElement('div');
    grid.className = "grid grid-cols-1 md:grid-cols-2 gap-8 w-full";

    templates.forEach(template => {
        const card = document.createElement('div');
        card.className = "glass-dark hover:glass cursor-pointer p-8 rounded-3xl transition-all border-2 border-transparent hover:border-blue-500 hover:shadow-blue-500/20 shadow-xl group flex flex-col items-center gap-6 group scale-in";

        // Preview Placeholder
        const preview = document.createElement('div');
        preview.className = "w-32 h-48 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-2 p-3 relative overflow-hidden group-hover:bg-white/10 transition-colors";

        // Draw slots as rectangles in preview
        template.slots.forEach(slot => {
            const rect = document.createElement('div');
            const ratioX = 128 / template.canvasWidth;
            const ratioY = 192 / template.canvasHeight;
            rect.className = "bg-blue-500/20 border border-blue-400/40 rounded-sm";
            rect.style.position = "absolute";
            rect.style.left = `${slot.x * ratioX}px`;
            rect.style.top = `${slot.y * ratioY}px`;
            rect.style.width = `${slot.width * ratioX}px`;
            rect.style.height = `${slot.height * ratioY}px`;
            preview.appendChild(rect);
        });

        const info = document.createElement('div');
        info.className = "text-center";

        const name = document.createElement('h3');
        name.className = "text-2xl font-bold mb-1";
        name.innerText = template.name;

        const count = document.createElement('span');
        count.className = "text-blue-400 font-semibold";
        count.innerText = `${template.requiredPhotos} PHOTOS`;

        info.appendChild(name);
        info.appendChild(count);

        card.onclick = () => {
            state.selectedTemplate = template;
            state.photos = [];
            navigateTo('booth');
        };

        card.appendChild(preview);
        card.appendChild(info);
        grid.appendChild(card);
    });

    section.appendChild(title);
    section.appendChild(subtitle);
    section.appendChild(grid);

    return section;
}
