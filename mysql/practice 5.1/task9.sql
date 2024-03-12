USE practice5_1;

-- TASK: 9
INSERT INTO orders_task8 (customer_id, order_date) VALUES (1, '2024-03-01');

SELECT * FROM customers_task8;
SELECT * FROM products_task8;
SELECT * FROM orders_task8;
SELECT * FROM orders_details_task8;

SELECT 
	c.customer_id, 
    c.customer_name,
    SUM(od.quantity * p.product_price) AS total_amount_spent,
    AVG(od.quantity * p.product_price) AS average_amount_per_order
FROM customers_task8 c
INNER JOIN orders_task8 o
ON o.customer_id = c.customer_id
INNER JOIN orders_details_task8 od
ON od.order_id = o.order_id
INNER JOIN products_task8 p
ON p.product_id = od.product_id
GROUP BY c.customer_id;

SELECT o.order_id, SUM(od.quantity * p.product_price) AS total_price
FROM orders_task8 o
LEFT JOIN orders_details_task8 od
ON od.order_id = o.order_id
LEFT JOIN products_task8 p
ON p.product_id = od.product_id
GROUP BY o.order_id;
