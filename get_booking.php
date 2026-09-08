<?php

include "db.php";

header(
    "Content-Type: application/json"
);


if (
    !isset(
        $_SESSION["user_id"]
    )
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Please login first."
    ]);

    exit;
}


$booking_id =
    (int)(
        $_GET["id"] ?? 0
    );


$user_id =
    $_SESSION["user_id"];


$stmt = mysqli_prepare(
    $conn,

    "SELECT

        b.id,

        b.booking_date,

        b.show_time,

        b.tickets,

        b.total,

        m.name AS movie_name,

        GROUP_CONCAT(
            bs.seat_number
            ORDER BY bs.seat_number
            SEPARATOR ', '
        ) AS seats

     FROM bookings b

     INNER JOIN movies m

     ON m.id =
        b.movie_id

     LEFT JOIN booking_seats bs

     ON bs.booking_id =
        b.id

     WHERE b.id = ?

     AND b.user_id = ?

     GROUP BY b.id"
);


mysqli_stmt_bind_param(
    $stmt,
    "ii",
    $booking_id,
    $user_id
);


mysqli_stmt_execute($stmt);


$result =
    mysqli_stmt_get_result($stmt);


$booking =
    mysqli_fetch_assoc($result);


if ($booking) {

    echo json_encode([

        "success" => true,

        "booking" =>
            $booking

    ]);

} else {

    echo json_encode([

        "success" => false,

        "message" =>
            "Booking not found."

    ]);
}

?>