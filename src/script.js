// Import des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuration Firebase (remplace avec tes infos)
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

// Afficher un verset du jour aléatoire
const versets = [
    "Jean 3:16 - Car Dieu a tant aimé le monde...",
    "Psaume 23:1 - L'Éternel est mon berger, je ne manquerai de rien...",
    "Philippiens 4:13 - Je puis tout par celui qui me fortifie..."
];

const versetElement = document.getElementById("verset");
versetElement.textContent = versets[Math.floor(Math.random() * versets.length)];

// Fonction pour récupérer les églises depuis Firebase
async function fetchEglises() {
    try {
        const querySnapshot = await getDocs(collection(db, "eglises"));
        const listeContainer = document.getElementById("liste-eglises");
        listeContainer.innerHTML = "<h2>Liste des églises</h2>";

        if (querySnapshot.empty) {
            listeContainer.innerHTML += "<p>Aucune église enregistrée pour l’instant.</p>";
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement("div");
            div.innerHTML = `<strong>${data.nom}</strong><br>${data.adresse}`;
            listeContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur récupération églises :", error);
        const listeContainer = document.getElementById("liste-eglises");
        listeContainer.innerHTML += "<p>Impossible de récupérer les églises.</p>";
    }
}

// Charger les églises au démarrage
fetchEglises();
