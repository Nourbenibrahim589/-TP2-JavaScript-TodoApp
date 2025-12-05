# ÉTAPES 1 & 2 : Structure HTML/CSS et Variables JavaScript

## Étape 1 : Mise en place de la structure HTML/CSS

### Objectif
Créer une interface utilisateur fonctionnelle et responsive pour notre application de gestion de tâches.

### Fichiers à créer
- `index.html`
- `styles.css`

### Structure HTML minimale

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application de Gestion de Tâches</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>📋 Ma Liste de Tâches</h1>
        
        <!-- Zone de saisie -->
        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Ajouter une tâche...">
            <button id="addBtn">Ajouter</button>
        </div>
        
        <!-- Liste des tâches -->
        <ul id="taskList"></ul>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

### CSS de base

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f0f0f0;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#taskInput {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

#addBtn {
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#taskList {
    list-style: none;
}
```

---

## Étape 2 : Premiers scripts JavaScript

### Objectif
- Vérifier que le script fonctionne
- Déclarer les variables principales
- Afficher un message de bienvenue dans la console

### Code JavaScript basique

```javascript
// ========================================
// ÉTAPE 2 : Variables et Message de Bienvenue
// ========================================

// Message de bienvenue dans la console
console.log("🎉 Bienvenue dans l'application de gestion de tâches !");
console.log("📝 Application chargée avec succès.");

// Déclaration des variables principales
let listeTaches = [];  // Tableau pour stocker les tâches

// Sélection des éléments DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Message de confirmation
console.log("✅ Script JavaScript initialisé avec succès !");
```

### Vérifier que ça marche

1. Ouvrez `index.html` dans le navigateur
2. Appuyez sur **F12** pour ouvrir la console
3. Vous devriez voir les messages d'accueil

### Sortie console attendue
```
🎉 Bienvenue dans l'application de gestion de tâches !
📝 Application chargée avec succès.
✅ Script JavaScript initialisé avec succès !
```

---

## Concepts clés

### Déclaration de variables
```javascript
let listeTaches = [];      // Variable avec let (recommandé)
const taskInput = ...;     // Constante (ne peut pas être modifiée)
var ancieneVariable = [];  // Ancien style (à éviter)
```

### Types de données en JavaScript
```javascript
let nombre = 42;
let texte = "Bonjour";
let booleen = true;
let objet = { nom: "Tâche", done: false };
let tableau = [1, 2, 3];
let nulle = null;
let indefini = undefined;
```

### Sélection du DOM
```javascript
document.getElementById('id');          // Par ID
document.querySelector('.classe');      // Par sélecteur CSS
document.querySelectorAll('li');        // Tous les éléments
```

---

## ✅ Checklist de l'étape 1 & 2

- [ ] Créer le fichier `index.html` avec la structure HTML
- [ ] Créer le fichier `styles.css` avec les styles de base
- [ ] Créer le fichier `script.js` avec les variables
- [ ] Vérifier les messages dans la console du navigateur
- [ ] S'assurer que l'interface est responsive

---

## Prochaine étape
👉 [Étape 3 : Manipulation du DOM](./ETAPE_3_DOM.md)
