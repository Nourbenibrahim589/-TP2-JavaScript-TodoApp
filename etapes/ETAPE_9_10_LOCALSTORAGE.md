# ÉTAPES 9 & 10 : LocalStorage et Améliorations Finales

## Étape 9 : Persistance des données avec LocalStorage

### Objectif
Sauvegarder les tâches dans le localStorage pour que les données persistent après la fermeture du navigateur.

### Qu'est-ce que localStorage ?

```javascript
// localStorage est un objet global du navigateur qui stocke des données
// Limite : ~5-10 MB par domaine
// Les données sont persistantes jusqu'à suppression manuelle

// Stocker
localStorage.setItem('cle', 'valeur');

// Récupérer
const valeur = localStorage.getItem('cle');

// Supprimer
localStorage.removeItem('cle');

// Vider tout
localStorage.clear();
```

### Fonctions de persistance

```javascript
/**
 * Sauvegarde les tâches dans localStorage
 */
function sauvegarderTaches() {
    // Convertir les tâches en JSON
    const donnees = listeTaches.map(tache => tache.toJSON());
    
    // Stocker dans localStorage
    localStorage.setItem('taches', JSON.stringify(donnees));
    
    console.log('💾 Tâches sauvegardées');
}

/**
 * Charge les tâches depuis localStorage
 */
function chargerTaches() {
    // Récupérer les données
    const donnees = localStorage.getItem('taches');
    
    if (donnees) {
        try {
            const tachesJSON = JSON.parse(donnees);
            
            // Reconvertir en objets Tache
            listeTaches = tachesJSON.map(tacheData => {
                const tache = new Tache(tacheData.texte);
                tache.id = tacheData.id;
                tache.terminee = tacheData.terminee;
                tache.dateCreation = new Date(tacheData.dateCreation);
                tache.priorite = tacheData.priorite;
                return tache;
            });
            
            console.log('📂 Tâches chargées depuis localStorage');
        } catch (error) {
            console.error('❌ Erreur lors du chargement:', error);
        }
    } else {
        console.log('📭 Aucune tâche sauvegardée');
    }
}
```

### Mise à jour des fonctions

À chaque modification, appeler `sauvegarderTaches()` :

```javascript
function ajouterTache(texte) {
    if (texte.trim() === '') {
        alert('Veuillez entrer un texte !');
        return false;
    }
    
    const nouvelleTache = new Tache(texte.trim());
    listeTaches.push(nouvelleTache);
    console.log('✅ Tâche ajoutée:', texte);
    
    sauvegarderTaches();  // 👈 Sauvegarde
    afficherTaches();
    return true;
}

function supprimerTache(id) {
    const index = listeTaches.findIndex(t => t.id === id);
    
    if (index !== -1) {
        const texte = listeTaches[index].texte;
        listeTaches.splice(index, 1);
        console.log('🗑️ Tâche supprimée:', texte);
        
        sauvegarderTaches();  // 👈 Sauvegarde
        afficherTaches();
        return true;
    }
    return false;
}

function terminerTache(id) {
    const tache = listeTaches.find(t => t.id === id);
    
    if (tache) {
        tache.terminer();
        console.log('✔️ Tâche mise à jour:', tache.texte);
        
        sauvegarderTaches();  // 👈 Sauvegarde
        afficherTaches();
        return true;
    }
    return false;
}
```

### Initialisation au chargement de la page

```javascript
function initialiserApp() {
    console.log('🚀 Initialisation de l\'application...');
    
    // Charger les tâches sauvegardées
    chargerTaches();
    
    // Afficher les tâches
    afficherTaches();
    
    // Focus sur le champ de saisie
    taskInput.focus();
    
    console.log('✅ Application prête !');
}

// Lancer au chargement du DOM
document.addEventListener('DOMContentLoaded', initialiserApp);

// Ou simplement à la fin du script
window.addEventListener('load', initialiserApp);
```

---

## Étape 10 : Améliorations libres

### 1. Compteur de tâches

```javascript
/**
 * Met à jour les compteurs de statistiques
 */
function mettreAJourStatistiques() {
    const total = listeTaches.length;
    const terminees = listeTaches.filter(t => t.terminee).length;
    const enCours = total - terminees;
    
    // Mettre à jour le DOM
    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = terminees;
    document.getElementById('pendingCount').textContent = enCours;
    
    console.log('📊 Total:', total, '| Terminées:', terminees, '| En cours:', enCours);
}

// Appeler à chaque modification
function afficherTaches() {
    // ... code existant ...
    mettreAJourStatistiques();
}
```

HTML correspondant :
```html
<div class="stats-section">
    <div class="stat-item">
        <span class="stat-label">Total:</span>
        <span id="totalCount">0</span>
    </div>
    <div class="stat-item">
        <span class="stat-label">En cours:</span>
        <span id="pendingCount">0</span>
    </div>
    <div class="stat-item">
        <span class="stat-label">Terminées:</span>
        <span id="completedCount">0</span>
    </div>
</div>
```

### 2. Bouton "Tout supprimer"

