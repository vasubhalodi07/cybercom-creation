USE practice3_3;

CREATE TABLE employees (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    age INT NOT NULL,
    salary INT NOT NULL
);

INSERT INTO employees (name, age, salary) VALUES
("John", 35, 60000),
("Mary", 27, 50000),
("Peter", 42, 75000),
("Olivia", 29, 55000),
("Michael", 38, 80000);

-- TASK: 1
SELECT * FROM employees;

-- TASK: 2
SELECT name, salary FROM employees WHERE salary > 60000;

-- TASK: 3
UPDATE employees SET age=43 WHERE name='Peter';
UPDATE employees SET age=43 WHERE id=3;

-- TASK: 4
DELETE FROM employees WHERE id=4;

-- TASK: 5
SELECT AVG(salary) FROM employees;

-- TASK: 6
SELECT name, age FROM employees WHERE age=(SELECT MAX(age) FROM employees);

-- TASK: 7
SELECT name, age FROM employees WHERE age=(SELECT MIN(age) FROM employees);

-- TASK: 8
SELECT name FROM employees WHERE salary=(SELECT MAX(salary) FROM employees);
