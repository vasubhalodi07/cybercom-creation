CREATE DATABASE practice2;
USE practice2;

-- TASK: 1
CREATE TABLE employee (
	employee_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number BIGINT NOT NULL,
    salary BIGINT NOT NULL,
    position VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (employee_id)
);
CREATE TABLE leave_record (
	leave_id INT AUTO_INCREMENT,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    reason VARCHAR(255) NOT NULL,
    approve_status BOOLEAN DEFAULT false,
    PRIMARY KEY (leave_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

-- TASK: 2
CREATE TABLE cinema (
	id INT AUTO_INCREMENT,
    movie VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO cinema (movie, description, rating) VALUES ("War", "great 3D", 8.9), ("Science", "fiction", 8.5), ("irish", "boring", 6.2), ("Ice song", "Fantacy", 8.6), ("House card", "Interesting", 9.1);
SELECT * FROM cinema WHERE id % 2 != 0 AND description != "boring" ORDER BY rating DESC;

-- TASK: 3
CREATE TABLE salary (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sex ENUM('m', 'f') NOT NULL,
    salary INT NOT NULL
);
INSERT INTO salary (name, sex, salary) VALUES ('A', 'm', 2500), ('B', 'f', 1500), ('C', 'm', 5500), ('D', 'f', 500);
UPDATE salary SET sex = CASE
	WHEN sex = 'm' THEN 'f'
	WHEN sex = 'f' THEN 'm'
END;
SELECT * FROM salary;

-- TASK: 4
CREATE TABLE person (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL
);
INSERT INTO person (email) VALUES ('John@example.com'), ('bob@gmail.com'), ('John@example.com'), ('bob@gmail.com');
DELETE e1 FROM person e1 JOIN person e2 ON e1.email = e2.email AND e1.id > e2.id;
SELECT * FROM person;

-- TASK: 5
CREATE TABLE customers (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customers(id)
);
INSERT INTO customers (name) VALUES ("Joe"), ("Henry"), ("Sam"), ("Max");
INSERT INTO orders (customerId) VALUES (3), (1);
SELECT name FROM customers AS c LEFT JOIN orders AS o ON c.id = o.customerId WHERE o.id IS NULL; 

-- TASK: 6
CREATE TABLE demo (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL
);
CREATE INDEX email_index ON demo (email);
SELECT * FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA='practice2' AND TABLE_NAME='demo';

-- TASK: 7
CREATE TABLE person_task7 (
	personId INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL
);
CREATE TABLE address_task7 (
	addressId INT AUTO_INCREMENT PRIMARY KEY,
    personId INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    FOREIGN KEY (personId) REFERENCES person_task7(personId)
);
INSERT INTO person_task7 (lastName, firstName) VALUES ('Wang', 'Allen'), ('Alice', 'Bob');
INSERT INTO address_task7 (personId, city, state) VALUES (2, 'New York City', 'New York'), (3, 'Leetcode', 'California');
SELECT p.firstName, p.lastName, a.city, a.state FROM person_task7 AS p LEFT JOIN address_task7 AS a ON p.personId = a.personId;

