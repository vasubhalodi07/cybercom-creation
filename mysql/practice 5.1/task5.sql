USE practice5_1;

-- TASK: 5
CREATE TABLE customers_task5 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders_task5 (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers_task5(customer_id)
);

INSERT INTO customers_task5 (customer_id, customer_name, email) VALUES
(1, 'John Doe', 'john.doe@example.com'),
(2, 'Jane Smith', 'jane.smith@example.com'),
(3, 'Michael Johnson', 'michael.johnson@example.com');
INSERT INTO customers_task5 (customer_id, customer_name, email) VALUES
(4, 'Abcd Defg', 'abcd@gmail.com');

INSERT INTO orders_task5 (order_id, customer_id, order_date) VALUES
(101, 1, '2024-01-01'),
(102, 2, '2024-01-05'),
(103, 3, '2024-01-10'),
(104, 1, '2024-01-15'),
(105, 2, '2024-01-20'),
(106, 1, '2024-01-25'),
(107, 3, '2024-01-30');

INSERT INTO orders_task5 (order_id, customer_id, order_date) VALUES
(110, 2, '2024-02-10'),
(111, 2, '2024-02-15');

INSERT INTO orders_task5 (order_id, customer_id, order_date) VALUES
(112, 2, '2023-02-10'),
(113, 2, '2022-02-15');

INSERT INTO orders_task5 (order_id, customer_id, order_date) VALUES
(114, 4, '2021-02-10');

SELECT * FROM customers_task5;
SELECT * FROM orders_task5; 

SELECT c.customer_name , GROUP_CONCAT(o.order_date, ",") AS order_date
FROM customers_task5 c
INNER JOIN orders_task5 o ON c.customer_id = o.customer_id
WHERE c.customer_id NOT IN (
	SELECT c1.customer_id
	FROM customers_task5 c1
	INNER JOIN orders_task5 o1 
	ON c1.customer_id = o1.customer_id
	WHERE o1.order_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
	GROUP BY c1.customer_id
)
GROUP BY c.customer_id;

SELECT c.customer_name, COUNT(o.order_id) AS total_orders
FROM customers_task5 c
INNER JOIN orders_task5 o
ON c.customer_id = o.customer_id
WHERE o.order_date <= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
GROUP BY c.customer_id;

SELECT '2023-01-10' >= DATE_SUB(CURDATE(), INTERVAL 90 DAY);

