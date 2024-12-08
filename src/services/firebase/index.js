// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSmwWzSz7YScDwtbjEWtyjA80Lee02RFI",
  authDomain: "comision-63375-348c8.firebaseapp.com",
  projectId: "comision-63375-348c8",
  storageBucket: "comision-63375-348c8.firebasestorage.app",
  messagingSenderId: "1007334250616",
  appId: "1:1007334250616:web:7f0be792bd75259814758d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);