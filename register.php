<?php

include "db.php";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$password = $_POST["password"];

// Hash the password before storing it
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$check = mysqli_prepare($conn, "SELECT id FROM users WHERE email = ?");
mysqli_stmt_bind_param($check, "s", $email);
mysqli_stmt_execute($check);
mysqli_stmt_store_result($check);

if (mysqli_stmt_num_rows($check) > 0) {
    echo "Email already registered.";
    exit;
}

mysqli_stmt_close($check);

// Insert new user
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
);

mysqli_stmt_bind_param($stmt, "sss", $name, $email, $hashedPassword);

if (mysqli_stmt_execute($stmt)) {
    echo "Account created successfully!";
} else {
    echo "Registration failed: " . mysqli_error($conn);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>