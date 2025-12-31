-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about`
--

DROP TABLE IF EXISTS `about`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about` (
  `id` int NOT NULL AUTO_INCREMENT,
  `greeting` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0x48692054686572652120F09F918B,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `titles_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `resume` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intro_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hobbies` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `quote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `quote_author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `github` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about`
--

LOCK TABLES `about` WRITE;
/*!40000 ALTER TABLE `about` DISABLE KEYS */;
INSERT INTO `about` VALUES (1,'Hi There! 👋','Mir Javed Jahanger','test','System Engineer (SOC) , Full Stack Developer, DevOps Engineer, Security Analyst, Cloud Architect','System Engineer (SOC) skilled in fintech monitoring and incident response.Experienced in improving uptime, reliability, and CI/CD processes.Strong in backend/frontend development and debugging.Builds practical GitHub projects with JS/TS, Node.js, and APIs.Focused on clean architecture, automation, and scalable systems.','https://i.postimg.cc/Xq1R1D9j/548194464-770427085888234-1528911993295424645-n.jpg','http://localhost:5001/uploads/resumes/1767177023498-mir_javed_resume_compressed.pdf','javedmirjeetu.official@gmail.com','+8801811-480222','IT Park, Jashore, Bangladesh','Hi Everyone, I am Mir Javed from Jashore, Bangladesh.\r\nI am a Computer Science Engineer, Full-Stack Developer, Android Application Developer, MERN Stack Developer, Open Source Contributor.','Listening to Music,\r\nPlaying Games,\r\nWatching Movies,\r\nTravelling','\"I want to do creative works to change our daily life\"','Mir Javed','https://github.com/mirjavedjeetu001','https://linkedin.com/in/mirjavedjeetu001/','','2025-12-25 16:09:21.793894','2025-12-31 16:30:26.639514');
/*!40000 ALTER TABLE `about` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `featured` tinyint NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `reading_time` int NOT NULL DEFAULT '5',
  `seo_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `published_at` datetime DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_5b2818a2c45c3edb9991b1c7a5` (`slug`),
  KEY `FK_aaf6cdeebd8497289338899961b` (`categoryId`),
  CONSTRAINT `FK_aaf6cdeebd8497289338899961b` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,'Javed test','javed-test','Test','<p>Test</p>','blog/Screenshot_from_2025-11-24_11-dfsdfsd04-30.png','draft',1,0,5,NULL,NULL,'2025-11-24 06:17:25.735847','2025-11-24 06:18:01.901853',NULL,NULL),(2,'test','test','test','test','https://i.postimg.cc/QChSH8yJ/1000_F_603372487_iudz_BOp_Vq_Oc_RS3Mc_TC5d_Gh4y_T1PYRVST.jpg','published',1,0,5,NULL,NULL,'2025-12-26 21:01:26.935948','2025-12-26 21:01:26.935948',NULL,NULL),(9,'test','test-1','test','test','https://i.postimg.cc/QChSH8yJ/1000_F_603372487_iudz_BOp_Vq_Oc_RS3Mc_TC5d_Gh4y_T1PYRVST.jpg','published',1,0,5,NULL,NULL,'2025-12-26 21:19:21.313303','2025-12-26 21:19:21.313303',NULL,1);
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts_tags_tags`
--

DROP TABLE IF EXISTS `blog_posts_tags_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts_tags_tags` (
  `blogPostsId` int NOT NULL,
  `tagsId` int NOT NULL,
  PRIMARY KEY (`blogPostsId`,`tagsId`),
  KEY `IDX_e6d30c434e5cac2ccf4b1871af` (`blogPostsId`),
  KEY `IDX_225393a2f30f39ff2e58025ba8` (`tagsId`),
  CONSTRAINT `FK_225393a2f30f39ff2e58025ba82` FOREIGN KEY (`tagsId`) REFERENCES `tags` (`id`),
  CONSTRAINT `FK_e6d30c434e5cac2ccf4b1871afd` FOREIGN KEY (`blogPostsId`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts_tags_tags`
--

LOCK TABLES `blog_posts_tags_tags` WRITE;
/*!40000 ALTER TABLE `blog_posts_tags_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_posts_tags_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8b0be371d28245da6e4f4b6187` (`name`),
  UNIQUE KEY `IDX_420d9f679d41281f282f5bc7d0` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Javed personal','javed-personal','test','2025-12-25 16:09:22.324565');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certifications`
--

DROP TABLE IF EXISTS `certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `institution` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_of_study` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certifications`
--

LOCK TABLES `certifications` WRITE;
/*!40000 ALTER TABLE `certifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `certifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `blogPostId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4c84435200f4c8d90b5f84d2aad` (`blogPostId`),
  CONSTRAINT `FK_4c84435200f4c8d90b5f84d2aad` FOREIGN KEY (`blogPostId`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (1,'Mir Javed Jahanger','javedmirjeetu.official@gmail.com','01811480222','Contact from Portfolio','test','new','2025-12-26 20:37:22.387430','2025-12-26 20:37:22.387430'),(2,'Mir Javed Jahanger','javedmirjeetu.official@gmail.com','01811480222','Contact from Portfolio','test','new','2025-12-26 20:45:08.641887','2025-12-26 20:45:08.641887'),(3,'Mir Javed Jahanger','javedmirjeetu.official@gmail.com','01811480222','Contact from Portfolio','test','new','2025-12-26 20:48:20.452814','2025-12-26 20:48:20.452814'),(4,'Mir Javed Jahanger','javedmirjeetu.official@gmail.com','01811480222','Contact from Portfolio','test','new','2025-12-26 20:51:08.915429','2025-12-26 20:51:08.915429');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `institution` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_of_study` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `grade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'Jahangirnagar University','Masters of Computer Science and Engineering (MSC)','Computer Science and Engineering','2020-01-01','2023-12-31','Completed','Advanced studies in Computer Science and Engineering with focus on System Engineering, Software Development, and AI/ML',0),(2,'Southeast University','Bachelor of Computer Science and Engineering (BSC)','Computer Science and Engineering','2015-01-01','2019-12-31','Completed','Comprehensive study of Computer Science fundamentals, Software Engineering, Database Systems, and Web Technologies',0),(3,'Satkhira Govt. College','Higher Secondary School Certificate (HSC)','Science','2012-07-01','2014-06-30','Completed','Higher Secondary education with focus on Science subjects',0),(4,'Satkhira Govt. High School','Secondary School Certificate (SSC)','Science','2010-01-01','2012-06-30','Completed','Secondary education with excellent academic performance',0);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'Sheba Platform Limited','System Engineer (SOC)','• Monitor and ensure 24/7 uptime of Sheba Pay services, proactively detecting and resolving issues\n• Handle incident response, troubleshooting, and root cause analysis across backend, frontend, and system operations\n• Collaborate closely with DevOps and development teams for system updates, deployments, and version releases\n• Develop backend services using NestJS, ExpressJS, and integrate APIs with frontend applications (ReactJS, Angular)\n• Develop frontend features and maintain web applications, ensuring smooth UI/UX and functional integrity\n• Deploy and manage system updates using Teleport and ensure rollback readiness\n• Implement monitoring tools, dashboards, and security best practices using Grafana, Loki, Superset, Zabbix, and Konga\n• Document system architecture, operational processes, and development workflows\n• Debug and optimize system performance using LOKI, SUPERSET, TELEPORT, ZABBIX, KONGA\n• Collaborate on AI-powered backend workflows, integrating LLM-based automation and data enrichment pipelines\n• Participate in design and development discussions, contributing to scalable, maintainable, and efficient system architecture','2024-06-15',NULL,'Dhaka, Bangladesh','https://sheba-platform.xyz/',0),(2,'Metasoft Info','Co-founder & Web Developer (Part-time)','• Build modern applications with Laravel framework (PHP, MySQL)\n• Consult with clients to gather project requirements\n• Enhanced application features to effectively fix bugs and optimize overall performance, reliability and efficiency\n• Lead development team and manage project delivery\n• Full-stack development using modern web technologies','2022-01-01',NULL,'Jashore, Bangladesh','https://javed.metasoftinfo.com',0),(3,'Quantanite','Senior Associate (QA)','• Quality Assurance and IT Support\n• Performance Evaluation of reporting associates\n• Training support and team development\n• Quality Report to Team leader and Manager\n• Process improvement planning and implementation\n• Root cause Analysis for performance issues\n• Documentation of daily team performance\n• Client Communication and relationship management','2020-11-16','2024-06-22','Dhaka, Bangladesh','',0),(4,'Southtech Group','Web Developer (Intern)','• Built Banking applications with Angular JS 8, Java and MySQL\n• Developed Multi-Currency and Multi User Based Accounting Software\n• Consulted with product manager to identify minimal viable product\n• Decomposed feature set into small scoped user stories\n• Gained hands-on experience in enterprise application development','2020-02-01','2020-04-30','Dhaka, Bangladesh','',0);
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `github_stats`
--

DROP TABLE IF EXISTS `github_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `github_stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `github_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'mirjavedjeetu001',
  `total_contributions` int NOT NULL DEFAULT '680',
  `days_coded` int NOT NULL DEFAULT '365',
  `contribution_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `use_live_github` tinyint NOT NULL DEFAULT '0',
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `github_stats`
--

LOCK TABLES `github_stats` WRITE;
/*!40000 ALTER TABLE `github_stats` DISABLE KEYS */;
INSERT INTO `github_stats` VALUES (1,'mirjavedjeetu001',680,365,NULL,1,'2025-12-26 14:01:16');
/*!40000 ALTER TABLE `github_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscribed` tinyint NOT NULL DEFAULT '1',
  `subscribed_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_7e3d2b10221e8b16279dac5831` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter`
--

LOCK TABLES `newsletter` WRITE;
/*!40000 ALTER TABLE `newsletter` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsletter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_skills`
--

DROP TABLE IF EXISTS `professional_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional_skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `order` int NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_skills`
--

LOCK TABLES `professional_skills` WRITE;
/*!40000 ALTER TABLE `professional_skills` DISABLE KEYS */;
INSERT INTO `professional_skills` VALUES (23,'Apache Kafka','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg','backend',1,'2025-12-26 19:20:32.000000'),(24,'Bash','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg','language',2,'2025-12-26 19:20:32.000000'),(25,'Bootstrap','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg','frontend',3,'2025-12-26 19:20:32.000000'),(26,'C','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg','language',4,'2025-12-26 19:20:32.000000'),(27,'CSS3','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg','frontend',5,'2025-12-26 19:20:32.000000'),(28,'Go','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg','language',6,'2025-12-26 19:20:32.000000'),(29,'HTML5','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg','frontend',7,'2025-12-26 19:20:32.000000'),(30,'Java','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg','language',8,'2025-12-26 19:20:32.000000'),(31,'JavaScript','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg','language',9,'2025-12-26 19:20:32.000000'),(32,'MongoDB','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg','database',10,'2025-12-26 19:20:32.000000'),(33,'MySQL','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg','database',11,'2025-12-26 19:20:32.000000'),(34,'NextJS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg','frontend',12,'2025-12-26 19:20:32.000000'),(35,'NodeJS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg','backend',13,'2025-12-26 19:20:32.000000'),(36,'PHP','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg','language',14,'2025-12-26 19:20:32.000000'),(37,'PostgreSQL','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg','database',15,'2025-12-26 19:20:32.000000'),(38,'Prolog','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prolog/prolog-original.svg','language',16,'2025-12-26 19:20:32.000000'),(39,'Python','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg','language',17,'2025-12-26 19:20:32.000000'),(40,'ReactJS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg','frontend',18,'2025-12-26 19:20:32.000000'),(41,'Revolut','https://upload.wikimedia.org/wikipedia/commons/7/7a/Revolut_Ltd._logo.svg','other',19,'2025-12-26 19:20:32.000000'),(42,'SaaS','https://cdn-icons-png.flaticon.com/512/2920/2920277.png','other',20,'2025-12-26 19:20:32.000000'),(43,'Stripe','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg','other',21,'2025-12-26 19:20:32.000000'),(44,'TypeScript','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg','language',22,'2025-12-26 19:20:32.000000');
/*!40000 ALTER TABLE `professional_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `detailed_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `demo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `technologies` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured` tinyint NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_96e045ab8b0271e5f5a91eae1e` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'SOLVIO AI Hackathon - Full Stack System','solvio-ai-hackathon-full-stack-system','AI-powered full-stack application developed during SOLVIO AI Hackathon','Complete full-stack AI solution developed during hackathon:\r\n\r\n• Designed and implemented the frontend using React.js with modern UI/UX\r\n• Built the backend with Node.js/Express providing RESTful API endpoints\r\n• Integrated AI/ML models for intelligent task handling and predictions\r\n• Set up PostgreSQL database for data management\r\n• Deployed the application on cloud infrastructure for live demonstration\r\n• Collaborated with team members to deliver working MVP by deadline\r\n• Prepared and presented demo to judges, highlighting real-world problem solving\r\n\r\nTechnologies: React.js, Node.js, Express, PostgreSQL, AI/ML APIs, Cloud Deployment','projects/Screenshot_from_2025-11-24_11-03-07.png','https://solvio.sheba-platform.xyz/','https://github.com/shebaplatform/sheba-solvio-ai-hackathon','React.js, Node.js, Express, PostgreSQL, AI/ML, REST API, Cloud Deployment',1,0,'2025-12-25 16:09:22.191635','2025-12-25 16:09:22.191635'),(2,'Sheba Platform Limited - Core Website','sheba-platform-limited-core-website','Official website for Sheba Platform Limited - Fintech company','Developed and maintain the core website for Sheba Platform Limited:\r\n\r\n• Implemented responsive frontend with React.js and TailwindCSS\r\n• Built dynamic content management system\r\n• Optimized website performance and SEO\r\n• Integrated with backend APIs for real-time data\r\n• Enhanced user experience with modern UI components\r\n• Maintained website security and uptime\r\n\r\nTechnologies: React.js, TailwindCSS, Node.js, REST API','projects/Screenshot_from_2025-11-24_11-dfsdfsd04-30.png','https://sheba-platform.xyz/','https://github.com/shebaplatform/sheba-platform-website','React.js, TailwindCSS, Node.js, REST API, SEO',1,0,'2025-12-25 16:09:22.197780','2025-12-25 16:09:22.197780'),(3,'Sheba Pay - System Monitoring Dashboard','sheba-pay-system-monitoring-dashboard','Real-time monitoring dashboard for Sheba Pay fintech services','Built comprehensive monitoring solution for mission-critical fintech services:\r\n\r\n• Developed monitoring dashboards using Loki, Superset, and Zabbix\r\n• Implemented real-time service health visualization\r\n• Automated root-cause analysis workflows for critical incidents\r\n• Built backend utilities to integrate logs & system alerts into unified view\r\n• Deployed updates securely using Teleport with zero-downtime releases\r\n• Ensured 24/7 uptime of payment services\r\n\r\nTechnologies: Loki, Superset, Zabbix, Teleport, Node.js, API Integration, Grafana','projects/dsadasd.png','','','Loki, Superset, Zabbix, Teleport, Node.js, Grafana, API Integration',1,0,'2025-12-25 16:09:22.202028','2025-12-25 16:09:22.202028'),(4,'SOC Dashboard - Operations Center','soc-dashboard-operations-center','Security Operations Center dashboard for system monitoring','Full-stack SOC dashboard for comprehensive system operations:\r\n\r\n• Developed frontend with React.js for real-time monitoring\r\n• Built backend with Express.js and Node.js\r\n• Integrated MongoDB and PostgreSQL for data management\r\n• Implemented payment workflow development and debugging\r\n• Maintained reconciliation logic with banking partners\r\n• Enhanced error-handling flow and backend data validation\r\n\r\nTechnologies: React.js, Express.js, MongoDB, Node.js, PostgreSQL','projects/dfsdf.png','','https://github.com/shebaplatform/sheba-soc-dashboard-frontend','React.js, Express.js, MongoDB, Node.js, PostgreSQL, API Debugging',1,0,'2025-12-25 16:09:22.206678','2025-12-25 16:09:22.206678'),(5,'Pulse Project - Frontend & API Integration','pulse-project-frontend-api-integration','Full-stack system with advanced API integration','Developed Pulse system with focus on frontend excellence:\n\n• Implemented responsive frontend features\n• Built seamless API integrations between frontend and backend\n• Resolved API conflicts and improved data flow\n• Optimized UI components for better performance\n• Added real-time responsiveness to user interactions\n• Enhanced user experience with modern design patterns\n\nTechnologies: React.js, TailwindCSS, Node.js, REST API','','','','React.js, TailwindCSS, Node.js, REST API',0,0,'2025-12-25 16:09:22.213860','2025-12-25 16:09:22.213860'),(6,'Digigo Website - E-commerce Platform','digigo-website-e-commerce-platform','Modern e-commerce website with Next.js','Developed and maintained modern e-commerce platform:\n\n• Implemented new UI components and responsive layouts\n• Collaborated with senior developers for feature planning\n• Enhanced website performance and loading speed\n• Improved responsiveness across all devices\n• Optimized SEO and user experience\n\nTechnologies: React.js, Next.js, TailwindCSS','','','','React.js, Next.js, TailwindCSS, E-commerce',0,0,'2025-12-25 16:09:22.218987','2025-12-25 16:09:22.218987'),(7,'Ex-Students Association Website','ex-students-association-website','Alumni management platform for Satkhira Govt. High School','Developed comprehensive alumni management system:\n\n• Built platform to connect 3000+ ex-students\n• Implemented user management and authentication\n• Created event management system\n• Built news and updates section\n• Integrated payment system for donations\n• Served as IT Administrator managing the platform\n\nTechnologies: PHP, Laravel, MySQL, JavaScript','','','','PHP, Laravel, MySQL, JavaScript, Alumni Management',0,0,'2025-12-25 16:09:22.223639','2025-12-25 16:09:22.223639'),(8,'Lake View Cafe & Restaurant Management','lake-view-cafe-restaurant-management','Complete restaurant management system','Designed and developed comprehensive restaurant management solution:\n\n• Built order management system\n• Implemented inventory tracking\n• Created billing and invoice system\n• Developed table reservation feature\n• Built staff management module\n• Integrated reporting and analytics\n\nTechnologies: Laravel, PHP, MySQL, Bootstrap','','','','Laravel, PHP, MySQL, Bootstrap, Restaurant Management',0,0,'2025-12-25 16:09:22.231862','2025-12-25 16:09:22.231862'),(9,'KRC Educational Platform','krc-educational-platform','Educational platform for online learning','Built comprehensive educational platform:\n\n• Developed course management system\n• Implemented student enrollment and tracking\n• Created assignment and quiz modules\n• Built teacher dashboard for content management\n• Integrated video streaming for lectures\n• Developed progress tracking and reporting\n\nTechnologies: Laravel, PHP, MySQL, JavaScript','','','','Laravel, PHP, MySQL, JavaScript, Educational Platform',0,0,'2025-12-25 16:09:22.237078','2025-12-25 16:09:22.237078'),(10,'Satkhira Journal Website','satkhira-journal-website','Content management system for academic publications','Developed CMS for academic journal publication:\n\n• Built article submission and review system\n• Implemented peer review workflow\n• Created publication management system\n• Developed search and indexing features\n• Built author dashboard for submissions\n• Integrated PDF generation for articles\n\nTechnologies: Laravel, PHP, MySQL, Content Management','','','','Laravel, PHP, MySQL, CMS, Academic Publishing',0,0,'2025-12-25 16:09:22.243731','2025-12-25 16:09:22.243731'),(11,'TOPGEEK AGENCY Website','topgeek-agency-website','Corporate website for TOPGEEK (RACE GROUP LTD)','Developed corporate website for digital agency:\n\n• Built modern, responsive website design\n• Implemented service showcase pages\n• Created portfolio gallery\n• Built contact and inquiry system\n• Optimized for SEO and performance\n• Integrated analytics and tracking\n\nTechnologies: React.js, Node.js, TailwindCSS','','','','React.js, Node.js, TailwindCSS, Corporate Website',0,0,'2025-12-25 16:09:22.248187','2025-12-25 16:09:22.248187');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'My Portfolio',
  `site_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Portfolio - Full Stack Developer',
  `site_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `site_keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'portfolio, web development, full stack',
  `site_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_favicon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'contact@example.com',
  `contact_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `facebook_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Welcome to My Portfolio',
  `hero_subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hero_background_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_cta_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'View My Work',
  `hero_cta_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/projects',
  `footer_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `footer_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `show_social_in_footer` tinyint NOT NULL DEFAULT '1',
  `google_analytics_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_site_verification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_pixel_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enable_blog` tinyint NOT NULL DEFAULT '1',
  `enable_comments` tinyint NOT NULL DEFAULT '1',
  `enable_newsletter` tinyint NOT NULL DEFAULT '1',
  `enable_contact_form` tinyint NOT NULL DEFAULT '1',
  `admin_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Portfolio Admin',
  `admin_header` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Portfolio Management',
  `admin_welcome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Welcome to Portfolio Admin Panel',
  `maintenance_mode` tinyint NOT NULL DEFAULT '0',
  `maintenance_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `preloader_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'JAVED',
  `theme_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ff6b35',
  `secondary_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#f7931e',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES (1,'Mir Javed Jahanger','Mir Javed Jahanger - Developer','Portfolio of Mir Javed Jahanger - System Engineer (SOC) at Sheba Platform Limited. Expertise in monitoring mission-critical fintech services, full-stack development, DevOps, and AI integration.','portfolio, web development, full stack','','','','','',NULL,NULL,NULL,NULL,NULL,NULL,'Welcome to My Portfolio',NULL,NULL,NULL,'View My Work','/projects','javed ',NULL,1,NULL,NULL,NULL,1,1,1,1,'Portfolio Admin','Portfolio Management','Welcome to Portfolio Admin Panel',0,NULL,'2025-12-25 16:09:22.344000','2025-12-30 10:01:58.663000','JAVED','#000000','#f7931e');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'intermediate',
  `percentage` int NOT NULL DEFAULT '50',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (30,'AI Integration','advanced',85,NULL,1),(31,'Angular','intermediate',70,NULL,2),(32,'Docker','advanced',85,NULL,3),(33,'Express.js','expert',90,NULL,4),(34,'Git','expert',95,NULL,5),(35,'GitHub','expert',95,NULL,6),(36,'Grafana','intermediate',70,NULL,7),(37,'Incident Response','advanced',85,NULL,8),(38,'JavaScript','expert',95,NULL,9),(39,'Laravel','intermediate',70,NULL,10),(40,'Linux','advanced',90,NULL,11),(41,'LLM Workflows','advanced',80,NULL,12),(42,'Loki','intermediate',70,NULL,13),(43,'MongoDB','advanced',85,NULL,14),(44,'MySQL','advanced',85,NULL,15),(45,'NestJS','advanced',85,NULL,16),(46,'Node.js','expert',90,NULL,17),(47,'OpenAI API','advanced',85,NULL,18),(48,'PostgreSQL','advanced',85,NULL,19),(49,'Problem Solving','expert',90,NULL,20),(50,'React.js','expert',90,NULL,21),(51,'REST API','expert',95,NULL,22),(52,'Ruby on Rails','intermediate',65,NULL,23),(53,'System Monitoring','advanced',85,NULL,24),(54,'TailwindCSS','expert',90,NULL,25),(55,'Team Leadership','advanced',85,NULL,26),(56,'Teleport','intermediate',70,NULL,27),(57,'TypeScript','expert',90,NULL,28),(58,'Zabbix','intermediate',70,NULL,29);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d90243459a697eadb8ad56e909` (`name`),
  UNIQUE KEY `IDX_b3aa10c29ea4e61a830362bd25` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL DEFAULT '5',
  `featured` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools`
--

DROP TABLE IF EXISTS `tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tools` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `order` int NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools`
--

LOCK TABLES `tools` WRITE;
/*!40000 ALTER TABLE `tools` DISABLE KEYS */;
INSERT INTO `tools` VALUES (15,'Android OS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg','os',1,'2025-12-26 19:20:32.000000'),(16,'Android Studio','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg','editor',2,'2025-12-26 19:20:32.000000'),(17,'AWS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg','cloud',3,'2025-12-26 19:20:32.000000'),(18,'Docker','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg','container',4,'2025-12-26 19:20:32.000000'),(19,'Git','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg','other',5,'2025-12-26 19:20:32.000000'),(20,'GitHub','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg','collaboration',6,'2025-12-26 19:20:32.000000'),(21,'Google Firebase','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg','cloud',7,'2025-12-26 19:20:32.000000'),(22,'Heroku','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg','cloud',8,'2025-12-26 19:20:32.000000'),(23,'Jira','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg','collaboration',9,'2025-12-26 19:20:32.000000'),(24,'Linux OS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg','os',10,'2025-12-26 19:20:32.000000'),(25,'Postman','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg','testing',11,'2025-12-26 19:20:32.000000'),(26,'Vercel','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg','cloud',12,'2025-12-26 19:20:32.000000'),(27,'VS Code','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg','editor',13,'2025-12-26 19:20:32.000000'),(28,'Windows OS','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg','os',14,'2025-12-26 19:20:32.000000');
/*!40000 ALTER TABLE `tools` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-31 16:52:41
