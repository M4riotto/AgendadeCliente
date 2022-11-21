function showModalCliente(idModal){ 
    //idModal é usado para avisar que há um parâmetro lá no html, o texto pode ser qualquer coisa para avisar que o parâmetro será um texto.
    const modal = document.querySelector(idModal)
    modal.style.display = "flex"
}

function hideModalCliente(idModal, event) {
    if(event.target.className === 'modal'){
        const modal = document.querySelector(idModal)
        modal.style.display = 'none'
    }
}

//forçar o fechamento após receber a mensagem de alerta
function closeAllModalCliente() {
    const modais = document.querySelectorAll('.modal')
    modais.forEach(modal => {
        modal.style.display = 'none'
    })
}

//toda a resposta através do servidor:
async function insertCliente(event) {
    event.preventDefault() //tira a forma padrão.
    const formData = new FormData(event.target)
    const response = await fetch('backend/insertClientes.php', {
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModalCliente() 
        alert('Seu Cliente '+result.data.nome+' foi cadastrado com sucesso!');
        loadClientes();
    }
}

async function loadClientes() {
    const response = await fetch('backend/listClientes.php')
    const result = await response.json()
    if (result?.success) {
        const listaClientes = document.querySelector('#corpo1')
        listaClientes.innerHTML = ''
        const clientes = result.data
        clientes.map((cliente) => {
            listaClientes.innerHTML += `

                <tr>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.numero}</td>
                    <td>${cliente.cpf}</td>

                    <td><img src="assets/img/logo.svg" widht="30px" height="30px" alt="Apagar" onclick="deleteCliente(${cliente.id})" /></td>
                    
                    <td><img src="assets/img/logo.svg" widht="30px" height="30px" alt="Editar" onclick="loadClienteData(${cliente.id})" /></td>
                </tr> `
     
        })

    }else{
        alert('Erro ao cadastrar a função')
    }       
}

async function deleteCliente(id) {
    const response = await fetch('backend/deleteClientes.php?id='+id)
    const result = await response.json()               
    if (result?.success) {
        alert('Seu ' +result.data.nome+ ' foi excluido com sucesso!');
        loadClientes();
    }
}

async function loadClienteData(id) {
    const response = await fetch('backend/get-cliente-by-id.php?id='+id)
    const result = await response.json()               
    if (result?.success) {
        showModalCliente('#modal-editar')
        const nome = document.querySelector('#modal-editar input[name=nome]')
        nome.value = result.data.nome

        const email = document.querySelector('#modal-editar input[name=email]')
        email.value = result.data.email

        const numero = document.querySelector('#modal-editar input[name=numero]')
        numero.value = result.data.numero

        const cpf = document.querySelector('#modal-editar input[name=cpf]')
        cpf.value = result.data.cpf

        const id = document.querySelector('#modal-editar input[name=id]')
        id.value = result.data.id
    }
}

async function editCliente(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const response = await fetch('backend/editClientes.php?',{
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModalCliente()
        alert('Seu cliente ' + result.data.nome+' foi editado com sucesso!');
        loadClientes()
    }
}
