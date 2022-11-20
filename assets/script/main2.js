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
async function insert2(event) {
    event.preventDefault() //tira a forma padrão de enviar.
    const formData = new FormData(event.target)
    const response = await fetch('backend/insert2.php', {
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    if (result?.success) {
        closeAllModal() 
        alert('A data do seu evento é dia: '+result.data.dia);
        loadProductions2();
    }
}

async function loadProductions2() {
    const response = await fetch('backend/list2.php')
    const result = await response.json()
    if (result?.success) {
        const listaEvent = document.querySelector('#corpo1')
        listaEvent.innerHTML = ''
        const local = result.data
        local.map((cdsagenda) => {
            listaEvent.innerHTML += `

            <tr>
            <td>${cdsagenda.dia}</td>
            <td>${cdsagenda.horario}</td>
            <td>${cdsagenda.comquem}</td>
            <td>${cdsagenda.assunto}</td>
            <td>${cdsagenda.topico}</td>

            <td><img src="assets/img/logo.svg" widht="30px" height="30px" alta="Apagar" onclick="deleteProduction(${cdsagenda.id})" /></td>
            
            <td><img src="" alta="Editar" onclick="loadProductoinData(${cdsagenda.id})" /></td>
        </tr> `
        })

    }else{
        alert('Erro ao cadastrar a função')
    }       
}

async function deleteProduction(id) {
    const response = await fetch('backend/delete2.php?id='+id)
    const result = await response.json()               
    if (result?.success) {
        alert('Seu filme foi deletado com sucesso!');
        loadProductions2();
    }
}