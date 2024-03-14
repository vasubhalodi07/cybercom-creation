USE practice4_2;
DROP PROCEDURE fetchRecordsById;
DROP PROCEDURE fetchRecordsWithErrorHandling;

-- Pre Compile Collection of SQL
-- PROCEDURE FETCH ALL RECORDS
DELIMITER %%
CREATE PROCEDURE fetchRecords() 
BEGIN
	SELECT * FROM department;
END %%
DELIMITER ;
CALL fetchRecords();


-- PROCEDURE WITH PARAMETERS
DELIMITER //
CREATE PROCEDURE fetchRecordsById(IN p_department_id  INT)
BEGIN
    SELECT * FROM department WHERE department_id = p_department_id;
END//
DELIMITER ;
CALL fetchRecordsById(2);


-- COMPLEX QUERY WITH PROCEDURE
DELIMITER //
CREATE PROCEDURE fetchDTE()
BEGIN
	SELECT d.department_name, COUNT(e.employee_id) AS total_employees
	FROM department d
	LEFT JOIN employees e ON d.department_id = e.department_id
	GROUP BY d.department_name
	ORDER BY d.department_name;
END //
DELIMITER ;
CALL fetchDTE();


-- PROCEDURE WITH ERROR HADNLING WITH TRANSCATION
DELIMITER //
CREATE PROCEDURE fetchRecordsWithErrorHandling()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Handle the exception
        ROLLBACK;
        SELECT 'An error occurred: ', SQLERRM;
    END;
    START TRANSACTION;
		SELECT * FROM department;
    COMMIT;
END//
DELIMITER ;
CALL fetchRecordsWithErrorHandling();


-- PROCEDURE WITH INPUT AND OUTPUT
DROP PROCEDURE fetchRecordsSO;
DELIMITER //
CREATE PROCEDURE fetchRecordsSO(IN id INT, OUT employee_count INT)
BEGIN
	SELECT COUNT(*) INTO employee_count FROM employees WHERE employee_id = id;
END //
DELIMITER ;
CALL fetchRecordsSO(1, @emp_count);
SELECT @emp_count;

