<div align="center">
    <img width="4492" height="432" alt="output-onlinetools(1)" src="https://github.com/user-attachments/assets/ef9e0dcd-7f37-4d2c-87cd-53d04941486c" />
</div>
<h1 align="center">Projet - Bot discord</h1>

Luna est un bot Discord qui était fait en Python et qui a été refait en JavaScript.

[lien d'installation discord](https://discord.com/oauth2/authorize?client_id=1438539563487465532)

<h2 align="center">Prérequis</h2>

- **Node.js**
- **npm**
- **Compte Discord**
- **Clé API Groq**

<h2 align="center">Installation</h2>

### 1. Cloner le projet
```bash
git clone https://github.com/Tiago-170/Luna.git
cd Luna/.bot/app
```

### 2. Installer les dépendances
```bash
npm install discord.js, dotenv, groq, mysql2, groq-sdk
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Token Discord du bot
TOKEN=

# Clés API Groq
GROK_API_1=

# Configuration de la base de données
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

### 4. Lancer le bot

```bash
npm start
# ou
node index.js
```

<h2 align="center">Architecture du projet</h2>

Ce projet utilise une **architecture MVC modifiée** en JavaScript pour correspondre aux besoins spécifiques du bot Discord.

![schéma d'une architecture MVC JavaScript adaptée](./.document/MVC_schema.png)

### Structure des dossiers

```
├── index.js                   # Point d'entrée
├── core/                      # Cœur du framework
│   ├── Client.js              # Configuration Discord.js
│   ├── Controller.js          # Contrôleur de base
│   ├── Database.js            # Gestion de la bdd
│   ├── Model.js               # Modèle de base
│   └── Router.js              # Routeur d'événements
├── controllers/               # Contrôleurs de l'app
├── models/                    # Modèles de données
├── services/                  # Services métier
├── events/                    # Gestion d'événements
│   └── readyEvent.js          # Événement de démarrage
├── commands/                  # Commandes slash du bot
└── variable/                  # Variables globales
    └── system_prompt.js       # Prompt système pour l'IA
```

<h2 align="center">Base de données</h2>

<div align="center">
    <img width="660" height="480" alt="image" src=".document/BDD_schema.png" />
</div>

```sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de données : `Luna`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur_serveur`
--

CREATE TABLE `administrateur_serveur` (
  `id_administrateur` int(11) NOT NULL,
  `serveur_id` bigint(20) NOT NULL,
  `utilisateur_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

----------------------------------------------------------

--
-- Structure de la table `comptage`
--

CREATE TABLE `comptage` (
  `salon_id` bigint(20) NOT NULL,
  `nombre` int(11) NOT NULL,
  `serveur_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

----------------------------------------------------------

--
-- Structure de la table `conversation`
--

CREATE TABLE `conversation` (
  `conversation_id` int(11) NOT NULL,
  `utilisateur_id` bigint(20) DEFAULT NULL,
  `serveur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

----------------------------------------------------------

--
-- Structure de la table `memoire`
--

CREATE TABLE `memoire` (
  `id_memoire` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT current_timestamp(),
  `utilisateur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

----------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_message` bigint(20) NOT NULL,
  `contenu` text DEFAULT NULL,
  `date_message` datetime NOT NULL DEFAULT current_timestamp(),
  `bot` tinyint(1) NOT NULL,
  `utilisateur_id` bigint(20) DEFAULT NULL,
  `conversation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-----------------------------------------------------------

--
-- Structure de la table `serveur`
--

CREATE TABLE `serveur` (
  `serveur_id` bigint(20) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `icon_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


----------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `utilisateur_id` bigint(20) NOT NULL,
  `pseudo` varchar(150) NOT NULL,
  `icon_url` text DEFAULT NULL,
  `code_connexion` varchar(10) DEFAULT NULL,
  `date_expiration_code` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur_serveur`
--
ALTER TABLE `administrateur_serveur`
  ADD PRIMARY KEY (`id_administrateur`),
  ADD UNIQUE KEY `id_administrateur` (`id_administrateur`),
  ADD UNIQUE KEY `uq_admin_serveur` (`serveur_id`,`utilisateur_id`),
  ADD KEY `idx_utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `comptage`
--
ALTER TABLE `comptage`
  ADD PRIMARY KEY (`salon_id`),
  ADD UNIQUE KEY `serveur_id_1` (`serveur_id`);

--
-- Index pour la table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`conversation_id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

--
-- Index pour la table `memoire`
--
ALTER TABLE `memoire`
  ADD PRIMARY KEY (`id_memoire`),
  ADD UNIQUE KEY `utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `conversation_id` (`conversation_id`);

--
-- Index pour la table `serveur`
--
ALTER TABLE `serveur`
  ADD PRIMARY KEY (`serveur_id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`utilisateur_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrateur_serveur`
--
ALTER TABLE `administrateur_serveur`
  MODIFY `id_administrateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;

--
-- AUTO_INCREMENT pour la table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `conversation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `memoire`
--
ALTER TABLE `memoire`
  MODIFY `id_memoire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `administrateur_serveur`
--
ALTER TABLE `administrateur_serveur`
  ADD CONSTRAINT `administrateur_serveur_ibfk_1` FOREIGN KEY (`serveur_id`) REFERENCES `serveur` (`serveur_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `administrateur_serveur_ibfk_2` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `comptage`
--
ALTER TABLE `comptage`
  ADD CONSTRAINT `serveur_id_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveur` (`serveur_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `conversation`
--
ALTER TABLE `conversation`
  ADD CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`),
  ADD CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveur` (`serveur_id`);

--
-- Contraintes pour la table `memoire`
--
ALTER TABLE `memoire`
  ADD CONSTRAINT `memoire_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`conversation_id`);
COMMIT;
```
