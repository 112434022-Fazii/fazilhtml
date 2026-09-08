<?php

include "db.php";

header(
    "Content-Type: application/json"
);


$movie_id =
    (int)(
        $_GET["movie_id"] ?? 0
    );


$date =
    $_GET["booking_date"] ?? "";


$time =
    $_GET["show_time"] ?? "";


$stmt = mysqli_prepare(
    $conn,

    "SELECT
        bs.seat_number

     FROM booking_seats bs

     INNER JOIN bookings b

     ON b.id =
        bs.booking_id

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


$result =
    mysqli_stmt_get_result($stmt);


$booked = [];


while (
    $row =
    mysqli_fetch_assoc($result)
) {

    $booked[] =
        $row["seat_number"];
}


echo json_encode([

    "success" => true,

    "booked" =>
        $booked

]);

?>