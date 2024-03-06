USE practice2_2;

DROP TABLE world;
CREATE TABLE world (
	name VARCHAR(20) PRIMARY KEY,
    continent VARCHAR(255) NOT NULL,
    area INT NOT NULL,
    population INT NOT NULL,
    gdp BIGINT NOT NULL
);

INSERT INTO world (name, continent, area, population, gdp)
VALUES
    ('India', 'Asia', 999999999, 667868787979, 999999999999999999),
    ('Afghanistan', 'Asia', 652230, 25500100, 20343000000),
    ('Albania', 'Europe', 28748, 2831741, 12960000000),
    ('Algeria', 'Africa', 2381741, 37100000, 188681000000),
    ('Andorra', 'Europe', 468, 78115, 3712000000),
    ('Angola', 'Africa', 1246700, 20609294, 100990000000);

SELECT name, population, area FROM world WHERE area >= 3000000 OR population >= 25000000;