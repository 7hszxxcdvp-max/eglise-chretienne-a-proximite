// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCKWA4VFRD4uVk6oxePh-3T0d3Vc54jH2A",
  authDomain: "eglise-chretienne-a-proximite.firebaseapp.com",
  projectId: "eglise-chretienne-a-proximite",
  storageBucket: "eglise-chretienne-a-proximite.appspot.com",
  messagingSenderId: "462602369790",
  appId: "1:462602369790:web:14bf1441154bdb6c6683af",
  measurementId: "G-87XCNS974K"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Formulaire d'ajout d'église
const form = document.getElementById("eglise-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const adresse = document.getElementById("adresse").value;
  const telephone = document.getElementById("telephone").value;
  const email = document.getElementById("email").value;
  const denomination = document.getElementById("denomination").value;
  const sousDenomination = document.getElementById("sousDenomination").value;

  try {
    // Choisir la collection selon la dénomination
    const collectionName = denomination === "Pentecôtiste" ? "churches" : "manualRequests";

    await addDoc(collection(db, collectionName), {
      nom,
      adresse,
      telephone,
      email,
      denomination,
      sousDenomination,
      dateCreation: serverTimestamp(),
      valide: denomination === "Pentecôtiste" ? true : false
    });

    message.textContent = "Église ajoutée avec succès !";
    form.reset();

    // Rafraîchir la liste si Pentecôtiste
    if (denomination === "Pentecôtiste") {
      afficherEglises();
    }

  } catch (error) {
    console.error("Erreur ajout église :", error);
    message.textContent = "Erreur lors de l'ajout de l'église.";
  }
});

// Affichage des églises pentecôtistes validées
const eglisesList = document.getElementById("eglises-list");

async function afficherEglises() {
  try {
    const q = query(collection(db, "churches"));
    const snapshot = await getDocs(q);

    eglisesList.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `${data.nom} - ${data.adresse} - ${data.telephone}`;
      eglisesList.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur affichage églises :", error);
    eglisesList.innerHTML = "<li>Impossible de charger les églises.</li>";
  }
}

// Charger la liste au démarrage
afficherEglises();

// Verset du jour (exemple)
document.getElementById("verse").textContent = "Jean 3:16 - Car Dieu a tant aimé le monde...";
