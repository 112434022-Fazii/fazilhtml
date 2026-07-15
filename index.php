<?php

$name = $_POST['name'];
$age = $_POST['age'];
$address = $_POST['address'];
$gender = $_POST['gender'];
$department = $_POST['department'];

echo "<h2>Student Registration Successful!</h2>";

echo "<b>Name:</b> $name <br>";
echo "<b>Age:</b> $age <br>";
echo "<b>Address:</b> $address <br>";
echo "<b>Gender:</b> $gender <br>";
echo "<b>Department:</b> $department <br>";

?>