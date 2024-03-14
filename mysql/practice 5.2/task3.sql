USE practice5_2;

-- TASK: 3
SELECT 
    c.customer_id,
    c.customer_name
FROM customers_task1 c
JOIN orders_task1 o ON o.customer_id = c.customer_id
JOIN orders_details_task1 od ON od.order_id = o.order_id
JOIN products_task1 p ON p.product_id = od.product_id
JOIN categories_task1 ca ON ca.category_id = p.category_id
WHERE ca.category_name IN ('Electronics', 'Clothing')
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(DISTINCT ca.category_name) = 2;

