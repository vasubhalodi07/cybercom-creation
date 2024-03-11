CREATE DATABASE practice4_2;
USE practice4_2;

CREATE TABLE employees(
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    department_id INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE department(
	department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE salaries(
	salaries_id INT PRIMARY KEY AUTO_INCREMENT,
	employee_id INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

TRUNCATE department;
TRUNCATE employees;
TRUNCATE salaries;

INSERT INTO department (department_name) VALUES 
('Human Resources'), 
('Finance'), 
('Marketing'),
('Sales');

INSERT INTO employees (name, department_id, salary) VALUES 
('Alice Johnson', 1, 52000.00),
('Bob Williams', 1, 48000.00),
('Charlie Brown', 2, 55000.00),
('David Lee', 3, 58000.00),
('John Doe', 4, 20000.00),
('Andi Sen', 4, 70000.00);

INSERT INTO salaries (employee_id, salary, date) VALUES
(1, 52000.00, '2024-03-01'),
(1, 48000.00, '2024-03-01'),
(2, 55000.00, '2024-03-01'),
(3, 58000.00, '2024-03-01'),
(3, 81000.00, '2022-03-01'),
(4, 58000.00, '2024-03-01'),
(4, 81000.00, '2022-03-01'),
(1, 52000.00, '2024-03-01'),
(1, 48000.00, '2024-03-01'),
(2, 55000.00, '2024-03-01'),
(3, 58000.00, '2024-03-01'),
(3, 81000.00, '2022-03-01'),
(4, 58000.00, '2024-03-01'),
(4, 81000.00, '2022-03-01'),
(1, 52000.00, '2024-03-01'),
(1, 48000.00, '2024-03-01'),
(2, 55000.00, '2024-03-01'),
(3, 58000.00, '2024-03-01'),
(3, 81000.00, '2022-03-01'),
(4, 58000.00, '2024-03-01'),
(4, 81000.00, '2022-03-01'); 

SELECT * FROM department;
SELECT * FROM employees;
SELECT * FROM salaries;

-- TASK: 1
SELECT e.name FROM employees e 
INNER JOIN department d
ON e.department_id = d.department_id
WHERE d.department_name = 'Sales';

-- TASK: 2
SELECT d.department_name, COUNT(e.employee_id) AS total_employees
FROM department d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

-- TASK: 3
SELECT d.department_name, AVG(e.salary) 
FROM department d
LEFT JOIN employees e
ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY d.department_name ASC;

-- TASK: 4
SELECT employee_id, salary
FROM (
    SELECT employee_id, salary, NTILE(10) OVER (ORDER BY salary DESC) AS salary_percentile FROM salaries
) AS salary_percentiles
WHERE salary_percentile = 1;

-- TASK: 5
SELECT e.name, s.salary
FROM (
    SELECT employee_id, MAX(date) AS latest_date
    FROM salaries
    GROUP BY employee_id
) AS latest_salary
JOIN salaries s ON latest_salary.employee_id = s.employee_id AND latest_salary.latest_date = s.date
JOIN employees e ON e.employee_id = s.employee_id;

