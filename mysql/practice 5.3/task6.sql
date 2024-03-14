USE practice5_3;

-- TASK: 6
SELECT DISTINCT employee_name
FROM employees e
INNER JOIN orders_task1 o
ON o.employee_id = e.employee_id
WHERE o.total_sales>50000;

SELECT employee_name
FROM employees
WHERE employee_id IN (
    SELECT employee_id
    FROM orders_task1
    WHERE total_sales > 50000.00
);
