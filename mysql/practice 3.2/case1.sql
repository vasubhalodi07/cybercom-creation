CREATE DATABASE practice3_2;
USE practice3_2;

DROP TABLE blog_posts;
DROP TABLE blog_comments;

CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE blog_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id)
);

INSERT INTO blog_posts (title, body, author_id, created_at, updated_at)
VALUES
    ('Introduction to SQL', 'SQL is a powerful language for managing and querying databases.', 1, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
    ('Advanced SQL Techniques', 'Learn advanced SQL techniques for optimizing queries and data manipulation.', 2, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
    ('Data Modeling Basics', 'Understand the basics of data modeling and how to design efficient database schemas.', 3, '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
    ('Database Normalization', 'Explore the importance of database normalization and its benefits.', 1, '2024-01-04 13:00:00', '2024-01-04 13:00:00'),
    ('Query Optimization Strategies', 'Discover various strategies for optimizing SQL queries for better performance.', 2, '2024-01-05 14:00:00', '2024-01-05 14:00:00'),
    ('Indexing in Databases', 'Learn about indexing techniques and their impact on database performance.', 3, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
    ('SQL Injection Prevention', 'Understand the risks of SQL injection attacks and how to prevent them.', 1, '2024-01-07 16:00:00', '2024-01-07 16:00:00'),
    ('Transaction Management in SQL', 'Explore transaction management concepts and best practices in SQL.', 2, '2024-01-08 17:00:00', '2024-01-08 17:00:00'),
    ('Data Warehousing Basics', 'Learn the basics of data warehousing and its role in business intelligence.', 3, '2024-01-09 18:00:00', '2024-01-09 18:00:00'),
    ('Database Security Measures', 'Discover essential security measures to protect databases from unauthorized access.', 1, '2024-01-10 19:00:00', '2024-01-10 19:00:00');

INSERT INTO blog_comments (post_id, body, author_id, created_at)
VALUES
    (1, 'Great introduction!', 2, '2024-01-01 12:00:00'),
    (1, 'Looking forward to the next post.', 3, '2024-01-02 13:00:00'),
    (2, 'Very informative!', 1, '2024-01-03 14:00:00'),
    (3, 'Thanks for sharing.', 2, '2024-01-04 15:00:00'),
    (2, 'I have a question about one of the techniques mentioned.', 3, '2024-01-05 16:00:00'),
    (3, 'I found the data modeling basics very helpful for my project.', 1, '2024-01-06 17:00:00'),
    (1, 'This helped me understand SQL better.', 2, '2024-01-07 18:00:00'),
    (2, 'Can you provide more examples for the advanced techniques?', 2, '2024-01-08 19:00:00'),
    (3, 'Looking forward to more posts on this topic.', 3, '2024-01-09 20:00:00'),
    (1, 'Nice overview of SQL fundamentals.', 3, '2024-01-10 21:00:00');
    
SELECT post.title, post.body, COUNT(post.id) AS num_comments 
FROM blog_posts post 
INNER JOIN blog_comments comments
ON post.id = comments.post_id 
GROUP BY post.id
ORDER BY post.created_at DESC
LIMIT 5;
	
SELECT post.title, post.body, COUNT(post.id) AS num_comments 
FROM blog_posts post 
LEFT JOIN blog_comments comments
ON post.id = comments.post_id
WHERE comments.post_id IS NOT NULL 
GROUP BY post.id
ORDER BY post.created_at DESC
LIMIT 5;

