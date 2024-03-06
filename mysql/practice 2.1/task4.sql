USE practice2_1;

DROP TABLE person; 	
CREATE TABLE person (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL
);

INSERT INTO person (email) VALUES 
('bob@gmail.com'), 
('John@example.com'), 
('bob@gmail.com'), 
('John@example.com'), 
('bob@gmail.com');

DELETE p1 FROM Person p1, Person p2 WHERE p1.email = p2.email AND p1.id > p2.id;

SELECT * FROM person;
