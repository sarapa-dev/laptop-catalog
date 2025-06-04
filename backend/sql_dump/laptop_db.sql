-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.41 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for laptop_db
DROP DATABASE IF EXISTS `laptop_db`;
CREATE DATABASE IF NOT EXISTS `laptop_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `laptop_db`;

-- Dumping structure for table laptop_db.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.category: ~3 rows (approximately)
INSERT INTO `category` (`category_id`, `name`) VALUES
	(1, 'Gaming'),
	(2, 'Business'),
	(3, 'MacBook');

-- Dumping structure for table laptop_db.display
DROP TABLE IF EXISTS `display`;
CREATE TABLE IF NOT EXISTS `display` (
  `display_id` int unsigned NOT NULL AUTO_INCREMENT,
  `manufacturer_id` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `size` int NOT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `type` enum('OLED','IPS','TN','miniLED','QD-OLED','VA') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`display_id`),
  KEY `fk_display_manufacturer_id` (`manufacturer_id`) USING BTREE,
  CONSTRAINT `fk_display_manufacturer1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.display: ~11 rows (approximately)
INSERT INTO `display` (`display_id`, `manufacturer_id`, `name`, `size`, `width`, `height`, `type`) VALUES
	(1, 7, '15.6 inch 144Hz Display', 15, 1920, 1080, 'IPS'),
	(2, 7, '16 inch 165Hz Display', 16, 2560, 1600, 'IPS'),
	(3, 7, '14 inch 60Hz Display', 14, 1920, 1200, 'IPS'),
	(4, 7, '16 inch 60Hz Display', 16, 1920, 1200, 'IPS'),
	(5, 7, '16 inch 240Hz Display', 16, 2560, 1600, 'IPS'),
	(6, 7, '14 inch 165Hz Display', 14, 2560, 1600, 'IPS'),
	(7, 8, '14 inch 120Hz OLED Display', 14, 2880, 1800, 'OLED'),
	(8, 8, '15.6 inch 60Hz OLED Display', 15, 1920, 1080, 'OLED'),
	(9, 7, '18 inch 240Hz Display', 18, 2560, 1600, 'IPS'),
	(10, 7, '15.6 inch 165Hz Display', 15, 2560, 1440, 'IPS'),
	(11, 10, '14.2 inch 120Hz Display', 14, 3024, 1964, 'miniLED'),
	(12, 10, '16 inch 120Hz Display', 16, 3456, 2234, 'miniLED');

