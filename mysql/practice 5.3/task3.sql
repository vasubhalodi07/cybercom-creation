USE practice5_3;

-- TASK: 3
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
LEFT JOIN order_items oi ON oi.order_id = o.order_id
LEFT JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > 10000
ORDER BY total_revenue DESC;
