<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'event';

// $servername = 'mysql.hostinger.com.br';
// $username = 'u455152201_pi';
// $password = '&YrlRt#0l';
// $database = 'u455152201_pi';

try {
    $connect = new PDO("mysql:host=$servername; dbname=$database", $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // echo "database connect";
} catch (PDOException $erro) {
    echo "connection failed: " . $erro->getMessage();
}
?>