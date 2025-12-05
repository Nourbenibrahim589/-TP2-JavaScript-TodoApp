// =====================================================
// TP JAVASCRIPT - APPLICATION DE GESTION DE TÂCHES
// =====================================================
// Étape 2 : Déclaration des variables et message de bienvenue

console.log("🎉 Bienvenue dans l'application de gestion de tâches !");
console.log("📝 Application chargée avec succès.");

// =====================================================
// ÉTAPE 8 : OBJETS - Définition de la classe Tâche
// =====================================================

/**
 * Classe représentant une tâche
 * @property {string} id - Identifiant unique de la tâche
 * @property {string} texte - Le texte de la tâche
 * @property {boolean} terminee - État de complétion
 * @property {Date} dateCreation - Date de création
 */
class Tache {
    constructor(texte) {
        this.id = Date.now(); // ID unique basé sur le timestamp
        this.texte = texte;
        this.terminee = false;
        this.dateCreation = new Date();
    }

    // Méthode pour terminer une tâche
    terminer() {
        this.terminee = !this.terminee;
    }

    // Méthode pour convertir en objet JSON
    toJSON() {
        return {
            id: this.id,
            texte: this.texte,
            terminee: this.terminee,
            dateCreation: this.dateCreation
        };
    }
}

// =====================================================
// ÉTAPE 7 : TABLEAUX - Stockage des tâches
// =====================================================

// Tableau qui stockera toutes nos tâches
let listeTaches = [];

// Variable pour le filtrage de recherche
let termRecherche = '';

// =====================================================
// SÉLECTION DES ÉLÉMENTS DOM
// =====================================================

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');
const searchInput = document.getElementById('searchInput');
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// =====================================================
// ÉTAPE 9 : LOCALSTORAGE - Gestion de la persistance
// =====================================================

/**
 * Sauvegarde la liste des tâches dans le localStorage
 */
function sauvegarderTaches() {
    const donnees = listeTaches.map(tache => tache.toJSON());
    localStorage.setItem('taches', JSON.stringify(donnees));
    console.log("💾 Tâches sauvegardées dans le localStorage");
}

/**
 * Charge les tâches depuis le localStorage
 */
function chargerTaches() {
    const donnees = localStorage.getItem('taches');
    if (donnees) {
        const tachesJSON = JSON.parse(donnees);
        listeTaches = tachesJSON.map(tache => {
            const nouvelleTache = new Tache(tache.texte);
            nouvelleTache.id = tache.id;
            nouvelleTache.terminee = tache.terminee;
            nouvelleTache.dateCreation = new Date(tache.dateCreation);
            return nouvelleTache;
        });
        console.log("📂 Tâches chargées depuis le localStorage :", listeTaches.length, "tâche(s)");
    }
}

// =====================================================
// ÉTAPE 6 : FONCTIONS - Gestion des tâches
// =====================================================

/**
 * Ajoute une nouvelle tâche à la liste
 * @param {string} texte - Le texte de la tâche à ajouter
 */
function ajouterTache(texte) {
    // Validation du texte
    if (texte.trim().length === 0) {
        console.warn("⚠️ Impossible d'ajouter une tâche vide");
        alert("Veuillez entrer du texte pour la tâche !");
        return false;
    }

    // Création d'une nouvelle tâche (Étape 8)
    const nouvelleTache = new Tache(texte.trim());
    
    // Ajout à la liste (Étape 7)
    listeTaches.push(nouvelleTache);
    
    console.log("✅ Tâche ajoutée :", texte);
    
    // Sauvegarde (Étape 9)
    sauvegarderTaches();
    
    // Réaffichage (Étape 7)
    afficherTaches();
    
    return true;
}

/**
 * Supprime une tâche de la liste
 * @param {number} id - L'ID de la tâche à supprimer
 */
function supprimerTache(id) {
    const indexInitial = listeTaches.findIndex(t => t.id === id);
    
    if (indexInitial !== -1) {
        const texte = listeTaches[indexInitial].texte;
        listeTaches.splice(indexInitial, 1);
        console.log("🗑️ Tâche supprimée :", texte);
        
        sauvegarderTaches();
        afficherTaches();
        return true;
    }
    
    return false;
}

/**
 * Termine ou réactive une tâche
 * @param {number} id - L'ID de la tâche à terminer
 */
function terminerTache(id) {
    const tache = listeTaches.find(t => t.id === id);
    
    if (tache) {
        tache.terminer();
        const etat = tache.terminee ? "✓ terminée" : "réactivée";
        console.log("✔️ Tâche " + etat + " :", tache.texte);
        
        sauvegarderTaches();
        afficherTaches();
        return true;
    }
    
    return false;
}

/**
 * Supprime toutes les tâches
 */
function supprimerToutesLesTaches() {
    if (listeTaches.length === 0) {
        alert("Aucune tâche à supprimer !");
        return false;
    }
    
    if (confirm("⚠️ Êtes-vous sûr ? Toutes les tâches seront supprimées définitivement !")) {
        const nombre = listeTaches.length;
        listeTaches = [];
        console.log("🗑️ Toutes les tâches ont été supprimées (" + nombre + " tâche(s))");
        
        sauvegarderTaches();
        afficherTaches();
        return true;
    }
    
    return false;
}

