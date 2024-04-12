# CREATE DATABASE;
CREATE DATABASE	procedures;
USE procedures;

# CREATE EMPLOYEE AND EMPLOYEE LOGS TABLE
DROP TABLE employees;
DROP TABLE employees_procedure_logs;
CREATE TABLE employees (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);
CREATE TABLE employees_procedure_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comments VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# DROP PROCEDURE 
DROP PROCEDURE employees_procedures;
TRUNCATE employees;
TRUNCATE employees_procedure_logs;

SELECT * FROM employees;
SELECT * FROM employees_procedure_logs;


DELIMITER //
CREATE PROCEDURE employees_procedures (
	IN operation VARCHAR(50), 
    IN employee_id INT, 
    IN employee_name VARCHAR(50), 
    IN employee_salary DECIMAL(10, 2)
    )
BEGIN
    IF operation = "SELECT_EMPLOYEE_REOCRD" THEN
        SELECT * FROM employees;
    ELSEIF operation = "INSERT_EMPLOYEE_RECORD" THEN
        INSERT INTO employees (name, salary) VALUES (employee_name, employee_salary);
        INSERT INTO employees_procedure_logs (comments) VALUES (CONCAT('Inserted employee: ', employee_name, ', Salary: ', employee_salary));
        SELECT * FROM employees;
    ELSEIF operation = "UPDATE_EMPLOYEE_RECORD" THEN
        UPDATE employees SET salary = employee_salary WHERE id = employee_id;
        INSERT INTO employees_procedure_logs (comments) VALUES (CONCAT('Updated salary of employee with ID ', employee_id, ' to ', employee_salary));
        SELECT * FROM employees;
    ELSEIF operation = "DELETE_EMPLOYEE_RECORD" THEN
        DELETE FROM employees WHERE id = employee_id;
        INSERT INTO employees_procedure_logs (comments) VALUES (CONCAT('Deleted employee with ID ', employee_id));
        SELECT * FROM employees;
    END IF;
    
    IF operation = "SELECT_EMPLOYEE_PROCEDURE_LOGS" THEN
        SELECT * FROM employees_procedure_logs;
    END IF;
END //
DELIMITER ;


# CREATE EMPLOYEE PROCEDURE 
DELIMITER //
CREATE PROCEDURE employees_procedures (IN operation VARCHAR(50), IN employee_id INT, IN employee_name VARCHAR(50), IN employee_salary DECIMAL(10, 2))
BEGIN
    IF operation = "SELECT_EMPLOYEE_REOCRD" THEN
        SELECT * FROM employees;
    ELSEIF operation = "INSERT_EMPLOYEE_RECORD" THEN
        INSERT INTO employees (name, salary) VALUES (employee_name, employee_salary);
        INSERT INTO employees_procedure_logs (comments) VALUES (CONCAT('Inserted employee: ', employee_name, ', Salary: ', employee_salary));
        SELECT * FROM employees;
    ELSEIF operation = "UPDATE_EMPLOYEE_RECORD" THEN
        UPDATE employees SET salary = employee_salary WHERE id = employee_id;
        INSERT INTO employees_procedure_logs (comments) VALUES (CONCAT('Updated salary of employee with ID ', employee_id, ' to ', employee_salary));
        SELECT * FROM employees;
    ELSEIF operation = "DELETE_EMPLOYEE_RECORD" THEN
        DELETE FROM employees WHERE id = employee_id;
        INSERT INTO employees_procedure_logs (comments) VALUES (CONCAT('Deleted employee with ID ', employee_id));
        SELECT * FROM employees;
    END IF;
    
    IF operation = "SELECT_EMPLOYEE_PROCEDURE_LOGS" THEN
        SELECT * FROM employees_procedure_logs;
    END IF;
END //
DELIMITER ;

CALL employees_procedures("SELECT_EMPLOYEE_REOCRD", null, null, null);
CALL employees_procedures("INSERT_EMPLOYEE_RECORD", null, "Vasu", 100000);
CALL employees_procedures("INSERT_EMPLOYEE_RECORD", null, "Janak", 100000);
CALL employees_procedures("INSERT_EMPLOYEE_RECORD", null, "Belvin", 100000);
CALL employees_procedures("INSERT_EMPLOYEE_RECORD", null, "Dhanraj", 100000);
CALL employees_procedures("UPDATE_EMPLOYEE_RECORD", 1, null, 800000); 
CALL employees_procedures("DELETE_EMPLOYEE_RECORD", 1, null, null);

CALL employees_procedures("SELECT_EMPLOYEE_PROCEDURE_LOGS", null, null, null);

