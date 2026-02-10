# GameVault

Application web pour gerer sa collection de jeux video et decouvrir celles des autres joueurs.

## Stack technique

- Next.js 16 (App Router)
- TypeScript
- Prisma 7 + Neon PostgreSQL
- Clerk (authentification)
- Tailwind CSS
- RAWG.io API (recherche de jeux)

## Installation

```bash
# cloner le repo
git clone https://github.com/sam87999/service-web-devoir-gamevault.git
cd devoir_bonus

# installer les dependances
npm install

# generer le client prisma
npx prisma generate

# appliquer les migrations
npx prisma migrate dev

# lancer le serveur de dev
npm run dev
```

L'app sera disponible sur `http://localhost:3000`.

## Configuration .env

Creer un fichier `.env` a la racine du projet avec les cles suivantes :

```env
# Base de donnees Neon PostgreSQL
DATABASE_URL="postgresql://..."

# Clerk (authentification)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# RAWG.io API (recherche de jeux)
RAWG_API_KEY=...
```

- **DATABASE_URL** : URL de connexion a la base Neon (disponible dans le dashboard Neon)
- **Clerk** : Cles disponibles dans le dashboard Clerk (clerk.com)
- **RAWG_API_KEY** : Cle API gratuite depuis rawg.io/apidocs

## Fonctionnalites

- Inscription / connexion avec Clerk
- Ajouter, modifier et supprimer des jeux dans sa collection
- Recherche de jeux via l'API RAWG avec auto-completion
- Dashboard avec statistiques (total jeux, note moyenne, plateforme top, etc.)
- Page explore pour voir les collections publiques avec filtres (plateforme, statut)
