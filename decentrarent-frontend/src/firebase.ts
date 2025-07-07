import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1w0OUjDEzWYuDmwFCocDQKh_hxhp3haY",
  authDomain: "decentrarent.firebaseapp.com",
  projectId: "decentrarent",
  storageBucket: "decentrarent.firebasestorage.app",
  messagingSenderId: "747874582706",
  appId: "1:747874582706:web:ae176702bcd8e704a109ab",
  measurementId: "G-FXCGJ798NP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
