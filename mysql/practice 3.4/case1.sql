CREATE DATABASE practice3_4;
USE practice3_4;

CREATE TABLE cars (
	carid INT PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    mileage INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available BIT NOT NULL
);

CREATE TABLE customers (
	customerid INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL 
);

CREATE TABLE sales (
	saleid INT PRIMARY KEY AUTO_INCREMENT,
    carid INT NOT NULL,
    customerid INT NOT NULL,
    salesDate DATE NOT NULL,
    salePrice DECIMAL(10, 2) NOT NULL
);

TRUNCATE cars;
TRUNCATE customers;
TRUNCATE sales;

INSERT INTO cars (brand, model, year, mileage, price, available) VALUES
('Toyota', 'Rav4', 2019, 22000, 20000.00, 1),
('Honda', 'Pilot', 2018, 18000, 25000.00, 1),
('Ford', 'Explorer', 2020, 15000, 28000.00, 1),
('Chevrolet', 'Equinox', 2017, 25000, 17000.00, 1),
('Nissan', 'Rogue', 2018, 20000, 19000.00, 1),
('Hyundai', 'Tucson', 2019, 17000, 22000.00, 1),
('Kia', 'Sportage', 2017, 23000, 18000.00, 1),
('Volkswagen', 'Tiguan', 2018, 21000, 21000.00, 1),
('BMW', 'X3', 2020, 12000, 35000.00, 1),
('Mercedes-Benz', 'GLC', 2019, 15000, 38000.00, 1),
('Audi', 'Q5', 2018, 19000, 32000.00, 1),
('Lexus', 'RX', 2019, 14000, 40000.00, 1),
('Tesla', 'Model Y', 2021, 8000, 50000.00, 1),
('Subaru', 'Forester', 2019, 16000, 25000.00, 1),
('Mazda', 'CX-9', 2020, 10000, 30000.00, 1),
('Mazda', 'CX-10', 2020, 15000, 30000.00, 0);

INSERT INTO customers (firstName, lastName, email, phoneNumber) VALUES
('John', 'Doe', 'johndoe@example.com', '123-456-7890'),
('Jane', 'Smith', 'janesmith@example.com', '987-654-3210'),
('Michael', 'Johnson', 'michaeljohnson@example.com', '456-789-0123'),
('Emily', 'Brown', 'emilybrown@example.com', '321-654-9870'),
('David', 'Williams', 'davidwilliams@example.com', '789-012-3456');

INSERT INTO sales (carid, customerid, salesDate, salePrice) VALUES
(1, 1, '2023-01-15', 14500.00),
(2, 2, '2023-02-20', 13500.00),
(3, 1, '2023-03-25', 12500.00),
(4, 4, '2023-04-30', 15500.00),
(5, 2, '2023-05-05', 11500.00),
(2, 2, '2023-02-20', 13500.00),
(3, 1, '2023-03-25', 12500.00),
(4, 4, '2023-04-30', 15500.00),
(5, 1, '2023-05-05', 11500.00),
(2, 1, '2021-05-05', 12000.00);

SELECT * FROM cars;
SELECT * FROM customers;
SELECT * FROM sales;

-- TASK: 1
SELECT * FROM cars ORDER BY price DESC LIMIT 10;

-- TASK: 2
SELECT AVG(price) FROM cars WHERE available>=1;

-- TASK: 3
SELECT c.customerid, c.firstName, c.lastName, c.email, COUNT(s.carid) AS total_cars
FROM customers c 
INNER JOIN sales s 
ON s.customerid = c.customerid
GROUP BY c.customerid;

-- TASK: 4
SELECT c.customerid, c.firstName, c.lastName, c.email, COUNT(s.carid) AS total_cars
FROM customers c 
LEFT JOIN sales s 
ON s.customerid = c.customerid
GROUP BY c.customerid
HAVING COUNT(s.carid) = 0;

-- TASK: 5
INSERT INTO cars (brand, model, year, mileage, price, available) VALUES 
('Toyota', 'Corolla', 2022, 0, 20000, 1);

-- TASK: 6
SELECT * FROM cars;
UPDATE cars SET price=price + (price * 0.10);
SELECT * FROM cars;

-- TASK: 7
DELETE FROM sales WHERE salesDate < '2022-01-01';
SELECT * FROM sales;

