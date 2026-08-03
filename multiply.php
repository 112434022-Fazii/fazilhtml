<?php
$number = $_POST['number'];
$limit = $_POST['limit'];

echo "<h2>Multiplication Table of $number</h2>";

for ($i = 1; $i <= $limit; $i++) {
    echo "$number × $i = " . ($number * $i) . "<br>";
}
?>