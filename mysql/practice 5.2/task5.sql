USE practice5_2;

-- TASK: 5
SELECT c.customer_id, c.customer_name
FROM customers_task1 c
INNER JOIN orders_task1 o ON o.customer_id = c.customer_id
INNER JOIN orders_details_task1 od ON od.order_id = o.order_id
INNER JOIN products_task1 p ON p.product_id = od.product_id
INNER JOIN categories_task1 ca ON ca.category_id = p.category_id
WHERE ca.category_name = "Electronics" AND c.customer_id 
NOT IN (
	SELECT DISTINCT c1.customer_id
	FROM customers_task1 c1
	INNER JOIN orders_task1 o1 ON o1.customer_id = c1.customer_id
	INNER JOIN orders_details_task1 od1 ON od1.order_id = o1.order_id
	INNER JOIN products_task1 p1 ON p1.product_id = od1.product_id
	INNER JOIN categories_task1 ca1 ON ca1.category_id = p1.category_id
	WHERE ca1.category_name = "Clothing"
)
GROUP BY c.customer_id;

