USE practice5_1;

-- TASK: 10
CREATE TABLE country_task10(
	country_id INT PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(20) NOT NULL
);

CREATE TABLE customers_task10 (
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    country_id INT,
    FOREIGN KEY (country_id) REFERENCES country_task10(country_id)
);

CREATE TABLE products_task10 (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders_task10 (
	orders_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE orders_details_task10 (
    orders_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO country_task10 (country_name) VALUES
('India'),
('Canada'),
('UK'),
('France'),
('Germany');

INSERT INTO customers_task10 (customer_name, country_id) VALUES
('John Doe', 1),
('Jane Smith', 2),
('Alice Johnson', 3),
('Bob Williams', 4),
('Michael Brown', 5);

INSERT INTO products_task10 (product_name, product_price) VALUES
('Product A', 50.00),
('Product B', 150.00),
('Product C', 75.00),
('Product D', 120.00),
('Product E', 80.00);

INSERT INTO orders_task10 (customer_id, date) VALUES
(1, '2024-03-01'),
(2, '2024-03-02'),
(3, '2024-03-03'),
(4, '2024-03-04'),
(5, '2024-03-05'),
(1, '2024-03-05');

INSERT INTO orders_details_task10 (orders_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(3, 5, 3),
(3, 4, 1),
(4, 1, 1),
(4, 2, 2),
(4, 4, 1),
(5, 3, 2),
(5, 5, 1),
(5, 1, 1);

SELECT 
	p.product_id,
    p.product_name,
    GROUP_CONCAT(ct.country_name SEPARATOR ', ') AS country_names
FROM customers_task10 c 
INNER JOIN orders_task10 o ON o.customer_id = c.customer_id
INNER JOIN orders_details_task10 od ON od.orders_id = o.orders_id
INNER JOIN products_task10 p ON p.product_id = od.product_id
INNER JOIN country_task10 ct ON ct.country_id = c.country_id
GROUP BY p.product_id
HAVING COUNT(ct.country_name) > 1;


