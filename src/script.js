// Import des modules Firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"; 
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"; 

// Configuration de ton projet Firebase 
const firebaseConfig = { 
    apiKey: "TON_API_KEY", 
    authDomain: "TON_PROJET.firebaseapp.com", 
    projectId: "TON_PROJET", 
    storageBucket: "TON_PROJET.appspot.com", 
    messagingSenderId: "TON_ID", 
    appId: "TON_APP_ID" 
}; 

// Initialiser Firebase 
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);
