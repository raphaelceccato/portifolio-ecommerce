-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.29 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ecommerce
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce`;

-- Dumping structure for table ecommerce.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table ecommerce.categorias: ~2 rows (approximately)
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`id`, `nome`) VALUES
	(1, 'Lanches'),
	(3, 'Móveis'),
	(2, 'Vestuário');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Dumping structure for table ecommerce.produtos
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `preco` decimal(10,2) NOT NULL DEFAULT '0.00',
  `descricao` varchar(10000) NOT NULL DEFAULT '',
  `categoria_id` int NOT NULL,
  `estoque` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`),
  KEY `FK1_produto_categoria` (`categoria_id`),
  FULLTEXT KEY `descricao` (`descricao`),
  CONSTRAINT `FK1_produto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table ecommerce.produtos: ~7 rows (approximately)
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` (`id`, `nome`, `preco`, `descricao`, `categoria_id`, `estoque`) VALUES
	(1, 'Combo Hambúrguer + Batata + Refrigerante', 30.00, 'Um delicioso hambúrguer acompanhado de batata frita e um copo de refrigerante', 1, 10),
	(2, 'Batata Frita', 10.00, 'Uma deliciosa batata frita', 1, 5),
	(3, 'Refrigerante de Cola', 8.00, 'Refrigerante sabor cola', 1, 4),
	(4, 'Café com Açúcar', 5.00, 'Café quentinho na hora!', 1, 3),
	(5, 'Suco de Laranja', 6.00, 'Suco de laranja natural', 1, 15),
	(6, 'Camisa Polo Azul', 40.00, 'Camisa polo básica de malha', 2, 20),
	(7, 'Camisa Polo Amarela', 40.00, 'Camisa polo básica de malha', 2, 30),
	(8, 'Poltrona Azul', 300.00, 'Uma confortável e bonita poltrona na cor azul marinho', 3, 28),
	(9, 'Poltrona Vermelha', 300.00, 'Uma confortável e bonita poltrona na cor vermelha', 3, 30);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
