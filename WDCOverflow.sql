CREATE DATABASE WDCOverflow;
USE WDCOverflow;

CREATE TABLE Posts (
    id INT,
    created DATETIME,
    content TEXT,
    author INT,
    title VARCHAR(255),
    answer INT,
    PRIMARY KEY (id)
);

CREATE TABLE Users (
    id INT,
    handle VARCHAR(63),
    pass VARCHAR(255),
    avatar VARCHAR(255),
    email VARCHAR(255),
    display_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE Comments (
    id INT,
    created DATETIME,
    content TEXT,
    author INT,
    post_id INT,
    PRIMARY KEY (id)

);

CREATE TABLE Votes (
    user_id INT,
    post_id INT,
    up_or_down INT,
    PRIMARY KEY (user_idx, post_id)
);

CREATE TABLE CTags (
    comment_id INT,
    tagname VARCHAR(63),
    PRIMARY KEY (comment_id, tagname)

);

CREATE TABLE PTags (
    post_id INT,
    tagname VARCHAR(63)
    PRIMARY KEY (post_id, tagname)

);

