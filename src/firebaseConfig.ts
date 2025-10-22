// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7x4bvQN3mDdGN5_uXpzqaDGgtQYhhLSg",
  authDomain: "todoapp-9fa52.firebaseapp.com",
  projectId: "todoapp-9fa52",
  storageBucket: "todoapp-9fa52.firebasestorage.app",
  messagingSenderId: "940795440573",
  appId: "1:940795440573:web:0122f8af771532bde776d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
