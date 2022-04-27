-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Apr 27, 2022 at 12:10 PM
-- Server version: 8.0.28
-- PHP Version: 8.0.15

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
DROP DATABASE IF EXISTS `ebn_database`;
CREATE DATABASE IF NOT EXISTS `ebn_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `ebn_database`;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `siret` int DEFAULT NULL,
  `nomCommercial` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) NOT NULL,
  `utilisateurId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3ec2749d1f834e4324f496358bf` (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `siret`, `nomCommercial`, `adresse`, `utilisateurId`) VALUES
(1, 1256322929, 'Tacos-Pacos', '96 rue des maronniers 68200 Mulhouse', 2),
(2, 1354294822, 'Les fraises de la pomme', '43 route des chaudrons 68200 Mulhouse', 3);

-- --------------------------------------------------------

--
-- Table structure for table `client_type_dechet_type_dechet`
--

DROP TABLE IF EXISTS `client_type_dechet_type_dechet`;
CREATE TABLE IF NOT EXISTS `client_type_dechet_type_dechet` (
  `clientId` int NOT NULL,
  `typeDechetId` int NOT NULL,
  PRIMARY KEY (`clientId`,`typeDechetId`),
  KEY `IDX_ae00399606d83b91408c621ede` (`clientId`),
  KEY `IDX_6f14d7e05de3f15627e24cb43a` (`typeDechetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client_type_dechet_type_dechet`
--

INSERT INTO `client_type_dechet_type_dechet` (`clientId`, `typeDechetId`) VALUES
(1, 2),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `collecteur`
--

DROP TABLE IF EXISTS `collecteur`;
CREATE TABLE IF NOT EXISTS `collecteur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numeroCollecteur` int NOT NULL,
  `numeroVelo` int NOT NULL,
  `utilisateurId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_54830e3312b7abd77823ef03537` (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `collecteur`
--

INSERT INTO `collecteur` (`id`, `numeroCollecteur`, `numeroVelo`, `utilisateurId`) VALUES
(1, 1, 1, 4),
(2, 2, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `conteneur`
--

DROP TABLE IF EXISTS `conteneur`;
CREATE TABLE IF NOT EXISTS `conteneur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capaciteMax` int NOT NULL,
  `isAvailable` tinyint NOT NULL,
  `typeDechetId` int DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f104ea7409f4585dae3f85c71b0` (`typeDechetId`),
  KEY `FK_0f0a66ab8ad3f27201ea994751b` (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `conteneur`
--

INSERT INTO `conteneur` (`id`, `capaciteMax`, `isAvailable`, `typeDechetId`, `clientId`) VALUES
(1, 25, 0, 1, 2),
(2, 10, 0, 2, 2),
(3, 10, 0, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `etape`
--

DROP TABLE IF EXISTS `etape`;
CREATE TABLE IF NOT EXISTS `etape` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `isCollected` tinyint NOT NULL DEFAULT '0',
  `commentaire` varchar(255) NOT NULL,
  `clientId` int NOT NULL,
  `collecteurId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c23d964d437e86cca810edde374` (`collecteurId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `etape`
--

INSERT INTO `etape` (`id`, `date`, `isCollected`, `commentaire`, `clientId`, `collecteurId`) VALUES
(1, '2022-05-03 15:52:05', 0, '', 1, 1),
(2, '2022-05-02 13:53:38', 0, '', 1, 2),
(3, '2022-05-06 13:52:05', 0, '', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `historique`
--

DROP TABLE IF EXISTS `historique`;
CREATE TABLE IF NOT EXISTS `historique` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeAction` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `typeDeDechet` varchar(255) NOT NULL,
  `commentaire` varchar(255) NOT NULL,
  `poids` int NOT NULL,
  `clientId` int DEFAULT NULL,
  `collecteurId` int DEFAULT NULL,
  `conteneurId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_48ba178170f756eee7f1d3c607c` (`clientId`),
  KEY `FK_ff12d0cf8dd1b5dfa287e460322` (`collecteurId`),
  KEY `FK_28ced590bd2eeec2e5e55625bd5` (`conteneurId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `historique`
--

INSERT INTO `historique` (`id`, `typeAction`, `date`, `typeDeDechet`, `commentaire`, `poids`, `clientId`, `collecteurId`, `conteneurId`) VALUES
(1, 'Remise de conteneur', '2022-04-27 12:03:11', 'Biodéchets', 'Remise d\'un sceau de biodéchets au client tacos-pacos', 25, 1, 1, 1),
(2, 'Remise de conteneur', '2022-04-28 14:03:09', 'Marc de café', 'Remise d\'un sceau de marc de café au client tacos-pacos', 10, 1, 1, 2),
(3, 'Remise de conteneur', '2022-04-28 16:04:42', 'Marc de café', 'Remise d\'un sceau de marc de café au client les fraises de la pomme', 10, 2, 2, 3),
(4, 'Récupération de conteneur', '2022-05-02 14:04:42', 'Biodéchets', 'Le sceau récupéré chez le client tacos-pacos à un poids légérement supérieur au sceau.', 27, 1, 1, 1),
(5, 'Récupération de conteneur', '2022-05-06 14:06:49', 'Marc de café', '', 10, 2, 1, 2),
(6, 'Récupération de conteneur', '2022-05-10 14:06:49', 'Marc de café', 'Le sceau est fissuré', 10, 1, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `ramassage_abonnement`
--

DROP TABLE IF EXISTS `ramassage_abonnement`;
CREATE TABLE IF NOT EXISTS `ramassage_abonnement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateReference` datetime NOT NULL,
  `periodicite` int NOT NULL,
  `clientId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3d2ff0c939fb14c6aab339b3926` (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ramassage_abonnement`
--

INSERT INTO `ramassage_abonnement` (`id`, `dateReference`, `periodicite`, `clientId`) VALUES
(1, '2022-05-02 13:53:03', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ramassage_ponctuel`
--

DROP TABLE IF EXISTS `ramassage_ponctuel`;
CREATE TABLE IF NOT EXISTS `ramassage_ponctuel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `clientId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9160c1593d2826e80af8c011bea` (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ramassage_ponctuel`
--

INSERT INTO `ramassage_ponctuel` (`id`, `date`, `clientId`) VALUES
(1, '2022-05-03 15:52:28', 1),
(2, '2022-05-06 13:52:28', 2);

-- --------------------------------------------------------

--
-- Table structure for table `type_dechet`
--

DROP TABLE IF EXISTS `type_dechet`;
CREATE TABLE IF NOT EXISTS `type_dechet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeDechets` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `utilisateur` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `role`, `utilisateur`, `password`, `nom`, `prenom`, `mail`, `telephone`) VALUES
(1, 'Admin', 'MarcoLeResto', '.123azerty123.', 'Lorenzo', 'Marco', 'lorenzo_marco@gmail.com', '1234567890'),
(2, 'Client', 'FlorianG', 'motdepasse', 'Georges', 'Florian', 'flogeo@gmail.com', '1234567890'),
(3, 'Client', 'BryanC', 'pasmotdepasse', 'Chaine', 'Bryan', 'brycha@gmail.com', '1234567890'),
(4, 'Collecteur', 'Anes_L_Indien', 'JeSuisIndien', 'Vucelj', 'Anes', 'bombaydu92@gmail.com', '1234567890'),
(5, 'Collecteur', 'Motoyasu', 'jesuiscredule', 'Adjei', 'Kojo', 'kojadj@gmail.com', '1234567890');

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
  ADD CONSTRAINT `FK_0f0a66ab8ad3f27201ea994751b` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `FK_f104ea7409f4585dae3f85c71b0` FOREIGN KEY (`typeDechetId`) REFERENCES `type_dechet` (`id`);

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
