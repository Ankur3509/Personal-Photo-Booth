import { db } from "../firebase/firebaseConfig";
import { navigateTo } from "../main";
import { collectionGroup, query, orderBy, onSnapshot } from "firebase/firestore";

export function createAdminScreen() {
    const section = document.createElement('section');
    section.className = "w-full max-w-7xl py-12 flex flex-col items-center gap-8 px-4";

    const header = document.createElement('div');
    header.className = "text-center flex flex-col items-center gap-2";

    const h2 = document.createElement('h2');
    h2.className = "text-5xl font-black bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent";
    h2.innerText = "ADMIN COMMAND CENTER";

    const p = document.createElement('p');
    p.className = "text-gray-400";
    p.innerText = "Monitoring all global booth activity. Photos are live synced.";

    const backBtn = document.createElement('button');
    backBtn.className = "mb-4 text-xs text-gray-500 hover:text-white flex items-center gap-1 uppercase tracking-widest";
    backBtn.innerHTML = `&larr; Back to App`;
    backBtn.onclick = () => navigateTo('template');

    header.appendChild(backBtn);
    header.appendChild(h2);
    header.appendChild(p);

    const grid = document.createElement('div');
    grid.className = "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full";

    const loader = document.createElement('div');
    loader.className = "col-span-full py-20 flex flex-col items-center justify-center gap-4 text-gray-500";
    loader.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <p>Gaining access to global feed...</p>
    `;
    grid.appendChild(loader);

    // Using collectionGroup to get ALL 'photos' subcollections across all users
    // Note: This requires a composite index in Firebase if using orderBy, 
    // but simple fetch might work without it.
    const q = query(collectionGroup(db, 'photos'), orderBy('timestamp', 'desc'));

    let unsubscribe = onSnapshot(q, (snapshot) => {
        loader.remove();
        grid.innerHTML = "";

        if (snapshot.empty) {
            grid.innerHTML = "<p class='col-span-full text-center text-gray-600 py-20'>No photos captured yet.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = "relative aspect-[3/4] rounded-xl overflow-hidden glass border border-white/5 group bg-black/50";

            const img = document.createElement('img');
            img.src = data.imageUrl;
            img.className = "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity";
            img.loading = "lazy";

            const overlay = document.createElement('div');
            overlay.className = "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center";

            const dl = document.createElement('a');
            dl.href = data.imageUrl;
            dl.download = `admin-export-${doc.id}.jpg`;
            dl.className = "bg-white/10 p-2 rounded-full hover:bg-white/30 text-white mb-2";
            dl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>`;

            const info = document.createElement('span');
            info.className = "text-[9px] font-mono text-gray-400";
            info.innerText = new Date(data.timestamp?.toDate()).toLocaleDateString();

            overlay.appendChild(dl);
            overlay.appendChild(info);
            card.appendChild(img);
            card.appendChild(overlay);
            grid.appendChild(card);
        });
    }, (err) => {
        console.error("Access Detail:", err);
        loader.innerHTML = `
            <div class="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-400 text-sm max-w-xl text-center shadow-2xl">
                <p class="text-2xl font-black mb-4">SETUP REQUIRED</p>
                <p class="mb-6 opacity-80 uppercase tracking-widest text-xs">Follow these 2 steps to enable global monitoring:</p>
                
                <div class="space-y-6 text-left">
                  <div class="flex flex-col gap-2">
                    <span class="font-bold text-white flex items-center gap-2">1. UPDATE SECURITY RULES</span>
                    <p class="text-[11px] opacity-70">Paste this into your Firebase Firestore Rules tab:</p>
                    <div class="relative group">
                      <pre class="bg-black/40 p-4 rounded-xl text-[10px] font-mono text-gray-300 overflow-x-auto border border-white/5">rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /{path=**}/photos/{doc} {
      allow read: if true;
    }
  }
}</pre>
                      <button id="copy-rules-btn" class="absolute top-2 right-2 bg-white/10 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-[9px] font-bold transition-all">COPY</button>
                    </div>
                  </div>

                  <div class="flex flex-col gap-2">
                    <span class="font-bold text-white">2. CREATE THE INDEX</span>
                    <p class="text-[11px] opacity-70">Check your <span class="text-white font-bold">Browser Console (F12)</span>. Firebase has provided a <span class="text-blue-400 font-bold underline">Direct Link</span> to create the required 'Collection Group' index. Click it and wait 5 minutes.</p>
                  </div>
                </div>
            </div>
        `;

        setTimeout(() => {
            const copyBtn = document.getElementById('copy-rules-btn');
            if (copyBtn) {
                copyBtn.onclick = () => {
                    const text = `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{db}/documents {\n    match /{path=**}/photos/{doc} {\n      allow read: if true;\n    }\n  }\n}`;
                    navigator.clipboard.writeText(text);
                    copyBtn.innerText = "COPIED!";
                    setTimeout(() => { copyBtn.innerText = "COPY"; }, 2000);
                };
            }
        }, 100);
    });

    section.onremove = () => unsubscribe();
    section.appendChild(header);
    section.appendChild(grid);

    return section;
}
