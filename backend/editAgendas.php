<?php
    require ('database.php'); 
    //Require() : a função require() importa arquivos, porém, caso o mesmo não seja encontrado, será levantado uma exceção e a execução é finalizada. Essa é uma maneira de interrompermos a execução dos scripts caso alguma anomalia ocorra.

    $id = $_POST["id"];
    $dia = $_POST["dia"]; //name do input
    $horario = $_POST["horario"];
    $comquem = $_POST["comquem"];
    $assunto = $_POST["assunto"];
    $topico = $_POST["topico"];

    try {
        $stmt = $connect->prepare("UPDATE agenda SET dia = :dia, horario = :horario, comquem = :comquem, assunto = :assunto, topico = :topico
        WHERE id = :id;");

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':dia', $dia);
        $stmt->bindParam(':horario', $horario);
        $stmt->bindParam(':comquem', $comquem);
        $stmt->bindParam(':assunto', $assunto);
        $stmt->bindParam(':topico', $topico);

        $stmt->execute();
        // echo "Cadastro com sucesso!";
        $count = $stmt->rowCount();

        if ($count == 1) {
            $result["success"]["message"] = "Editado com sucesso!";
                        
            $result["data"]["id"] = $id; //criamos o array para devolver o resultado do insert com os dados inseridos.
            $result["data"]["dia"] = $dia;
            $result["data"]["horario"] = $horario;
            $result["data"]["comquem"] = $comquem;
            $result["data"]["assunto"] = $assunto;
            $result["data"]["topico"] = $topico;
        } else {
            $result["error"]["message"] = "ID: $id não encontrado";
        }

        header('Content-Type: text/json'); //para ser enviado no formato json.
        echo json_encode($result); //exibir o resultado.

    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>  