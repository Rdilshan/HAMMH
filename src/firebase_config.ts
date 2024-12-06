
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAoyTJXoUGtQtPacPzWlt6WFI9DkH4eldY",
  authDomain: "medexplore-898a2.firebaseapp.com",
  projectId: "medexplore-898a2",
  storageBucket: "medexplore-898a2.appspot.com",
  messagingSenderId: "371710188034",
  appId: "1:371710188034:web:68d70aabf1bf499839251b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);