USE practice5_1;

-- TASK: 2
DROP TABLE employees_task2;
DROP TABLE orders_task2;
DROP TABLE order_details_task2;

CREATE TABLE employees_task2 (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders_task2 (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    order_date DATE
);

CREATE TABLE order_details_task2 (
	id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO employees_task2 (name, email) VALUES
('John Smith', 'john.smith@example.com'),
('Jane Doe', 'jane.doe@example.com'),
('Michael Johnson', 'michael.johnson@example.com');

INSERT INTO orders_task2 (employee_id, order_date) VALUES
(1, '2024-03-01'),
(2, '2024-03-02'),
(3, '2024-03-03'),
(1, '2024-03-04'),
(2, '2024-03-05'),
(1, '2024-03-06'),
(3, '2024-03-07'),
(2, '2024-03-08'),
(1, '2024-03-09'),
(3, '2024-03-10');

INSERT INTO order_details_task2 (order_id, price) VALUES
(1, 50000),
(1, 30000),
(2, 20000),
(3, 30000),
(3, 40000),
(4, 25000),
(5, 30000),
(6, 20000),
(6, 30000),
(7, 15000),
(8, 50000),
(9, 25000),
(4, 25000),
(5, 30000),
(6, 20000),
(6, 30000),
(7, 15000),
(8, 50000),
(9, 25000),
(4, 25000),
(5, 30000),
(6, 20000),
(6, 30000),
(7, 15000),
(8, 50000),
(9, 25000);

SELECT * FROM employees_task2;
SELECT * FROM orders_task2;
SELECT * FROM order_details_task2;

SELECT e.id AS employee_id, e.name AS employee_name, SUM(od.price) AS total_sales
FROM employees_task2 e
JOIN orders_task2 o 
ON o.employee_id = e.id
JOIN order_details_task2 od 
ON od.order_id = o.order_id
GROUP BY e.id
HAVING total_sales > 100000
ORDER BY total_sales DESC;

