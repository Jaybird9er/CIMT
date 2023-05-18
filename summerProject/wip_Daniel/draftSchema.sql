-- Create Schema
DROP SCHEMA IF EXISTS cis197_summer_2022;
CREATE SCHEMA cis197_summer_2022 DEFAULT CHARACTER SET utf8;
USE cis197_summer_2022;

-- Create User
DROP USER IF EXISTS 't4'@'localhost';
CREATE USER IF NOT EXISTS 't4'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON cis197_summer_2022.* TO 't4'@'localhost';
FLUSH PRIVILEGES;

-- Tables
-- DROP TABLE IF EXISTS User;
CREATE TABLE User (
	UserName varchar(15) NOT NULL,
    DisplayName varchar(30) NOT NULL,
    Password varchar(30) NOT NULL,
    PRIMARY KEY (UserName));

-- DROP TABLE IF EXISTS UserSA;
CREATE TABLE UserSA (
	UserName varchar(15) NOT NULL,
    Email varchar(255) NOT NULL,
    FOREIGN KEY (UserName) REFERENCES User(UserName) ON DELETE CASCADE);

-- DROP TABLE IF EXISTS UserRP;
CREATE TABLE UserRP (
	UserName varchar(15) NOT NULL,
    Address varchar(100) NOT NULL,
    FOREIGN KEY (UserName) REFERENCES User(UserName) ON DELETE CASCADE);

-- DROP TABLE IF EXISTS UserCIMT;
CREATE TABLE UserCIMT (
	UserName varchar(15) NOT NULL,
    Phone varchar(15) NOT NULL,
    FOREIGN KEY (UserName) REFERENCES User(UserName) ON DELETE CASCADE);

-- DROP TABLE IF EXISTS Unit;
CREATE TABLE Unit (
	UnitId smallint unsigned NOT NULL AUTO_INCREMENT,
	DisplayName varchar(10) NOT NULL,
    PRIMARY KEY (UnitId, DisplayName));

-- DROP TABLE IF EXISTS ResourceFunction;
CREATE TABLE ResourceFunction (
	FunctionId smallint unsigned NOT NULL AUTO_INCREMENT,
    Description varchar(255) NOT NULL,
    PRIMARY KEY (FunctionId));

-- DROP TABLE IF EXISTS ResourceCapability;
CREATE TABLE ResourceCapability (
	ResourceId int NOT NULL,
    Capability varchar(20) NOT NULL,
    PRIMARY KEY (ResourceId, Capability));

-- DROP TABLE IF EXISTS Resource;
CREATE TABLE Resource (
	ResourceId int unsigned NOT NULL AUTO_INCREMENT,
    UserName varchar(15) NOT NULL,
    ResourceName varchar(30) NOT NULL,
    Description varchar(255) NULL,
    Distance decimal(5, 1) NULL,
    PrimaryFunction smallint unsigned NOT NULL,
    SecondaryFunction smallint unsigned NULL,
    Cost decimal(10, 2) NOT NULL,
    UnitId smallint unsigned NOT NULL,
    PRIMARY KEY (ResourceId),
    FOREIGN KEY (UserName) REFERENCES User(UserName) ON DELETE CASCADE,
    FOREIGN KEY (UnitId) REFERENCES Unit(UnitId),
    FOREIGN KEY (PrimaryFunction) REFERENCES ResourceFunction(FunctionId),
    FOREIGN KEY (SecondaryFunction) REFERENCES ResourceFunction(FunctionId));

-- DROP TABLE IF EXISTS Category;
CREATE TABLE Category (
	CategoryId varchar(5) NOT NULL,
    CategoryType varchar(30) NOT NULL,
    IncidentCount int NOT NULL,
    PRIMARY KEY (CategoryId));

-- DROP TABLE IF EXISTS Incident;
CREATE TABLE Incident (
	IncidentId varchar(10) NOT NULL,
    UserName varchar(15) NOT NULL,
    IncidentDate date NOT NULL,
    Description varchar(255) NOT NULL,
    CategoryId varchar(5) NOT NULL,
    FOREIGN KEY (UserName) REFERENCES User(UserName),
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId));

-- Insert Statements (Test Data)
INSERT INTO User (UserName, DisplayName, Password) VALUES
('cat1', 'admin1', 'cat1'),
('cat2', 'admin2', 'cat2'),
('cat3', 'admin3', 'cat3'),
('cat4', 'provider1', 'cat4'),
('cat5', 'provider2', 'cat5'),
('cat6', 'provider3', 'cat6'),
('cat7', 'cimtUser1', 'cat7'),
('cat8', 'cimtUser2', 'cat8'),
('cat9', 'cimtUser3', 'cat9');

INSERT INTO UserSA (Email, UserName) VALUES 
('admin1@team4.com', 'cat1'),
('admin2@team4.com', 'cat2'),
('admin3@team4.com', 'cat3');

INSERT INTO UserRP (Address, UserName) VALUES 
('111 provider Street, Some City, Some State, 11111', 'cat4'),
('222 provider Street, Some City, Some State, 22222', 'cat5'),
('333 provider Street, Some City, Some State, 33333', 'cat6');

INSERT INTO UserCIMT (Phone, UserName) VALUES 
('111-111-1111', 'cat7'),
('222-222-2222', 'cat8'),
('333-333-3333', 'cat9');

INSERT INTO Unit (DisplayName) VALUES 
('Hour'),
('Day'),
('Week'),
('Use');

INSERT INTO ResourceFunction (Description) VALUES 
('transportation'),
('communications'),
('engineering'),
('search and rescue'),
('education'),
('energy'),
('firefighting'),
('human services');

INSERT INTO Category (CategoryId, CategoryType, IncidentCount) VALUES 
('c1', 'must evac, secure lockdown', 0),
('c2', 'may evac, secure lockdown', 0),
('c3', 'no evac, limited lockdownc', 0),
('c4', 'no evac, no lockdown', 0);
