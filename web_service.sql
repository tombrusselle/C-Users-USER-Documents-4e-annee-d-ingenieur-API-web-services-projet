-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 12 Octobre 2018 à 18:22
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `web_service`
--

-- --------------------------------------------------------

--
-- Structure de la table `chambre`
--

CREATE TABLE IF NOT EXISTS `chambre` (
  `id_chambre` int(10) NOT NULL AUTO_INCREMENT,
  `capacite` int(10) NOT NULL,
  `seuil_critique` int(10) NOT NULL,
  `id_filtre` int(10) NOT NULL,
  PRIMARY KEY (`id_chambre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `chambre`
--

INSERT INTO `chambre` (`id_chambre`, `capacite`, `seuil_critique`, `id_filtre`) VALUES
(1, 2, 80, 1);

-- --------------------------------------------------------

--
-- Structure de la table `filtre`
--

CREATE TABLE IF NOT EXISTS `filtre` (
  `id_filtre` int(10) NOT NULL AUTO_INCREMENT,
  `qualite` int(10) NOT NULL,
  `perte_qualite` int(10) NOT NULL,
  PRIMARY KEY (`id_filtre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `filtre`
--

INSERT INTO `filtre` (`id_filtre`, `qualite`, `perte_qualite`) VALUES
(1, 100, 1);

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

CREATE TABLE IF NOT EXISTS `patient` (
  `id_patient` int(11) NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `date_naissance` date NOT NULL,
  `date_entre` date NOT NULL,
  PRIMARY KEY (`id_patient`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `patient`
--

INSERT INTO `patient` (`id_patient`, `nom`, `prenom`, `date_naissance`, `date_entre`) VALUES
(1, 'haik', 'haik', '2018-10-03', '2018-10-02');

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

CREATE TABLE IF NOT EXISTS `personnel` (
  `id_personnel` int(10) NOT NULL AUTO_INCREMENT,
  `prenom` text NOT NULL,
  `nom` text NOT NULL,
  `fonction` text NOT NULL,
  `salaire` int(10) NOT NULL,
  PRIMARY KEY (`id_personnel`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `personnel`
--

INSERT INTO `personnel` (`id_personnel`, `prenom`, `nom`, `fonction`, `salaire`) VALUES
(1, 'haik', 'haik', 'assistant tom', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
