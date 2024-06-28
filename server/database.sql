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