// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Configuración de tu aplicación web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-3gH_HKYJvgCRMIrY6YTCr4aObyxtaF8",
  authDomain: "adrian-23900.firebaseapp.com",
  projectId: "adrian-23900",
  storageBucket: "adrian-23900.firebasestorage.app",
  messagingSenderId: "476550103380",
  appId: "1:476550103380:web:0fe66dd695a31988e1c8c1",
  measurementId: "G-G5QR391CB7"
};

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Configura Google Analytics si lo necesitas
const analytics = getAnalytics(app);

// Exporta el objeto 'app' para que puedas usarlo en otras partes de tu aplicación
export { app, analytics };
