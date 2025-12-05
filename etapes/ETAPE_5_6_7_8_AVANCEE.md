# ÉTAPES 5, 6, 7 & 8 : Améliorations, Fonctions, Tableaux et Objets

## Étape 5 : Amélioration de l'affichage

### Objectif
Ajouter des boutons "Terminer" et "Supprimer" pour chaque tâche.

### HTML pour une tâche

```html
<li class="task-item">
    <span class="task-text">Ma tâche</span>
    <div class="task-actions">
        <button class="task-btn task-btn-complete">✓ Terminer</button>
        <button class="task-btn task-btn-delete">🗑️ Supprimer</button>
    </div>
</li>
```

### CSS pour les tâches

```css
.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f9f9f9;
    border-radius: 5px;
    margin-bottom: 10px;
    border-left: 4px solid #4CAF50;
}

.task-item.completed {
    opacity: 0.7;
}

.task-item.completed .task-text {
    text-decoration: line-through;
    color: #999;
}

.task-text {
    flex: 1;
}

.task-actions {
    display: flex;
    gap: 5px;
}

.task-btn {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.85em;
    font-weight: bold;
}

.task-btn-complete {
    background-color: #51cf66;
    color: white;
}

.task-btn-delete {
    background-color: #ff6b6b;
    color: white;
}
```

### Fonction pour afficher avec les boutons

```javascript
function afficherTaches() {
    taskList.innerHTML = '';
    
    if (listeTaches.length === 0) {
        taskList.innerHTML = '<li class="empty">Aucune tâche</li>';
        return;
    }
    
    listeTaches.forEach((tache, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Ajouter la classe 'completed' si terminée
        if (tache.terminee) {
            li.classList.add('completed');
        }
        
        // HTML du contenu
        li.innerHTML = `
            <span class="task-text">${tache.texte}</span>
            <div class="task-actions">
                <button class="task-btn task-btn-complete" data-index="${index}">
                    ${tache.terminee ? '↩️ Réactiver' : '✓ Terminer'}
                </button>
                <button class="task-btn task-btn-delete" data-index="${index}">
                    🗑️ Supprimer
                </button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}
```

---

## Étape 6 : Utilisation des fonctions

### Objectif
Créer des fonctions spécialisées et réutilisables.

### Fonctions principales

```javascript
/**
 * Ajoute une nouvelle tâche
 * @param {string} texte - Le texte de la tâche
 */
function ajouterTache(texte) {
    if (texte.trim() === '') {
        alert('Veuillez entrer un texte !');
        return false;
    }
    
    listeTaches.push({
        texte: texte.trim(),
        terminee: false
    });
    
    console.log('✅ Tâche ajoutée:', texte);
    afficherTaches();
    return true;
}

/**
 * Supprime une tâche par son index
 * @param {number} index - L'index de la tâche
 */
function supprimerTache(index) {
    if (index >= 0 && index < listeTaches.length) {
        const texte = listeTaches[index].texte;
        listeTaches.splice(index, 1);
        console.log('🗑️ Tâche supprimée:', texte);
        afficherTaches();
        return true;
    }
    return false;
}

/**
 * Termine ou réactive une tâche
 * @param {number} index - L'index de la tâche
 */
function terminerTache(index) {
    if (index >= 0 && index < listeTaches.length) {
        listeTaches[index].terminee = !listeTaches[index].terminee;
        const etat = listeTaches[index].terminee ? 'terminée' : 'réactivée';
        console.log('✔️ Tâche', etat, ':', listeTaches[index].texte);
        afficherTaches();
        return true;
    }
    return false;
}
```

### Utilisation des fonctions

```javascript
// Au lieu de dupliquer du code, on appelle les fonctions
addBtn.addEventListener('click', () => {
    ajouterTache(taskInput.value);
    taskInput.value = '';
});

taskList.addEventListener('click', (event) => {
    const index = parseInt(event.target.dataset.index);
    
    if (event.target.classList.contains('task-btn-complete')) {
        terminerTache(index);
    }
    
    if (event.target.classList.contains('task-btn-delete')) {
        supprimerTache(index);
    }
});
```

---

## Étape 7 : Tableaux et boucles

### Objectif
Manipuler les données avec les méthodes de tableau.

### Méthodes principales

```javascript
// 1. Ajouter un élément
listeTaches.push(nouvelleTache);

// 2. Supprimer un élément
listeTaches.splice(index, 1);  // Supprime 1 élément à partir de index

// 3. Boucler sur les éléments
listeTaches.forEach((tache, index) => {
    console.log(index, tache);
});

// 4. Chercher un élément
const index = listeTaches.findIndex(t => t.id === 5);

// 5. Filtrer
const tachesTerminees = listeTaches.filter(t => t.terminee);

// 6. Transformer
const textes = listeTaches.map(t => t.texte);

