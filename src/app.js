// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Config Firebase (remplace par tes infos)
const firebaseConfig = {
  apiKey: "TA_API_KEY",
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
  } catch (error) {
    console.error("Erreur ajout église :", error);
    message.textContent = "Erreur lors de l'ajout de l'église.";
  }
});

// Affichage des églises pentecôtistes validées
const eglisesList = document.getElementById("eglises-list");

async function afficherEglises() {
  const q = query(collection(db, "churches"));
  const snapshot = await getDocs(q);

  eglisesList.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.nom} - ${data.adresse}`;
    eglisesList.appendChild(li);
  });
}

afficherEglises();

// Verset du jour (simple exemple)
document.getElementById("verse").textContent = "Jean 3:16 - Car Dieu a tant aimé le monde...";
