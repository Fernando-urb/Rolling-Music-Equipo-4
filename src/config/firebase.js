import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "app-login-5fd13.firebaseapp.com",
  projectId: "app-login-5fd13",
  storageBucket: "app-login-5fd13.firebasestorage.app",
  messagingSenderId: "167137638629",
  appId: "1:167137638629:web:1add6593c74be51425fc0c",
  measurementId: "G-N4M60JE07Q",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// 2. Creamos las constantes para la base de datos y el storage
const db = getFirestore(app);
const storage = getStorage(app);

// 3. Modificamos la línea de export para incluir db y storage
// (Esta es la única línea de export que debe haber)
export { auth, googleProvider, analytics, db, storage };
