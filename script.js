async function cadastrarDados() {
    // Formatar equipamento para dinheiro
  /*  const totalFormatado =  parseFloat(total).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    
*/


const nome = document.getElementById('nome').value;
const telefone = document.getElementById('telefone').value;
const email = document.getElementById('email').value;
const equipamento = document.getElementById('equipamento').value;
const defeito = document.getElementById('defeito').value;
const total = document.getElementById('total').value;
const obs = document.getElementById('obs').value;

    // Criar objeto de dados
    const dados = {
        nome: nome,
        telefone: telefone,
        email: email,
        equipamento: equipamento,
        defeito: defeito,
        total: total,
        obs: obs
    };

    try {
        
        const response = await fetch('http://localhost:8080/os', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        
        if (response.ok) {
            const resultado = await response.json();
            console.log('Cadastro realizado com sucesso:', resultado);
            return resultado;
        } else {
            throw new Error('Erro ao cadastrar dados');
        }
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}
async function obterDados() {
    try {
        const response = await fetch('http://localhost:8080/os');
        if (response.ok) {
            const dados = await response.json();
            exibirDadosNaTabela(dados);
        } else {
            throw new Error('Erro ao obter dados');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao obter dados');
    }
}

function exibirDadosNaTabela(dados) {
    const tbody = document.getElementById('dadosTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpar tabela antes de preencher

    dados.forEach(dado => {
        const row = tbody.insertRow();
        const cellId = row.insertCell(0);
        const cellAbertura = row.insertCell(1);
        const cellOrdem = row.insertCell(2);
        const cellNome = row.insertCell(3);
        const cellTelefone = row.insertCell(4);
        const cellEmail = row.insertCell(5);
        const cellEquipamento = row.insertCell(6);
        const cellDefeito = row.insertCell(7)
        const cellTotal = row.insertCell(8)
        const cellObs = row.insertCell(9);        
        const cellAcoes = row.insertCell(10);


        cellId.textContent = dado.id;
        cellAbertura.textContent = dado.abertura;
        cellOrdem.textContent = dado.ordem;
        cellNome.textContent = dado.nome;
        cellTelefone.textContent = dado.telefone;
        cellEmail.textContent = dado.email;
        cellEquipamento.textContent = dado.equipamento;
        cellDefeito.textContent = dado.defeito;
        cellTotal.textContent = dado.total;
        cellObs.textContent = dado.obs;
       // cellObs.textContent = dado.editar;
       // cellObs.textContent = dado.excluir;

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn btn-editar';
        btnEditar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        btnEditar.onclick = () => buscarPorId(dado.id);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.innerHTML = '<i class="fas fa-trash-alt"></i>';
        btnExcluir.className = 'btn btn-excluir';
        btnExcluir.onclick = () => excluirDado(dado.id);

        cellAcoes.appendChild(btnEditar);
        cellAcoes.appendChild(btnExcluir);
    });
}
async function excluirDado(id) {
    try {
        const response = await fetch(`http://localhost:8080/os/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Dado excluído com sucesso');
            obterDados(); // Atualizar a tabela após exclusão
        } else {
            throw new Error('Erro ao excluir dado');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir dado');
    }
}


document.addEventListener('DOMContentLoaded', obterDados);
async function buscarPorId(id) {
    try {
        const response = await fetch(`http://localhost:8080/os/${id}`);
        if (response.ok) {
            const dado = await response.json();
            abrirModal(dado);
        } else {
            throw new Error('Erro ao obter dado');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao obter dado');
    }
}


function abrirModal(dado) {
    const modal = document.getElementById('editarModal');
    modal.style.display = 'block';

    document.getElementById('id').value = dado.id;
    document.getElementById('ordem').value = dado.ordem;
    document.getElementById('nome').value = dado.nome;
    document.getElementById('telefone').value = dado.telefone;
    document.getElementById('email').value = dado.email;
    document.getElementById('equipamento').value = dado.equipamento;
    document.getElementById('defeito').value = dado.defeito;
    document.getElementById('total').value = dado.total;
    document.getElementById('obs').value = dado.obs;
}

function fecharModal() {
    const modal = document.getElementById('editarModal');
    modal.style.display = 'none';
}

// Fechar o modal quando o usuário clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('editarModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Fechar o modal quando o usuário clicar no "x"
document.querySelector('.close').onclick = function() {
    fecharModal();
}