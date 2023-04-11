// Pega input do form no html
const gitHubForm = document.getElementById('gitHubForm');

// Espera que o botão "submit" seja pressionado
gitHubForm.addEventListener('submit', (e) => {

  e.preventDefault();

  // Pega o input do username e do repo do form
  let usernameInput = document.getElementById('usernameInput');
  let repoInput = document.getElementById('repositoryInput');

  // Pega o valor do nome do repo e do username
  let gitHubUsername = usernameInput.value;
  let gitHubRepo = repoInput.value;

  // Faz request dos commits para api do GitHub
  requestRepoCommits(gitHubUsername, gitHubRepo)
    .then(response => response.json()) // Parse da resposta para json
    .then(data => { // Atualiza o html com os dados da resposta
        
      // Caso não encontre o repo ou username atualiza o html com resposta de erro
      if (data.message === "Not Found") {
        let ul = document.getElementById('repoCommits');

        let li = document.createElement('li');

        li.classList.add('list-group-item')
        li.innerHTML = (`
          <p><strong>O usuário ${gitHubUsername} não possui o repositório ${gitHubRepo}.</p>
        `);

        ul.appendChild(li);

      } else {
        for (let i in data) {

          let ul = document.getElementById('repoCommits');

          let li = document.createElement('li');     

          li.classList.add('list-group-item')
          
          li.innerHTML = (`                
            <p><strong>Autor: </strong> ${data[i].commit.author.name}</p>
            <p><strong>Data: </strong> ${data[i].commit.author.date}</p>
            <p><strong>Mensagem: </strong> ${data[i].commit.message}</p>
            <a href="${data[i].commit.url}"><strong>URL commit</strong></a>
          `);
                
            ul.appendChild(li);
        }
      }
    })

})

async function requestUserRepos(username) {
  return await fetch(`https://api.github.com/users/${username}/repos`);
}

async function requestRepoCommits(username, repo) {
  return await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
}