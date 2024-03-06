USE practice3_2;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    created_at TIMESTAMP
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP
);

CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP
);

TRUNCATE users;
INSERT INTO users (name, created_at)
VALUES
    ('Alice', '2022-01-01 10:00:00'),
    ('Bob', '2022-01-02 11:00:00'),
    ('Charlie', '2022-01-03 12:00:00'),
    ('David', '2022-01-04 13:00:00'),
    ('Emma', '2022-01-05 14:00:00'),
    ('Abcd', '2023-01-02 14:00:00');
    
TRUNCATE posts;
INSERT INTO posts (user_id, body, created_at)
VALUES
    (1, 'Hello, world! This is Alice.', '2022-01-01 10:00:00'),
    (2, 'Just another day by Bob.', '2022-01-02 11:00:00'),
    (1, 'Feeling good today by Alice.', '2022-01-03 12:00:00'),
    (3, 'Sharing some thoughts by Charlie.', '2022-01-04 13:00:00'),
    (1, 'Excited for the weekend! by Alice.', '2022-01-05 14:00:00'),
    (4, 'Enjoying the sunshine by David.', '2022-01-06 15:00:00'),
    (5, 'Looking forward to the holidays by Emma.', '2022-01-07 16:00:00'),
    (2, 'Trying out new recipes by Bob.', '2022-01-08 17:00:00'),
    (3, 'Learning something new by Charlie.', '2022-01-09 18:00:00'),
    (1, 'Feeling inspired by Alice.', '2022-01-10 19:00:00'),
    (4, 'A quiet evening at home by David.', '2023-01-01 20:00:00'),
    (5, 'Reflecting on the day by Emma.', '2023-01-02 21:00:00'),
    (2, 'Exploring new places by Bob.', '2023-01-03 22:00:00'),
    (3, 'Chilling with friends by Charlie.', '2023-01-04 23:00:00'),
    (1, 'Feeling grateful by Alice.', '2023-01-05 00:00:00'),
    (4, 'Getting ready for the week by David.', '2023-01-06 01:00:00'),
    (5, 'Enjoying a cup of coffee by Emma.', '2023-01-07 02:00:00'),
    (2, 'Sharing a favorite recipe by Bob.', '2023-01-08 03:00:00'),
    (3, 'Thinking about the future by Charlie.', '2023-01-09 04:00:00'),
    (1, 'Relaxing at home by Alice.', '2023-01-10 05:00:00');

TRUNCATE likes;
INSERT INTO likes (user_id, post_id, created_at)
VALUES
    (2, 1, '2022-01-01 10:00:00'),
    (3, 1, '2022-01-02 11:00:00'),
    (1, 2, '2022-01-03 12:00:00'),
    (4, 3, '2022-01-04 13:00:00'),
    (5, 3, '2022-01-05 14:00:00'),
    (1, 4, '2022-01-06 15:00:00'),
    (3, 5, '2022-01-07 16:00:00'),
    (5, 1, '2022-01-08 17:00:00'),
    (1, 2, '2022-01-09 18:00:00'),
    (2, 3, '2022-01-10 19:00:00'),
    (3, 4, '2023-01-01 20:00:00'),
    (4, 5, '2023-01-02 21:00:00'),
    (1, 6, '2023-01-03 22:00:00'),
    (2, 7, '2023-01-04 23:00:00'),
    (3, 8, '2023-01-05 00:00:00'),
    (4, 9, '2023-01-06 01:00:00'),
    (5, 10, '2023-01-07 02:00:00'),
    (1, 11, '2023-01-08 03:00:00'),
    (2, 12, '2023-01-09 04:00:00'),
    (3, 13, '2023-01-10 05:00:00');

-- WITHOUT JOIN
SELECT u.name, 
(SELECT COUNT(id) FROM posts WHERE user_id=u.id) as num_posts, 
(SELECT COUNT(id) FROM likes WHERE user_id=u.id) as total_likes 
FROM users u WHERE  YEAR(u.created_at) = 2022;

-- USER, POSTS, LIKES JOIN IN ONE QUERY
SELECT u.name, COUNT(DISTINCT p.id) AS total_posts, COUNT(DISTINCT l.id) AS num_likes
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
LEFT JOIN likes l ON u.id = l.user_id
WHERE YEAR(u.created_at) = 2022
GROUP BY u.id;
