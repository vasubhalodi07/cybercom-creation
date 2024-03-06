USE practice2_1;

DROP TABLE customers;
DROP TABLE orders;

CREATE TABLE customers (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customers(id)
);

INSERT INTO customers (name) VALUES ("Joe"), ("Henry"), ("Sam"), ("Max");

INSERT INTO orders (customerId) VALUES (3), (1);

SELECT name FROM customers AS c 
LEFT JOIN orders AS o 
ON c.id = o.customerId 
WHERE o.id IS NULL; 

