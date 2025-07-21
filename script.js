// Substitua 'seu-usuario' pelo seu usuário do GitHub
const GITHUB_USER = 'seu-usuario';

async function carregarProjetos() {
    const url = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`;
    const lista = document.getElementById('lista-projetos');
    lista.innerHTML = '<p>Carregando projetos...</p>';
    try {
        const resposta = await fetch(url);
        const repos = await resposta.json();
        lista.innerHTML = '';
        repos.forEach(repo => {
            const div = document.createElement('div');
            div.className = 'projeto';
            div.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'Sem descrição.'}</p>
                <p><strong>Linguagem:</strong> ${repo.language || 'N/A'}</p>
            `;
            lista.appendChild(div);
        });
    } catch (e) {
        lista.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarProjetos);
