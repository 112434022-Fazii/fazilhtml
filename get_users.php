<?php

include "db.php";

header("Content-Type: application/json");

$sql = "SELECT id, name, username, email FROM users";

$result = mysqli_query($conn, $sql);

$users = [];

while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
}

echo json_encode($users);

?>