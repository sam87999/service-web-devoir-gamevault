# PLAN.md -- GameVault

## 1. Contexte du devoir

- **Cours** : Services Web -- College de Maisonneuve (Hiver 2026)
- **Duree** : 3 heures chronometrees
- **Equipe** : 2-3 personnes
- **Bareme** : /100 points + bonus
- **Stack** : Next.js 14+ (App Router), TypeScript, Prisma, Neon PostgreSQL, Clerk, Tailwind CSS, Git/GitHub

---

## 2. Objectifs MVP (Minimum Viable Product)

Le MVP doit couvrir **tous les criteres du bareme principal** avant tout bonus :

1. Base de donnees Prisma + Neon fonctionnelle (12 pts)
2. Authentification Clerk complete (15 pts)
3. Server Actions CRUD operationnelles (23 pts)
4. Interface utilisateur fonctionnelle et responsive (27 pts)
5. Qualite code + Git (13 pts)

**Total cible : 90/100 points (realiste en 3h)**

---

## 3. Strategie 3 heures

| Bloc | Duree | Taches | Points vises |
|------|-------|--------|--------------|
| **BLOC 1 - Setup** | 0:00-0:30 | Init Next.js, Prisma, Clerk, Neon, Git | 12 + 5 pts |
| **BLOC 2 - Auth** | 0:30-1:00 | Middleware, routes, ClerkProvider, layout | 10 pts |
| **BLOC 3 - CRUD** | 1:00-1:45 | Server Actions (5 fonctions), formulaires | 23 pts |
| **BLOC 4 - UI** | 1:45-2:30 | Pages (dashboard, add, explore, home), stats | 27 pts |
| **BLOC 5 - Polish** | 2:30-2:50 | Responsive, feedback visuel, cohérence | 10 pts |
| **BLOC 6 - Git** | 2:50-3:00 | Commits finaux, README, verification | 3 pts |

---

## 4. Architecture du projet

```
src/
  app/
    layout.tsx              # ClerkProvider + navbar globale
    page.tsx                # Page d'accueil (/)
    sign-in/[[...sign-in]]/
      page.tsx              # Page connexion Clerk
    sign-up/[[...sign-up]]/
      page.tsx              # Page inscription Clerk
    dashboard/
      page.tsx              # Liste jeux + stats (PROTEGEE)
      add/
        page.tsx            # Formulaire ajout (PROTEGEE)
    explore/
      page.tsx              # Jeux publics + filtres
  actions/
    games.ts                # 5 Server Actions obligatoires
  components/
    Navbar.tsx              # Navigation globale
    GameCard.tsx            # Carte de jeu reutilisable
    StatsCards.tsx          # Cartes statistiques dashboard
    GameForm.tsx            # Formulaire ajout/edition
  lib/
    prisma.ts               # Client Prisma singleton
  middleware.ts              # Middleware Clerk
prisma/
  schema.prisma              # Schema avec Game, enums
.env                         # Variables d'environnement
```

---

## 5. Etapes detaillees avec checklist

### BLOC 1 -- Setup (0:00 - 0:30) [17 pts]

- [ ] **1.1** Creer projet Next.js 14+ avec TypeScript + Tailwind + App Router
- [ ] **1.2** Initialiser Git + premier commit
- [ ] **1.3** Installer Prisma + configurer connexion Neon PostgreSQL
- [x] **1.4** Ecrire schema.prisma (enums GameStatus, Platform + model Game)
- [ ] **1.5** Executer `prisma generate` + `prisma db push`
- [ ] **1.6** Creer `src/lib/prisma.ts` (client singleton)
- [ ] **1.7** Installer + configurer Clerk (env vars, ClerkProvider)
- [ ] **1.8** Commit : "feat: setup projet + prisma + clerk"

### BLOC 2 -- Authentification Clerk (0:30 - 1:00) [15 pts]

- [ ] **2.1** Configurer `middleware.ts` (routes publiques : /, /sign-in, /sign-up, /explore)
- [ ] **2.2** Creer page `/sign-in/[[...sign-in]]/page.tsx`
- [ ] **2.3** Creer page `/sign-up/[[...sign-up]]/page.tsx`
- [ ] **2.4** Layout global : ClerkProvider avec localisation frFR
- [ ] **2.5** Navbar : SignedIn, SignedOut, UserButton, liens navigation
- [ ] **2.6** Verifier : routes protegees redirigent bien vers sign-in
- [ ] **2.7** Commit : "feat: authentification Clerk complete"

### BLOC 3 -- Server Actions CRUD (1:00 - 1:45) [23 pts]

