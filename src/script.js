// src/script.js

// Import des modules Firebase depuis le CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuration Firebase : remplace les valeurs par celles de ton projet
const firebaseConfig = {
  apiKey: "AIzaSyCGvvammRCYbpqtEE_gJuHDCKpAHvk7DuY",
  authDomain: "eglise-chretienne-a-proximite.firebaseapp.com",
  projectId: "eglise-chretienne-a-proximite",
  storageBucket: "eglise-chretienne-a-proximite.firebasestorage.app",
  messagingSenderId: "462602369790",
  appId: "1:462602369790:web:14bf1441154bdb6c6683af"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialisé !");

// Fonction pour récupérer les églises depuis Firestore
async function fetchEglises() {
  try {
    const querySnapshot = await getDocs(collection(db, "eglises")); // collection "eglises"
    const listeContainer = document.getElementById("liste-eglises");

    // On vide la section au cas où
    listeContainer.innerHTML = "<h2>Liste des églises</h2>";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<strong>${data.nom}</strong><br>${data.adresse}`;
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.margin = "5px";
      listeContainer.appendChild(div);
    });

    if (querySnapshot.empty) {
      listeContainer.innerHTML += "<p>Aucune église enregistrée pour l’instant.</p>";
    }

  } catch (error) {
    console.error("Erreur récupération églises :", error);
    const listeContainer = document.getElementById("liste-eglises");
    listeContainer.innerHTML += "<p>Impossible de récupérer les églises.</p>";
  }
}

// Appel de la fonction pour afficher les églises dès le chargement
fetchEglises();
