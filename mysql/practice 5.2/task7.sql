USE practice5_2;

-- TASK: 7
SELECT c.customer_name
FROM customers_task1 c
INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
INNER JOIN orders_details_task1 od ON od.order_id = o.order_id
INNER JOIN products_task1 p ON p.product_id = od.product_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(p.product_id) > 1;
-- HAVING COUNT(p.product_id) > 5;

