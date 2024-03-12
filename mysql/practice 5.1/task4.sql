USE practice5_1;

-- TAKS: 4
CREATE TABLE employees (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

INSERT INTO employees (name, salary) VALUES
('John Doe', 50000.00),
('Jane Smith', 60000.00),
('Michael Johnson', 70000.00),
('Emily Brown', 55000.00),
('David Wilson', 65000.00);

SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;
