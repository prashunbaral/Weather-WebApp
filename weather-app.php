<?php

// Prashun Baral 2408881

header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


include 'database.php';

$city_input = isset($_GET['city']) ? $_GET['city'] : 'Ahmednagar';
$sql = 'SELECT * FROM weather_data where city = "'.$city_input.'" AND timestamp = CURDATE()';
$result = mysqli_query($connection, $sql);
$weather = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($weather);
?>

