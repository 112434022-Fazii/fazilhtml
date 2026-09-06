<?php

$conn = mysqli_connect("localhost", "root", "", "cinemax");

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

?>