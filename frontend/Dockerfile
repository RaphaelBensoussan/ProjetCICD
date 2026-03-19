# Étape 1 : Construction de l'application React
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Construire l'application (les fichiers statiques seront générés dans le dossier 'dist')
RUN npm run build

# Étape 2 : Servir avec nginx
FROM nginx:alpine

# Copier le build de l'étape précédente dans le répertoire par défaut de nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
