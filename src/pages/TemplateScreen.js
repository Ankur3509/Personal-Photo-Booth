import { state, navigateTo } from '../main';
import { templates } from '../utils/templateEngine';

export function createTemplateScreen() {
    const section = document.createElement('section');
    section.className = "w-full max-w-6xl py-8 flex flex-col items-center px-4";

    const title = document.createElement('h2');
    title.className = "text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent";
    title.innerText = "PICK A VIBE";

    const subtitle = document.createElement('p');
    subtitle.className = "text-gray-400 mb-10 text-center";
    subtitle.innerText = "Select a themed layout for your photos";

    const grid = document.createElement('div');
    grid.className = "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full";

    templates.forEach(template => {
        const card = document.createElement('div');
        card.className = "group relative cursor-pointer active:scale-95 transition-all";

        const container = document.createElement('div');
        container.className = "relative aspect-[2/3] md:aspect-[1/2] rounded-2xl md:rounded-3xl overflow-hidden glass border-2 border-transparent group-hover:border-blue-500 transition-all shadow-xl";
        container.style.backgroundColor = template.theme.bgColor;

        // Visual Preview of Slots
        const slotsPreview = document.createElement('div');
        slotsPreview.className = "absolute inset-0 flex flex-col items-center justify-around p-6 opacity-30";
        for (let i = 0; i < Math.min(template.requiredPhotos, 4); i++) {
            const s = document.createElement('div');
            s.className = "w-full aspect-video bg-white rounded-md";
            slotsPreview.appendChild(s);
        }

        // Content Info
        const info = document.createElement('div');
        info.className = "absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/40 group-hover:bg-black/10 transition-colors text-center";

        const name = document.createElement('h3');
        name.className = "text-lg md:text-2xl font-black uppercase";
        name.innerText = template.name;

        const count = document.createElement('div');
        count.className = "mt-2 px-3 py-1 bg-blue-500 text-[10px] md:text-xs font-bold rounded-full";
        count.innerText = `${template.requiredPhotos} PHOTOS`;

        info.appendChild(name);
        info.appendChild(count);

        container.appendChild(slotsPreview);
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
