<?php

// Database credentials
$host = "sql201.infinityfree.com"; // Change if hosted remotely
$dbname = "if0_37800644_SmartSplit"; 
$user = "if0_37800644"; // Your database name
$pass = "h1xAuBfpYD"; // Your database password
$port = 3306;

// Establish database connection
$conn = new mysqli($host, $user, $pass, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get username and password from the form
$name = htmlspecialchars($_POST['name']);
$password = trim($_POST['password']); // Trim extra spaces from the input

// Check if the user exists
$query = "SELECT * FROM users WHERE name = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $name);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Plain text password comparison
    if ($password === $user['password']) {
        session_start();
        $_SESSION['name'] = $name;
        echo "Login successful!";
        header("Location: ../Dashboard/index.html"); // Redirect to home page
        exit;
    } else {
        echo "<script>alert('Incorrect password!'); window.history.back();</script>";
        exit;    
    }
} else {
    echo "<script>alert('User Not Found!'); window.history.back();</script>";
    exit;
}

// Close connection
$stmt->close();
$conn->close();
?>