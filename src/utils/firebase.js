// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9mYfxJbBffno-xnwZSxVrqGbgbRkSM5k",
  authDomain: "netflix-gpt-9806c.firebaseapp.com",
  projectId: "netflix-gpt-9806c",
  storageBucket: "netflix-gpt-9806c.appspot.com",
  messagingSenderId: "593811628306",
  appId: "1:593811628306:web:b501edb65e0c7f421253cb",
  measurementId: "G-24B7RTR5V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
