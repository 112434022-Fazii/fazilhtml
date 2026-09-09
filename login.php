<?php
session_start();

include "db.php";

$email = trim($_POST["email"]);
$password = $_POST["password"];

$stmt = mysqli_prepare(
    $conn,
    "SELECT id, name, password FROM users WHERE email = ?"
);

mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) == 1) {

    $user = mysqli_fetch_assoc($result);

    if (password_verify($password, $user["password"])) {

        // Save logged-in user's ID
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["user_name"] = $user["name"];

        header("Location: movies.html");
        exit;

    } else {

        echo "Incorrect password.";

    }

} else {

    echo "Email not registered.";

}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>