# 📋 Application de Gestion de Tâches - To-Do List

## 📖 Vue d'ensemble

Cette application est une **To-Do List complète** développée en JavaScript vanilla (sans framework). Elle met en pratique les concepts fondamentaux de JavaScript à travers 10 étapes progressives.

---

## 🎯 Objectifs du TP

✅ Maîtriser les variables et les types de données  
✅ Manipuler le DOM dynamiquement  
✅ Gérer les événements utilisateur  
✅ Utiliser les fonctions et les objets  
✅ Travailler avec les tableaux et les boucles  
✅ Persister les données avec localStorage  
✅ Implémenter des fonctionnalités avancées  

---

## 🚀 Étapes Réalisées

### **ÉTAPE 1 : Mise en place de la structure HTML/CSS**

**Fichiers créés :** `index.html`, `styles.css`

**Objectif :** Créer une interface utilisateur complète et responsive.

**Contenu :**
- Zone de saisie pour les tâches
- Bouton "Ajouter"
- Liste vide pour les tâches
- Zone de recherche
- Compteurs de statistiques
- Boutons d'actions globales

**Fonctionnalités CSS :**
- Design responsive (mobile-first)
- Animations fluides
- Gradient de couleurs moderne
- Icônes emoji pour une meilleure UX

```html
<input type="text" id="taskInput" placeholder="Ajouter une nouvelle tâche...">
<button id="addBtn">➕ Ajouter</button>
<ul id="taskList"></ul>
```

---

### **ÉTAPE 2 : Premiers scripts JavaScript**

**Concept :** Déclaration de variables et message de bienvenue

```javascript
console.log("🎉 Bienvenue dans l'application de gestion de tâches !");
let listeTaches = [];
```

**Objectif :**
- Vérifier que le script JavaScript fonctionne
- Déclarer les variables globales
- Afficher des messages dans la console

---

### **ÉTAPE 3 : Manipulation du DOM**

**Concept :** Récupérer et afficher dynamiquement du contenu

```javascript
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function afficherTaches() {
    taskList.innerHTML = '';
    listeTaches.forEach(tache => {
        const li = document.createElement('li');
        li.textContent = tache.texte;
        taskList.appendChild(li);
    });
}
```

**Fonctionnalités :**
- Sélection d'éléments DOM avec `getElementById`
- Création d'éléments avec `createElement`
- Ajout dynamique au DOM avec `appendChild`

---

### **ÉTAPE 4 : Gestion des événements**

**Concept :** Réagir aux interactions de l'utilisateur

```javascript
// Événement : Clic sur le bouton Ajouter
addBtn.addEventListener('click', traiterAjoutTache);

// Événement : Appui sur Entrée
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        traiterAjoutTache();
    }
});

// Événement : Clic sur les boutons de tâche
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task-btn-delete')) {
        supprimerTache(id);
    }
});
```

**Fonctionnalités :**
- `click` : Clique sur un bouton
- `keypress` : Appui sur une touche
- `input` : Changement dans un champ de texte
- Event delegation pour les tâches dynamiques

---

### **ÉTAPE 5 : Amélioration de l'affichage**

**Concept :** Ajouter des boutons "Terminer" et "Supprimer"

```html
<button class="task-btn-complete">✓ Terminer</button>
<button class="task-btn-delete">🗑️ Supprimer</button>
```

**Styles CSS :**
- Classe `.completed` avec texte barré
- Classes de couleur pour les boutons
- Animations au survol
- Icônes visuelles

```css
.task-item.completed .task-text {
    text-decoration: line-through;
    color: #999;
}
```

---

### **ÉTAPE 6 : Utilisation des fonctions**

**Concept :** Créer des fonctions réutilisables et modulaires

```javascript
/**
 * Ajoute une nouvelle tâche à la liste
 * @param {string} texte - Le texte de la tâche
 */
function ajouterTache(texte) {
    if (texte.trim().length === 0) return false;
    const nouvelleTache = new Tache(texte.trim());
    listeTaches.push(nouvelleTache);
    sauvegarderTaches();
    afficherTaches();
    return true;
}

function supprimerTache(id) { /* ... */ }
function terminerTache(id) { /* ... */ }
function afficherTaches() { /* ... */ }
```

**Avantages :**
- Code plus lisible et maintenable
- Réutilisabilité
- Facilité à tester
- Séparation des responsabilités

