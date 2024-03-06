USE practice2_1;

CREATE TABLE person_task8 (
	personId INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL
);

CREATE TABLE address_task8 (
	addressId INT AUTO_INCREMENT PRIMARY KEY,
    personId INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    FOREIGN KEY (personId) REFERENCES person_task7(personId)
);

INSERT INTO person_task8 (lastName, firstName) VALUES 
('Wang', 'Allen'), 
('Alice', 'Bob');

INSERT INTO address_task8 (personId, city, state) VALUES 
(2, 'New York City', 'New York'), 
(3, 'Leetcode', 'California');

SELECT p.firstName, p.lastName, a.city, a.state FROM person_task8 AS p 
LEFT JOIN address_task8 AS a 
ON p.personId = a.personId;

