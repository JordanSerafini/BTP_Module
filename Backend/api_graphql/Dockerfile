# Utiliser une image Node.js de base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port de l'application
EXPOSE 8787

# Lancer l'application
CMD ["npm", "run", "start:dev"]