// 7. Compter
const nombre = listeTaches.filter(t => !t.terminee).length;
```

### Exemple : Afficher les statistiques

```javascript
function afficherStatistiques() {
    const total = listeTaches.length;
    const terminees = listeTaches.filter(t => t.terminee).length;
    const enCours = total - terminees;
    
    console.log('📊 Total:', total);
    console.log('✅ Terminées:', terminees);
    console.log('⏳ En cours:', enCours);
}
```

---

## Étape 8 : Introduction aux objets

### Objectif
Représenter les tâches comme des objets avec plusieurs propriétés.

### Créer une classe

```javascript
/**
 * Classe Tâche
 */
class Tache {
    constructor(texte) {
        this.id = Date.now();              // ID unique
        this.texte = texte;                // Contenu
        this.terminee = false;             // État
        this.dateCreation = new Date();    // Timestamp
        this.priorite = 'normal';          // Priorité
    }
    
    // Méthode pour terminer
    terminer() {
        this.terminee = !this.terminee;
    }
    
    // Méthode pour obtenir les infos
    getInfo() {
        return `${this.texte} (${this.priorite}) - Créée: ${this.dateCreation.toLocaleDateString()}`;
    }
    
    // Convertir en JSON
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
```

### Utiliser la classe

```javascript
// Créer une tâche
const tache1 = new Tache("Faire les courses");
tache1.priorite = 'haute';

// Afficher les informations
console.log(tache1.getInfo());

// Terminer la tâche
tache1.terminer();
console.log('Terminée ?', tache1.terminee);

// Convertir en JSON
console.log(JSON.stringify(tache1.toJSON()));

// Ajouter au tableau
listeTaches.push(tache1);
```

### Mettre à jour les fonctions

```javascript
function ajouterTache(texte) {
    if (texte.trim() === '') {
        alert('Veuillez entrer un texte !');
        return false;
    }
    
    const nouvelleTache = new Tache(texte.trim());
    listeTaches.push(nouvelleTache);
    
    console.log('✅ Tâche ajoutée:', nouvelleTache.getInfo());
    afficherTaches();
    return true;
}

function supprimerTache(id) {
    const index = listeTaches.findIndex(t => t.id === id);
    
    if (index !== -1) {
        const texte = listeTaches[index].texte;
        listeTaches.splice(index, 1);
        console.log('🗑️ Tâche supprimée:', texte);
        afficherTaches();
        return true;
    }
    return false;
}

function terminerTache(id) {
    const tache = listeTaches.find(t => t.id === id);
    
    if (tache) {
        tache.terminer();
        console.log('✔️ Tâche mise à jour:', tache.getInfo());
        afficherTaches();
        return true;
    }
    return false;
}
```

---

## Code complet des étapes 5 à 8

```javascript
// =====================================================
// Classe Tâche (Étape 8)
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

// =====================================================
// Variables globales (Étape 7)
// =====================================================
let listeTaches = [];
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// =====================================================
// Fonctions (Étape 6)
// =====================================================
function ajouterTache(texte) {
    if (texte.trim() === '') {
        alert('Veuillez entrer un texte !');
        return false;
    }
    
    const nouvelleTache = new Tache(texte.trim());
    listeTaches.push(nouvelleTache);
    console.log('✅ Tâche ajoutée:', texte);
    
    afficherTaches();
    return true;
}

function supprimerTache(id) {
    const index = listeTaches.findIndex(t => t.id === id);
    
    if (index !== -1) {
        const texte = listeTaches[index].texte;
        listeTaches.splice(index, 1);
        console.log('🗑️ Tâche supprimée:', texte);
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
        afficherTaches();
        return true;
    }
    return false;
}

// =====================================================
// Affichage (Étapes 3, 5)
// =====================================================
function afficherTaches() {
    taskList.innerHTML = '';
    
    if (listeTaches.length === 0) {
        taskList.innerHTML = '<li class="empty">Aucune tâche</li>';
        return;
    }
    
    // Étape 7 : Boucle forEach
    listeTaches.forEach((tache) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Étape 5 : Ajouter des boutons
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
        supprimerTache(id);
    }
});

// Initialisation
afficherTaches();
```

---

## ✅ Checklist

- [ ] Ajouter des boutons dans le HTML
- [ ] Créer les styles CSS pour les tâches complétées
- [ ] Créer les fonctions `ajouterTache`, `supprimerTache`, `terminerTache`
- [ ] Créer la classe `Tache`
- [ ] Utiliser les méthodes de tableau (`push`, `splice`, `filter`, etc.)
- [ ] Tester la suppression et la complétion de tâches

---

## Prochaine étape
👉 [Étape 9 & 10 : LocalStorage et Améliorations](./ETAPE_9_10_LOCALSTORAGE.md)
