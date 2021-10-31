CREATE DATABASE gatogramo;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    pw VARCHAR(100),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    userAvatar VARCHAR(250)
);