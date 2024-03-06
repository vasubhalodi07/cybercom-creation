CREATE DATABASE practice1;
SHOW DATABASES;
USE practice1;

-- TASK: 1
CREATE TABLE category (
	category_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,	
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (category_id)
);

CREATE TABLE product (
	product_id INT AUTO_INCREMENT,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,s
    description VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL,
    image VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- TASK: 2
CREATE TABLE college (
	college_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    naac_grade VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (college_id)
);

CREATE TABLE student (
	student_id INT AUTO_INCREMENT,
    college_id INT UNIQUE,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    semester VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NUll,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (student_id),
    FOREIGN KEY (college_id) REFERENCES college (college_id)
);

-- Task: 3
CREATE TABLE expertise (
    expertise_id INT AUTO_INCREMENT,
    expertise_name VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (expertise_id)
);

CREATE TABLE player (
    player_id INT AUTO_INCREMENT,
    expertise_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (player_id),
    FOREIGN KEY (expertise_id) REFERENCES expertise (expertise_id)
);

