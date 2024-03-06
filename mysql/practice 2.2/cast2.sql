USE practice2_2;

CREATE TABLE courses (
	student VARCHAR(50) NOT NULL,
    class VARCHAR(50) NOT NULL,
    PRIMARY KEY(student, class)
);

INSERT INTO courses (student, class)
VALUES
    ('A', 'Math'),
    ('B', 'English'),
    ('C', 'Math'),
    ('D', 'Biology'),
    ('E', 'Math'),
    ('F', 'Computer'),
    ('G', 'Math'),
    ('H', 'Math'),
    ('I', 'Math');

SELECT class FROM courses GROUP BY class HAVING COUNT(student) >= 5;
