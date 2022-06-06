import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsf4sbf4SC0eJ-AaeVuufMmfSABWZKoR4",
  authDomain: "gato-gramo.firebaseapp.com",
  projectId: "gato-gramo",
  storageBucket: "gato-gramo.appspot.com",
  messagingSenderId: "820218280311",
  appId: "1:820218280311:web:ceaabbe9df187b06028972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);