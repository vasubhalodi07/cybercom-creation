USE product5_4;

-- TASK: 3
SELECT * 
FROM customers_task1
WHERE customer_id NOT IN (
	SELECT DISTINCT c.customer_id
	FROM customers_task1 c
	INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
	INNER JOIN returns_task1 r ON r.order_id = o.order_id
);
