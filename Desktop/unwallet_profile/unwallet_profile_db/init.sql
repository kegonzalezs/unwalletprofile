CREATE DATABASE IF NOT EXISTS unwalletprofiledb;

USE unwalletprofiledb;

DROP TABLE IF EXISTS user;

DROP TABLE IF EXISTS money_account;

DROP TABLE IF EXISTS category;

CREATE TABLE user (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  email      VARCHAR(255) DEFAULT NULL,
  password      VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT UQ_Patients_Email UNIQUE (email)
);

CREATE TABLE category (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE account (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  money VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

DELIMITER //
CREATE PROCEDURE create_and_return_category(name VARCHAR(255))
BEGIN
  INSERT INTO category(name) VALUES (name);
  
  SET @CATEGORY_ID = LAST_INSERT_ID();

  SELECT * FROM category WHERE id=@CATEGORY_ID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE create_and_return_account(name VARCHAR(255), IN money VARCHAR(255))
BEGIN
  INSERT INTO account(name, money) VALUES (name, money);
  
  SET @ACCOUNT_ID = LAST_INSERT_ID();

  SELECT * FROM user WHERE id=@ACCOUNT_ID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE create_and_return_user(name VARCHAR(255), IN email VARCHAR(255), IN password VARCHAR(255))
BEGIN
  INSERT INTO user(name, email, password) VALUES (name, email, password);
  
  SET @USER_ID = LAST_INSERT_ID();

  SELECT * FROM user WHERE id=@USER_ID;
END //
DELIMITER ;
