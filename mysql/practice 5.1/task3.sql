USE practice5_1;

-- TASK: 3
DROP TABLE customers_task3;
DROP TABLE orders_task3;
DROP TABLE order_details_task3;

CREATE TABLE customers_task3 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders_task3 (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers_task3(customer_id)
);

CREATE TABLE order_details_task3 (
    detail_id INT PRIMARY KEY,
    order_id INT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders_task3(order_id)
);

INSERT INTO customers_task3 (customer_id, customer_name, email) VALUES
(1, 'John Doe', 'john.doe@example.com'),
(2, 'Jane Smith', 'jane.smith@example.com'),
(3, 'Michael Johnson', 'michael.johnson@example.com');

INSERT INTO orders_task3 (order_id, customer_id, order_date) VALUES
(101, 1, '2024-02-01'),
(102, 2, '2024-02-15'),
(103, 3, '2024-03-01'),
(104, 1, '2024-03-05'),
(105, 2, '2024-03-10'),
(106, 3, '2024-03-15');

INSERT INTO order_details_task3 (detail_id, order_id, price) VALUES
(201, 101, 50.00),
(202, 101, 25.00),
(203, 102, 30.00),
(204, 102, 20.00),
(205, 103, 40.00),
(206, 103, 35.00),
(207, 104, 60.00),
(208, 104, 45.00),
(209, 105, 55.00),
(210, 105, 35.00),
(211, 106, 70.00),
(212, 106, 50.00);

SELECT 
	c.customer_id, 
    c.customer_name, 
    SUM(od.price) AS total_price, 
    SUM(
		CASE 
			WHEN o.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
			THEN od.price ELSE 0 END
	) AS amount_spent_last_30_days
FROM customers_task3 c
JOIN orders_task3 o
ON o.customer_id = c.customer_id
JOIN order_details_task3 od
ON od.order_id = o.order_id
GROUP BY c.customer_id;

SELECT 
	CASE 
		WHEN '2024-03-01' >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
        THEN 100 
        ELSE 0 
	END;
