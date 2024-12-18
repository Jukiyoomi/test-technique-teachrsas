# Test technique

## Objectif
Créer une application de gestion de produits et de catégories.

## Stack technique
- Docker: pour l'isolation des environnements
- Symfony 7.2
- PHP 8.2
- Postgres 16 (via Docker)
- React 18
- Redux Toolkit (state management & API calls): plus simple que Redux
- Tanstack Router (routing) : routing typesafe
- Typescript: pour le typage

## Installation
1. Cloner le projet

### Docker
1. Créer 2 fichiers `.env` à la racine du projet et les remplir avec les variables renseignées dans le fichier `.env.example`:
	- `.env.docker` pour l'envrionnement de développement
	- `.env.test.docker` pour l'environnement de test
2. Lancer les containers docker: `docker-compose up -d`

### Symfony
1. Se rendre dans le dossier `backend` et installer les dépendances: `composer install`
2. Créer un fichier `.env.local` à la racine du dossier `backend` et le remplir avec les variables renseignées dans le fichier `.env`
3. Exécuter les migrations: `php bin/console doctrine:migrations:migrate`
4. **(Optionnel)** Charger les fixtures: `php bin/console doctrine:fixtures:load`
5. Lancer le serveur: `symfony serve`

### React
1. Se rendre dans le dossier `frontend` et installer les dépendances: `npm install`
2. Créer un fichier `.env.local` à la racine du dossier `frontend` et le remplir avec les variables renseignées dans le fichier `.env.example`
3. Lancer l'application: `npm start`

## Fonctionnalités
- [x] Créer une catégorie
- [x] Modifier une catégorie
- [x] Supprimer une catégorie
- [x] Lister les catégories
- [x] Créer un produit
- [x] Modifier un produit
- [x] Supprimer un produit
- [x] Lister les produits
- [x] Filtrer les produits par catégorie
- [x] Pagination des produits
- [x] Recherche des produits
- [x] Tests unitaires (backend)
- [ ] Authentification

## Quelques captures d'écran
Page d'accueil: liste des produits sous forme de teableau, liste des catégories dans le header
![image](https://github.com/user-attachments/assets/2d7c7bcf-1fb0-4c77-a2bc-0483b797f09d)

Page création d'un produit: préload des catégories pour le formulaire (permet d'éviter d'afficher un loader)
![image](https://github.com/user-attachments/assets/32182b7d-0b25-4632-8e58-0f7ae645f6bb)

Page détails d'une catégorie: mode lecture pour afficher la liste des produits associés, mode édition pour éditer les données de la catégorie
![image](https://github.com/user-attachments/assets/044f9734-e236-4711-b677-4cf7e98ad88a)


