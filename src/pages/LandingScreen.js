import { state, navigateTo } from '../main';
import { auth, db } from '../firebase/firebaseConfig';
import { signInAnonymously } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function createLandingScreen() {
    const section = document.createElement('section');
    section.className = "min-h-[80vh] flex flex-col justify-center items-center text-center p-6";

    const card = document.createElement('div');
    card.className = "flex flex-col items-center glass p-8 sm:p-12 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden";

    // Background gradient glow
    const glow = document.createElement('div');
    glow.className = "absolute -top-24 -left-24 w-48 h-48 bg-blue-600/30 blur-3xl rounded-full";
    card.appendChild(glow);

    const title = document.createElement('h1');
    title.className = "text-4xl font-extrabold mb-4 mt-2 tracking-tight";
    title.innerText = "SnapBooth";

    const subtitle = document.createElement('p');
    subtitle.className = "text-gray-400 mb-8";
    subtitle.innerText = "The ultimate private multi-user photo experience for friends.";

    const form = document.createElement('form');
    form.className = "w-full flex flex-col gap-4";

    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Enter your name";
    input.className = "input-field text-center text-xl font-medium w-full";
    input.required = true;
    input.value = state.displayName;

    const btn = document.createElement('button');
    btn.type = "submit";
    btn.className = "btn-primary w-full justify-center text-xl py-4 mt-2 shadow-blue-500/20";
    btn.innerText = "Get Started";

    form.onsubmit = async (e) => {
        e.preventDefault();
        const name = input.value.trim();
        if (!name) return;

        btn.disabled = true;
        btn.innerText = "Just a moment...";

        try {
            if (name === 'ADMIN_ACCESS_777') {
                state.displayName = "Admin";
                navigateTo('admin');
                return;
            }

            if (!auth.currentUser) {
                await signInAnonymously(auth);
            }

            const user = auth.currentUser;
            await setDoc(doc(db, 'users', user.uid), {
                displayName: name,
                createdAt: serverTimestamp()
            });

            localStorage.setItem('displayName', name);
            state.displayName = name;
            navigateTo('template');
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please check your Firebase settings.");
            btn.disabled = false;
            btn.innerText = "Get Started";
        }
    }

    form.appendChild(input);
    form.appendChild(btn);

    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(form);

    section.appendChild(card);

    return section;
}
