/* =========================================
   CINEMAX MOVIE BOOKING DATABASE
   ========================================= */


/* Create Database */

CREATE DATABASE cinemax;

USE cinemax;


/* =========================================
   1. USERS TABLE
   ========================================= */

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL

);


/* =========================================
   2. MOVIES TABLE
   ========================================= */

CREATE TABLE movies (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    price DECIMAL(10,2) NOT NULL

);


/* =========================================
   3. BOOKINGS TABLE
   ========================================= */

CREATE TABLE bookings (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    movie_id INT NOT NULL,

    booking_date DATE NOT NULL,

    show_time VARCHAR(20) NOT NULL,

    tickets INT NOT NULL,

    total DECIMAL(10,2) NOT NULL,

    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (movie_id)
        REFERENCES movies(id)

);


/* =========================================
   4. BOOKING SEATS TABLE
   ========================================= */

CREATE TABLE booking_seats (

    id INT AUTO_INCREMENT PRIMARY KEY,

    booking_id INT NOT NULL,

    seat_number VARCHAR(10) NOT NULL,

    FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE CASCADE,

    UNIQUE (
        booking_id,
        seat_number
    )

);


/* =========================================
   INSERT MOVIES
   ========================================= */

INSERT INTO movies
(name, price)
VALUES

('Avengers: Doomsday', 250),

('The Conjuring', 200),

('Sita Ramam', 180);


/* =========================================
   SAMPLE USER
   ========================================= */

INSERT INTO users
(name, username, email, password)
VALUES

(
    'Fazii',
    'fazii123',
    'fazii@example.com',
    '123456'
);


/* =========================================
   CHECK MOVIES
   ========================================= */

SELECT * FROM movies;


/* =========================================
   CHECK USERS
   ========================================= */

SELECT * FROM users;