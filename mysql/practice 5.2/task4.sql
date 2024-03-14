USE practice5_2;

-- TASK: 4
DROP TABLE employees_table4;
DROP TABLE customers_table4;
DROP TABLE categories_table4;
DROP TABLE products_table4;
DROP TABLE sales_table4;

CREATE TABLE employees_table4 (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    employee_city VARCHAR(100)
);

CREATE TABLE customers_table4 (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    shipping_address_city VARCHAR(100)
);

CREATE TABLE categories_table4 (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100)
);

CREATE TABLE products_table4 (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    product_price DECIMAL(10, 2),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories_table4(category_id)
);

CREATE TABLE sales_table4 (
    sale_id INT PRIMARY KEY,
    employee_id INT,
    customer_id INT,
    product_id INT,
    sale_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees_table4(employee_id),
    FOREIGN KEY (customer_id) REFERENCES customers_table4(customer_id),
    FOREIGN KEY (product_id) REFERENCES products_table4(product_id)
);

INSERT INTO employees_table4 (employee_id, employee_name, employee_city) VALUES
(1, 'John Smith', 'New York'),
(2, 'Emily Johnson', 'Los Angeles'),
(3, 'Michael Williams', 'Chicago');

INSERT INTO customers_table4 (customer_id, customer_name, shipping_address_city) VALUES
(1, 'Alice Brown', 'San Francisco'),
(2, 'Bob Davis', 'Seattle'),
(3, 'Carol Wilson', 'Boston');

INSERT INTO categories_table4 (category_name) VALUES
('Electronics'),
('Clothing');

INSERT INTO products_table4 (product_id, product_name, product_price, category_id) VALUES
(1, 'MacBook Pro', 1500.00, 1),
(2, 'iPhone 12', 1000.00, 1),
(3, 'Samsung Galaxy Watch', 300.00, 1),
(4, 'Adidas T-Shirt', 25.00, 2),
(5, 'Levis Jeans', 60.00, 2);

INSERT INTO products_table4 (product_id, product_name, product_price, category_id) VALUES
(6, 'Sony TV', 120.00, 1),
(7, 'Sony Camera', 200.00, 1),
(8, 'Iphone 15', 250000, 1),
(9, 'Macbook Air M2 Chip', 50000, 1);

TRUNCATE sales_table4;
INSERT INTO sales_table4 (sale_id, employee_id, customer_id, product_id, sale_date) VALUES
(1, 1, 1, 1, '2024-03-13'),
(2, 2, 2, 2, '2024-03-12'),
(3, 3, 3, 3, '2024-03-11'),
(4, 1, 2, 4, '2024-03-10'),
(5, 1, 1, 1, '2024-03-20'),
(6, 1, 1, 6, '2023-03-20'),
(7, 1, 1, 7, '2023-03-20'),
(8, 1, 1, 8, '2023-03-20'),
(9, 1, 1, 9, '2023-03-20');

SELECT e.employee_id, e.employee_name
FROM employees_table4 e
INNER JOIN sales_table4 s ON s.employee_id = e.employee_id
INNER JOIN customers_table4 c ON c.customer_id = s.customer_id
WHERE e.employee_city = c.shipping_address_city
GROUP BY e.employee_id;

