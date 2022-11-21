
<?php
    require ('database.php'); 
    //Require() : a função require() importa arquivos, porém, caso o mesmo não seja encontrado, será levantado uma exceção e a execução é finalizada. Essa é uma maneira de interrompermos a execução dos scripts caso alguma anomalia ocorra.

    // SELECT  e.id, e.titulo, e.descricao, e.cover, ender.endereco, ender.dia, ender.hora FROM eventos as e INNER JOIN cdslocal as ender ON e.cpf = ender.cpf ;

    try {
        $stmt = $connect->prepare("SELECT  ender.id, ender.dia, ender.horario, ender.comquem, ender.assunto, ender.topico FROM agenda as ender;");
        $stmt->execute();

        $agenda = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result["success"]["message"] = "Compromissos listados com sucesso"; //criamos o array para devolver o resultado do insert numa mensagem de sucesso.

        $result["data"] = $agenda; //criamos o array para devolver o resultado do insert com os dados inseridos.

        header('Content-Type: Text/json'); //para ser enviado no formato json.
        echo json_encode($result); //exibir o resultado.

    } catch (PDOException $erro) {
        echo "falha ao cadastrar" . $erro->getMessage();
    }
?>