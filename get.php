<?php

$name = $_GET['name'];
$password = $_GET['password'];
$age = $_GET['age'];
$address = $_GET['address'];
$gender = $_GET['gender'];
$department = $_GET['department'];

echo "<h2>Student Registration Successful!</h2>";

echo "<b>Name:</b> $name <br>";
echo "<b>Password:</b> $password <br>";
echo "<b>Age:</b> $age <br>";
echo "<b>Address:</b> $address <br>";
echo "<b>Gender:</b> $gender <br>";
echo "<b>Department:</b> $department <br>";

?>