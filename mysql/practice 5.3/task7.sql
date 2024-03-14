USE practice5_3;

-- TASK: 7
SELECT DISTINCT e.employee_name, o.total_sales
FROM employees e
INNER JOIN orders_task1 o ON o.employee_id = e.employee_id
WHERE o.total_sales > (SELECT AVG(total_sales) FROM orders_task1)
ORDER BY o.total_sales DESC;
