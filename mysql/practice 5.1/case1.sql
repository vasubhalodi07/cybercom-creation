CREATE DATABASE practice5_1;
USE practice5_1;

-- TASK: 1
CREATE TABLE customers_task1 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE orders_task1 (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE
);

TRUNCATE customers_task1;
TRUNCATE orders_task1;

INSERT INTO customers_task1 (customer_id, customer_name, email) VALUES
(101, 'John Doe', 'john.doe@example.com'),
(102, 'Jane Smith', 'jane.smith@example.com'),
(103, 'Michael Johnson', 'michael.johnson@example.com'),
(104, 'Emily Brown', 'emily.brown@example.com'),
(105, 'David Wilson', 'david.wilson@example.com');

INSERT INTO orders_task1 (order_id, customer_id, order_date) VALUES
(1, 101, '2024-03-01'),
(2, 102, '2024-03-02'),
(3, 103, '2024-03-03'),
(4, 101, '2024-03-04'),
(5, 104, '2024-03-05'),
(6, 101, '2024-03-06'),
(7, 105, '2024-03-07'),
(8, 102, '2024-03-08'),
(9, 103, '2024-03-09'),
(10, 101, '2024-03-10'),
(11, 102, '2024-03-11'),
(12, 104, '2024-03-12'),
(13, 101, '2024-03-13'),
(14, 103, '2024-03-14'),
(15, 105, '2024-03-15');

SELECT c.customer_id, c.customer_name, COUNT(o.order_id) AS total_order 
FROM customers_task1 c
INNER JOIN orders_task1 o
ON o.customer_id = c.customer_id
GROUP BY c.customer_id
ORDER BY total_order DESC
LIMIT 10;

SELECT customer_id, COUNT(*) AS total_orders
FROM orders_task1
GROUP BY customer_id
ORDER BY total_orders DESC
LIMIT 10;
