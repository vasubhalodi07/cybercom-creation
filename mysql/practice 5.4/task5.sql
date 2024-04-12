USE product5_4;

-- TASK: 5
SELECT c.name
       ,COUNT(r.return_id) AS TotalReturns
       ,COUNT(o.order_id) AS TotalOrders
FROM customers_task1 c
JOIN orders_task1 o ON c.customer_id = o.customer_id
LEFT JOIN returns_task1 r ON o.order_id = r.order_id
GROUP BY c.customer_id
HAVING COUNT(r.return_id)<=COUNT(o.order_id);