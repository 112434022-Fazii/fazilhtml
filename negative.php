<?php

$name = $_GET["name"];
$password = $_GET["password"];
$age = $_GET["age"];
$address = $_GET["address"];
$gender = $_GET["gender"] ?? "";
$department = $_GET["department"];


// Negative Scenario 1: Empty fields

if(empty($name) || empty($password) || empty($age) || empty($address) || empty($gender) || empty($department))
{
    echo "<h2 style='color:red'>Registration Failed!</h2>";
    echo "Please fill all fields.";
    exit();
}


// Negative Scenario 2: Invalid name

if(!preg_match("/^[A-Za-z ]+$/", $name))
{
    echo "<h2 style='color:red'>Invalid Name!</h2>";
    echo "Name should contain only letters.";
    exit();
}


// Negative Scenario 3: Password length

if(strlen($password) < 8)
{
    echo "<h2 style='color:red'>Invalid Password!</h2>";
    echo "Password must contain minimum 8 characters.";
    exit();
}


// Negative Scenario 4: Age validation

if($age < 18 || $age > 60)
{
    echo "<h2 style='color:red'>Invalid Age!</h2>";
    echo "Age must be between 18 and 60.";
    exit();
}


// Negative Scenario 5: Address length

if(strlen($address) < 5)
{
    echo "<h2 style='color:red'>Invalid Address!</h2>";
    echo "Address must contain minimum 5 characters.";
    exit();
}


// If all data is correct

echo "<h2 style='color:green'>Registration Successful!</h2>";

echo "Name: ".$name."<br>";
echo "Age: ".$age."<br>";
echo "Address: ".$address."<br>";
echo "Gender: ".$gender."<br>";
echo "Department: ".$department;

?>