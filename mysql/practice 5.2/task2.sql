USE practice5_2;

-- TAKS: 2
SELECT 
	c.customer_id,
    c.customer_name,
    ca.category_name,
    SUM(od.Quantity * p.product_price) AS total_revenue
FROM customers_task1 c
JOIN orders_task1 o ON o.customer_id = c.customer_id
INNER JOIN orders_details_task1 od ON od.order_id = o.order_id
INNER JOIN products_task1 p ON p.product_id = od.product_id
INNER JOIN categories_task1 ca ON ca.category_id = p.category_id
WHERE ca.category_name = "Clothing"
GROUP BY c.customer_id
ORDER BY total_revenue DESC;

