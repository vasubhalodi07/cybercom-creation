USE practice5_2;

-- TASK: 6
SELECT * FROM employees_table4;
SELECT * FROM customers_table4;
SELECT * FROM products_table4;
SELECT * FROM categories_table4;
SELECT * FROM sales_table4;

SELECT DISTINCT e.employee_name
FROM employees_table4 e
JOIN sales_table4 s ON s.employee_id = e.employee_id
JOIN products_table4 p ON p.product_id = s.product_id
JOIN categories_table4 ct ON ct.category_id = p.category_id
WHERE ct.category_name = "Electronics" 
AND s.customer_id NOT IN (
	SELECT DISTINCT c1.customer_id
	FROM customers_task1 c1
	INNER JOIN orders_task1 o1 ON o1.customer_id = c1.customer_id
	INNER JOIN orders_details_task1 od1 ON od1.order_id = o1.order_id
	INNER JOIN products_task1 p1 ON p1.product_id = od1.product_id
	INNER JOIN categories_task1 ca1 ON ca1.category_id = p1.category_id
	WHERE ca1.category_name = "Clothing"
);

SELECT DISTINCT e.employee_name
FROM employees_table4 e
JOIN sales_table4 s ON s.employee_id = e.employee_id
JOIN products_table4 p ON p.product_id = s.product_id
JOIN categories_table4 ct ON ct.category_id = p.category_id
WHERE ct.category_name = 'Electronics'
AND NOT EXISTS (
    SELECT 1
    FROM sales_table4 s2
    JOIN products_table4 p2 ON p2.product_id = s2.product_id
    JOIN categories_table4 ct2 ON ct2.category_id = p2.category_id
    WHERE s2.employee_id = e.employee_id
    AND ct2.category_name = 'Clothing'
);

