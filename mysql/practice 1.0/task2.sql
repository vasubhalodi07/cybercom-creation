USE practice1_0;

DROP TABLE college;
DROP TABLE student;

CREATE TABLE college (
	college_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    naac_grade VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (college_id)
);

CREATE TABLE student (
	student_id INT AUTO_INCREMENT,
    college_id INT UNIQUE,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    semester VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NUll,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (student_id),
    FOREIGN KEY (college_id) REFERENCES college (college_id)
);
