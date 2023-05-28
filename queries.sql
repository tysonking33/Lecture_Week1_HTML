INSERT INTO Users VALUES (
    0,
    'pixelpenguin',
    'password',
    '/path/to/mypic.jpg',
    'pixel@penguin.com',
    'Pixel Penguin'
);


INSERT INTO Posts VALUES (
    0,
    CURRENT_TIMESTAMP(),
    'This is my post',
    0,
    'Pixel penguin''s first post',
    NULL
);

INSERT INTO Comments VALUES (
    0,
    CURRENT_TIMESTAMP(),
    'This is my comment',
    0,
    0
);

/* retrieve all posts */
SELECT * FROM Post;

/* retrieve all posts with author names */
SELECT Post.id Post.created, Post.content, user.display_name, Post.title, Post.answer FROM Post INNER JOIN User on POst.author = User.id;



/* retrieve all posts with a specific title or content */
SELECT Post.id Post.created, Post.content, user.display_name, Post.title, Post.answer FROM Post INNER JOIN User on POst.author = User.id WHERE Post.content LIST '%keyword%' OR Post.title LIST '%keyword%';