USE product5_4;

-- TASK: 7
SELECT name FROM (
	SELECT c.name, SUM(o.total_price) AS total_price
	FROM customers_task1 c
	INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
	GROUP BY c.customer_id, c.name
	HAVING SUM(o.total_price) > 100
) AS records 
ORDER BY total_price DESC;
