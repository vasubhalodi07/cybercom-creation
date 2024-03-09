CREATE DATABASE practice4_1;
USE practice4_1;

DROP TABLE books;
DROP TABLE book_category_mappings;

CREATE TABLE author (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE books (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    author_id INT NOT NULL,
    publication_date DATE NOT NULL,
    FOREIGN KEY (author_id) REFERENCES author(id)
);

CREATE TABLE book_categories (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE book_category_mappings (
	id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (category_id) REFERENCES book_categories(id)
);

TRUNCATE author;
TRUNCATE book_categories;
TRUNCATE books;
TRUNCATE book_category_mappings;

INSERT INTO author (name) VALUES 
('J.K. Rowling'),
('George Orwell'),
('Harper Lee'),
('J.R.R. Tolkien'),
('Agatha Christie');

INSERT INTO books (title, author_id, publication_date) VALUES 
('Harry Potter and the Philosopher''s Stone', 1, '1997-06-26'),
('1984', 2, '1949-06-08'),
('To Kill a Mockingbird', 3, '1960-07-11'),
('The Hobbit', 4, '1937-09-21'),
('Murder on the Orient Express', 5, '1934-01-01'),
('Difference Between People', 3, '2020-02-21'),
('Book 1', 1, '2020-02-03');

INSERT INTO book_categories (name) VALUES 
('Fantasy'),
('Dystopian'),
('Classic'),
('Mystery');

INSERT INTO book_category_mappings (book_id, category_id) VALUES 
(1, 1),
(1, 3),
(2, 2),
(3, 3),
(3, 4),
(4, 1),
(5, 4),
(5, 3);
INSERT INTO book_category_mappings (book_id, category_id) VALUES (4, 4);

-- TASK: 1
SELECT * FROM books WHERE YEAR(publication_date)=2020;

-- TASK: 2
SELECT a.name AS author_name, COUNT(b.id) AS total_books_written
FROM author a
LEFT JOIN books b ON b.author_id = a.id
GROUP BY a.name
HAVING COUNT(b.id) = (
    SELECT COUNT(b.id) AS max_books_written
    FROM author a
    LEFT JOIN books b ON b.author_id = a.id
    GROUP BY a.name
    ORDER BY max_books_written DESC
    LIMIT 1
);

-- TASK: 3
SELECT bc.name, COUNT(bcm.id) AS num_books FROM book_categories bc
LEFT JOIN book_category_mappings bcm
ON bcm.category_id = bc.id
LEFT JOIN books b
ON b.id = bcm.book_id
GROUP BY bc.name
HAVING COUNT(bcm.id) = (
	SELECT COUNT(bcm.id) AS num_books FROM book_categories bc
	LEFT JOIN book_category_mappings bcm
	ON bcm.category_id = bc.id
	LEFT JOIN books b
	ON b.id = bcm.book_id
	GROUP BY bc.name
	ORDER BY num_books DESC
	LIMIT 1
);

-- TASK: 4
SELECT a.id, a.name AS author_name, COUNT(b.id) AS total_books FROM author a
LEFT JOIN books b
ON b.author_id = a.id
GROUP BY a.name
HAVING COUNT(b.id) = (
	SELECT COUNT(b.id) AS total FROM author a
    LEFT JOIN books b
    ON b.author_id = a.id
    GROUP BY a.name
    ORDER BY total DESC
    LIMIT 1
);

-- TASK: 5
CREATE TABLE book_borrowings (
	id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT NOT NULL,
    customer_id INT NOT NULL,
    borrow_date DATE NOT NULL
);

TRUNCATE book_borrowings;
INSERT INTO book_borrowings (book_id, customer_id, borrow_date) VALUES
(1, 101, '2020-01-05'),
(2, 102, '2020-02-10'),
(3, 103, '2020-03-15'),
(4, 104, '2020-04-20'),
(5, 105, '2020-05-25'),
(6, 106, '2020-06-30'),
(7, 107, '2020-07-05'),
(1, 108, '2021-08-10'),
(2, 109, '2021-09-15'),
(3, 110, '2021-10-20'),
(4, 111, '2022-11-25'),
(5, 112, '2022-12-30'),
(6, 113, '2023-01-05'),
(7, 114, '2023-02-10'),
(1, 115, '2023-03-15'),
(2, 116, '2023-04-20'),
(3, 117, '2023-05-25'),
(4, 118, '2024-06-30'),
(5, 119, '2024-07-05'),
(6, 113, '2023-01-05'),
(9, 114, '2023-02-10');

SELECT b.title, COUNT(bb.id) AS book_borrow_count FROM books b
INNER JOIN book_borrowings bb
ON bb.book_id = b.id
GROUP BY b.title
HAVING COUNT(bb.id) = (
	SELECT COUNT(bb.id) AS book_borrow_count FROM books b
	INNER JOIN book_borrowings bb
	ON bb.book_id = b.id
	GROUP BY b.title
	ORDER BY book_borrow_count DESC
    LIMIT 1
)
LIMIT 5;
