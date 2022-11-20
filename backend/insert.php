<?php
    require ('database.php'); 
    //Require() : a função require() importa arquivos, porém, caso o mesmo não seja encontrado, será levantado uma exceção e a execução é finalizada. Essa é uma maneira de interrompermos a execução dos scripts caso alguma anomalia ocorra.

    $nome = $_POST["nome"]; //name do input
    $email = $_POST["email"];
    $numero = $_POST["numero"];
    $cpf = $_POST["cpf"];

    // echo $title. "<br>";
    // echo $description. "<br>";
    // echo $category. "<br>"; //só para exibir os dados na tela
    // echo $cover. "<br>";
    // echo $classification. "<br>";

    try {
        $stmt = $connect->prepare("INSERT INTO eventos (nome, email, numero, cpf)
        VALUES (:nome, :email, :numero, :cpf)");
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':numero', $numero);
        $stmt->bindParam(':cpf', $cpf);

        $stmt->execute();
        // echo "Cadastro com sucesso!";
        $id = $connect->lastInsertId();

        $result["success"]["message"] = "Cadastrado com sucesso!"; //criamos o array para devolver o resultado do insert numa mensagem de sucesso.

        $result["data"]["id"] = $id; //criamos o array para devolver o resultado do insert com os dados inseridos.
        $result["data"]["nome"] = $nome;
        $result["data"]["email"] = $email;
        $result["data"]["numero"] = $numero;
        $result["data"]["cpf"] = $cpf;

        header('Content-Type: text/json'); //para ser enviado no formato json.
        echo json_encode($result); //exibir o resultado.

    } catch (PDOException $erro) {
        echo "connect failed: " . $erro->getMessage();
    }
?>

