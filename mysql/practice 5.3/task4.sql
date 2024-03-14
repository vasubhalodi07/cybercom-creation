USE practice5_3;

-- TASK: 4
SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
	SELECT AVG(oi.quantity * p.unit_price)
	FROM customers c
	JOIN orders o ON o.customer_id = c.customer_id
	JOIN order_items oi ON oi.order_id = o.order_id
	JOIN products p ON p.product_id = oi.product_id
)
ORDER BY total_revenue DESC;


SELECT c.customer_name, SUM(oi.quantity * p.unit_price) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
GROUP BY c.customer_id, c.customer_name
HAVING total_revenue > (
    SELECT AVG(revenue)
    FROM (
        SELECT SUM(oi.quantity * pr.unit_price) AS revenue
        FROM customers cu
        JOIN orders ordr ON ordr.customer_id = cu.customer_id
        JOIN order_items oi ON oi.order_id = ordr.order_id
        JOIN products pr ON pr.product_id = oi.product_id
        GROUP BY cu.customer_id
    ) AS avg_revenue
)
ORDER BY total_revenue DESC;
