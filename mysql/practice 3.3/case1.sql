CREATE DATABASE practice3_3;
USE practice3_3;

CREATE TABLE books (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year INT NOT NULL
);

TRUNCATE books;
INSERT INTO books (title, author, publication_year) VALUES
('To Kill a Mockingbird', 'Harper Lee', 1960),
('1984', 'George Orwell', 1949),
('Pride and Prejudice', 'Jane Austen', 1813),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
('The Catcher in the Rye', 'J.D. Salinger', 1951),
('Book of Civil War', 'Heryp', 1813);

SELECT title, author, publication_year FROM books WHERE publication_year = (SELECT MIN(publication_year) FROM books);
