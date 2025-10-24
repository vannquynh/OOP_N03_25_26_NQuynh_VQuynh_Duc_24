-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: webtimvieclam
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doanhnghiep`
--

DROP TABLE IF EXISTS `doanhnghiep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doanhnghiep` (
  `ma_doanh_nghiep` int NOT NULL AUTO_INCREMENT,
  `ten_doanh_nghiep` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tinh` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `website` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `quy_mo_nhan_su` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `avt` longtext,
  `gioi_thieu` longtext,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_doanh_nghiep`),
  UNIQUE KEY `unique_user_id` (`user_id`),
  CONSTRAINT `doanhnghiep_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doanhnghiep`
--

LOCK TABLES `doanhnghiep` WRITE;
/*!40000 ALTER TABLE `doanhnghiep` DISABLE KEYS */;
INSERT INTO `doanhnghiep` VALUES (3,'CÔNG TY TNHH CÔNG NGHỆ VIHAT','HN','HN, VN','http://vihat.vn/','100-499 nhân viên','abc','<ul><li>hay vch&nbsp;</li><li>123</li><li>456</li></ul>','1'),(4,'CÔNG TY TNHH CÔNG NGHỆ VIHAT','HN','HN, VN','http://vihat.vn/','100-499 nhân viên',NULL,'<ol><li>aaaa</li><li>2222</li><li>f</li></ol>','476b733e-b5d3-46ba-938e-dc1fda99b993');
/*!40000 ALTER TABLE `doanhnghiep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhvuc`
--

DROP TABLE IF EXISTS `linhvuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linhvuc` (
  `ma_linh_vuc` int NOT NULL AUTO_INCREMENT,
  `ten_linh_vuc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `icon` longtext,
  PRIMARY KEY (`ma_linh_vuc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhvuc`
--

LOCK TABLES `linhvuc` WRITE;
/*!40000 ALTER TABLE `linhvuc` DISABLE KEYS */;
INSERT INTO `linhvuc` VALUES (1,'a','a'),(2,'v','v');
/*!40000 ALTER TABLE `linhvuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaiviec`
--

DROP TABLE IF EXISTS `loaiviec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaiviec` (
  `ma_loai_viec` int NOT NULL AUTO_INCREMENT,
  `ten_loai_viec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`ma_loai_viec`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaiviec`
--

LOCK TABLES `loaiviec` WRITE;
/*!40000 ALTER TABLE `loaiviec` DISABLE KEYS */;
INSERT INTO `loaiviec` VALUES (1,'FULL_TIME'),(2,'PART_TIME');
/*!40000 ALTER TABLE `loaiviec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `professional_title` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `bio` text,
  `location` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `skills` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES ('a6a056fc-0c90-41f2-869c-2c7b5762a8c9','Vũ Quang Anh ','ABC','09782827634','http://vihat.vn/','ok','HN','Java, C#','476b733e-b5d3-46ba-938e-dc1fda99b993',NULL,NULL),('e95d1b3d-a631-4a29-b74b-ecb2623ca6da','Vũ Quang Anh','Hello ','0886718203','http://vihat.vn/','Hello world','HN','Java, C#, Python, Go, Lang','5764ad6c-def4-4b73-bd17-cec5d5eb242b',NULL,NULL);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ung_tuyen`
--

DROP TABLE IF EXISTS `ung_tuyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ung_tuyen` (
  `ma_ung_tuyen` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cau_hoi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ghi_chu` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tep_dinh_kem` longtext,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ma_viec_lam` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_ung_tuyen`),
  KEY `user_id` (`user_id`),
  KEY `ma_viec_lam` (`ma_viec_lam`),
  CONSTRAINT `ung_tuyen_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `ung_tuyen_ibfk_2` FOREIGN KEY (`ma_viec_lam`) REFERENCES `vieclam` (`ma_viec_lam`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ung_tuyen`
--

LOCK TABLES `ung_tuyen` WRITE;
/*!40000 ALTER TABLE `ung_tuyen` DISABLE KEYS */;
INSERT INTO `ung_tuyen` VALUES (1,'Vu Quang Anh','vuquanganh@gmail.com','ok','ok','http://res.cloudinary.com/dvofrxuqe/raw/upload/v1745678246/xm3wlntsqp7mhw2vz91z','REJECTED',1,'476b733e-b5d3-46ba-938e-dc1fda99b993','2025-04-26 15:11:25','2025-04-28 07:54:47'),(2,'Vu Quang Anh','vuquanganh111@gmail.com','Bạn là ai ?','oke','http://res.cloudinary.com/dvofrxuqe/raw/upload/v1745682192/eel41bbx3b5klivnsdjs','PENDING',1,'5764ad6c-def4-4b73-bd17-cec5d5eb242b',NULL,NULL);
/*!40000 ALTER TABLE `ung_tuyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1','vuquanganh','vuquanganh1802@gmail.com','123','DOANHNGHIEP','2025-04-26 15:17:41','2025-04-26 15:17:41','0886718203'),('31603bec-dca1-4f80-a15a-67d2f0e038d8','ab123doanhnghiep','ab123doanhnghiep@gmail.com','$2a$10$hwhsi7g0k4.Epo0XGYBknuJfSMdbCimEFKTHtl3aLwZc4z31f1F/6','DOANHNGHIEP','2025-04-28 10:45:21','2025-04-28 10:45:21','09298382'),('476b733e-b5d3-46ba-938e-dc1fda99b993','Vũ Quang Anh','ab123@gmail.com','$2a$10$FoH189veQ4dY9bfOg83.ieAJNRGrhfabguLT1UzLVut5BQocq82Qm','DOANHNGHIEP','2025-04-26 12:36:34','2025-04-28 15:45:35',''),('4ec17838-2204-43ef-87ed-1d66eff40ff0','ab12aaaa3@gmail.com','ab12aaaa3@gmail.com','$2a$10$kXpFrG7mrDcQVQsm05ZJ4em9sqHW0uL3RZBViv/B/5GLgjw9DYm8K','DOANHNGHIEP','2025-04-28 10:56:01','2025-04-28 10:56:01','08998989'),('5764ad6c-def4-4b73-bd17-cec5d5eb242b','Nguyễn Văn Tèo 2','ab123456@gmail.com','$2a$10$MLC/4lw0BJCx8hc3SerV4.Ci0oV/bNM/dK5LvgRrydvw6eg8mdeWK','USER','2025-04-26 15:38:57','2025-04-26 15:38:57',''),('c6a862de-100f-4870-a0a2-3836984c1f92','ab122223@gmail.com','ab122223@gmail.com','$2a$10$aXDg7YGHyRgrFQ.BkuRHMOwoCBjywkSMCMLCEnukCmqc84etUM1lW','DOANHNGHIEP','2025-04-28 10:47:34','2025-04-28 10:47:34','0898989'),('cb60e920-5bde-4fa1-be6a-78031fc6527d','doanhnghiep','doanhnghiep@gmail.com','$2a$10$RCprIg4r4wzU8By2XW42H.kF1JbHWqWbYpRCHNSHyjrP/Xv2Oz3K.','DOANHNGHIEP','2025-04-28 10:40:47','2025-04-28 10:40:47','093838734'),('d016e949-dcf7-4a7d-ad63-de7b8ceacb10','dd123','dd123@gmail.com','$2a$10$Px24BFWClNdmZuXMCh/82O54iWDzZWsKDx/BjOrqYE47S242/02JK','DOANHNGHIEP','2025-04-28 10:46:40','2025-04-28 10:46:40','08978787');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vieclam`
--

DROP TABLE IF EXISTS `vieclam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vieclam` (
  `ma_viec_lam` int NOT NULL AUTO_INCREMENT,
  `ten_viec_lam` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `avt` longtext,
  `muc_luong` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `mo_ta` longtext,
  `yeu_cau_cong_viec` longtext,
  `so_luong_tuyen` int DEFAULT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ma_loai_viec` int DEFAULT NULL,
  `ma_doanh_nghiep` int DEFAULT NULL,
  `ma_linh_vuc` int DEFAULT NULL,
  `status` varchar(50) DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ma_viec_lam`),
  KEY `ma_loai_viec` (`ma_loai_viec`),
  KEY `ma_doanh_nghiep` (`ma_doanh_nghiep`),
  KEY `fk_vieclam_linhvuc` (`ma_linh_vuc`),
  CONSTRAINT `fk_vieclam_linhvuc` FOREIGN KEY (`ma_linh_vuc`) REFERENCES `linhvuc` (`ma_linh_vuc`),
  CONSTRAINT `vieclam_ibfk_1` FOREIGN KEY (`ma_loai_viec`) REFERENCES `loaiviec` (`ma_loai_viec`),
  CONSTRAINT `vieclam_ibfk_2` FOREIGN KEY (`ma_doanh_nghiep`) REFERENCES `doanhnghiep` (`ma_doanh_nghiep`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vieclam`
--

LOCK TABLES `vieclam` WRITE;
/*!40000 ALTER TABLE `vieclam` DISABLE KEYS */;
INSERT INTO `vieclam` VALUES (1,'Nhân Viên Kinh Doanh Quốc Tế Tại Hồ Chí Minh ','http://res.cloudinary.com/dvofrxuqe/image/upload/v1745655938/pprialcrworrsxmgxcix.jpg','20 - 30 triệu','<p>- Tìm kiếm, liên hệ với các khách hàng tiềm năng, đàm phán thương lượng chốt đơn hàng và ký kết hợp đồng (phần mềm tổng đài, esms..)</p><p>- Thiết lập mối quan hệ tốt với các đối tác nước ngoài để tìm hiểu thêm thông tin về nhu cầu.</p><p>- Theo dõi chất lượng đường truyền &amp; phản hồi với nội bộ để xử lý khi có vấn đề xảy ra.</p><p>- Thực hiện các yêu cầu khác theo sự phân công của cấp trên, trao đổi cụ thể trong buổi phỏng vấn</p>','<p>- Giao tiếp tiếng anh tốt (có meeting với khách hàng nước ngoài)</p><p>- Từ 6 tháng kinh nghiệm</p><p>- Tốt nghiệp cao đẳng, đại học</p><p>- Trung thực, ham học hỏi.</p><p>- Đam mê công việc kinh doanh, nhiệt huyết.</p><p>- Có laptop</p>',20,'140 -142 Đường số 2, Khu nhà ở Vạn Phúc 1, phường Hiệp',1,3,1,'ACCEPTED','2025-04-28 08:00:20'),(2,'Nhân Viên Kinh Doanh Quốc Tế B2B Tiếng Anh Hoặc Tiếng Trung (Hàng Công Nghiệp)','http://res.cloudinary.com/dvofrxuqe/image/upload/v1745828756/yin9jpfz5xz6fuqgvjw4.jpg','20 - 30 triệu','<ol><li>111</li></ol>','<ol><li>111</li></ol><p><br></p>',1,'HN, VN',1,3,1,'ACCEPT','2025-04-28 01:25:51'),(3,'Nhân Viên Kinh Doanh Quốc Tế B2B Tiếng Anh Hoặc Tiếng Trung (Hàng Công Nghiệp)','http://res.cloudinary.com/dvofrxuqe/image/upload/v1745832522/gsyfvfc4gxjr4jz5bwcj.webp','20 - 30 triệu','<p>abcd</p>','<p>aaad</p>',100,'HN, VN',2,4,1,'ACCEPTED','2025-04-28 01:50:52'),(4,'Nhân Viên Kinh Doanh Quốc Tế B2B Tiếng Anh Hoặc Tiếng Trung (Hàng Công Nghiệp)','http://res.cloudinary.com/dvofrxuqe/image/upload/v1745832162/qhwhte8sece3ih890bl3.jpg','20 - 30 triệu','<p>c</p>','<p><strong>c</strong></p>',1,'HN, VN',1,4,1,'ACTIVE','2025-04-28 02:22:38');
/*!40000 ALTER TABLE `vieclam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'webtimvieclam'
--

--
-- Dumping routines for database 'webtimvieclam'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-28 17:57:44
