import app from "firebase/compat/app";
import "firebase/compat/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBVWzQ_nBFUvoV47sXBKredBUO9_KfLYpA",
    authDomain: "your-office-freelancer.firebaseapp.com",
    projectId: "your-office-freelancer",
    storageBucket: "your-office-freelancer.appspot.com",
    messagingSenderId: "388093701121",
    appId: "1:388093701121:web:e72320cf1ee4badc01e400"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };