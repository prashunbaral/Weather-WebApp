<?php

// Prashun Baral 2408881

header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


include 'database.php';

$city_input = isset($_GET['city']) ? $_GET['city'] : 'ahmednagar';
$url = 'https://api.openweathermap.org/data/2.5/weather?q=' . $city_input . '&appid=628cccbf56c04749cb7af327c424891e&&units=metric';
$dataString = file_get_contents($url);
$data = json_decode($dataString, true);

echo $dataString;
// Check if the response contains valid data
    // Data is valid, proceed to update the database
    $city = $data["name"];
    $temp = $data["main"]["temp"];
    $humidity = $data["main"]["humidity"];
    $wind = $data["wind"]["speed"];
    $pressure = $data["main"]["pressure"];
    $description = $data["weather"][0]["description"];
    $dateString = date('Y-m-d', $data["dt"]);
    $timestamp = $data['dt'];
    $dayOfWeek = date('l', $timestamp);
    $country = $data["sys"]["country"];
    $condition = $data["weather"][0]["main"];
    $icon = $data["weather"][0]["icon"];
    $status = $data["cod"];

    // Check if the record already exists
    $past_data_query = "SELECT * FROM weather_data WHERE city = '" . $city_input . "' AND timestamp = CURDATE()";
    $updateQuery = 'UPDATE weather_data SET 
        day = "'.$dayOfWeek.'",
        temperature = ' . $temp . ',
        humidity = ' . $humidity . ',
        wind_speed = ' . $wind . ',
        pressure = ' . $pressure . ',
        description = "' . $description . '",
        country = "' . $country . '",
        `condition` = "' . $condition . '",
        icon = "' . $icon . '"
        WHERE city = "' . $city_input . '" AND timestamp = CURDATE()';

    
    $past_data_result = $connection->query($past_data_query);

    if ($past_data_result->num_rows > 0) {
        $updateResult = $connection->query($updateQuery);
        echo 'Record already exists';
    } else {
        // If the record does not exist, insert a new record
        $query = 'INSERT INTO weather_data (day, city, temperature, humidity, wind_speed, pressure, description, timestamp, country, `condition`, icon)
            VALUES (
                "'. $dayOfWeek .'",
                "' . $city . '",
                ' . $temp . ',
                ' . $humidity . ',
                ' . $wind . ',
                ' . $pressure . ',
                "' . $description . '",
                "' . $dateString . '",
                "' . $country . '",
                "' . $condition . '",
                "' . $icon . '"
            )';

        $result = $connection->query($query);

        if (!$result) {
            // If there is an error, echo the error message
            echo "Error: " . $connection->error;
        } else {
            echo 'successful';
        }
    }

?>
