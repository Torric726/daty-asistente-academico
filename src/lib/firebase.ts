
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-3gH_HKYJvgCRMIrY6YTCr4aObyxtaF8",
  authDomain: "adrian-23900.firebaseapp.com",
  projectId: "adrian-23900",
  storageBucket: "adrian-23900.appspot.com",
  messagingSenderId: "476550103380",
  appId: "1:476550103380:web:0fe66dd695a31988e1c8c1",
  measurementId: "G-G5QR391CB7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
