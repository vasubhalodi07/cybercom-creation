USE practice5_2;

-- TASK: 8
SELECT e.employee_name
FROM employees_table4 e
JOIN sales_table4 s ON s.employee_id = e.employee_id
JOIN products_table4 p ON p.product_id = s.product_id
JOIN categories_table4 ct ON ct.category_id = p.category_id
WHERE ct.category_name = "Electronics"
GROUP BY e.employee_id
HAVING COUNT(DISTINCT p.product_id) > 1;