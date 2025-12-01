// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJECT_ID.firebaseapp.com",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_PROJECT_ID.appspot.com",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID"
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
    const collectionName = "churches"; // tout est ajouté dans "churches"
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
    afficherEglises();
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
    if(data.valide){
      const li = document.createElement("li");
      li.textContent = `${data.nom} - ${data.adresse}`;
      eglisesList.appendChild(li);
    }
  });
}

// Verset du jour (exemple simple)
document.getElementById("verse").textContent = "Jean 3:16 - Car Dieu a tant aimé le monde...";

// Affiche au chargement
afficherEglises();
