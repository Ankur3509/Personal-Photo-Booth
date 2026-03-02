import { state, navigateTo } from '../main';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = "fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6 border-b border-white/10";

  const logo = document.createElement('div');
  logo.className = "text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer";
  logo.innerText = "SnapBooth";
  logo.onclick = () => navigateTo('template');

  const rightSide = document.createElement('div');
  rightSide.className = "flex items-center gap-4";

  const displayName = document.createElement('span');
  displayName.className = "text-sm text-gray-400 hidden sm:inline";
  displayName.innerText = `Hi, ${state.displayName}`;

  const galleryBtn = document.createElement('button');
  galleryBtn.className = "p-2 rounded-lg hover:bg-white/10 transition-colors";
  galleryBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  `;
  galleryBtn.onclick = () => navigateTo('gallery');

  const logoutBtn = document.createElement('button');
  logoutBtn.className = "p-2 rounded-lg hover:bg-white/10 transition-colors text-red-400";
  logoutBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  `;
  logoutBtn.onclick = () => {
    signOut(auth);
    localStorage.removeItem('displayName');
    state.displayName = '';
    navigateTo('landing');
  };

  rightSide.appendChild(displayName);
  rightSide.appendChild(galleryBtn);
  rightSide.appendChild(logoutBtn);

  nav.appendChild(logo);
  nav.appendChild(rightSide);

  return nav;
}
