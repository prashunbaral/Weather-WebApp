<?php

// Prashun Baral 2408881

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$connection = new mysqli('127.0.0.1', 'root', '', 'weather_data');

if ($connection->connect_errno) {
    echo '{"error": "Database connection failed!"}';
    exit;
}
?>
