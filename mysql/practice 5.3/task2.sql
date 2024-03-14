USE practice5_3;

-- TASK: 2
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50)
);
ALTER TABLE customers ADD COLUMN customer_country VARCHAR(20);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    unit_price DECIMAL(10, 2)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO customers (customer_id, customer_name) VALUES
(1, 'John Smith'),
(2, 'Alice Johnson'),
(3, 'Michael Brown');

UPDATE customers SET customer_country='USA' WHERE customer_id=1;
UPDATE customers SET customer_country='USA' WHERE customer_id=2;
UPDATE customers SET customer_country='Canada' WHERE customer_id=3;

INSERT INTO products (product_id, product_name, unit_price) VALUES
(101, 'Product A', 10.50),
(102, 'Product B', 15.75),
(103, 'Product C', 20.00);
UPDATE products SET unit_price=6000 WHERE product_id=101;

INSERT INTO orders (order_id, customer_id, order_date) VALUES
(1001, 1, '2024-03-13'),
(1002, 2, '2024-03-14'),
(1003, 3, '2024-03-15');

INSERT INTO order_items (order_item_id, order_id, product_id, quantity) VALUES
(2001, 1001, 101, 2),
(2002, 1001, 102, 1),
(2003, 1002, 102, 3),
(2004, 1003, 103, 2),
(2005, 1003, 101, 1);

SELECT * FROM customers;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM order_items;

SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_revenue DESC;

