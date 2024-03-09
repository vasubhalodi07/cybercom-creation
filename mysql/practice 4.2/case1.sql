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
(4, 81000.00, '2022-03-01'); 

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
SELECT e.employee_id, e.name, e.salary, SUM(s.salary) AS total_salary_per_employee FROM employees e
INNER JOIN salaries s
ON s.employee_id = e.employee_id
GROUP BY e.name;

-- TASK: 5
SELECT e.name, s.salary, s.date
FROM employees e
LEFT JOIN salaries s 
ON e.employee_id = s.employee_id
WHERE s.date = (SELECT MAX(date) FROM Salaries WHERE employee_id = e.employee_id);
