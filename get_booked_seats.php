<?php

include "db.php";

$movie = trim($_GET["movie"]);
$date = trim($_GET["date"]);
$time = trim($_GET["time"]);

if (empty($movie) || empty($date) || empty($time)) {
    echo json_encode([]);
    exit;
}


/* Find movie ID */

$stmt = mysqli_prepare(
    $conn,
    "SELECT id FROM movies WHERE name = ?"
);

mysqli_stmt_bind_param($stmt, "s", $movie);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) == 0) {
    echo json_encode([]);
    exit;
}

$movieData = mysqli_fetch_assoc($result);

$movie_id = $movieData["id"];

mysqli_stmt_close($stmt);


/* Find already booked seats */

$stmt = mysqli_prepare(
    $conn,
    "SELECT bs.seat_number
     FROM booking_seats bs
     INNER JOIN bookings b
     ON bs.booking_id = b.id
     WHERE b.movie_id = ?
     AND b.booking_date = ?
     AND b.show_time = ?"
);

mysqli_stmt_bind_param(
    $stmt,
    "iss",
    $movie_id,
    $date,
    $time
);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$bookedSeats = [];


while ($row = mysqli_fetch_assoc($result)) {

    $bookedSeats[] = $row["seat_number"];

}


mysqli_stmt_close($stmt);

mysqli_close($conn);


/* Send seats as JSON */

echo json_encode($bookedSeats);

?>