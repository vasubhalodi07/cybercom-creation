USE practice5_1;

-- TASK: 7
CREATE TABLE departments_task7 (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE employees_task7 (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments_task6(department_id)
);

INSERT INTO departments_task7 (department_id, department_name) VALUES
(1, 'HR'),
(2, 'Finance'),
(3, 'IT');

INSERT INTO employees_task7 (employee_id, name, salary, department_id) VALUES
(101, 'John Doe', 60000.00, 1),
(102, 'Jane Smith', 70000.00, 1),
(103, 'Michael Johnson', 80000.00, 2),
(104, 'Emily Brown', 55000.00, 2),
(105, 'David Wilson', 65000.00, 3),
(106, 'Amanda Davis', 75000.00, 3),
(107, 'Brian Miller', 90000.00, 3),
(108, 'Karen White', 50000.00, 1),
(109, 'Christopher Lee', 72000.00, 2);

INSERT INTO employees_task7 (employee_id, name, salary, department_id) VALUES
(110, 'John Doe', 60000.00, 1),
(111, 'Jane Smith', 60000.00, 1),
(112, 'Michael Johnson', 60000.00, 2);

INSERT INTO employees_task7 (employee_id, name, salary, department_id) VALUES
(113, 'John Doe', 75000.00, 1),
(114, 'Jane Smith', 75000.00, 1),
(115, 'Michael Johnson', 75000.00, 2);

SELECT * FROM departments_task7;
SELECT * FROM employees_task7;

SELECT name, salary, department_name FROM (
    SELECT e.name, e.salary, d.department_name,
        ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS salary_row_number
    FROM employees_task7 e 
    INNER JOIN departments_task7 d ON e.department_id = d.department_id
) AS ranked_rows
WHERE salary_row_number <= 5;

SELECT * FROM (
	SELECT employee_id, name, salary,
		ROW_NUMBER() OVER (ORDER BY salary DESC) AS salary_row_number
	FROM employees_task7) AS table1
HAVING salary_row_number  = 3;

SELECT salary, GROUP_CONCAT(name) AS name_of_employee
FROM employees_task7 
WHERE salary = (SELECT salary FROM employees_task7 ORDER BY salary DESC LIMIT 2, 1)
GROUP BY salary;

SELECT * FROM employees_task7 ORDER BY salary DESC LIMIT 2,1;
SELECT * FROM employees_task7 ORDER BY salary DESC LIMIT 1 OFFSET 2;

