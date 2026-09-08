USE cinemax;


CREATE TABLE IF NOT EXISTS users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    username VARCHAR(50)
        NOT NULL UNIQUE,

    email VARCHAR(100)
        NOT NULL UNIQUE,

    password VARCHAR(255)
        NOT NULL
);


CREATE TABLE IF NOT EXISTS movies (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150)
        NOT NULL,

    price DECIMAL(10,2)
        NOT NULL
);


CREATE TABLE IF NOT EXISTS bookings (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    movie_id INT NOT NULL,

    booking_date DATE NOT NULL,

    show_time VARCHAR(20)
        NOT NULL,

    tickets INT NOT NULL,

    total DECIMAL(10,2)
        NOT NULL,

    booking_time
        TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY
        (user_id)
        REFERENCES users(id),

    FOREIGN KEY
        (movie_id)
        REFERENCES movies(id)
);


CREATE TABLE IF NOT EXISTS booking_seats (

    id INT AUTO_INCREMENT PRIMARY KEY,

    booking_id INT NOT NULL,

    seat_number VARCHAR(10)
        NOT NULL,

    FOREIGN KEY
        (booking_id)
        REFERENCES bookings(id)
        ON DELETE CASCADE
);


INSERT IGNORE INTO movies
(id, name, price)
VALUES
(1, 'Avengers: Doomsday', 250),
(2, 'The Conjuring', 200),
(3, 'Sita Ramam', 180);