/**
 * Supprime toutes les tâches terminées
 */
function supprimerTachesTerminees() {
    const nombreAvant = listeTaches.length;
    listeTaches = listeTaches.filter(t => !t.terminee);
    const nombreSupprime = nombreAvant - listeTaches.length;
    
    if (nombreSupprime > 0) {
        console.log("🗑️ " + nombreSupprime + " tâche(s) terminée(s) supprimée(s)");
        sauvegarderTaches();
        afficherTaches();
    } else {
        alert("Aucune tâche terminée à supprimer !");
    }
}

/**
 * Met à jour les compteurs de statistiques
 */
function mettreAJourStatistiques() {
    const total = listeTaches.length;
    const terminees = listeTaches.filter(t => t.terminee).length;
    const enCours = total - terminees;
    
    totalCount.textContent = total;
    pendingCount.textContent = enCours;
    completedCount.textContent = terminees;
    
    console.log("📊 Statistiques - Total: " + total + ", En cours: " + enCours + ", Terminées: " + terminees);
}

/**
 * Filtre les tâches selon le terme de recherche
 * @returns {Array} - Tableau des tâches filtrées
 */
function obtenirTachesFilteres() {
    if (termRecherche.trim() === '') {
        return listeTaches;
    }
    
    return listeTaches.filter(tache =>
        tache.texte.toLowerCase().includes(termRecherche.toLowerCase())
    );
}

// =====================================================
// ÉTAPE 3 & 5 : MANIPULATION DU DOM
// =====================================================

/**
 * Affiche toutes les tâches dans le DOM
 */
function afficherTaches() {
    const tachesFilteres = obtenirTachesFilteres();
    
    // Vider la liste
    taskList.innerHTML = '';
    
    // Si pas de tâches, afficher le message vide
    if (tachesFilteres.length === 0) {
        emptyMessage.style.display = 'block';
        mettreAJourStatistiques();
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    // Étape 7 : Boucle pour afficher chaque tâche
    tachesFilteres.forEach(tache => {
        // Créer l'élément li
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Ajouter la classe 'completed' si la tâche est terminée
        if (tache.terminee) {
            li.classList.add('completed');
        }
        
        // Créer le contenu de la tâche
        li.innerHTML = `
            <div class="checkbox" data-id="${tache.id}">
                ${tache.terminee ? '✓' : ''}
            </div>
            <span class="task-text">${echapperHTML(tache.texte)}</span>
            <div class="task-actions">
                <button class="task-btn task-btn-complete" data-id="${tache.id}">
                    ${tache.terminee ? '↩️ Réactiver' : '✓ Terminer'}
                </button>
                <button class="task-btn task-btn-delete" data-id="${tache.id}">
                    🗑️ Supprimer
                </button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
    
    // Mettre à jour les statistiques
    mettreAJourStatistiques();
}

/**
 * Échappe les caractères HTML pour éviter les injections XSS
 * @param {string} texte - Le texte à échapper
 * @returns {string} - Le texte échappé
 */
function echapperHTML(texte) {
    const div = document.createElement('div');
    div.textContent = texte;
    return div.innerHTML;
}

// =====================================================
// ÉTAPE 4 : GESTION DES ÉVÉNEMENTS
// =====================================================

/**
 * Traite l'ajout d'une tâche
 */
function traiterAjoutTache() {
    const texte = taskInput.value;
    
    if (ajouterTache(texte)) {
        taskInput.value = '';
        taskInput.focus();
    }
}

// Événement : Clic sur le bouton Ajouter
addBtn.addEventListener('click', traiterAjoutTache);

// Événement : Appui sur Entrée dans le champ de saisie
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        traiterAjoutTache();
    }
});

// Événement : Clic sur une tâche (checkbox ou boutons)
taskList.addEventListener('click', (event) => {
    const id = parseInt(event.target.dataset.id);
    
    // Si c'est le checkbox ou le bouton Terminer
    if (event.target.classList.contains('checkbox') || 
        event.target.classList.contains('task-btn-complete')) {
        terminerTache(id);
    }
    
    // Si c'est le bouton Supprimer
    if (event.target.classList.contains('task-btn-delete')) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
            supprimerTache(id);
        }
    }
});

// Événement : Recherche
searchInput.addEventListener('input', (event) => {
    termRecherche = event.target.value;
    afficherTaches();
});

// Événement : Tout supprimer
clearAllBtn.addEventListener('click', supprimerToutesLesTaches);

// Événement : Supprimer les tâches terminées
clearCompletedBtn.addEventListener('click', supprimerTachesTerminees);

// =====================================================
// INITIALISATION - Au chargement de la page
// =====================================================

/**
 * Initialise l'application au chargement
 */
function initialiserApp() {
    console.log("🚀 Initialisation de l'application...");
    
    // Charger les tâches depuis le localStorage (Étape 9)
    chargerTaches();
    
    // Afficher les tâches
    afficherTaches();
    
    // Focus sur le champ de saisie
    taskInput.focus();
    
    console.log("✅ Application prête !");
}

// Lancer l'initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', initialiserApp);
