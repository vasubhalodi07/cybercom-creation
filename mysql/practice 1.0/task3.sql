USE practice1_0;

DROP TABLE expertise;
DROP TABLE player;

CREATE TABLE expertise (
    expertise_id INT AUTO_INCREMENT,
    expertise_name VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (expertise_id)
);

CREATE TABLE player (
    player_id INT AUTO_INCREMENT,
    expertise_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (player_id),
    FOREIGN KEY (expertise_id) REFERENCES expertise (expertise_id)
);
