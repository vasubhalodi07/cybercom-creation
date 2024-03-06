USE practice2_1;

DROP TABLE student_task7;
DROP TABLE subject_task7;
DROP TABLE semester_task7;

CREATE TABLE student_task7 (
	student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE subject_task7 (
	subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL
);

CREATE TABLE semester_task7 (
	semester_id INT AUTO_INCREMENT PRIMARY KEY,
    semester_name VARCHAR(255) NOT NULL
);

CREATE TABLE grade_task7 (
	 grade_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    semester_id INT NOT NULL,
    grade FLOAT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student_task7(student_id),
    FOREIGN KEY (subject_id) REFERENCES subject_task7(subject_id),
    FOREIGN KEY (semester_id) REFERENCES semester_task7(semester_id)
);