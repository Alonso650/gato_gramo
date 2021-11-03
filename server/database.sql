CREATE DATABASE gato-gramo;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    pw VARCHAR(100),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    userAvatar VARCHAR(250)
);

CREATE TABLE gram_posts(
    gram_id SERIAL PRIMARY KEY,
    title VARCHAR(500),
    gram_image VARCHAR(500),
    -- FOREIGN KEY (user_id) REFERENCES users(user_id)
)