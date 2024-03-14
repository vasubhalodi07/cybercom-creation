CREATE DATABASE practice5_2;
USE practice5_2;

-- TASK: 1
DROP TABLE customers_task1;
DROP TABLE categories_task1;
DROP TABLE products_task1;
DROP TABLE orders_task1;
DROP TABLE orders_details_task1;

CREATE TABLE customers_task1 (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE categories_task1 (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100)
);

CREATE TABLE products_task1 (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    category_id INT,
    product_price DECIMAL(10, 2),
    FOREIGN KEY (category_id) REFERENCES categories_task1(category_id)
);

CREATE TABLE orders_task1 (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers_task1(customer_id)
);

CREATE TABLE orders_details_task1 (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    Quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders_task1(order_id),
    FOREIGN KEY (product_id) REFERENCES products_task1(product_id)
);

TRUNCATE customer_task1;
TRUNCATE categories_task1;
TRUNCATE products_task1;
TRUNCATE orders_task1;
TRUNCATE orders_details_task1;

SELECT * FROM customers_task1;
INSERT INTO customers_task1 (customer_name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Abcd Def', 'abcd@gmail.com');

SELECT * FROM categories_task1;
INSERT INTO categories_task1 (category_name) VALUES
('Electronics'),
('Clothing'),
('Home Appliances');

INSERT INTO products_task1 (product_name, category_id, product_price) VALUES
('Laptop', 1, 1200.00),
('Smartphone', 1, 800.00),
('T-shirt', 2, 20.00),
('Jeans', 2, 50.00),
('Microwave', 3, 150.00),
('Blender', 3, 80.00);

SELECT * FROM orders_task1;
INSERT INTO orders_task1 (customer_id, order_date) VALUES
(1, '2024-03-12'),
(1, '2024-03-11'),
(2, '2024-03-10'),
(3, '2024-02-10');

INSERT INTO orders_details_task1 (order_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 3),
(3, 5, 1),
(3, 6, 1),
(4, 1, 4);

SELECT 
	c.customer_id,
    c.customer_name,
    ca.category_name,
    SUM(od.Quantity * p.product_price) AS total_amount
FROM customers_task1 c
JOIN orders_task1 o
ON o.customer_id = c.customer_id
JOIN orders_details_task1 od
ON od.order_id = o.order_id
JOIN products_task1 p
ON p.product_id = od.product_id
JOIN categories_task1 ca
ON ca.category_id = p.category_id
WHERE ca.category_name = "Electronics"
GROUP BY c.customer_id
ORDER BY total_amount DESC;

