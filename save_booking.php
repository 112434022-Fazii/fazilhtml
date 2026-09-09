<?php
session_start();

include "db.php";

/* Check login */
if (!isset($_SESSION["user_id"])) {
    die("Please login first.");
}

$user_id = $_SESSION["user_id"];

$movie = trim($_POST["movie"]);
$date = trim($_POST["date"]);
$time = trim($_POST["time"]);
$seats = trim($_POST["seats"]);

if (empty($movie) || empty($date) || empty($time) || empty($seats)) {
    die("Booking details are incomplete.");
}


/* Find movie */
$stmt = mysqli_prepare(
    $conn,
    "SELECT id, price FROM movies WHERE name = ?"
);

mysqli_stmt_bind_param($stmt, "s", $movie);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) == 0) {
    die("Movie not found.");
}

$movieData = mysqli_fetch_assoc($result);

$movie_id = $movieData["id"];
$price = $movieData["price"];

mysqli_stmt_close($stmt);


/* Get selected seats */
$seatList = explode(",", $seats);
$seatCount = count($seatList);


/* Calculate total */
$total = $price * $seatCount;


/* Save booking */
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO bookings
    (user_id, movie_id, booking_date, show_time, tickets, total)
    VALUES (?, ?, ?, ?, ?, ?)"
);

if (!$stmt) {
    die("Booking query failed: " . mysqli_error($conn));
}

mysqli_stmt_bind_param(
    $stmt,
    "iissid",
    $user_id,
    $movie_id,
    $date,
    $time,
    $seatCount,
    $total
);

if (!mysqli_stmt_execute($stmt)) {
    die("Booking failed: " . mysqli_stmt_error($stmt));
}

$booking_id = mysqli_insert_id($conn);

mysqli_stmt_close($stmt);


/* Save seats */
foreach ($seatList as $seat) {

    $seat = trim($seat);

    $stmt = mysqli_prepare(
        $conn,
        "INSERT INTO booking_seats
        (booking_id, seat_number)
        VALUES (?, ?)"
    );

    if (!$stmt) {
        die("Seat query failed: " . mysqli_error($conn));
    }

    mysqli_stmt_bind_param(
        $stmt,
        "is",
        $booking_id,
        $seat
    );

    mysqli_stmt_execute($stmt);

    mysqli_stmt_close($stmt);
}

mysqli_close($conn);

echo "Booking saved successfully!";
?>