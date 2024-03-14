CREATE DATABASE trigger_db;
USE trigger_db;
SHOW TRIGGERS;
SHOW ERRORS;
DROP TRIGGER before_employee_insert;

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10, 2)
);

-- CREATE TRIGGER FOR CHECKING SALARY STATE AND IF NEGATIVE OR ZERO THEN PROVIDE 45000 SALARY THAT PROVIDE BY TRIGGER EVENT
DELIMITER //
CREATE TRIGGER before_employee_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
	IF NEW.salary < 0 THEN
		SET NEW.salary = 45000;
	END IF;
END //
DELIMITER ;

INSERT INTO employees (employee_id, name, salary) VALUES (1, 'Bob Johnson', -3000.00);
SELECT * FROM employees;

-- EXAMPLE: 2
SHOW TRIGGERS;
CREATE TABLE employee_salary (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    hourly_salary DECIMAL(10, 2),
    yearly_salary DECIMAL(10, 2)
);

INSERT INTO employee_salary (hourly_salary, yearly_salary) VALUES
(20.00, 0),
(25.00, 0),
(30.00, 0);

-- CREATE TRIGGER FOR CALCULATE THE YEARLY_SALARY USING HOURLY_SALARY
DELIMITER //
CREATE TRIGGER insert_employee_salary_record
BEFORE INSERT ON employee_salary
FOR EACH ROW
BEGIN
	IF NEW.hourly_salary > 0 THEN
		SET NEW.yearly_salary = NEW.hourly_salary * 2080;
	END IF;
END //
DELIMITER ;

-- UPDATE TRIGGER
DELIMITER //
CREATE TRIGGER update_employee_salary_record
BEFORE UPDATE ON employee_salary
FOR EACH ROW
BEGIN
	IF NEW.hourly_salary <> NEW.yearly_salary THEN
		SET NEW.yearly_salary = NEW.hourly_salary * 2080;
	END IF;
END //
DELIMITER ;

INSERT INTO employee_salary (hourly_salary, yearly_salary) VALUES (100.00, 0);
INSERT INTO employee_salary (hourly_salary, yearly_salary) VALUES (10.00, 0);

UPDATE employee_salary SET hourly_salary = 1 WHERE employee_id = 2;
UPDATE employee_salary SET yearly_salary = 5000 WHERE employee_id = 2;

SELECT * FROM employee_salary;
