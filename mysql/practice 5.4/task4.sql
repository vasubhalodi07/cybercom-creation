USE product5_4;

-- TASK: 4
SELECT c.customer_id, c.name, COUNT(o.customer_id), COUNT(r.order_id)
FROM customers_task1 c
INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
LEFT JOIN returns_task1 r ON r.order_id = o.order_id
GROUP BY c.customer_id
HAVING COUNT(o.order_id) < COUNT(r.return_id);
