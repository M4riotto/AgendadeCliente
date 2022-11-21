<?php
    require ('database.php'); 
    //Require() : a função require() importa arquivos, porém, caso o mesmo não seja encontrado, será levantado uma exceção e a execução é finalizada. Essa é uma maneira de interrompermos a execução dos scripts caso alguma anomalia ocorra.

    $id = $_POST["id"];
    $nome = $_POST["nome"]; //name do input
    $email = $_POST["email"];
    $numero = $_POST["numero"];
    $cpf = $_POST["cpf"];

    try {
        $stmt = $connect->prepare("UPDATE clientes SET nome = :nome, email = :email, numero = :numero, cpf = :cpf 
        WHERE id = :id;");

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':numero', $numero);
        $stmt->bindParam(':cpf', $cpf);

        $stmt->execute();
        // echo "Cadastro com sucesso!";
        $count = $stmt->rowCount();

        if ($count == 1) {
            $result["success"]["message"] = "Editado com sucesso!";
                        
            $result["data"]["id"] = $id; //criamos o array para devolver o resultado do insert com os dados inseridos.
            $result["data"]["nome"] = $nome;
            $result["data"]["email"] = $email;
            $result["data"]["numero"] = $numero;
            $result["data"]["cpf"] = $cpf;
        } else {
            $result["error"]["message"] = "ID: $id não encontrado";
        }

        header('Content-Type: text/json'); //para ser enviado no formato json.
        echo json_encode($result); //exibir o resultado.

    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>  