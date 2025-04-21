import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDGlwaOR1vZTYTdNhdSlkbl6N4W5QrMS6U",
    authDomain: "vue3-42a25.firebaseapp.com",
    projectId: "vue3-42a25",
    storageBucket: "vue3-42a25.firebasestorage.app",
    messagingSenderId: "877191360312",
    appId: "1:877191360312:web:50b42b8985f6df3fa91bcd",
    measurementId: "G-7YH13Q6D0B"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
