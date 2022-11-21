<?php

    require('database.php');

    try {
        $id = '';
        if (isset($_GET['id'])){
            $id = $_GET['id'];
        }

        $stmt = $connect->prepare("SELECT * FROM agenda WHERE id = :id;");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $count = $stmt->rowCount();

        if ($count == 1) {
            $agenda = $stmt->fetch(PDO::FETCH_ASSOC);
            $result["success"]["message"] = "Compromisso encontrado com sucesso!";
            $result["data"] = $agenda;
        } else {
            $result["error"]["message"] = "ID: $id não encontrado!";
        }

        header('Content-Type: text/json');
        echo json_encode($result);

    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

?>