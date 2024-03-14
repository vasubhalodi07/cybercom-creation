USE practice5_3;

-- TASK: 10
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
WHERE c.customer_country='USA'
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
	SELECT AVG(oi.quantity * p.unit_price)
	FROM customers c
	JOIN orders o ON o.customer_id = c.customer_id
	JOIN order_items oi ON oi.order_id = o.order_id
	JOIN products p ON p.product_id = oi.product_id
) AND COUNT(c.customer_id) >= 2
ORDER BY total_revenue DESC;

