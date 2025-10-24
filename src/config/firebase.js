// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn9wQE7TCJu6enqKSKR5QoFby2wWDrrqo",
  authDomain: "app-login-5fd13.firebaseapp.com",
  projectId: "app-login-5fd13",
  storageBucket: "app-login-5fd13.firebasestorage.app",
  messagingSenderId: "167137638629",
  appId: "1:167137638629:web:1add6593c74be51425fc0c",
  measurementId: "G-N4M60JE07Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics };
