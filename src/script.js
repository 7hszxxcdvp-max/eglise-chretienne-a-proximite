// src/script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ---- 1) Remplace par ta config Firebase (depuis la console Firebase) ----
const firebaseConfig = {
  apiKey: "ICI_TA_APIKEY",
  authDomain: "ICI_TON_AUTHDOMAIN",
  projectId: "ICI_TON_PROJECTID",
  storageBucket: "ICI_TON_STORAGEBUCKET",
  messagingSenderId: "ICI_TON_MESSAGINGSENDERID",
  appId: "ICI_TON_APPID"
};
// ------------------------------------------------------------------------

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elements DOM
const btnShow = document.getElementById('btn-show-form');
const formSection = document.getElementById('form-section');
const form = document.getElementById('eglise-form');
const btnCancel = document.getElementById('btn-cancel');
const listContainer = document.getElementById('list-container');
const versetText = document.getElementById('verset-text');
const paypalLink = document.getElementById('paypal-link');

// Verset du jour (simple rotation)
const versets = [
  {ref:"Jean 3:16", txt:"Car Dieu a tant aimé le monde..."},
  {ref:"Psaume 23:1", txt:"L'Éternel est mon berger, je ne manquerai de rien."},
  {ref:"Philippiens 4:13", txt:"Je puis tout par celui qui me fortifie."}
];
const idx = new Date().getDate() % versets.length;
versetText.textContent = `${versets[idx].ref} — ${versets[idx].txt}`;

// PayPal link (remplace par ton lien de collecte PayPal.Me ou bouton)
paypalLink.href = "https://www.paypal.com/donate/example"; // remplace ici

// Afficher / cacher formulaire
btnShow.addEventListener('click', () => formSection.classList.toggle('hidden'));
btnCancel.addEventListener('click', () => formSection.classList.add('hidden'));

// Récupérer et afficher uniquement les églises pentecôtistes
async function loadEglises() {
  listContainer.innerHTML = "Chargement...";
  try {
    const col = collection(db, "eglises");
    // on filtre côté requête si possible (si index)
    const q = query(col, where("denomination", "==", "pentecotiste"));
    const snap = await getDocs(q);
    listContainer.innerHTML = "";
    if (snap.empty) {
      listContainer.innerHTML = "<p>Aucune église pentecôtiste enregistrée pour l'instant.</p>";
      return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      const div = document.createElement('div');
      div.className = 'eglise-card';
      div.innerHTML = `<strong>${d.nom || ''}</strong><br>${d.adresse || ''} ${d.ville?('<br>'+d.ville):''}
        ${d.telephone?('<br>Tél: '+d.telephone):''}
        ${d.site_web?('<br><a href="'+d.site_web+'" target="_blank">Site</a>'):''}`;
      listContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    listContainer.innerHTML = "<p>Impossible de charger les églises pour l'instant.</p>";
  }
}

// Soumettre le formulaire (ajout d'une église)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const doc = {
    nom: (data.get('nom') || '').trim(),
    adresse: (data.get('adresse') || '').trim(),
    ville: (data.get('ville') || '').trim(),
    telephone: (data.get('telephone') || '').trim(),
    site_web: (data.get('site_web') || '').trim(),
    denomination: (data.get('denomination') || '').trim().toLowerCase(),
    position: (data.get('lat') && data.get('lng')) ? { lat: Number(data.get('lat')), lng: Number(data.get('lng')) } : null,
    cree_le: serverTimestamp()
  };

  // Empêcher les soumissions vides
  if (!doc.nom || !doc.adresse || !doc.denomination) {
    alert('Remplis le nom, l\'adresse et la dénomination.');
    return;
  }

  try {
    // On enregistre tel quel; affichage filtra ensuite pentecôtiste seulement
    await addDoc(collection(db, "eglises"), doc);
    alert("Église enregistrée. Elle apparaîtra si la dénomination est 'pentecotiste'.");
    form.reset();
    formSection.classList.add('hidden');
    loadEglises(); // refresh
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'enregistrement.");
  }
});

// Lancer au démarrage
loadEglises();
