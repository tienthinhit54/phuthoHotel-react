// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyB0s7rAlnUYB1Yb_I8LuUJYYdJ2AY9sWbo",
  authDomain: "hotel-phutho.firebaseapp.com",
  projectId: "hotel-phutho",
  storageBucket: "hotel-phutho.appspot.com",
  messagingSenderId: "943753063229",
  appId: "1:943753063229:web:c95865fd516a7520ccf354",
  measurementId: "G-NQHK57TQKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage (app);
