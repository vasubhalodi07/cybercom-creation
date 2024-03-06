USE practice3_1;

DROP TABLE sales;
CREATE TABLE sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10,2)
);

INSERT INTO sales (date, customer_id, product_id, quantity, total_price)
VALUES
    ('2022-01-01', 1, 1, 2, 199.98),
    ('2022-02-02', 2, 3, 1, 99.99),
    ('2022-02-03', 1, 2, 3, 299.97),
    ('2022-01-04', 3, 1, 1, 99.99),
    ('2023-01-05', 2, 4, 2, 399.98);

SELECT MONTH(date) AS month, SUM(total_price) AS total FROM sales WHERE YEAR(date) = 2022 GROUP BY MONTH(date);