-- Dumping structure for table laptop_db.favorite
DROP TABLE IF EXISTS `favorite`;
CREATE TABLE IF NOT EXISTS `favorite` (
  `favorite_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `laptop_id` int unsigned NOT NULL,
  PRIMARY KEY (`favorite_id`),
  KEY `fk_favorite_laptop_id` (`laptop_id`),
  KEY `fk_favorite_user_id` (`user_id`),
  CONSTRAINT `fk_favorite_laptop_id` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`laptop_id`),
  CONSTRAINT `fk_favorite_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.favorite: ~4 rows (approximately)
INSERT INTO `favorite` (`favorite_id`, `user_id`, `laptop_id`) VALUES
	(1, 2, 31),
	(2, 2, 15),
	(3, 3, 4),
	(4, 3, 15);

-- Dumping structure for table laptop_db.gpu
DROP TABLE IF EXISTS `gpu`;
CREATE TABLE IF NOT EXISTS `gpu` (
  `gpu_id` int unsigned NOT NULL AUTO_INCREMENT,
  `manufacturer_id` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `vram` int NOT NULL,
  `tdp` int NOT NULL,
  `type` enum('INTEGRATED','DEDICATED') NOT NULL,
  PRIMARY KEY (`gpu_id`),
  KEY `fk_gpu_manufacturer_id` (`manufacturer_id`) USING BTREE,
  CONSTRAINT `fk_gpu_manufacturer1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.gpu: ~9 rows (approximately)
INSERT INTO `gpu` (`gpu_id`, `manufacturer_id`, `name`, `vram`, `tdp`, `type`) VALUES
	(1, 2, 'RTX 4060', 8, 105, 'DEDICATED'),
	(2, 2, 'RTX 4070', 8, 140, 'DEDICATED'),
	(3, 1, 'Radeon 680M', 4, 50, 'INTEGRATED'),
	(4, 1, 'Radeon 780M', 4, 15, 'INTEGRATED'),
	(5, 1, 'Radeon 760M', 2, 15, 'INTEGRATED'),
	(6, 2, 'RTX 4090', 16, 175, 'DEDICATED'),
	(7, 1, 'Vega 7', 2, 15, 'INTEGRATED'),
	(8, 5, 'Iris Xe Graphics G7', 8, 15, 'INTEGRATED'),
	(9, 10, 'Apple M4 iGPU', 24, 20, 'INTEGRATED');

-- Dumping structure for table laptop_db.laptop
DROP TABLE IF EXISTS `laptop`;
CREATE TABLE IF NOT EXISTS `laptop` (
  `laptop_id` int unsigned NOT NULL AUTO_INCREMENT,
  `manufacturer_id` int unsigned NOT NULL,
  `storage_id` int unsigned NOT NULL,
  `processor_id` int unsigned NOT NULL,
  `gpu_id` int unsigned NOT NULL,
  `display_id` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `price` int unsigned DEFAULT NULL,
  PRIMARY KEY (`laptop_id`),
  KEY `fk_laptop_manufacturer_id` (`manufacturer_id`) USING BTREE,
  KEY `fk_laptop_storage_id` (`storage_id`) USING BTREE,
  KEY `fk_laptop_processor_id` (`processor_id`) USING BTREE,
  KEY `fk_laptop_gpu_id` (`gpu_id`) USING BTREE,
  KEY `fk_laptop_display_id` (`display_id`) USING BTREE,
  KEY `fk_laptop_category_id` (`category_id`) USING BTREE,
  CONSTRAINT `fk_laptop_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `fk_laptop_display1` FOREIGN KEY (`display_id`) REFERENCES `display` (`display_id`),
  CONSTRAINT `fk_laptop_gpu1` FOREIGN KEY (`gpu_id`) REFERENCES `gpu` (`gpu_id`),
  CONSTRAINT `fk_laptop_manufacturer` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`),
  CONSTRAINT `fk_laptop_processor1` FOREIGN KEY (`processor_id`) REFERENCES `processor` (`processor_id`),
  CONSTRAINT `fk_laptop_storage1` FOREIGN KEY (`storage_id`) REFERENCES `storage` (`storage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.laptop: ~34 rows (approximately)
INSERT INTO `laptop` (`laptop_id`, `manufacturer_id`, `storage_id`, `processor_id`, `gpu_id`, `display_id`, `category_id`, `name`, `image_url`, `price`) VALUES
	(1, 4, 1, 1, 1, 1, 1, 'Lenovo LOQ 15ARP9', 'https://e-catalog.com/jpg_zoom1/2672490.jpg', 94999),
	(2, 4, 2, 2, 1, 1, 1, 'Lenovo LOQ 15AHP9', 'https://e-catalog.com/jpg_zoom1/2627591.jpg', 120000),
	(3, 4, 2, 2, 2, 2, 1, 'Lenovo Legion Slim 5 16AHP9', 'https://e-catalog.com/jpg_zoom1/2634670.jpg', 149999),
	(4, 4, 1, 1, 3, 3, 2, 'Lenovo ThinkBook 14 G7 ARP', 'https://e-catalog.com/jpg_zoom1/2744400.jpg', 89999),
	(5, 4, 2, 2, 4, 3, 2, 'Lenovo IdeaPad 5 14AHP9', 'https://e-catalog.com/jpg_zoom1/2627599.jpg', 79999),
	(6, 4, 2, 3, 5, 4, 2, 'Lenovo IdeaPad Slim 5 16AHP9', 'https://e-catalog.com/jpg_zoom1/2634670.jpg', 69999),
	(7, 4, 1, 3, 5, 4, 2, 'Lenovo IdeaPad 5 14AHP9', 'https://e-catalog.com/jpg_zoom1/2634590.jpg', 59999),
	(8, 4, 3, 4, 6, 5, 1, 'Lenovo Legion Pro 7 16IRX9H', 'https://e-catalog.com/jpg_zoom1/2616175.jpg', 349999),
	(9, 4, 3, 4, 2, 5, 1, 'Lenovo Legion Pro 5 16IRX9', 'https://e-catalog.com/jpg_zoom1/2610722.jpg', 169999),
	(10, 4, 1, 5, 7, 3, 2, 'Lenovo ThinkPad E14', 'https://e-catalog.com/jpg_zoom1/2602419.jpg', 69999),
	(11, 6, 2, 2, 1, 6, 1, 'Asus TUF Gaming A14', 'https://e-catalog.com/jpg_zoom1/2704773.jpg', 149999),
	(12, 6, 2, 2, 1, 7, 1, 'Asus ROG Zephyrus G14', 'https://e-catalog.com/jpg_zoom1/2608535.jpg', 199999),
	(13, 6, 1, 5, 7, 4, 2, 'Asus Vivobook 16 ', 'https://e-catalog.com/jpg_zoom1/2827114.jpg', 49999),
	(14, 6, 1, 5, 7, 8, 2, 'Asus Vivobook 15 OLED', 'https://e-catalog.com/jpg_zoom1/2684667.jpg', 54999),
	(15, 6, 2, 4, 1, 5, 1, 'Asus ROG Strix G16', 'https://e-catalog.com/jpg_zoom1/2608532.jpg', 170000),
	(16, 6, 2, 4, 2, 9, 1, 'Asus ROG Strix G18', 'https://e-catalog.com/jpg_zoom1/2608527.jpg', 219999),
	(17, 6, 2, 6, 8, 7, 2, 'Asus Zenbook Pro 14 Duo', 'https://e-catalog.com/jpg_zoom1/2202778.jpg', 119999),
	(18, 6, 2, 6, 8, 8, 2, 'Asus Vivobook S 15 OLED', 'https://e-catalog.com/jpg_zoom1/2199720.jpg', 99999),
	(19, 6, 2, 7, 2, 7, 1, 'Asus ROG Zephyrus G14', 'https://e-catalog.com/jpg_zoom1/2837194.jpg', 249999),
	(20, 6, 2, 7, 2, 10, 1, 'Asus TUF Gaming A15', 'https://e-catalog.com/jpg_zoom1/2607759.jpg', 229999),
	(21, 9, 2, 2, 2, 1, 1, 'MSI Katana A17', 'https://e-catalog.com/jpg_zoom1/2614183.jpg', 139999),
	(22, 9, 3, 4, 6, 9, 1, 'MSI Raider GE78 HX', 'https://e-catalog.com/jpg_zoom1/2610787.jpg', 299999),
	(23, 9, 2, 4, 2, 5, 1, 'MSI Vector 16 HX', 'https://e-catalog.com/jpg_zoom1/2612963.jpg', 199999),
	(24, 9, 2, 7, 2, 1, 1, 'MSI Katana A15', 'https://e-catalog.com/jpg_zoom1/2614180.jpg', 239999),
	(25, 9, 2, 8, 8, 3, 2, 'MSI Prestige 14 Evo', 'https://e-catalog.com/jpg_zoom1/2417118.jpg', 94999),
	(26, 9, 2, 8, 8, 3, 2, 'MSI Commercial 14 H', 'https://e-catalog.com/jpg_zoom1/2600637.jpg', 89999),
	(27, 9, 2, 9, 8, 7, 2, 'MSI Summit E14 Flip Evo', 'https://e-catalog.com/jpg_zoom1/2193867.jpg', 79999),
	(28, 6, 1, 8, 8, 7, 2, 'Asus ZenBook 14X OLED', 'https://e-catalog.com/jpg_zoom1/2575483.jpg', 84999),
	(29, 6, 2, 9, 8, 7, 2, 'Asus Zenbook S 13 Flip', 'https://e-catalog.com/jpg_zoom1/2202781.jpg', 69999),
	(30, 7, 1, 9, 8, 4, 2, 'LG Gram 15 15Z90Q', 'https://e-catalog.com/jpg_zoom1/2463282.jpg', 64999),
	(31, 10, 1, 10, 9, 11, 3, 'Apple MacBook Pro M4 14 inch', 'https://e-catalog.com/jpg_zoom1/2793815.jpg', 149999),
	(32, 10, 2, 10, 9, 11, 3, 'Apple MacBook Pro M4 14 inch', 'https://e-catalog.com/jpg_zoom1/2795996.jpg', 159999),
	(33, 10, 3, 10, 9, 12, 3, 'Apple MacBook Pro M4 16 inch', 'https://e-catalog.com/jpg_zoom1/2795996.jpg', 179999),
	(34, 10, 2, 10, 9, 12, 3, 'Apple MacBook Pro M4 16 inch', 'https://e-catalog.com/jpg_zoom1/2795996.jpg', 140000);

-- Dumping structure for table laptop_db.manufacturer
DROP TABLE IF EXISTS `manufacturer`;
CREATE TABLE IF NOT EXISTS `manufacturer` (
  `manufacturer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text,
  PRIMARY KEY (`manufacturer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.manufacturer: ~10 rows (approximately)
INSERT INTO `manufacturer` (`manufacturer_id`, `name`, `description`) VALUES
	(1, 'AMD', 'AMD is the high performance and adaptive computing leader, powering the products and services that help solve the world\'s most important challenges.'),
	(2, 'NVIDIA', 'NVIDIA pioneered accelerated computing to tackle challenges no one else can solve. '),
	(3, 'Kingston', 'With over 35 years of expertise, Kingston has the knowledge and resources you need to choose memory with confidence.'),
	(4, 'Lenovo', 'Lenovo is a global technology powerhouse, ranked at 217 in the Fortune Global 500.'),
	(5, 'Intel', 'Intel is at the forefront of developing new semiconductor technologies, products, and solutions as building blocks for an increasingly smart .'),
	(6, 'Asus', 'ASUS is a Taiwan-based, multinational computer hardware and consumer electronics company that was established in 1989.'),
	(7, 'LG', 'LG is leading South Korean company specializing in OLED and IPS LCD panels for various devices, including laptops and TVs.'),
	(8, 'Samsung', 'Samsung Electronics known for its advanced OLED and high-refresh-rate LCD panels used in gaming and premium displays.'),
	(9, 'MSI', 'MSI is a leading technology company that specializes in the design and manufacture of high-performance gaming laptops, desktops, motherboards etc.'),
	(10, 'Apple', 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, in Silicon Valley. It is best known for its consumer electronics, software, and services. ');

-- Dumping structure for table laptop_db.processor
DROP TABLE IF EXISTS `processor`;
CREATE TABLE IF NOT EXISTS `processor` (
  `processor_id` int unsigned NOT NULL AUTO_INCREMENT,
  `manufacturer_id` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `core_count` int NOT NULL,
  `tdp` int NOT NULL,
  `hyper_thread_count` int DEFAULT NULL,
  PRIMARY KEY (`processor_id`),
  KEY `fk_processor_manufacturer_id` (`manufacturer_id`) USING BTREE,
  CONSTRAINT `fk_processor_manufacturer1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.processor: ~10 rows (approximately)
INSERT INTO `processor` (`processor_id`, `manufacturer_id`, `name`, `core_count`, `tdp`, `hyper_thread_count`) VALUES
	(1, 1, 'Ryzen 7 7435HS', 8, 45, 16),
	(2, 1, 'Ryzen 7 8845HS', 8, 45, 16),
	(3, 1, 'Ryzen 5 8645HS', 6, 45, 12),
	(4, 5, 'Core i9 14900HX', 24, 55, 32),
	(5, 1, 'Ryzen 5 7530U', 6, 15, 12),
	(6, 5, 'Core i7 12700H', 14, 45, 20),
	(7, 1, 'Ryzen 9 8945HS', 8, 45, 16),
	(8, 5, 'Core i7 13700H', 14, 45, 20),
	(9, 5, 'Core i7 1260P', 12, 28, 16),
	(10, 10, 'Apple M4', 10, 20, 10);

-- Dumping structure for table laptop_db.review
DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `review_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `laptop_id` int unsigned NOT NULL,
  `rating` int unsigned NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`review_id`),
  KEY `fk_review_laptop_id` (`laptop_id`),
  KEY `fk_review_user_id` (`user_id`),
  CONSTRAINT `fk_review_laptop_id` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`laptop_id`),
  CONSTRAINT `fk_review_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.review: ~3 rows (approximately)
INSERT INTO `review` (`review_id`, `user_id`, `laptop_id`, `rating`, `comment`, `created_at`) VALUES
	(1, 2, 31, 5, 'Best productivity laptop 🔥', '2025-04-29 20:51:49'),
	(2, 2, 1, 5, 'Great gaming laptop, can handle all modern games with high FPS on 1080p 🎮', '2025-04-30 12:45:54'),
	(3, 2, 4, 4, 'Solid laptop, but it\'s a little bit expensive', '2025-04-30 12:55:54'),
	(4, 3, 10, 3, 'Overall decent laptop, but poor build quality 😞', '2025-04-30 13:17:19'),
	(5, 4, 10, 5, 'Great laptop for everyday tasks 👍🏻', '2025-05-14 18:26:06');

-- Dumping structure for table laptop_db.storage
DROP TABLE IF EXISTS `storage`;
CREATE TABLE IF NOT EXISTS `storage` (
  `storage_id` int unsigned NOT NULL AUTO_INCREMENT,
  `manufacturer_id` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `type` enum('M2 SSD','HDD','SATA SSD') NOT NULL,
  PRIMARY KEY (`storage_id`),
  KEY `fk_storage_manufacturer_id` (`manufacturer_id`) USING BTREE,
  CONSTRAINT `fk_storage_manufacturer1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.storage: ~3 rows (approximately)
INSERT INTO `storage` (`storage_id`, `manufacturer_id`, `name`, `type`) VALUES
	(1, 3, 'SSD M.2 NVMe 512 GB', 'M2 SSD'),
	(2, 3, 'SSD M.2 NVMe 1 TB', 'M2 SSD'),
	(3, 3, 'SSD M.2 NVMe 2 TB', 'M2 SSD');

-- Dumping structure for table laptop_db.transaction
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `transaction_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `total_amount` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`transaction_id`),
  KEY `fk_transaction_user_id` (`user_id`),
  CONSTRAINT `fk_transaction_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.transaction: ~5 rows (approximately)
INSERT INTO `transaction` (`transaction_id`, `user_id`, `total_amount`, `created_at`) VALUES
	(1, 2, 149999, '2025-04-29 20:51:09'),
	(2, 2, 94999, '2025-04-30 12:44:30'),
	(3, 2, 89999, '2025-04-30 12:54:27'),
	(4, 3, 69999, '2025-04-30 13:16:01'),
	(5, 4, 179999, '2025-05-04 22:40:28'),
	(6, 4, 69999, '2025-05-14 18:24:43');

-- Dumping structure for table laptop_db.transaction_item
DROP TABLE IF EXISTS `transaction_item`;
CREATE TABLE IF NOT EXISTS `transaction_item` (
  `transaction_item_id` int unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` int unsigned NOT NULL,
  `laptop_id` int unsigned NOT NULL,
  `laptop_price` int NOT NULL,
  `laptop_name` varchar(255) NOT NULL,
  `laptop_category` varchar(255) NOT NULL,
  PRIMARY KEY (`transaction_item_id`),
  KEY `fk_transaction_item_laptop_id` (`laptop_id`),
  KEY `fk_transaction_item_transaction_id` (`transaction_id`),
  CONSTRAINT `fk_transaction_item_laptop_id` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`laptop_id`),
  CONSTRAINT `fk_transaction_item_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.transaction_item: ~5 rows (approximately)
INSERT INTO `transaction_item` (`transaction_item_id`, `transaction_id`, `laptop_id`, `laptop_price`, `laptop_name`, `laptop_category`) VALUES
	(1, 1, 31, 149999, 'Apple MacBook Pro M4 14 inch', 'MacBook'),
	(2, 2, 1, 94999, 'Lenovo LOQ 15ARP9', 'Gaming'),
	(3, 3, 4, 89999, 'Lenovo ThinkBook 14 G7 ARP', 'Business'),
	(4, 4, 10, 69999, 'Lenovo ThinkPad E14', 'Business'),
	(5, 5, 33, 179999, 'Apple MacBook Pro M4 16 inch', 'MacBook'),
	(6, 6, 10, 69999, 'Lenovo ThinkPad E14', 'Business');

-- Dumping structure for table laptop_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(256) NOT NULL,
  `status` enum('CUSTOMER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table laptop_db.user: ~4 rows (approximately)
INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `status`) VALUES
	(1, 'johndoe', 'johndoe@gmail.com', '$2b$10$NW3QnPXCKFZxgQINBJd0R.ffdenBLrp54iUDJe0HG4/AE38oVV6dC', 'ADMIN'),
	(2, 'bobwhite', 'bobwhite@gmail.com', '$2b$10$rV5TdRsqu.s9HDS8ofPCHORRvaPBPXeiv1FMiPaKpCoj3yp/w79G.', 'CUSTOMER'),
	(3, 'janesmith', 'janesmith@gmail.com', '$2b$10$i.5dWZ9ipPQcCQlmYdPx.eMpzFjVuj1RopKl0F1suLYO6ko7U5AV2', 'CUSTOMER'),
	(4, 'petarpetrovic', 'petarpetrovic@gmail.com', '$2b$10$tYt9tdK0o3Fb/99vpxrujueaV3QwQg7.hXvMhtPm77.w9k8iwJ/ee', 'CUSTOMER');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
