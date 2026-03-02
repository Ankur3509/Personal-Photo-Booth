import { state, navigateTo } from '../main';
import { getPhotos, deletePhoto } from '../utils/gallery';

export function createGalleryScreen() {
    const section = document.createElement('section');
    section.className = "w-full max-w-7xl py-12 flex flex-col items-center gap-12";

    const titleContainer = document.createElement('div');
    titleContainer.className = "text-center flex flex-col items-center gap-4";

    const h2 = document.createElement('h2');
    h2.className = "text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent";
    h2.innerText = "YOUR SESSION";

    const p = document.createElement('p');
    p.className = "text-gray-400 max-w-md";
    p.innerText = "Exclusive gallery just for you. Download or share your favorites!";

    const takeNewBtn = document.createElement('button');
    takeNewBtn.className = "btn-primary shadow-blue-500/20 px-8";
    takeNewBtn.innerText = "New Session";
    takeNewBtn.onclick = () => {
        state.photos = [];
        navigateTo('template');
    };

    titleContainer.appendChild(h2);
    titleContainer.appendChild(p);
    titleContainer.appendChild(takeNewBtn);

    const grid = document.createElement('div');
    grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full px-4 items-start";

    const loader = document.createElement('div');
    loader.className = "col-span-full h-64 flex flex-col items-center justify-center text-gray-400 gap-4";
    loader.innerHTML = `
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <span>Syncing with Cloud...</span>
  `;
    grid.appendChild(loader);

    let unsubscribe;
    getPhotos((photos) => {
        loader.remove();
        grid.innerHTML = "";

        if (photos.length === 0) {
            const empty = document.createElement('div');
            empty.className = "col-span-full h-96 flex flex-col items-center justify-center glass border-dashed border-2 border-white/10 rounded-3xl gap-6";
            empty.innerHTML = `
        <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="text-xl font-medium text-gray-500">No photos yet. Let's create some!</span>
      `;
            grid.appendChild(empty);
            return;
        }

        photos.forEach(photo => {
            const card = document.createElement('div');
            card.className = "flex flex-col group scale-in";

            const imgContainer = document.createElement('div');
            imgContainer.className = "relative aspect-[3/4] glass rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] border border-white/10 cursor-zoom-in";

            const img = document.createElement('img');
            img.src = photo.imageUrl;
            img.className = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110";
            img.loading = "lazy";

            const actions = document.createElement('div');
            actions.className = "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300";

            const dlBtn = document.createElement('a');
            dlBtn.href = photo.imageUrl;
            dlBtn.download = `snapbooth-${photo.id}.jpg`; // Changed to jpg
            dlBtn.className = "p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/30 transition-all border border-white/20";
            dlBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>`;

            const delBtn = document.createElement('button');
            delBtn.className = "p-3 bg-red-500/20 backdrop-blur-md rounded-full hover:bg-red-500/40 text-red-400 transition-all border border-red-500/20";
            delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`;

            delBtn.onclick = (e) => {
                e.stopPropagation();
                if (confirm("Permanently delete this photo?")) {
                    card.classList.add('scale-0', 'opacity-0', 'transition-all', 'duration-500');
                    setTimeout(() => deletePhoto(photo.id), 500);
                }
            };

            imgContainer.onclick = () => {
                showModal(photo.imageUrl);
            };

            actions.appendChild(dlBtn);
            actions.appendChild(delBtn);
            imgContainer.appendChild(img);
            imgContainer.appendChild(actions);

            const meta = document.createElement('div');
            meta.className = "mt-4 flex flex-col gap-1 items-start px-2";

            const date = document.createElement('span');
            date.className = "text-xs font-mono text-gray-500 uppercase";
            date.innerText = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(photo.timestamp);

            const tmpName = document.createElement('span');
            tmpName.className = "text-sm font-bold text-gray-300";
            tmpName.innerText = photo.templateId.replace('_', ' ').toUpperCase();

            meta.appendChild(date);
            meta.appendChild(tmpName);

            card.appendChild(imgContainer);
            card.appendChild(meta);
            grid.appendChild(card);
        });
    }).then(unsub => unsubscribe = unsub);

    section.onremove = () => unsubscribe && unsubscribe();

    section.appendChild(titleContainer);
    section.appendChild(grid);

    return section;
}

function showModal(url) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300";
    modal.onclick = () => modal.remove();

    const img = document.createElement('img');
    img.src = url;
    img.className = "max-h-full max-w-full rounded-xl shadow-2xl scale-in ring-1 ring-white/20";

    const close = document.createElement('button');
    close.className = "absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20";
    close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;

    modal.appendChild(img);
    modal.appendChild(close);
    document.body.appendChild(modal);
}
