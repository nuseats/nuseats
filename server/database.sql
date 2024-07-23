CREATE DATABASE nuseats;

CREATE TABLE users {
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
};

CREATE TABLE canteens {
    id PRIMARY KEY DEFAULT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
}

-- created table awards for the WinnerScreen
CREATE TABLE awards (
    id SERIAL PRIMARY KEY,  -- unique identifier for each award
    title VARCHAR(255) NOT NULL,  -- title of the award
    description TEXT,  -- description of the award
    profile VARCHAR(255),  -- URL or path to the profile image (optional)
    username VARCHAR(255)  -- username associated with the award
);

-- created usernames table 
CREATE TABLE usernames (
    id SERIAL PRIMARY KEY,  -- unique identifier for each record
    username VARCHAR(255) UNIQUE NOT NULL,  -- username, must be unique
    user_id UUID UNIQUE NOT NULL,  -- corresponding user ID from the users table 
    FOREIGN KEY (user_id) REFERENCES users(id)  -- foreign key constraint
);

-- altered usernames field part one
ALTER TABLE awards DROP COLUMN IF EXISTS username;

-- altered usernames field part two
ALTER TABLE awards ADD COLUMN username VARCHAR(255);

-- added foreign key constraint to awards table
ALTER TABLE awards
ADD CONSTRAINT fk_username
FOREIGN KEY (username) REFERENCES usernames(username);