<?php

    require('database.php');

    try {
        $id = '';
        if (isset($_GET['id'])){
            $id = $_GET['id'];
        }

        $stmt = $connect->prepare("SELECT * FROM clientes WHERE id = :id;");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $count = $stmt->rowCount();

        if ($count == 1) {
            $cliente = $stmt->fetch(PDO::FETCH_ASSOC);
            $result["success"]["message"] = "Cliente encontrado com sucesso!";
            $result["data"] = $cliente;
        } else {
            $result["error"]["message"] = "ID: $id não encontrado!";
        }

        header('Content-Type: text/json');
        echo json_encode($result);

    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

?>