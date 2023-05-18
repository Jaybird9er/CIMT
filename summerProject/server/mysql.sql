-- DROP DATEBASE IF EXISTS `team4`;
-- SET default_storage_engine=InnoDB;
-- SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CREATE DATEBASE IF NOT EXISTS `team4`;
--   DEFAULT CHARACTER SET utf8mb4;
--   DEFAULT COLLATE utf8mb4_unicode_ci;
-- USE team4;

-- CREATE USER IF NOT EXISTS `team4`@`localhost`
-- SET PASSWORD FOR `team4`@`localhost`=`1234`;
-- GRANT ALL PRIVILEGES ON `team4`.* TO `team4`@`localhost` WITH GRANT OPTION;

-- CREATE USER IF NOT EXISTS `team4`@`%`;
-- SET PASSWORD FOR `team4`@`%` = `1234`;
-- GRANT ALL PRIVILEGES ON `team4`.* TO `team4`@`%` WITH GRANT OPTION;

-- GRANT ALL PRIVILEGES ON `team4`.* TO `team4`@`localhost`;
-- FLUSH PRIVILEGES;


-- Tables  

DROP TABLE `user`;
CREATE TABLE `user` (
  -- `id` int  NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `displayName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`username`));
  -- UNIQUE KEY `username` (`username`));

INSERT INTO `user` VALUES ('cat1', 'admin1', 'cat1');
INSERT INTO `user` VALUES ('cat2', 'admin2', 'cat2');
INSERT INTO `user` VALUES ('cat3', 'admin3', 'cat3');
 
INSERT INTO `user` VALUES ('cat4', 'provider1', 'cat4');
INSERT INTO `user` VALUES ('cat5', 'provider2', 'cat5');
INSERT INTO `user` VALUES ('cat6', 'provider3', 'cat6');
 
INSERT INTO `user` VALUES ('cat7', 'cimtUser1', 'cat7');
INSERT INTO `user` VALUES ('cat8', 'cimtUser2', 'cat8');
INSERT INTO `user` VALUES ('cat9', 'cimtUser3', 'cat9');


DROP TABLE `admin`;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(65) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE CASCADE);


INSERT INTO `admin` VALUES ('1', 'admin1@team4.com', 'cat1');
INSERT INTO `admin` VALUES ('2', 'admin2@team4.com', 'cat2');
INSERT INTO `admin` VALUES ('3', 'admin3@team4.com', 'cat3');


DROP TABLE `provider`;
CREATE TABLE `provider` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `address` VARCHAR(100) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  
  FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE CASCADE);



INSERT INTO `provider` VALUES ('1', '111 provider Street, Some City, Some State, 11111', 'cat4');
INSERT INTO `provider` VALUES ('2', '222 provider Street, Some City, Some State, 22222', 'cat5');
INSERT INTO `provider` VALUES ('3', '333 provider Street, Some City, Some State, 33333', 'cat6');


DROP TABLE `cimtUser`;
CREATE TABLE `cimtUser` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  
   FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE CASCADE);


INSERT INTO `cimtuser` VALUES ('1', '111-111-1111', 'cat7');
INSERT INTO `cimtuser` VALUES ('2', '222-222-2222', 'cat8');
INSERT INTO `cimtuser` VALUES ('3', '333-333-3333', 'cat9');


DROP TABLE `unit`;
CREATE TABLE `unit` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `typeName` VARCHAR(45) NOT NULL,
  UNIQUE KEY `typeName` (`typeName`));

INSERT INTO `unit` VALUES ('1', 'hour');
INSERT INTO `unit` VALUES ('2', 'day');
INSERT INTO `unit` VALUES ('3', 'week');
INSERT INTO `unit` VALUES ('4', 'each');
INSERT INTO `unit` VALUES ('5', 'use');



DROP TABLE `resource`;
CREATE TABLE `resource` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(45) NOT NULL,
  `PFunctionId` VARCHAR(45) NOT NULL,
  `SFunctionId` VARCHAR(45) NOT NULL,
  `description` TEXT(1000) NULL,
  `capability` TEXT(1000) NULL,
  `distance` DECIMAL(1) NULL,
  `cost` DECIMAL(2) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `unitId` INT NOT NULL,
  FOREIGN KEY (`username`) REFERENCES `user`(`username`),
  FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`);
  FOREIGN KEY (`PFunctionId`) REFERENCES `resourceFunction`(`id`);
  FOREIGN KEY (`SFunctionId`) REFERENCES `resourceFunction`(`id`));



  DROP TABLE `resourceFunction`;
  CREATE TABLE `resourceFunction` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` VARCHAR(100) NOT NULL,
   UNIQUE KEY `description` (`description`));


INSERT INTO `resourceFunction` VALUES ('1', '#1: transportation');
INSERT INTO `resourceFunction` VALUES ('2', '#2: communications');
INSERT INTO `resourceFunction` VALUES ('3', '#3: engineering');
INSERT INTO `resourceFunction` VALUES ('4', '#4: search and rescue');
INSERT INTO `resourceFunction` VALUES ('5', '#5: education');
INSERT INTO `resourceFunction` VALUES ('6', '#6: energy');
INSERT INTO `resourceFunction` VALUES ('7', '#7: firefighting');
INSERT INTO `resourceFunction` VALUES ('8', '#8: human services');




DROP TABLE `incident`;
CREATE TABLE `incident` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` DATETIME NOT NULL,
  `description` TEXT(1000) NOT NULL,
  `categoryId` VARCHAR(16) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  FOREIGN KEY (`username`) REFERENCES `user`(`username`),
  FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`));



  

  

DROP TABLE `category`;
CREATE TABLE `category` (
  `id` VARCHAR(16) NOT NULL PRIMARY KEY,
  `description` VARCHAR(100) NOT NULL,
  UNIQUE KEY `description` (`description`));


INSERT INTO `category` VALUES ('c1', 'must evac, secure lockdown');
INSERT INTO `category` VALUES ('c2', 'may evac, secure lockdown');
INSERT INTO `category` VALUES ('c3', 'no evac, limited lockdownc');
INSERT INTO `category` VALUES ('c4', 'no evac, no lockdown');




