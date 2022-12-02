function showModal(idModal){ 
    //idModal é usado para avisar que há um parâmetro lá no html, o texto pode ser qualquer coisa para avisar que o parâmetro será um texto.
    const modal = document.querySelector(idModal)
    modal.style.display = "flex"
}

function hideModal(idModal, event) {
    if(event.target.className === 'modal'){
        const modal = document.querySelector(idModal)
        modal.style.display = 'none'
    }
}

//forçar o fechamento após receber a mensagem de alerta
function closeAllModal() {
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
        closeAllModal() 
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
        alert('Seu Cliente foi excluido com sucesso!');
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
        closeAllModal()
        alert('Seu cliente ' + result.data.nome+' foi editado com sucesso!');
        loadClientes()
    }
}

//2° CRUD

//toda a resposta através do servidor:
async function insertAgenda(event) {
    event.preventDefault() //tira a forma padrão de enviar.
    const formData = new FormData(event.target)
    const response = await fetch('backend/insertAgendas.php', {
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModal() 
        alert('A data do seu compromisso é dia: '+result.data.dia);
        loadAgendas();
    }
}

async function loadAgendas() {
    const response = await fetch('backend/listAgendas.php')
    const result = await response.json()
    if (result?.success) {
        const listaAgendas = document.querySelector('#corpo1')
        listaAgendas.innerHTML = ''
        const agenda = result.data
        agenda.map((agenda) => {
            listaAgendas.innerHTML += `

            <tr>
            <td>${agenda.dia}</td>
            <td>${agenda.horario}</td>
            <td>${agenda.comquem}</td>
            <td>${agenda.assunto}</td>
            <td>${agenda.topico}</td>

            <td><img src="assets/img/logo.svg" widht="30px" height="30px" alt="Apagar" onclick="deleteAgenda(${agenda.id})" /></td>
            
            <td><img src="assets/img/logo.svg" widht="30px" height="30px" alt="Editar" onclick="loadAgendaData(${agenda.id})" /></td>
        </tr> `
        })

    }else{
        alert('Erro ao cadastrar a função')
    }       
}

async function deleteAgenda(id) {
    const response = await fetch('backend/deleteAgendas.php?id='+id)
    const result = await response.json()               
    if (result?.success) {
        alert('Seu compromisso foi deletado com sucesso!');
        loadAgendas();
    }
}

async function loadAgendaData(id) {
    const response = await fetch('backend/get-agenda-by-id.php?id='+id)
    const result = await response.json()               
    if (result?.success) {
        showModal('#modal-editar')
        const dia = document.querySelector('#modal-editar input[name=dia]')
        dia.value = result.data.dia

        const horario = document.querySelector('#modal-editar input[name=horario]')
        horario.value = result.data.horario

        const comquem = document.querySelector('#modal-editar input[name=comquem]')
        comquem.value = result.data.comquem

        const assunto = document.querySelector('#modal-editar input[name=assunto]')
        assunto.value = result.data.assunto
        
        const topico = document.querySelector('#modal-editar input[name=topico]')
        topico.value = result.data.topico

        const id = document.querySelector('#modal-editar input[name=id]')
        id.value = result.data.id
    }
}

async function editAgenda(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const response = await fetch('backend/editAgendas.php?',{
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModal()
        alert('Seu Compromisso com ' + result.data.comquem+' foi editado com sucesso!');
        loadAgendas()
    }
}