```javascript
/**
 * Supprime toutes les tâches
 */
function supprimerToutesLesTaches() {
    if (listeTaches.length === 0) {
        alert('Aucune tâche à supprimer !');
        return false;
    }
    
    if (confirm('⚠️ Êtes-vous sûr ? Toutes les tâches seront supprimées !')) {
        const nombre = listeTaches.length;
        listeTaches = [];
        console.log('🗑️ Toutes les tâches supprimées (' + nombre + ')');
        
        sauvegarderTaches();
        afficherTaches();
        return true;
    }
    
    return false;
}

// Ajouter un événement
document.getElementById('clearAllBtn').addEventListener('click', supprimerToutesLesTaches);
```

HTML :
```html
<button id="clearAllBtn" class="btn btn-clear">🗑️ Tout supprimer</button>
```

### 3. Bouton "Supprimer les terminées"

```javascript
/**
 * Supprime toutes les tâches terminées
 */
function supprimerTachesTerminees() {
    const nombreAvant = listeTaches.length;
    listeTaches = listeTaches.filter(t => !t.terminee);
    const nombreSupprime = nombreAvant - listeTaches.length;
    
    if (nombreSupprime > 0) {
        console.log('🗑️ ' + nombreSupprime + ' tâche(s) supprimée(s)');
        sauvegarderTaches();
        afficherTaches();
    } else {
        alert('Aucune tâche terminée à supprimer !');
    }
}

// Ajouter un événement
document.getElementById('clearCompletedBtn').addEventListener('click', supprimerTachesTerminees);
```

HTML :
```html
<button id="clearCompletedBtn" class="btn btn-clear-completed">✓ Supprimer les terminées</button>
```

### 4. Champ de recherche / Filtre

```javascript
// Variable globale
let termRecherche = '';

/**
 * Filtre les tâches selon le terme de recherche
 */
function obtenirTachesFilteres() {
    if (termRecherche.trim() === '') {
        return listeTaches;
    }
    
    return listeTaches.filter(tache =>
        tache.texte.toLowerCase().includes(termRecherche.toLowerCase())
    );
}

/**
 * Afficher les tâches filtrées
 */
function afficherTaches() {
    const tachesFilteres = obtenirTachesFilteres();
    
    taskList.innerHTML = '';
    
    if (tachesFilteres.length === 0) {
        taskList.innerHTML = '<li class="empty">Aucune tâche</li>';
        mettreAJourStatistiques();
        return;
    }
    
    tachesFilteres.forEach(tache => {
        // ... code d'affichage ...
    });
    
    mettreAJourStatistiques();
}

// Ajouter l'événement de recherche
document.getElementById('searchInput').addEventListener('input', (event) => {
    termRecherche = event.target.value;
    afficherTaches();
});
```

HTML :
```html
<input type="text" id="searchInput" placeholder="🔍 Chercher une tâche...">
```

### 5. Validation et sécurité

```javascript
/**
 * Échappe les caractères HTML pour éviter les injections XSS
 */
function echapperHTML(texte) {
    const div = document.createElement('div');
    div.textContent = texte;
    return div.innerHTML;
}

// Utiliser lors de l'affichage
li.innerHTML = `
    <span class="task-text">${echapperHTML(tache.texte)}</span>
    ...
`;
```

---

## Code complet - Script final

