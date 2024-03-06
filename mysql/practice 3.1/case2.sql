USE practice3_1;

DROP TABLE inventory;
CREATE TABLE inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    category VARCHAR(50)
);

INSERT INTO inventory (name, quantity, price, category)
VALUES
    ('Laptop', 10, 999.99, 'electronics'),
    ('Smartphone', 20, 599.99, 'electronics'),
    ('Tablet', 15, 399.99, 'electronics'),
    ('Speaker System', 18, 299.99, 'electronics'),
    ('Printer', 0, 199.99, 'electronics'),
    ('Chair', 0, 49.99, 'furniture'),
    ('Desk', 0, 199.99, 'furniture');

SELECT name, price FROM inventory WHERE quantity > 0 AND category='electronics' ORDER BY price DESC;

