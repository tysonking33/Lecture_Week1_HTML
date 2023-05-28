CREATE DATABASE WDCOverflow;
USE WDCOverflow;

CREATE TABLE Post (
    id INT,
    created DATETIME,
    content TEXT,
    author INT,
    title VARCHAR(255),
    answer INT
);

CREATE TABLE User (
    id INT,
    handle VARCHAR(63),
    pass VARCHAR(255),
    avatar VARCHAR(255),
    email VARCHAR(255),
    display_name VARCHAR(255)
);

CREATE TABLE Comment (
    id INT,
    created DATETIME,
    content TEXT,
    author INT
);

CREATE TABLE Votes (
    user_id INT,
    post_id INT,
    up_or_down INT
);

CREATE TABLE CTag (
    comment_id INT,
    tagname VARCHAR(63)
);

CREATE TABLE PTag (
    post_id INT,
    tagname VARCHAR(63)
);

INSERT INTO Post VALUES(
    0,
    CURRENT_TIMESTAMP(),
    'This is my post',
    0,
    'Pixel penguins' 's first post',
    NULL
);

INSERT INTO User VALUES(
    0,
    'pixelpenguin',
    'password',
    'path/to/mypic.jpg',
    'pixel@penguin.com',
    'Pixel Penguin'

);

INSERT INTO Comment VALUES(
    0,
    CURRENT_TIMESTAMP(),
    'This is my comment',
    0,
    0
);