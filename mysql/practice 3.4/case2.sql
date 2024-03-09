USE practice3_3;

DROP TABLE employees1;
CREATE TABLE employees1 (
	ID INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hired_year YEAR NOT NULL
);

-- TASK: 1
SELECT firstName, lastName FROM employees1 WHERE title LIKE '%Manager%';

-- TASK: 2
SELECT department, AVG(salary) FROM employees1 GROUP BY department;

-- TASK: 3
SELECT hired_year, COUNT(ID) FROM employees1 GROUP BY hired_year;

-- TASK: 4
SELECT firstName, lastName FROM employees1 ORDER BY salary DESC LIMIT 10;

-- TASK: 5
UPDATE employees1 SET salary=salary + (salary * 0.10) WHERE department = 'Sales';

-- TASK: 6
DELETE FROM employees1 WHERE hired_year = 2000;

-- TASK: 7
CREATE TABLE employee_stats (
	department_name VARCHAR(50) NOT NULL,
    total_employees VARCHAR(50) NOT NULL,
    average_salary  DECIMAL(10, 2) NOT NULL
);

-- TASK: 8
SELECT firstName, lastName FROM employees1 WHERE lastName="Manager";

