CREATE DATABASE practice4_3;
USE practice4_3;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE orders (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_At TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

TRUNCATE users;
TRUNCATE orders;

-- TASK: 1
INSERT INTO users (name, email, password, created_at, updated_at)
VALUES 
    ('John Doe', 'john.doe1@example.com', '123456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Jane Smith', 'jane.smith@example.com', 'password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Alice Johnson', 'alice.johnson@example.com', 'securepassword', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO users (name, email, password, created_at, updated_at)
VALUES
	('Vasu Bhalodi', 'vasu@gmail.com', '123123', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO orders (user_id, amount, created_at, updated_at)
VALUES
    (1, 100.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 150.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 75.50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 175.50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 200.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 50.25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 300.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 120.75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 50.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 80.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 90.25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- TASK: 2
SELECT u.name, u.email
FROM users u 
INNER JOIN orders o ON u.id = o.user_id 
GROUP BY u.id;

-- TASK: 3
SELECT u.id, u.name, u.email, IFNULL(SUM(o.amount), 0) AS total_amount 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_amount DESC;

-- TASK: 4
SELECT u.email
FROM users u
INNER JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING COUNT(o.id) = (
    SELECT COUNT(o2.id) AS orders_counts 
    FROM orders o2
    GROUP BY o2.user_id
    ORDER BY orders_counts DESC
    LIMIT 1
);

-- TASK: 5
SELECT u.id, SUM(o.amount) AS total_amount
FROM users u 
INNER JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING total_amount >= 100;

-- TASK: 6
SELECT COUNT(u.name)
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE o.user_id IS NULL;

-- TASK: 7
UPDATE users SET email='jane.doe@example.com' WHERE id=1;
SELECT * FROM users;

-- TASK: 8
UPDATE users SET email='jane.test@example.com' WHERE id=1;
UPDATE users SET email='test.jane@example.com' WHERE id=2;
DELETE FROM orders WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%test%');
SELECT * FROM orders;

-- TASK: 9
SELECT DATE(created_at) AS order_date, SUM(amount) AS total_amount
FROM orders
WHERE WEEK(created_at) = WEEK(CURRENT_DATE)
GROUP BY order_date;

-- TASK: 10
SELECT u.id, u.email FROM users u
INNER JOIN orders o
ON u.id = o.user_id
WHERE u.email LIKE '%example.com' AND YEAR(o.created_at) = YEAR(CURRENT_DATE)
GROUP BY u.id;

