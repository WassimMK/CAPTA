# CAPTA

CAPTA (Crypto Alert Price Tracking API) est une API REST développée avec Node.js permettant de suivre le prix des cryptomonnaies et de créer des alertes personnalisées. Lorsqu'un prix atteint une valeur définie par l'utilisateur, l'alerte est détectée automatiquement par un service exécuté en arrière-plan.

Le projet a été réalisé dans le cadre d'un apprentissage autour des API REST, de la gestion des utilisateurs, de Redis et de l'intégration d'API externes.

---

## Fonctionnalités

- Authentification des utilisateurs avec JWT
- Gestion sécurisée des mots de passe (bcrypt)
- Consultation du prix actuel des cryptomonnaies
- Création et gestion d'alertes de prix
- Vérification automatique des alertes grâce à un worker en arrière-plan
- Mise en cache des données avec Redis
- Stockage des informations dans MySQL

---

## Technologies utilisées

- Node.js
- Express.js
- MySQL
- Redis
- JWT
- bcryptjs
- Axios
- CoinGecko API

---

## Structure du projet

```
src/
│
├── config/          # Configuration MySQL et Redis
├── controllers/     # Logique métier
├── middlewares/     # Authentification et gestion des erreurs
├── models/          # Accès aux données
├── routes/          # Routes API
├── services/        # Communication avec CoinGecko
├── utils/           # Utilitaires
├── workers/         # Surveillance automatique des alertes
│
├── app.js
└── server.js
```

---

## Installation

Cloner le projet :

```bash
git clone <repository-url>
cd CAPTA
```

Installer les dépendances :

```bash
npm install
```

---

## Configuration

Créer un fichier `.env` contenant les informations nécessaires :

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=capta

JWT_SECRET=your_secret_key

REDIS_HOST=localhost
REDIS_PORT=6379
```

Avant de lancer l'application, vérifier que :

- MySQL est démarré
- Redis est en cours d'exécution
- la base de données existe

---

## Lancer le projet

Mode développement :

```bash
npm run dev
```

Mode production :

```bash
npm start
```

Une fois lancé, l'API est accessible sur :

```
http://localhost:3000
```

---

## Routes principales

### Authentification

| Méthode | Route |
|---------|-------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

### Cryptomonnaies

| Méthode | Route |
|---------|-------|
| GET | `/api/crypto/...` |

### Alertes

| Méthode | Route |
|---------|-------|
| POST | `/api/alerts` |
| GET | `/api/alerts` |
| DELETE | `/api/alerts/:id` |

---

## Fonctionnement

Lorsqu'un utilisateur crée une alerte, celle-ci est enregistrée dans la base de données.

Un worker s'exécute en arrière-plan et récupère régulièrement les prix des cryptomonnaies via l'API CoinGecko. Si le prix demandé est atteint, l'alerte est détectée automatiquement.

Afin de limiter les appels vers l'API externe, les données sont temporairement mises en cache avec Redis.

---

## Améliorations possibles

- Notifications par e-mail
- Notifications Telegram ou Discord
- Tableau de bord web
- Historique des alertes
- Support de plusieurs plateformes d'échange
- Déploiement avec Docker

---

## Auteur

Projet réalisé dans le cadre d'un apprentissage de Node.js, Express et du développement d'API REST.