<?php

include "db.php";

header(
    "Content-Type: application/json"
);


$result = mysqli_query(
    $conn,

    "SELECT
        id,
        name,
        price

     FROM movies

     ORDER BY id"
);


$movies = [];


while (
    $row =
    mysqli_fetch_assoc($result)
) {

    $movies[] =
        $row;
}


echo json_encode([

    "success" => true,

    "movies" =>
        $movies

]);

?>