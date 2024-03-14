CREATE DATABASE practice5_3;
USE practice5_3;

-- TABLES
CREATE TABLE employees (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(30) NOT NULL,
    employee_salary DECIMAL(10, 2) NOT NULL
);

DROP TABLE orders_task1;
CREATE TABLE orders_task1 (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    total_sales DECIMAL(10, 2),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

INSERT INTO employees (employee_name, employee_salary) VALUES
('John Doe', 50000.00),
('Jane Smith', 60000.00),
('Alice Johnson', 55000.00),
('Bob Brown', 48000.00),
('Emma Davis', 52000.00),
('Michael Wilson', 58000.00),
('Emily Taylor', 53000.00),
('David Martinez', 57000.00),
('Olivia Garcia', 59000.00),
('James Rodriguez', 54000.00);

INSERT INTO orders_task1 (employee_id, total_sales) VALUES
(1, 60000.00),
(1, 55000.00),
(2, 48000.00),
(3, 62000.00),
(4, 52000.00),
(4, 58000.00),
(3, 53000.00),
(2, 57000.00),
(1, 59000.00);

-- TASK: 1
SELECT employee_name, employee_salary FROM employees
WHERE employee_salary > (SELECT AVG(employee_salary) FROM employees);

