INSERT INTO Users(
    handle,
    pass,
    avatar,
    email,
    display_name
    ) VALUES (
    'pixelpenguin',
    'password',
    '/path/to/mypic.jpg',
    'pixel@penguin.com',
    'Pixel Penguin'
);


INSERT INTO Posts (
    created,
    content,
    author,
    title,
    ) VALUES (
    CURRENT_TIMESTAMP(),
    'This is my post',
    1,
    'Pixel penguin''s first post',
);

INSERT INTO Comments (
    created,
    content,
    author,
    post_id
    )VALUES (
    CURRENT_TIMESTAMP(),
    'This is my comment',
    1,
    2
);

/* retrieve all posts */
SELECT * FROM Posts;

/* retrieve all posts with author names */
SELECT Posts.id Posts.created, Posts.content, user.display_name, Posts.title, Posts.answer FROM Posts INNER JOIN User on Posts.author = User.id;



/* retrieve all posts with a specific title or content */
SELECT Posts.id Posts.created, Posts.content, user.display_name, Posts.title, Posts.answer FROM Posts INNER JOIN User on Posts.author = User.id WHERE Posts.content LIST '%keyword%' OR Posts.title LIST '%keyword%';