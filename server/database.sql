CREATE DATABASE nuseats;

CREATE TABLE users { 
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username  VARCHAR(255) UNIQUE NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL 
};

CREATE TABLE canteens (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nearestFaculty VARCHAR(255) NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO canteens (name, nearestFaculty, image) VALUES
('Frontier (AC)', 'Science, Medicine', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiN8fBowGffweGVSgeVpieBwXYwSbE1lvaGoIoLK2bw3rT2UHdhc1Eob6aN0fuTusdz0ajEZ_XvCl93qz9WKRQypKVG3CkI02tO15FjKutuWsAZYhqnd6DnXFstkf1QE7l79Y0Dn_yJCa8/s640/1IMG_20180521_152419.jpg'),
('Frontier', 'Medicine, Science', 'https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/Frontier-Canteen-1024x684.jpg'),
('PGP Canteen', 'Prince George''s Park', 'https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/PGP-canteen.jpg'),
('The Deck (AC)', 'FASS, Computing, Business', 'https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/09/Pasta-Express-Science-1024x684.jpg'),
('The Deck', 'FASS, Computing, Business', 'https://taylorinsingapore.wordpress.com/wp-content/uploads/2014/02/fass-canteen2.jpg?w=640'),
('Terrace', 'Computing', 'https://content.presspage.com/uploads/2580/1920_terrace-1.png?10000'),
('Techno Edge', 'Engineering', 'https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-1');

CREATE TABLE reviews (
    id SERIAL NOT NULL PRIMARY KEY,
    canteen_id INT NOT NULL REFERENCES canteens(id),
    title VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);

INSERT INTO reviews (canteen_id, title, review, rating) values (1, "Test title 1", "Test review 1", 4);

-- created table awards for the WinnerScreen
CREATE TABLE awards (
    id SERIAL PRIMARY KEY,  -- Unique identifier for each award
    title VARCHAR(255) NOT NULL,  -- Title of the award
    description TEXT,  -- Description of the award
    profile VARCHAR(255),  -- URL or path to the profile image (optional)
    user_id UUID NOT NULL,  -- User ID associated with the award
    FOREIGN KEY (user_id) REFERENCES users(id)  -- Foreign key constraint
);