CREATE DATABASE nuseats;

CREATE TABLE users { 
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username  VARCHAR(255) UNIQUE NOT NULL, 
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
    id SERIAL PRIMARY KEY,  -- Unique identifier for each award
    title VARCHAR(255) NOT NULL,  -- Title of the award
    description TEXT,  -- Description of the award
    profile VARCHAR(255),  -- URL or path to the profile image (optional)
    user_id UUID NOT NULL,  -- User ID associated with the award
    FOREIGN KEY (user_id) REFERENCES users(id)  -- Foreign key constraint
);