import './style.css';
import { auth, db } from './firebase/firebaseConfig';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Component Imports
import { createLandingScreen } from './pages/LandingScreen';
import { createNavbar } from './components/Navbar';
import { createTemplateScreen } from './pages/TemplateScreen';
import { createBoothScreen } from './pages/BoothScreen';
import { createGalleryScreen } from './pages/GalleryScreen';
import { createAdminScreen } from './pages/AdminScreen';

// Main App State
const state = {
  activeScreen: 'landing', // landing, template, booth, gallery
  user: null,
  displayName: localStorage.getItem('displayName') || '',
  selectedTemplate: null,
  photos: [],
  gallery: [],
  cameraStream: null,
  isCapturing: false,
  countdown: 0,
  filterSettings: {
    id: 'normal',
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    hueRotate: 0,
    blur: 0
  }
};

// UI Elements
const app = document.querySelector('#app');

// Initialize Auth
onAuthStateChanged(auth, async (user) => {
  if (user) {
    state.user = user;
    if (state.displayName) {
      await getOrCreateUserDoc(user.uid, state.displayName);
      navigateTo('template');
    } else {
      navigateTo('landing');
    }
  } else {
    navigateTo('landing');
  }
});

async function getOrCreateUserDoc(uid, displayName) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      displayName,
      createdAt: serverTimestamp()
    });
  }
}

let currentSection = null;

// Router
export function navigateTo(screenId) {
  if (currentSection && currentSection.onremove) {
    currentSection.onremove();
  }
  state.activeScreen = screenId;
  render();
}

// Rendering
function render() {
  app.innerHTML = "";

  // Header / Navbar
  if (state.activeScreen !== 'landing') {
    app.appendChild(createNavbar());
  }

  // Main Content
  const container = document.createElement('main');
  container.className = "flex-1 transition-all duration-500 overflow-y-auto w-full pt-16 flex flex-col items-center p-4 max-w-7xl mx-auto";

  switch (state.activeScreen) {
    case 'landing':
      currentSection = createLandingScreen();
      break;
    case 'template':
      currentSection = createTemplateScreen();
      break;
    case 'booth':
      currentSection = createBoothScreen();
      break;
    case 'gallery':
      currentSection = createGalleryScreen();
      break;
    case 'admin':
      currentSection = createAdminScreen();
      break;
    default:
      currentSection = null;
  }

  if (currentSection) {
    container.appendChild(currentSection);
  }

  app.appendChild(container);
}

// Initial render
render();

// Global State Export for components
export { state };
