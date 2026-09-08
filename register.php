<?php

include "db.php";

header("Content-Type: application/json");


$name =
    trim($_POST["name"] ?? "");

$username =
    trim($_POST["username"] ?? "");

$email =
    trim($_POST["email"] ?? "");

$password =
    $_POST["password"] ?? "";


if (
    $name === "" ||
    $username === "" ||
    $email === "" ||
    $password === ""
) {

    echo json_encode([
        "success" => false,
        "message" => "Please fill all fields"
    ]);

    exit;
}


if (
    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )
) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid email"
    ]);

    exit;
}


if (strlen($password) < 6) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Password must contain at least 6 characters"
    ]);

    exit;
}


/* CHECK USER */

$stmt = mysqli_prepare(
    $conn,
    "SELECT id
     FROM users
     WHERE username = ?
     OR email = ?"
);

mysqli_stmt_bind_param(
    $stmt,
    "ss",
    $username,
    $email
);

mysqli_stmt_execute($stmt);

$result =
    mysqli_stmt_get_result($stmt);


if (
    mysqli_num_rows($result) > 0
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Username or email already exists"
    ]);

    exit;
}


/* HASH PASSWORD */

$hashedPassword =
    password_hash(
        $password,
        PASSWORD_DEFAULT
    );


/* INSERT DATA */

$stmt = mysqli_prepare(
    $conn,

    "INSERT INTO users
    (name, username, email, password)
    VALUES (?, ?, ?, ?)"
);


mysqli_stmt_bind_param(
    $stmt,
    "ssss",
    $name,
    $username,
    $email,
    $hashedPassword
);


if (
    mysqli_stmt_execute($stmt)
) {

    echo json_encode([
        "success" => true,
        "message" =>
            "Account created successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" =>
            "Registration failed"
    ]);
}

?>