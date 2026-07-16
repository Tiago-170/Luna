-- phpMyAdmin SQL Dump
-- version 5.2.2deb1+deb13u1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 16 juil. 2026 à 10:00
-- Version du serveur : 11.8.3-MariaDB-0+deb13u1 from Debian
-- Version de PHP : 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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

--
-- Déchargement des données de la table `administrateur_serveur`
--

INSERT INTO `administrateur_serveur` (`id_administrateur`, `serveur_id`, `utilisateur_id`) VALUES
(100, 1454529337700388919, 599193664614301705),
(101, 1454529337700388919, 1438539563487465532),
(102, 1454529337700388919, 1454527359154913496);

-- --------------------------------------------------------

--
-- Structure de la table `comptage`
--

CREATE TABLE `comptage` (
  `salon_id` bigint(20) NOT NULL,
  `nombre` int(11) DEFAULT 0,
  `utilisateur_id` bigint(20) DEFAULT NULL,
  `serveur_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comptage`
--

INSERT INTO `comptage` (`salon_id`, `nombre`, `utilisateur_id`, `serveur_id`) VALUES
(1457081074508107816, 0, NULL, 1454529337700388919);

-- --------------------------------------------------------

--
-- Structure de la table `conversation`
--

CREATE TABLE `conversation` (
  `conversation_id` int(11) NOT NULL,
  `utilisateur_id` bigint(20) DEFAULT NULL,
  `serveur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `conversation`
--

INSERT INTO `conversation` (`conversation_id`, `utilisateur_id`, `serveur_id`) VALUES
(1, NULL, 1454529337700388919);

-- --------------------------------------------------------

--
-- Structure de la table `memoire`
--

CREATE TABLE `memoire` (
  `id_memoire` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT current_timestamp(),
  `utilisateur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `memoire`
--

INSERT INTO `memoire` (`id_memoire`, `contenu`, `date_creation`, `utilisateur_id`) VALUES
(37, '22 ans, s\'appelle Noé, 3 chats, 4 frères', '2026-07-14 12:38:03', 599193664614301705),
(48, 'Tiago, 19 ans, aime les chats, 0 frère mentionné pour le moment', '2026-07-14 12:54:23', 1526540175809708083);

-- --------------------------------------------------------

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

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id_message`, `contenu`, `date_message`, `bot`, `utilisateur_id`, `conversation_id`) VALUES
(1526545693190258818, 'Salut, je m\'appelle comment ? j\'ai quel âge ? j\'ai combien de chats et de frère ?', '2026-07-14 13:07:36', 0, 599193664614301705, 1),
(1526545697438957610, 'Salut iamtiago ! Tu t\'appelles Noé, tu as 22 ans, 3 chats et 4 frères !', '2026-07-14 13:07:36', 1, NULL, 1),
(1526645027084963913, '/counter', '2026-07-14 19:42:19', 0, 1526540175809708083, 1),
(1526645031694237939, 'Tiago, t\'as 19 ans, et t\'aimes les chats !', '2026-07-14 19:42:19', 1, NULL, 1),
(1526645289304330331, 'et j\'ai combien de frère et soeur ?', '2026-07-14 19:43:21', 0, 1526540175809708083, 1),
(1526645293322338475, 'Zéro frère mentionné pour le moment, Tiago !', '2026-07-14 19:43:21', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `serveur`
--

CREATE TABLE `serveur` (
  `serveur_id` bigint(20) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `icon_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `serveur`
--

INSERT INTO `serveur` (`serveur_id`, `nom`, `icon_url`) VALUES
(1454529337700388919, 'Serveur de test pour luna', 'https://cdn.discordapp.com/icons/1454529337700388919/00d1c846f42818df2036c1ea0a0fdaa6.webp');

-- --------------------------------------------------------

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
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateur_id`, `pseudo`, `icon_url`, `code_connexion`, `date_expiration_code`) VALUES
(599193664614301705, 'iamtiago.', 'https://cdn.discordapp.com/avatars/599193664614301705/d69dcd8b652400787655a774f76dc6dd.webp', NULL, NULL),
(1438539563487465532, 'Luna', 'https://cdn.discordapp.com/avatars/1438539563487465532/8e33bf1af55725395bad15705fb679b2.webp', NULL, NULL),
(1454527359154913496, 'Luna Test', 'https://cdn.discordapp.com/avatars/1454527359154913496/2c1bfebffae464e2bfe773e4e15ccab7.webp', NULL, NULL),
(1526540175809708083, 'tiagogjdkl', 'https://cdn.discordapp.com/embed/avatars/4.png', NULL, NULL);

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
  ADD UNIQUE KEY `serveur_id_1` (`serveur_id`),
  ADD KEY `utilisateur_id_1` (`utilisateur_id`);

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
  MODIFY `id_administrateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=322;

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
  ADD CONSTRAINT `serveur_id_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveur` (`serveur_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `utilisateur_id_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
