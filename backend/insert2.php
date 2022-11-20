<?php
    require ('database.php'); 
    //Require() : a função require() importa arquivos, porém, caso o mesmo não seja encontrado, será levantado uma exceção e a execução é finalizada. Essa é uma maneira de interrompermos a execução dos scripts caso alguma anomalia ocorra.

    $dia = $_POST["dia"]; //name do input
    $horario = $_POST["horario"];
    $comquem = $_POST["comquem"];
    $assunto = $_POST["assunto"];
    $topico = $_POST["topico"];

    try {
        $stmt = $connect->prepare("INSERT INTO cdsagenda (dia, horario, comquem, assunto, topico)
        VALUES (:dia, :horario, :comquem, :assunto, :topico)");

        $stmt->bindParam(':dia', $dia);
        $stmt->bindParam(':horario', $horario);
        $stmt->bindParam(':comquem', $comquem);
        $stmt->bindParam(':assunto', $assunto);
        $stmt->bindParam(':topico', $topico);

        $stmt->execute();
        // echo "Cadastro com sucesso!";
        $id = $connect->lastInsertId();

        $result["success"]["message"] = "Cadastrado com sucesso!"; //criamos o array para devolver o resultado do insert numa mensagem de sucesso.

        $result["data"]["id"] = $id; //criamos o array para devolver o resultado do insert com os dados inseridos.
        $result["data"]["dia"] = $dia;
        $result["data"]["horario"] = $horario;
        $result["data"]["comquem"] = $comquem;
        $result["cpf"]["assunto"] = $assunto;
        $result["cpf"]["topico"] = $topico;

        header('Content-Type: text/json'); //para ser enviado no formato json.
        echo json_encode($result); //exibir o resultado.

    } catch (PDOException $erro) {
        echo "connect failed: " . $erro->getMessage();
    }
?>

