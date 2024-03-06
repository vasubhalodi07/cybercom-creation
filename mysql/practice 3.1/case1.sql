DROP DATABASE practice3_1;
CREATE DATABASE practice3_1;
USE practice3_1;

DROP TABLE customers;
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    email TEXT,
    created_at TIMESTAMP
);

INSERT INTO customers (name, email, created_at)
VALUES
    ('John Smith', 'johnsmith@gmail.com', '2022-01-01 10:00:00'),
    ('Jane Doe', 'janedoe@yahoo.com', '2022-01-02 11:00:00'),
    ('Bob Johnson', 'bobjohnson@hotmail.com', '2022-01-03 12:00:00'),
    ('Sarah Lee', 'sarahlee@gmail.com', '2022-01-04 13:00:00'),
    ('David Kim', 'davidkim@yahoo.com', '2022-01-05 14:00:00');

-- TASK: 1
SELECT * FROM customers WHERE email LIKE '%@gmail.com';

-- TASK: 2
SELECT * FROM customers HAVING MIN(created_at);

-- TASK: 3
SELECT name, email FROM customers WHERE created_at >= '2022-01-03';

-- TASK: 4
UPDATE customers SET email = "davidkim@gmail.com" WHERE id=5;
SELECT * FROM customers;

-- TASK: 5
DELETE FROM customers WHERE id=2;
SELECT * FROM customers;

-- TASK: 6
SELECT COUNT(id) AS total_customers FROM customers;
