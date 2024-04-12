DROP DATABASE product5_4;
CREATE DATABASE product5_4;
USE product5_4;

-- TASK: 1
DROP TABLE customers_task1;
DROP TABLE orders_task1;
DROP TABLE returns_task1;

CREATE TABLE customers_task1 (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE categories_task1 (
	category_id INT PRIMARY KEY,
    category_name VARCHAR(20)
);

CREATE TABLE orders_task1 (
    order_id INT PRIMARY KEY,
    customer_id INT,
    category_id INT,
    total_price DECIMAL(10, 2),
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers_task1(customer_id),
    FOREIGN KEY (category_id) REFERENCES categories_task1(category_id)
);

CREATE TABLE returns_task1 (
    return_id INT PRIMARY KEY,
    order_id INT,
    return_date DATE,
    FOREIGN KEY (order_id) REFERENCES orders_task1(order_id)
);

INSERT INTO customers_task1 (customer_id, name) VALUES
(1, 'John Doe'),
(2, 'Jane Smith'),
(3, 'Alice Johnson');

INSERT INTO categories_task1 (category_id, category_name) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Books');

INSERT INTO orders_task1 (order_id, customer_id, category_id, total_price, order_date) VALUES
(101, 1, 1, 20.00, '2024-01-01'),
(102, 1, 2, 35.00, '2024-01-02'),
(103, 1, 3, 40.00, '2024-01-03'),
(104, 2, 1, 20.00, '2024-01-01'),
(105, 2, 2, 45.00, '2024-01-02'),
(106, 3, 1, 10.00, '2024-01-03');
INSERT INTO orders_task1 (order_id, customer_id, category_id, total_price, order_date) VALUES
(107, 1, 1, 10.00, '2024-01-01');


INSERT INTO returns_task1 (return_id, order_id, return_date) VALUES
(201, 101, '2024-01-10'),
(202, 102, '2024-01-20');

SELECT customer_id, name 
FROM customers_task1
WHERE customer_id NOT IN (
	SELECT DISTINCT c.customer_id
	FROM customers_task1 c
	INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
	INNER JOIN returns_task1 r ON r.order_id = o.order_id
);
