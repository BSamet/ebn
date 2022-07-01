-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: dev-database
-- Generation Time: Jun 14, 2022 at 08:48 AM
-- Server version: 8.0.29
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebn_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int NOT NULL,
  `siret` int DEFAULT NULL,
  `nomCommercial` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) NOT NULL,
  `utilisateurId` int DEFAULT NULL,
  `clientvalide` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `siret`, `nomCommercial`, `adresse`, `utilisateurId`, `clientvalide`) VALUES
(3, NULL, 'Tacos-Pacos', '1 rue du Général de Gaule 68200 Mulhouse', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `client_type_dechet_type_dechet`
--

CREATE TABLE `client_type_dechet_type_dechet` (
  `clientId` int NOT NULL,
  `typeDechetId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collecteur`
--

CREATE TABLE `collecteur` (
  `id` int NOT NULL,
  `numeroVelo` int DEFAULT NULL,
  `utilisateurId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `collecteur`
--

INSERT INTO `collecteur` (`id`, `numeroVelo`, `utilisateurId`) VALUES
(1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `conteneur`
--

CREATE TABLE `conteneur` (
  `id` int NOT NULL,
  `capaciteMax` int NOT NULL,
  `isAvailable` tinyint NOT NULL,
  `typeDechetId` int DEFAULT NULL,
  `clientId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `conteneur`
--

INSERT INTO `conteneur` (`id`, `capaciteMax`, `isAvailable`, `typeDechetId`, `clientId`) VALUES
(1, 10, 1, 1, NULL),
(2, 15, 0, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `etape`
--

CREATE TABLE `etape` (
  `id` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `isCollected` tinyint NOT NULL DEFAULT '0',
  `commentaire` varchar(255) DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `collecteurId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historique`
--

CREATE TABLE `historique` (
  `id` int NOT NULL,
  `typeAction` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `typeDeDechet` varchar(255) NOT NULL,
  `commentaire` varchar(255) NOT NULL,
  `poids` int NOT NULL,
  `clientId` int DEFAULT NULL,
  `collecteurId` int DEFAULT NULL,
  `conteneurId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `historique`
--

INSERT INTO `historique` (`id`, `typeAction`, `date`, `typeDeDechet`, `commentaire`, `poids`, `clientId`, `collecteurId`, `conteneurId`) VALUES
(2, 'Récupération de seau', '2022-06-13 10:46:18', 'Biodéchets', 'RAS', 10, 3, 1, 1),
(3, 'Dépot de seau', '2022-06-13 10:48:18', 'Marc de café', 'Dépot de seau', 0, 3, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `type_dechet`
--

CREATE TABLE `type_dechet` (
  `id` int NOT NULL,
  `typeDechets` varchar(255) NOT NULL,
  `prixKg` float NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `type_dechet`
--

INSERT INTO `type_dechet` (`id`, `typeDechets`) VALUES
(1, 'Biodéchets'),
(2, 'Marc de café');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int NOT NULL,
  `role` enum('Admin','Collecteur','Client') NOT NULL DEFAULT 'Client',
  `password` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `role`, `password`, `nom`, `prenom`, `mail`, `telephone`) VALUES
(1, 'Admin', '$2a$12$ztucK4c/A/.Vvrn9ricgau7i.7r/3pvsNYzWIM1Lo75tHmflq20Qu', 'Admin', 'Admin', 'admin@ebn.com', '0606060606'),
(2, 'Collecteur', '$2a$12$zLcRaTUBsf8da/q1BOiWpuTM4OPvuCjOgo2TqNFzUxJnsxg2g7nJG', 'Dupont', 'Sébastien', 'dupont@gmail.com', '070707070707'),
(3, 'Client', '$2a$12$gRoU2aciDqFTdWyvKOybAux7tyG6juBRrO1HhbtvOSii/fSmEP8Ji', 'Durant', 'Maurice', 'durant@gmail.com', '070707070707');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3ec2749d1f834e4324f496358bf` (`utilisateurId`);

--
-- Indexes for table `client_type_dechet_type_dechet`
--
ALTER TABLE `client_type_dechet_type_dechet`
  ADD PRIMARY KEY (`clientId`,`typeDechetId`),
  ADD KEY `IDX_ae00399606d83b91408c621ede` (`clientId`),
  ADD KEY `IDX_6f14d7e05de3f15627e24cb43a` (`typeDechetId`);

--
-- Indexes for table `collecteur`
--
ALTER TABLE `collecteur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_54830e3312b7abd77823ef03537` (`utilisateurId`);

--
-- Indexes for table `conteneur`
--
ALTER TABLE `conteneur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f104ea7409f4585dae3f85c71b0` (`typeDechetId`),
  ADD KEY `FK_0f0a66ab8ad3f27201ea994751b` (`clientId`);

--
-- Indexes for table `etape`
--
ALTER TABLE `etape`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d0a0b787dbb78da18661d0ef407` (`clientId`),
  ADD KEY `FK_c23d964d437e86cca810edde374` (`collecteurId`);

--
-- Indexes for table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_48ba178170f756eee7f1d3c607c` (`clientId`),
  ADD KEY `FK_ff12d0cf8dd1b5dfa287e460322` (`collecteurId`),
  ADD KEY `FK_28ced590bd2eeec2e5e55625bd5` (`conteneurId`);

--
-- Indexes for table `type_dechet`
--
ALTER TABLE `type_dechet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_ee3917542926f92929755fc8d1` (`mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `collecteur`
--
ALTER TABLE `collecteur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `conteneur`
--
ALTER TABLE `conteneur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `etape`
--
ALTER TABLE `etape`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historique`
--
ALTER TABLE `historique`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ramassage_abonnement`
--
ALTER TABLE `ramassage_abonnement`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ramassage_ponctuel`
--
ALTER TABLE `ramassage_ponctuel`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `type_dechet`
--
ALTER TABLE `type_dechet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `FK_3ec2749d1f834e4324f496358bf` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_type_dechet_type_dechet`
--
ALTER TABLE `client_type_dechet_type_dechet`
  ADD CONSTRAINT `FK_6f14d7e05de3f15627e24cb43a4` FOREIGN KEY (`typeDechetId`) REFERENCES `type_dechet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ae00399606d83b91408c621edea` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `collecteur`
--
ALTER TABLE `collecteur`
  ADD CONSTRAINT `FK_54830e3312b7abd77823ef03537` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `conteneur`
--
ALTER TABLE `conteneur`
  ADD CONSTRAINT `FK_0f0a66ab8ad3f27201ea994751b` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f104ea7409f4585dae3f85c71b0` FOREIGN KEY (`typeDechetId`) REFERENCES `type_dechet` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `etape`
--
ALTER TABLE `etape`
  ADD CONSTRAINT `FK_c23d964d437e86cca810edde374` FOREIGN KEY (`collecteurId`) REFERENCES `collecteur` (`id`),
  ADD CONSTRAINT `FK_d0a0b787dbb78da18661d0ef407` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `historique`
--
ALTER TABLE `historique`
  ADD CONSTRAINT `FK_28ced590bd2eeec2e5e55625bd5` FOREIGN KEY (`conteneurId`) REFERENCES `conteneur` (`id`),
  ADD CONSTRAINT `FK_48ba178170f756eee7f1d3c607c` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `FK_ff12d0cf8dd1b5dfa287e460322` FOREIGN KEY (`collecteurId`) REFERENCES `collecteur` (`id`);

--
-- Constraints for table `ramassage_abonnement`
--
ALTER TABLE `ramassage_abonnement`
  ADD CONSTRAINT `FK_3d2ff0c939fb14c6aab339b3926` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);

--
-- Constraints for table `ramassage_ponctuel`
--
ALTER TABLE `ramassage_ponctuel`
  ADD CONSTRAINT `FK_9160c1593d2826e80af8c011bea` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
