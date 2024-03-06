USE practice2_1;

DROP TABLE salary;
CREATE TABLE salary (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sex ENUM('m', 'f') NOT NULL,
    salary INT NOT NULL
);

INSERT INTO salary (name, sex, salary) VALUES 
('A', 'm', 2500), 
('B', 'f', 1500), 
('C', 'm', 5500), 
('D', 'f', 500);

UPDATE salary SET sex = CASE
	WHEN sex = 'm' THEN 'f'
	WHEN sex = 'f' THEN 'm'
END;

SELECT * FROM salary;