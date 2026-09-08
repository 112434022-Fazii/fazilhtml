<?php

include "db.php";

header(
    "Content-Type: application/json"
);


$username =
    trim($_POST["username"] ?? "");

$password =
    $_POST["password"] ?? "";


if (
    $username === "" ||
    $password === ""
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Please enter username and password."
    ]);

    exit;
}


/* RETRIEVE USER */

$stmt = mysqli_prepare(
    $conn,

    "SELECT
        id,
        name,
        username,
        password

     FROM users

     WHERE username = ?"
);


mysqli_stmt_bind_param(
    $stmt,
    "s",
    $username
);


mysqli_stmt_execute($stmt);


$result =
    mysqli_stmt_get_result($stmt);


$user =
    mysqli_fetch_assoc($result);


/* VERIFY PASSWORD */

if (
    $user &&
    password_verify(
        $password,
        $user["password"]
    )
) {

    $_SESSION["user_id"] =
        $user["id"];

    $_SESSION["username"] =
        $user["username"];

    $_SESSION["name"] =
        $user["name"];


    echo json_encode([
        "success" => true,
        "message" =>
            "Login successful!"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" =>
            "Invalid username or password."
    ]);
}

?>