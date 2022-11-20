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
async function insert(event) {
    event.preventDefault() //tira a forma padrão.
    const formData = new FormData(event.target)
    const response = await fetch('backend/insert.php', {
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModal() 
        alert('Seu filme '+result.data.titulo+' foi cadastrado com sucesso!');
        loadProductions();
    }
}

async function loadProductions() {
    const response = await fetch('backend/list.php')
    const result = await response.json()
    if (result?.success) {
        const listaEvent = document.querySelector('#corpo1')
        listaEvent.innerHTML = ''
        const event = result.data
        event.map((eventos) => {
            listaEvent.innerHTML += `

                <tr>
                    <td>${eventos.nome}</td>
                    <td>${eventos.email}</td>
                    <td>${eventos.numero}</td>
                    <td>${eventos.cpf}</td>

                    <td><img src="assets/img/logo.svg" widht="30px" height="30px" alta="Apagar" onclick="deleteProduction(${eventos.id})" /></td>
                    
                    <td><img src="" alta="Editar" onclick="loadProductoinData(${eventos.id})" /></td>
                </tr> `
     
        })

    }else{
        alert('Erro ao cadastrar a função')
    }       
}

async function deleteProduction(id) {
    const response = await fetch('backend/delete.php?id='+id)
    const result = await response.json()               
    if (result?.success) {
        alert('Seu filme foi deletado com sucesso!');
        loadProductions();
    }
}