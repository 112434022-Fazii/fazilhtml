<?php

session_start();

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "cinemax"
);

if (!$conn) {

    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);

    exit;
}

mysqli_set_charset(
    $conn,
    "utf8mb4"
);

?>