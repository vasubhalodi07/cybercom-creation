USE practice2_1;

DROP TABLE cinema;
CREATE TABLE cinema (
	id INT AUTO_INCREMENT,
    movie VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO cinema (movie, description, rating) VALUES 
("War", "great 3D", 8.9), 
("Science", "fiction", 8.5), 
("irish", "boring", 6.2), 
("Ice song", "Fantacy", 8.6), 
("House card", "Interesting", 9.1);

SELECT * FROM cinema WHERE id % 2 != 0 AND description != "boring" ORDER BY rating DESC;
