// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArUxJeQUvUeWr_nRSlWuHYkIk8_Tn7BO8",
    authDomain: "story-teller-7385d.firebaseapp.com",
    projectId: "story-teller-7385d",
    storageBucket: "story-teller-7385d.appspot.com",
    messagingSenderId: "897948903083",
    appId: "1:897948903083:web:d5d98eb105e0b11a0d39ee",
    measurementId: "G-JWDPRSGN5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics }
