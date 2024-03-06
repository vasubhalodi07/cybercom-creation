CREATE DATABASE practice1_0;
USE practice1_0;

DROP TABLE category;
DROP TABLE product;

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
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL,
    image VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);
