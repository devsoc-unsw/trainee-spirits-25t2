// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-memo-1f27d.firebaseapp.com",
  projectId: "travel-memo-1f27d",
  storageBucket: "travel-memo-1f27d.firebasestorage.app",
  messagingSenderId: "173551369311",
  appId: "1:173551369311:web:9d86bef78bbd65294a2fea",
  measurementId: "G-0LZLWXSTN9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
