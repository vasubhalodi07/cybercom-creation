USE practice5_1;

-- TASK: 8
CREATE TABLE customers_task8 (
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(50) NOT NULL
);

CREATE TABLE products_task8 (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    product_description TEXT NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders_task8 (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers_task8(customer_id)
); 

CREATE TABLE orders_details_task8 (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES orders_task8(order_id),
	FOREIGN KEY (product_id) REFERENCES products_task8(product_id)
);

INSERT INTO customers_task8 (customer_name) VALUES
('John Doe'),
('Jane Smith'),
('Alice Johnson'),
('Bob Williams');
INSERT INTO customers_task8 (customer_name) VALUES
('Meet');

INSERT INTO products_task8 (product_name, product_description, product_price) VALUES
('Product A', 'Description for Product A', 50.00),
('Product B', 'Description for Product B', 150.00),
('Product C', 'Description for Product C', 75.00),
('Product D', 'Description for Product D', 120.00),
('Product E', 'Description for Product E', 80.00),
('Product F', 'Description for Product F', 90.00),
('Product G', 'Description for Product G', 110.00),
('Product H', 'Description for Product H', 95.00),
('Product I', 'Description for Product I', 70.00),
('Product J', 'Description for Product J', 60.00);

INSERT INTO orders_task8 (customer_id, order_date) VALUES
(1, '2024-03-01'),
(2, '2024-03-02'),
(3, '2024-03-03'),
(4, '2024-03-04');
INSERT INTO orders_task8 (customer_id, order_date) VALUES
(5, '2025-03-01');

INSERT INTO orders_details_task8 (order_id, product_id, quantity) VALUES
(6, 1, 1);
INSERT INTO orders_details_task8 (order_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(3, 5, 3),
(3, 7, 2),
(4, 4, 1),
(4, 6, 1),
(4, 8, 2),
(4, 10, 3),
(1, 9, 1),
(2, 3, 1),
(2, 5, 2),
(3, 2, 1),
(4, 1, 1),
(1, 7, 1),
(3, 3, 2),
(2, 6, 1),
(4, 2, 1),
(3, 9, 1),
(1, 5, 2);

SELECT * FROM customers_task8;
SELECT * FROM orders_task8;

SELECT c.customer_id, c.customer_name, p.product_name, p.product_price
FROM customers_task8 c
JOIN orders_task8 o ON c.customer_id = o.customer_id
JOIN orders_details_task8 od ON od.order_id = o.order_id
JOIN products_task8 p ON p.product_id = od.product_id
WHERE c.customer_id NOT IN (
	SELECT DISTINCT c.customer_id 
	FROM customers_task8 c
	JOIN orders_task8 o ON c.customer_id = o.customer_id
	JOIN orders_details_task8 od ON od.order_id = o.order_id
	JOIN products_task8 p ON p.product_id = od.product_id
	WHERE p.product_price>100
);