- [ ] **3.1** `addGame(data)` -- avec auth(), validation, revalidatePath
- [ ] **3.2** `getUserGames()` -- avec auth(), filtre userId
- [ ] **3.3** `updateGame(gameId, data)` -- avec auth(), verif ownership
- [ ] **3.4** `deleteGame(gameId)` -- avec auth(), verif ownership
- [ ] **3.5** `getPublicGames()` -- sans auth, filtre isPublic
- [ ] **3.6** Formulaire d'ajout `/dashboard/add` avec validation client
- [ ] **3.7** Tester toutes les actions (ajout, modif, suppression)
- [ ] **3.8** Commit : "feat: server actions CRUD completes"

### BLOC 4 -- Interface utilisateur (1:45 - 2:30) [27 pts]

- [ ] **4.1** Page d'accueil `/` -- hero, CTA vers dashboard/explore
- [ ] **4.2** Dashboard `/dashboard` -- liste des jeux avec GameCard
- [ ] **4.3** GameCard -- affichage titre, plateforme, statut, note, actions (modifier statut, supprimer)
- [ ] **4.4** Statistiques dashboard : total jeux, repartition statut, note moyenne, plateforme top
- [ ] **4.5** StatsCards -- cartes visuelles Tailwind
- [ ] **4.6** Page `/explore` -- jeux publics avec filtres (plateforme, statut)
- [ ] **4.7** Feedback visuel : loading states, confirmations suppression
- [ ] **4.8** Commit : "feat: interface utilisateur complete"

### BLOC 5 -- Polish & Responsive (2:30 - 2:50) [10 pts]

- [ ] **5.1** Responsive mobile (navbar hamburger ou adaptation)
- [ ] **5.2** Theme coherent : palette couleurs, typographie
- [ ] **5.3** Etats vides (pas de jeux, pas de resultats explore)
- [ ] **5.4** Verification complete de toutes les fonctionnalites
- [ ] **5.5** Commit : "fix: polish responsive et UX"

### BLOC 6 -- Finalisation (2:50 - 3:00) [3 pts]

- [ ] **6.1** Verifier tous les commits sont clairs et descriptifs
- [ ] **6.2** Push final sur GitHub
- [ ] **6.3** Verification : l'app tourne sans erreur
- [ ] **6.4** PLAN.md a jour a 100%

---

## 6. Avancement global

| Bloc | Statut | Progression |
|------|--------|-------------|
| BLOC 1 - Setup | EN ATTENTE | 0% |
| BLOC 2 - Auth | EN ATTENTE | 0% |
| BLOC 3 - CRUD | EN ATTENTE | 0% |
| BLOC 4 - UI | EN ATTENTE | 0% |
| BLOC 5 - Polish | EN ATTENTE | 0% |
| BLOC 6 - Final | EN ATTENTE | 0% |
| **TOTAL** | **EN ATTENTE** | **0%** |

---

## 7. Journal de progression horodate

| Heure | Action | Resultat |
|-------|--------|----------|
| -- | PLAN.md cree | Plan pret, en attente de validation |
| -- | schema.prisma complete | Enums + model Game conformes au bareme |
| -- | En attente du setup coequipier | Next.js + Tailwind + Clerk en cours d'install par teammate |

---

## 8. Points critiques avant remise

- [ ] Schema Prisma conforme au modele impose (enums + model exact)
- [ ] Middleware Clerk protege /dashboard et /dashboard/add
- [ ] Les 5 Server Actions fonctionnent correctement
- [ ] auth() utilise partout sauf getPublicGames
- [ ] revalidatePath apres chaque mutation
- [ ] Verification ownership sur update/delete
- [ ] Statistiques visibles sur le dashboard
- [ ] Page explore avec filtres fonctionnels
- [ ] Responsive mobile + desktop
- [ ] Commits Git clairs et reguliers

---

## 9. Decisions techniques

- **Prisma singleton** : pattern standard pour eviter les connexions multiples en dev
- **Server Actions** : utilisation de `"use server"` dans un fichier dedie
- **Formulaires** : composants client avec `useFormStatus` pour feedback
- **Filtres explore** : query params URL pour filtrage cote serveur
- **Stats** : calculees cote serveur dans le composant dashboard (pas d'API separee)

---

## 10. Risques identifies

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Connexion Neon echoue | BLOQUANT | Avoir les credentials prets avant de commencer |
| Clerk config complexe | MOYEN | Suivre la doc officielle exactement |
| Temps insuffisant pour UI | HAUT | Prioriser fonctionnel > esthetique |
| Bug Server Actions | HAUT | Tester chaque action individuellement |