```javascript
// =====================================================
// TP JAVASCRIPT - APPLICATION DE GESTION DE TÂCHES
// =====================================================

class Tache {
    constructor(texte) {
        this.id = Date.now();
        this.texte = texte;
        this.terminee = false;
        this.dateCreation = new Date();
        this.priorite = 'normal';
    }
    
    terminer() {
        this.terminee = !this.terminee;
    }
    
    toJSON() {
        return {
            id: this.id,
            texte: this.texte,
            terminee: this.terminee,
            dateCreation: this.dateCreation,
            priorite: this.priorite
        };
    }
}

// Variables globales
let listeTaches = [];
let termRecherche = '';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// =====================================================
// Sauvegarde et chargement (Étape 9)
// =====================================================

function sauvegarderTaches() {
    const donnees = listeTaches.map(tache => tache.toJSON());
    localStorage.setItem('taches', JSON.stringify(donnees));
    console.log('💾 Tâches sauvegardées');
}

function chargerTaches() {
    const donnees = localStorage.getItem('taches');
    if (donnees) {
        const tachesJSON = JSON.parse(donnees);
        listeTaches = tachesJSON.map(tacheData => {
            const tache = new Tache(tacheData.texte);
            tache.id = tacheData.id;
            tache.terminee = tacheData.terminee;
            tache.dateCreation = new Date(tacheData.dateCreation);
            tache.priorite = tacheData.priorite;
            return tache;
        });
        console.log('📂 Tâches chargées');
    }
}

// =====================================================
// Gestion des tâches (Étapes 6, 7, 8)
// =====================================================

function ajouterTache(texte) {
    if (texte.trim() === '') {
        alert('Veuillez entrer une tâche !');
        return false;
    }
    
    const nouvelleTache = new Tache(texte.trim());
    listeTaches.push(nouvelleTache);
    console.log('✅ Tâche ajoutée:', texte);
    
    sauvegarderTaches();
    afficherTaches();
    return true;
}

function supprimerTache(id) {
    const index = listeTaches.findIndex(t => t.id === id);
    if (index !== -1) {
        const texte = listeTaches[index].texte;
        listeTaches.splice(index, 1);
        console.log('🗑️ Tâche supprimée:', texte);
        sauvegarderTaches();
        afficherTaches();
        return true;
    }
    return false;
}

function terminerTache(id) {
    const tache = listeTaches.find(t => t.id === id);
    if (tache) {
        tache.terminer();
        console.log('✔️ Tâche mise à jour:', tache.texte);
        sauvegarderTaches();
        afficherTaches();
        return true;
    }
    return false;
}

function supprimerToutesLesTaches() {
    if (listeTaches.length === 0) {
        alert('Aucune tâche à supprimer !');
        return false;
    }
    
    if (confirm('⚠️ Êtes-vous sûr ?')) {
        const nombre = listeTaches.length;
        listeTaches = [];
        console.log('🗑️ Toutes les tâches supprimées');
        sauvegarderTaches();
        afficherTaches();
        return true;
    }
    return false;
}

function supprimerTachesTerminees() {
    const nombreAvant = listeTaches.length;
    listeTaches = listeTaches.filter(t => !t.terminee);
    const nombreSupprime = nombreAvant - listeTaches.length;
    
    if (nombreSupprime > 0) {
        console.log('🗑️ ' + nombreSupprime + ' tâche(s) supprimée(s)');
        sauvegarderTaches();
        afficherTaches();
    } else {
        alert('Aucune tâche terminée !');
    }
}

function mettreAJourStatistiques() {
    const total = listeTaches.length;
    const terminees = listeTaches.filter(t => t.terminee).length;
    const enCours = total - terminees;
    
    totalCount.textContent = total;
    pendingCount.textContent = enCours;
    completedCount.textContent = terminees;
}

function obtenirTachesFilteres() {
    if (termRecherche.trim() === '') {
        return listeTaches;
    }
    return listeTaches.filter(tache =>
        tache.texte.toLowerCase().includes(termRecherche.toLowerCase())
    );
}

// =====================================================
// Affichage (Étapes 3 et 5)
// =====================================================

function afficherTaches() {
    const tachesFilteres = obtenirTachesFilteres();
    taskList.innerHTML = '';
    
    if (tachesFilteres.length === 0) {
        taskList.innerHTML = '<li class="empty-message">Aucune tâche</li>';
        mettreAJourStatistiques();
        return;
    }
    
    tachesFilteres.forEach(tache => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        if (tache.terminee) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <span class="task-text">${tache.texte}</span>
            <div class="task-actions">
                <button class="task-btn task-btn-complete" data-id="${tache.id}">
                    ${tache.terminee ? '↩️' : '✓'} Terminer
                </button>
                <button class="task-btn task-btn-delete" data-id="${tache.id}">
                    🗑️ Supprimer
                </button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
    
    mettreAJourStatistiques();
}

// =====================================================
// Événements (Étape 4)
// =====================================================

addBtn.addEventListener('click', () => {
    if (ajouterTache(taskInput.value)) {
        taskInput.value = '';
        taskInput.focus();
    }
});

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (ajouterTache(taskInput.value)) {
            taskInput.value = '';
        }
    }
});

taskList.addEventListener('click', (event) => {
    const id = parseInt(event.target.dataset.id);
    
    if (event.target.classList.contains('task-btn-complete')) {
        terminerTache(id);
    }
    
    if (event.target.classList.contains('task-btn-delete')) {
        if (confirm('Êtes-vous sûr ?')) {
            supprimerTache(id);
        }
    }
});

searchInput.addEventListener('input', (event) => {
    termRecherche = event.target.value;
    afficherTaches();
});

clearAllBtn.addEventListener('click', supprimerToutesLesTaches);
clearCompletedBtn.addEventListener('click', supprimerTachesTerminees);

// =====================================================
// Initialisation
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation...');
    chargerTaches();
    afficherTaches();
    taskInput.focus();
    console.log('✅ Prêt !');
});
```

---

## ✅ Checklist finale

- [ ] Implémenter la sauvegarde localStorage
- [ ] Implémenter le chargement depuis localStorage
- [ ] Ajouter les compteurs de tâches
- [ ] Ajouter le bouton "Tout supprimer"
- [ ] Ajouter le bouton "Supprimer les terminées"
- [ ] Ajouter la barre de recherche
- [ ] Tester tous les fonctionnalités
- [ ] Vérifier la persistance des données
- [ ] Valider la sécurité (échappement HTML)

---

## 🎉 Conclusion

Vous avez maintenant une application **complète et fonctionnelle** couvrant tous les concepts de JavaScript !

Prochaines étapes possibles :
- 🔐 Ajouter l'authentification utilisateur
- ☁️ Synchroniser avec un serveur/BDD
- 🎨 Ajouter des thèmes
- 📱 Rendre compatible PWA
