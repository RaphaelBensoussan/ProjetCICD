# Commandes du projet

Démarrer tout le projet en arrière-plan (construction et lancement) :
```bash
docker compose up --build -d
```

Arrêter et supprimer les conteneurs :
```bash
docker compose down
```

*`127.0.0.1 front.local` et `127.0.0.1 back.local` dans votre fichier `C:\Windows\System32\drivers\etc\hosts` en tant qu'administrateur*

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
