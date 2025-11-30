import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuration Firebase
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

// Verset du jour aléatoire
const versets = [
    "Jean 3:16 - Car Dieu a tant aimé le monde...",
    "Psaume 23:1 - L'Éternel est mon berger, je ne manquerai de rien...",
    "Philippiens 4:13 - Je puis tout par celui qui me fortifie..."
];

document.getElementById("verset").textContent =
    versets[Math.floor(Math.random() * versets.length)];

// Fonction pour récupérer les églises pentecôtistes
async function fetchEglises() {
    try {
        const querySnapshot = await getDocs(collection(db, "eglises"));
        const listeContainer = document.getElementById("liste-eglises");
        listeContainer.innerHTML = "<h2>Liste des églises</h2>";

        let found = false;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.type && data.type.toLowerCase() === "pentecotiste") {
                found = true;
                const div = document.createElement("div");
                div.innerHTML = `<strong>${data.nom}</strong><br>${data.adresse}`;
                listeContainer.appendChild(div);
            }
        });

        if (!found) {
            listeContainer.innerHTML += "<p>Aucune église pentecôtiste enregistrée pour l’instant.</p>";
        }

    } catch (error) {
        console.error("Erreur récupération églises :", error);
        const listeContainer = document.getElementById("liste-eglises");
        listeContainer.innerHTML += "<p>Impossible de récupérer les églises.</p>";
    }
}

// Charger les églises au démarrage
fetchEglises();

// Bouton de don volontaire
document.getElementById("btn-don").addEventListener("click", () => {
    // Remplace l'URL par ton compte PayPal / Stripe
    window.open("https://www.paypal.com/donate/example", "_blank");
});
