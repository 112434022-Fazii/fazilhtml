<!DOCTYPE html>
<html>
<head>
    <title>Student Register Form</title>
</head>
<body>

<center>

<h1>Student Register Form</h1>

<form method="post" action="">
    <table>
        <tr>
            <td>Name:</td>
            <td><input type="text" name="name" placeholder="Enter your name" required></td>
        </tr>

        <tr>
            <td>Age:</td>
            <td><input type="number" name="age" placeholder="Enter your age" required></td>
        </tr>

        <tr>
            <td>Address:</td>
            <td><input type="text" name="address" placeholder="Enter your Address" required></td>
        </tr>

        <tr>
            <td>Gender:</td>
            <td>
                <input type="radio" name="gender" value="Male" required> Male
                <input type="radio" name="gender" value="Female"> Female
            </td>
        </tr>

        <tr>
            <td>Department:</td>
            <td>
                <select name="department">
                    <option>Python</option>
                    <option>Java</option>
                    <option>C++</option>
                </select>
            </td>
        </tr>

        <tr>
            <td><input type="submit" name="submit" value="Submit"></td>
            <td><input type="reset"></td>
        </tr>
    </table>
</form>

<?php
if(isset($_POST['submit']))
{
    $name = $_POST['name'];
    $age = $_POST['age'];
    $address = $_POST['address'];
    $gender = $_POST['gender'];
    $department = $_POST['department'];

    echo "<h2>Student Details</h2>";
    echo "Name : $name <br>";
    echo "Age : $age <br>";
    echo "Address : $address <br>";
    echo "Gender : $gender <br>";
    echo "Department : $department <br>";
}
?>

</center>

</body>
</html>