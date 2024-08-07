USE product5_4;

-- TASK: 10
SELECT c.name
FROM customers_task1 c
INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.name
HAVING COUNT(DISTINCT o.category_id) >= 2;
