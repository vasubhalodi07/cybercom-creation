USE practice3_2;

DROP TABLE employees;
CREATE TABLE employees (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

TRUNCATE employees;
INSERT INTO employees (name, department, salary) VALUES
    ('Alice', 'HR', 50000.00),
    ('Bob', 'sales', 60000.00),
    ('Charlie', 'Engineering', 70000.00),
    ('David', 'sales', 55000.00),
    ('Emma', 'sales', 52000.00),
    ('Frank', 'Engineering', 75000.00),
    ('Grace', 'sales', 62000.00),
    ('Henry', 'Marketing', 58000.00),
    ('Isabel', 'Engineering', 72000.00),
    ('Jack', 'HR', 53000.00);

SELECT name, salary FROM employees WHERE department='sales' AND salary>50000;
