<?php
// Database credentials
$host = "sql201.infinityfree.com"; // Change if hosted remotely
$dbname = "if0_37800644_SmartSplit"; 
$user = "if0_37800644"; // Your database username
$pass = "h1xAuBfpYD"; // Your database password
$port = 3306;

// Establish database connection
$conn = new mysqli($host, $user, $pass, $dbname, $port);

// Fetch form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = $_POST['password'];

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Insert user into database
$sql = "INSERT INTO users (name, email, phone, password) 
        VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $phone, $password);

if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
?>