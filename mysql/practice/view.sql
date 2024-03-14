DROP VIEW employee_view;

-- SIMPLE QUERY VIEW
CREATE VIEW employee_view AS SELECT * FROM employees;
SELECT * FROM employee_view;

-- AUTO MATIC CHANGE INTO VIEW WHEN INSERT, DELETE, UPDATE THE ORIGINAL TABLE
INSERT INTO employees (name, department_id, salary) VALUES ('Mohit Dav', 3, 50000.00);

-- COMPLEX QUERY WITH VIEW
CREATE VIEW department_employee AS
SELECT d.department_name, COUNT(e.employee_id) AS total_employees
FROM department d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

-- ROW QUERY
SELECT d.department_name, COUNT(e.employee_id) AS total_employees
FROM department d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

-- VIEW TABLE QUERY	
SELECT * FROM department_employee;