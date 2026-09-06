<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Check whether username already exists
    $check = "SELECT id FROM users WHERE username = ?";
    $stmt = mysqli_prepare($conn, $check);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) > 0) {
        echo "Username already exists!";
        exit;
    }

    // Securely hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $sql = "INSERT INTO users (name, username, email, password)
            VALUES (?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param(
        $stmt,
        "ssss",
        $name,
        $username,
        $email,
        $hashedPassword
    );

    if (mysqli_stmt_execute($stmt)) {
        echo "Registration successful!";
    } else {
        echo "Registration failed!";
    }

} else {
    echo "Invalid request!";
}

?>