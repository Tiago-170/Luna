SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `administrateur_serveur` (
  `id_administrateur` int(11) NOT NULL,
  `serveur_id` bigint(20) NOT NULL,
  `utilisateur_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `comptage` (
  `salon_id` bigint(20) NOT NULL,
  `nombre` int(11) DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `utilisateur_id` bigint(20) DEFAULT NULL,
  `serveur_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `conversation` (
  `conversation_id` int(11) NOT NULL,
  `utilisateur_id` bigint(20) DEFAULT NULL,
  `serveur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `memoire` (
  `id_memoire` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT current_timestamp(),
  `utilisateur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `message` (
  `id_message` bigint(20) NOT NULL,
  `contenu` text DEFAULT NULL,
  `date_message` datetime NOT NULL DEFAULT current_timestamp(),
  `bot` tinyint(1) NOT NULL,
  `utilisateur_id` bigint(20) DEFAULT NULL,
  `conversation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `serveur` (
  `serveur_id` bigint(20) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `icon_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `utilisateur` (
  `utilisateur_id` bigint(20) NOT NULL,
  `pseudo` varchar(150) NOT NULL,
  `icon_url` text DEFAULT NULL,
  `code_connexion` varchar(10) DEFAULT NULL,
  `date_expiration_code` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `administrateur_serveur`
  ADD PRIMARY KEY (`id_administrateur`),
  ADD UNIQUE KEY `id_administrateur` (`id_administrateur`),
  ADD UNIQUE KEY `uq_admin_serveur` (`serveur_id`,`utilisateur_id`),
  ADD KEY `idx_utilisateur_id` (`utilisateur_id`);

ALTER TABLE `comptage`
  ADD PRIMARY KEY (`salon_id`),
  ADD UNIQUE KEY `serveur_id_1` (`serveur_id`),
  ADD KEY `utilisateur_id_1` (`utilisateur_id`);

ALTER TABLE `conversation`
  ADD PRIMARY KEY (`conversation_id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `serveur_id` (`serveur_id`);

ALTER TABLE `memoire`
  ADD PRIMARY KEY (`id_memoire`),
  ADD UNIQUE KEY `utilisateur_id` (`utilisateur_id`);

ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `conversation_id` (`conversation_id`);

ALTER TABLE `serveur`
  ADD PRIMARY KEY (`serveur_id`);

ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`utilisateur_id`);

ALTER TABLE `administrateur_serveur`
  MODIFY `id_administrateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=430;

ALTER TABLE `conversation`
  MODIFY `conversation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `memoire`
  MODIFY `id_memoire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

ALTER TABLE `administrateur_serveur`
  ADD CONSTRAINT `administrateur_serveur_ibfk_1` FOREIGN KEY (`serveur_id`) REFERENCES `serveur` (`serveur_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `administrateur_serveur_ibfk_2` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `comptage`
  ADD CONSTRAINT `serveur_id_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveur` (`serveur_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `utilisateur_id_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `conversation`
  ADD CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`),
  ADD CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`serveur_id`) REFERENCES `serveur` (`serveur_id`);

ALTER TABLE `memoire`
  ADD CONSTRAINT `memoire_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`);

ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`conversation_id`);
COMMIT;