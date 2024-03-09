CREATE DATABASE practice3_5;
USE practice3_5;

DROP TABLE customers;
DROP TABLE orders;
DROP TABLE products;

CREATE TABLE customers (
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone VARCHAR(30) NOT NULL
);

CREATE TABLE products (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE NOT NULL,
    customer_id INT,
    product_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- TASK: 1
INSERT INTO customers (first_name, last_name, email, phone)
VALUES
('Sarah', 'Wilson', 'sarah@example.com', '111-222-3333'),
('Michael', 'Brown', 'michael.b@example.com', '444-555-6666'),
('Jennifer', 'Lee', 'jennifer@example.com', '777-888-9999'),
('Daniel', 'Taylor', 'daniel@example.com', '222-333-4444'),
('Jessica', 'Garcia', 'jessica@example.com', '555-666-7777');

INSERT INTO products (product_name, unit_price, description)
VALUES
('Wireless Mouse', 30.00, 'Ergonomic design with precision tracking'),
('External Hard Drive', 100.00, '1TB storage for backup and file transfer'),
('Bluetooth Speaker', 80.00, 'Portable speaker with long battery life'),
('Wireless Earbuds', 120.00, 'True wireless earbuds with noise isolation'),
('Gaming Console', 400.00, 'Next-gen console for immersive gaming experience');

INSERT INTO orders (order_date, customer_id, product_id)
VALUES
('2025-03-25', 3, 1),
('2025-04-30', 4, 2),
('2025-05-05', 5, 3),
('2025-06-10', 1, 4),
('2025-07-15', 2, 5),
('2025-08-20', 3, 1),
('2025-09-25', 4, 2),
('2025-10-30', 5, 3),
('2025-11-05', 1, 4),
('2025-12-10', 2, 1),
('2025-09-25', 4, 1),
('2025-10-30', 2, 3),
('2025-11-05', 3, 4),
('2025-12-10', 4, 1);

-- TASK: 2
SELECT first_name, last_name, COUNT(c.customer_id) AS total_order FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_order DESC;

-- TASK: 3
SELECT p.product_name, COUNT(p.product_id) AS total_orders, SUM(p.unit_price) AS total_revenue FROM products p
LEFT JOIN orders o
ON o.product_id = p.product_id
GROUP BY p.product_id
ORDER BY total_revenue DESC;

-- TASK: 4
SELECT c.first_name, c.last_name, c.email, p.product_name, COUNT(o.customer_id) AS total_orders FROM orders o
INNER JOIN customers c
ON c.customer_id = o.customer_id
INNER JOIN products p
ON p.product_id = o.product_id
GROUP BY c.customer_id
HAVING total_orders > 1;

-- TASK: 5
SELECT c.customer_id, c.first_name, c.last_name, c.email, p.product_name, p.unit_price FROM orders o
INNER JOIN customers c
ON c.customer_id = o.customer_id
INNER JOIN products p
ON p.product_id = o.product_id
WHERE p.unit_price > 50;

-- TASK: 6
SELECT p.product_name, COUNT(o.product_id) AS total_orders FROM orders o
INNER JOIN products p
ON p.product_id = o.product_id
GROUP BY o.product_id
HAVING total_orders > 1;

