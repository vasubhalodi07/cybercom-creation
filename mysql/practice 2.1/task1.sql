CREATE DATABASE practice2_1;
USE practice2_1;

DROP TABLE employee;
CREATE TABLE employee (
	employee_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number BIGINT NOT NULL,
    salary BIGINT NOT NULL,
    position VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (employee_id)
);

DROP TABLE leave_record;
CREATE TABLE leave_record (
	leave_id INT AUTO_INCREMENT,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    reason VARCHAR(255) NOT NULL,
    approve_status BOOLEAN DEFAULT false,
    PRIMARY KEY (leave_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);
