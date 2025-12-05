# ÉTAPES 3 & 4 : Manipulation du DOM et Gestion des Événements

## Étape 3 : Manipulation du DOM

### Objectif
Apprendre à manipuler le DOM pour afficher et modifier le contenu dynamiquement.

### Concepts clés

#### 1. Créer des éléments
```javascript
const li = document.createElement('li');        // Crée un élément
li.textContent = "Faire les courses";           // Ajoute du texte
li.id = "task-1";                              // Ajoute un ID
li.className = "task-item";                    // Ajoute une classe
```

#### 2. Ajouter au DOM
```javascript
taskList.appendChild(li);                       // Ajoute en dernier
taskList.insertBefore(li, taskList.firstChild); // Ajoute en premier
```

#### 3. Modifier le contenu
```javascript
li.textContent = "Nouveau texte";              // Texte seul
li.innerHTML = "<strong>Gras</strong>";        // Avec HTML
li.innerText = "Texte visible";                // Texte rendu
```

#### 4. Accéder aux propriétés
```javascript
li.getAttribute('id');                         // Récupère un attribut
li.setAttribute('data-id', '123');             // Définit un attribut
li.classList.add('active');                    // Ajoute une classe
li.classList.remove('active');                 // Retire une classe
li.classList.toggle('active');                 // Bascule une classe
```

### Fonction pour afficher les tâches

```javascript
/**
 * Affiche toutes les tâches dans le DOM
 */
function afficherTaches() {
    // Vider la liste
    taskList.innerHTML = '';
    
    // Si pas de tâches, afficher un message
    if (listeTaches.length === 0) {
        taskList.innerHTML = '<li class="empty-message">Aucune tâche pour le moment</li>';
        return;
    }
    
    // Boucler sur chaque tâche
    listeTaches.forEach((tache, index) => {
        // Créer l'élément
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Ajouter le texte
        li.textContent = tache;
        
        // Ajouter au DOM
        taskList.appendChild(li);
    });
}

// Appeler la fonction
afficherTaches();
```

---

## Étape 4 : Gestion des événements

### Objectif
Réagir aux actions de l'utilisateur (clics, appuis de touches, etc.).

### Concepts clés

#### 1. Événement "click"
```javascript
// Sur un bouton
addBtn.addEventListener('click', function() {
    console.log('Bouton cliqué !');
});

// Ou avec une arrow function
addBtn.addEventListener('click', () => {
    console.log('Bouton cliqué !');
});
```

#### 2. Événement "keypress" (appui sur une touche)
```javascript
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        console.log('Touche Entrée appuyée !');
    }
});
```

#### 3. Événement "input" (changement dans un champ)
```javascript
taskInput.addEventListener('input', (event) => {
    console.log('Valeur actuelle:', event.target.value);
});
```

#### 4. Événement "click" avec délégation
```javascript
// Au lieu d'écouter chaque élément individuellement
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task-btn')) {
        console.log('Bouton de tâche cliqué !');
    }
});
```

### Fonction pour ajouter une tâche

```javascript
/**
 * Ajoute une tâche à la liste
 */
function ajouterTache() {
    // Récupérer le texte du champ
    const texte = taskInput.value;
    
    // Vérifier que ce n'est pas vide
    if (texte.trim() === '') {
        alert('Veuillez entrer une tâche !');
        return;
    }
    
    // Ajouter à la liste
    listeTaches.push(texte);
    console.log('✅ Tâche ajoutée:', texte);
    
    // Réafficher
    afficherTaches();
    
    // Vider le champ
    taskInput.value = '';
    
    // Remettre le focus
    taskInput.focus();
}
```

### Événements à ajouter

```javascript
// Clic sur le bouton Ajouter
addBtn.addEventListener('click', ajouterTache);

// Appui sur Entrée
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        ajouterTache();
    }
});
```

---

## Code complet de l'étape 3 & 4

```javascript
// Variables globales
let listeTaches = [];
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Afficher les tâches
function afficherTaches() {
    taskList.innerHTML = '';
    
    if (listeTaches.length === 0) {
        taskList.innerHTML = '<li class="empty">Aucune tâche</li>';
        return;
    }
    
    listeTaches.forEach((tache) => {
        const li = document.createElement('li');
        li.textContent = tache;
        taskList.appendChild(li);
    });
}

// Ajouter une tâche
function ajouterTache() {
    const texte = taskInput.value.trim();
    
    if (texte === '') {
        alert('Veuillez entrer une tâche !');
        return;
    }
    
    listeTaches.push(texte);
    console.log('✅ Tâche ajoutée:', texte);
    
    afficherTaches();
    taskInput.value = '';
    taskInput.focus();
}

// Événements
addBtn.addEventListener('click', ajouterTache);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        ajouterTache();
    }
});

// Affichage initial
afficherTaches();
```

---

## Concepts importants

### Event Object
```javascript
addEventListener('event', (event) => {
    event.target;        // L'élément qui a déclenché l'événement
    event.key;           // La touche appuyée
    event.preventDefault(); // Empêche le comportement par défaut
    event.stopPropagation(); // Empêche la propagation de l'événement
});
```

### Événements courants
| Événement | Quand | Exemple |
|-----------|-------|---------|
| `click` | Clic de souris | `btn.addEventListener('click', ...)` |
| `dblclick` | Double-clic | `btn.addEventListener('dblclick', ...)` |
| `keypress` | Appui sur touche | `input.addEventListener('keypress', ...)` |
| `keydown` | Touche enfoncée | `input.addEventListener('keydown', ...)` |
| `keyup` | Touche relâchée | `input.addEventListener('keyup', ...)` |
| `input` | Changement d'input | `input.addEventListener('input', ...)` |
| `change` | Changement d'élément | `select.addEventListener('change', ...)` |
| `submit` | Soumission de formulaire | `form.addEventListener('submit', ...)` |
| `mouseover` | Souris au-dessus | `element.addEventListener('mouseover', ...)` |
| `mouseout` | Souris qui part | `element.addEventListener('mouseout', ...)` |

---

## ✅ Checklist

- [ ] Créer une fonction `afficherTaches()`
- [ ] Créer une fonction `ajouterTache()`
- [ ] Ajouter un événement `click` au bouton
- [ ] Ajouter un événement `keypress` pour Entrée
- [ ] Tester l'ajout de tâches
- [ ] Vérifier que les messages s'affichent dans la console

---

## Prochaine étape
👉 [Étape 5 : Amélioration de l'affichage](./ETAPE_5_AFFICHAGE.md)