---

### **ÉTAPE 7 : Tableaux et boucles**

**Concept :** Stocker et itérer sur les données

```javascript
// Déclaration d'un tableau
let listeTaches = [];

// Ajout d'un élément
listeTaches.push(nouvelleTache);

// Boucle pour afficher
listeTaches.forEach(tache => {
    // Créer et afficher chaque tâche
});

// Filtrer le tableau
const tachesTerminees = listeTaches.filter(t => t.terminee);
```

**Méthodes utilisées :**
- `push()` : Ajouter un élément
- `splice()` : Supprimer un élément
- `forEach()` : Boucler sur les éléments
- `filter()` : Filtrer les éléments
- `find()` : Chercher un élément

---

### **ÉTAPE 8 : Introduction aux objets**

**Concept :** Représenter les tâches comme des objets

```javascript
class Tache {
    constructor(texte) {
        this.id = Date.now();           // ID unique
        this.texte = texte;              // Contenu
        this.terminee = false;           // État
        this.dateCreation = new Date();  // Timestamp
    }

    // Méthode pour terminer
    terminer() {
        this.terminee = !this.terminee;
    }

    // Méthode de sérialisation
    toJSON() {
        return {
            id: this.id,
            texte: this.texte,
            terminee: this.terminee,
            dateCreation: this.dateCreation
        };
    }
}
```

**Avantages de la POO :**
- Encapsulation des données
- Méthodes associées aux objets
- Facilité à sérialiser/désérialiser

---

### **ÉTAPE 9 : Persistance des données avec LocalStorage**

**Concept :** Sauvegarder les données localement dans le navigateur

```javascript
/**
 * Sauvegarde les tâches dans localStorage
 */
function sauvegarderTaches() {
    const donnees = listeTaches.map(tache => tache.toJSON());
    localStorage.setItem('taches', JSON.stringify(donnees));
}

/**
 * Charge les tâches depuis localStorage
 */
function chargerTaches() {
    const donnees = localStorage.getItem('taches');
    if (donnees) {
        const tachesJSON = JSON.parse(donnees);
        listeTaches = tachesJSON.map(tache => {
            const nouvelleTache = new Tache(tache.texte);
            nouvelleTache.id = tache.id;
            nouvelleTache.terminee = tache.terminee;
            return nouvelleTache;
        });
    }
}
```

**Avantages :**
- Les données persistent après fermeture du navigateur
- Pas besoin de serveur
- Limite de ~5-10MB par domaine
- Chiffrement minimal, ne pas stocker de données sensibles

---

### **ÉTAPE 10 : Améliorations libres**

**Fonctionnalités implémentées :**

#### 1. **Compteur de tâches**
```javascript
function mettreAJourStatistiques() {
    const total = listeTaches.length;
    const terminees = listeTaches.filter(t => t.terminee).length;
    const enCours = total - terminees;
    
    totalCount.textContent = total;
    pendingCount.textContent = enCours;
    completedCount.textContent = terminees;
}
```

#### 2. **Bouton "Tout supprimer"**
```javascript
function supprimerToutesLesTaches() {
    if (confirm("Êtes-vous sûr ?")) {
        listeTaches = [];
        sauvegarderTaches();
        afficherTaches();
    }
}
```

#### 3. **Bouton "Supprimer les terminées"**
```javascript
function supprimerTachesTerminees() {
    listeTaches = listeTaches.filter(t => !t.terminee);
    sauvegarderTaches();
    afficherTaches();
}
```

#### 4. **Champ de recherche**
```javascript
function obtenirTachesFilteres() {
    if (termRecherche.trim() === '') {
        return listeTaches;
    }
    return listeTaches.filter(tache =>
        tache.texte.toLowerCase().includes(termRecherche.toLowerCase())
    );
}

searchInput.addEventListener('input', (event) => {
    termRecherche = event.target.value;
    afficherTaches();
});
```

#### 5. **Validation et sécurité**
- Validation des champs vides
- Échappement HTML pour éviter XSS : `echapperHTML(texte)`
- Confirmations avant suppression

---

## 📁 Structure du Projet

```
TP-JavaScript-TodoApp/
├── index.html           # Structure HTML
├── styles.css           # Styles CSS (responsive)
├── script.js            # Logique JavaScript
├── README.md            # Documentation
└── .git/                # Historique Git
```

---

## 🎮 Comment utiliser l'application ?

