USE practice3_2;

DROP TABLE orders;
CREATE TABLE orders(
	id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL
);

INSERT INTO orders (customer_id, order_date, total_amount) VALUES
    (1, '2023-01-01 10:00:00', 100.00),
    (2, '2023-01-02 11:00:00', 150.00),
    (3, '2023-01-03 12:00:00', 200.00),
    (1, '2023-01-04 13:00:00', 80.00),
    (2, '2023-01-05 14:00:00', 120.00),
    (3, '2023-01-06 15:00:00', 90.00),
    (1, '2023-01-07 16:00:00', 110.00),
    (2, '2023-01-08 17:00:00', 130.00),
    (3, '2023-01-09 18:00:00', 70.00),
    (1, '2023-01-10 19:00:00', 160.00);

SELECT customer_id, SUM(total_amount) AS total FROM orders GROUP BY customer_id;
