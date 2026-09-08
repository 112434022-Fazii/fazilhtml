<?php

include "db.php";

header(
    "Content-Type: application/json"
);


/* LOGIN CHECK */

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


$movie_id =
    (int)(
        $_POST["movie_id"] ?? 0
    );


$date =
    $_POST["booking_date"] ?? "";


$time =
    $_POST["show_time"] ?? "";


$tickets =
    (int)(
        $_POST["tickets"] ?? 0
    );


$seatText =
    $_POST["seats"] ?? "";


/* DATE */

$today =
    date("Y-m-d");


$maxDate =
    date(
        "Y-m-d",
        strtotime("+2 days")
    );


if (
    $date < $today ||
    $date > $maxDate
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Booking is available only for today and next 2 days."
    ]);

    exit;
}


/* TIME */

$allowedTimes = [

    "10:00 AM",
    "01:30 PM",
    "04:30 PM",
    "07:30 PM"

];


if (
    !in_array(
        $time,
        $allowedTimes,
        true
    )
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Invalid show time."
    ]);

    exit;
}


/* SEATS */

$seats =
    array_values(
        array_unique(
            array_filter(
                array_map(
                    "trim",
                    explode(
                        ",",
                        $seatText
                    )
                )
            )
        )
    );


if (
    $tickets < 1 ||
    $tickets > 6
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Tickets must be between 1 and 6."
    ]);

    exit;
}


if (
    count($seats) !==
    $tickets
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Please select correct number of seats."
    ]);

    exit;
}


/* CHECK SEAT FORMAT */

foreach (
    $seats as $seat
) {

    if (
        !preg_match(
            "/^[A-H](1[0-2]|[1-9])$/",
            $seat
        )
    ) {

        echo json_encode([
            "success" => false,
            "message" =>
                "Invalid seat selected."
        ]);

        exit;
    }
}


/* GET MOVIE */

$stmt = mysqli_prepare(
    $conn,

    "SELECT
        id,
        name,
        price

     FROM movies

     WHERE id = ?"
);


mysqli_stmt_bind_param(
    $stmt,
    "i",
    $movie_id
);


mysqli_stmt_execute($stmt);


$result =
    mysqli_stmt_get_result($stmt);


$movie =
    mysqli_fetch_assoc($result);


if (!$movie) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Movie not found."
    ]);

    exit;
}


/* CHECK ALREADY BOOKED SEATS */

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


$bookedSeats = [];


while (
    $row =
    mysqli_fetch_assoc($result)
) {

    $bookedSeats[] =
        $row["seat_number"];
}


$conflicts =
    array_intersect(
        $seats,
        $bookedSeats
    );


if (
    count($conflicts) > 0
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Already booked: " .
            implode(
                ", ",
                $conflicts
            )
    ]);

    exit;
}


/* TOTAL */

$total =
    $movie["price"] *
    $tickets;


/* START TRANSACTION */

mysqli_begin_transaction(
    $conn
);


try {

    /* INSERT BOOKING */

    $stmt = mysqli_prepare(
        $conn,

        "INSERT INTO bookings

        (
            user_id,
            movie_id,
            booking_date,
            show_time,
            tickets,
            total
        )

        VALUES
        (?, ?, ?, ?, ?, ?)"
    );


    $user_id =
        $_SESSION["user_id"];


    mysqli_stmt_bind_param(
        $stmt,

        "iissid",

        $user_id,
        $movie_id,
        $date,
        $time,
        $tickets,
        $total
    );


    mysqli_stmt_execute($stmt);


    $booking_id =
        mysqli_insert_id($conn);


    /* INSERT SEATS */

    $seatStmt =
        mysqli_prepare(
            $conn,

            "INSERT INTO
            booking_seats
            (booking_id, seat_number)

            VALUES (?, ?)"
        );


    foreach (
        $seats as $seat
    ) {

        mysqli_stmt_bind_param(
            $seatStmt,
            "is",
            $booking_id,
            $seat
        );


        mysqli_stmt_execute(
            $seatStmt
        );
    }


    mysqli_commit($conn);


    echo json_encode([

        "success" => true,

        "booking_id" =>
            $booking_id

    ]);


} catch (
    Throwable $e
) {

    mysqli_rollback($conn);


    echo json_encode([

        "success" => false,

        "message" =>
            "Booking failed."

    ]);
}

?>