### Installation & Lancement

1. **Cloner le dépôt :**
   ```bash
   git clone <url-du-repo>
   cd TP-JavaScript-TodoApp
   ```

2. **Ouvrir l'application :**
   - Double-cliquez sur `index.html` OU
   - Utilisez un serveur local : `python -m http.server 8000`
   - Ouvrez `http://localhost:8000` dans votre navigateur

### Fonctionnalités

| Action | Description |
|--------|-------------|
| **Ajouter** | Entrez du texte et appuyez sur Ajouter ou Entrée |
| **Terminer** | Cliquez sur le checkbox ou le bouton "Terminer" |
| **Supprimer** | Cliquez sur le bouton "Supprimer" (avec confirmation) |
| **Chercher** | Utilisez la barre de recherche pour filtrer |
| **Tout supprimer** | Supprime toutes les tâches (avec confirmation) |
| **Supprimer les terminées** | Supprime uniquement les tâches complétées |

---

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, Grid, Animations, Gradients
- **JavaScript (ES6+)** :
  - Classes et constructeurs
  - Arrow functions
  - Template literals
  - Destructuration
  - localStorage API
  - DOM API
  - Event listeners

---

## 📊 Concepts JavaScript Couverts

| Concept | Étape | Exemple |
|---------|-------|---------|
| Variables | 2 | `let listeTaches = []` |
| DOM | 3 | `document.getElementById()` |
| Événements | 4 | `addEventListener()` |
| Boutons | 5 | `classList.add()` |
| Fonctions | 6 | `function ajouterTache()` |
| Tableaux | 7 | `forEach()`, `filter()` |
| Objets | 8 | `class Tache` |
| LocalStorage | 9 | `localStorage.setItem()` |
| Validation | 10 | Vérification des entrées |
| Recherche | 10 | Filtrage en temps réel |

---

## 🐛 Débogage

**Utilisez la console du navigateur (F12) :**

```javascript
// Messages de débogage
console.log("Debug:", variable);
console.warn("Attention:", msg);
console.error("Erreur:", err);

// Inspection d'objets
console.table(listeTaches);

// Performance
console.time("label");
// Code
console.timeEnd("label");
```

---

## 📈 Possibilités d'amélioration future

- 🏷️ Ajouter des catégories/tags
- 📅 Ajouter des dates d'échéance
- 🎨 Sélecteur de couleur pour les tâches
- 📤 Export/Import en JSON
- 🔔 Notifications
- 🌙 Mode sombre
- 🔐 Chiffrement des données
- ☁️ Synchronisation cloud
- 📱 Progressive Web App (PWA)
- 🌍 Multilingue

---

## 📝 Notes importantes

1. **LocalStorage vs SessionStorage :**
   - localStorage : Persiste indéfiniment
   - sessionStorage : Effacé à la fermeture du navigateur

2. **Limite de localStorage :**
   - ~5-10 MB par domaine (selon le navigateur)
   - Stockage synchrone (bloquant)

3. **Sécurité :**
   - Ne pas stocker les mots de passe
   - Toujours échapper le HTML côté client
   - Valider les données côté serveur en production

4. **Performance :**
   - Event delegation pour les éléments dynamiques
   - Pas de requêtes réseau inutiles
   - Animations optimisées (CSS plutôt que JS)

---

## 🔗 Ressources utiles

- [MDN - JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [MDN - DOM API](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model)
- [MDN - localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)
- [JavaScript.info](https://fr.javascript.info/)

---

## 👨‍💻 Auteur

Créé comme travaux pratiques JavaScript - Gestion de tâches  
FST - Département Informatique - Mohamed Lassoued

---

## 📜 Licence

Ce projet est fourni à titre éducatif.

---

## ✨ Conclusion

Félicitations ! Vous avez créé une **application complète de gestion de tâches** utilisant les concepts fondamentaux de JavaScript. Cette base peut être étendue avec des fonctionnalités plus avancées comme les appels API, les frameworks modernes (React, Vue.js), ou même la synchronisation cloud.

**Prochaines étapes recommandées :**
1. Ajouter un backend (Node.js/Express)
2. Intégrer une base de données (MongoDB, PostgreSQL)
3. Apprendre un framework (React, Vue.js, Angular)
4. Implémenter l'authentification utilisateur
5. Déployer sur un serveur web

Bon codage ! 🚀

