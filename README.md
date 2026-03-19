# Commandes du projet

Démarrer tout le projet en arrière-plan (construction et lancement) :
```bash
docker compose up --build -d
```

Arrêter et supprimer les conteneurs :
```bash
docker compose down
```

*Ajoutez `127.0.0.1 front.local` et `127.0.0.1 back.local` dans votre fichier `C:\Windows\System32\drivers\etc\hosts` en tant qu'administrateur*

## Architecture, Routes et Ports

Le projet utilise Docker Compose pour orchestrer plusieurs services. Voici la liste des différents services, leurs ports, et à quoi ils servent :

### 1. Frontend (Interface Utilisateur - React)
- **Rôle** : L'interface web permettant à l'utilisateur de lire et poster des messages.
- **Accès local (Traefik)** : [http://front.local](http://front.local) (sur le port 80 par défaut via le sous-domaine)
- **Accès direct via l'hôte** : [http://localhost:8081](http://localhost:8081)
- **Port interne du conteneur** : `80`

### 2. Backend (API - Flask)
- **Rôle** : L'API qui reçoit les requêtes du frontend et interagit avec la base de données.
- **Accès local (Traefik)** : [http://back.local](http://back.local)
- **Accès direct via l'hôte** : [http://localhost:5000](http://localhost:5000)
- **Port interne du conteneur** : `5000`
- **Routes de l'API** :
  - `GET /messages` : Récupère la liste de tous les messages de la base de données au format JSON.
  - `POST /messages` : Ajoute un nouveau message. Le corps de la requête doit être `{ "texte": "votre message" }`.

### 3. Base de données (PostgreSQL)
- **Rôle** : Stocke les messages envoyés depuis le frontend.
- **Port interne du conteneur** : `5432` *(accessible par les autres conteneurs Docker via le réseau `web`, notamment via `db:5432`)*.

### 4. pgAdmin (Administration de la base de données)
- **Rôle** : Interface graphique web pour gérer et visualiser la base de données PostgreSQL (`mydb`).
- **Accès direct via l'hôte** : [http://localhost:8083](http://localhost:8083)
- **Port interne du conteneur** : `80`

Pour vous connecter :
- Email : `admin@admin.com`
- Mot de passe : `admin`
- *(Voir la section "Interface Admin" ci-dessous pour configurer la connexion au serveur DB).*

### 5. Traefik (Reverse Proxy)
- **Rôle** : Routeur qui redirige les requêtes entrantes (comme `front.local` et `back.local`) vers les bons conteneurs (Frontend et Backend) sans avoir besoin de spécifier les ports internes.
- **Accès direct via l'hôte (Dashboard Traefik)** : [http://localhost:8080](http://localhost:8080)
- **Port d'entrée web unifié** : `80` (et `8080` pour le dashboard local)

### 6. Whoami (Service de test)
- **Rôle** : Un service léger pour tester que Traefik route correctement les requêtes.
- **Accès local (Traefik)** : [http://whoami.nomdedomaine.com](http://whoami.nomdedomaine.com) (nécessite une entrée dans le fichier hosts).

## Interface Admin (Base de données)

Pour voir et gérer la base de données PostgreSQL, une interface pgAdmin est incluse.

1. Allez sur **[http://localhost:8083](http://localhost:8083)**
2. Connectez-vous avec :
   - Email : `admin@admin.com`
   - Mot de passe : `admin`
3. Ajoutez la connexion au serveur :
   - Faites un clic droit sur **Servers** > **Register** > **Server...**
   - Dans l'onglet **General**, mettez un nom de votre choix (ex: "BDD Locale")
   - Dans l'onglet **Connection**, remplissez avec :
     - Host name/address : `db`
     - Port : `5432`
     - Maintenance database : `mydb`
     - Username : `user`
     - Password : `pwd`
   - Cliquez sur **Save**.
4. Vous retrouverez vos messages listés sous : 
   `Servers` > `[Votre Nom]` > `Databases` > `mydb` > `Schemas` > `public` > `Tables` > `messages` (clic droit > View/Edit Data > All Rows).
