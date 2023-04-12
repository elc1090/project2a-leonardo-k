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

  // Checa por campos vazios no forms
  if(!gitHubUsername) {
    let alert = document.getElementById('alert')
    alert.style.display = 'block';

    let alertMessage = document.createElement('alertMessage');
    alertMessage.innerHTML = (`
        <p style:"text-align: center"> <strong>Precisa informar um username.
        </strong></p>
    `)
    alert.appendChild(alertMessage)

  } else if(!gitHubRepo) {
    let alert = document.getElementById('alert')
    alert.style.display = 'block';

    let alertMessage = document.createElement('alertMessage');
    alertMessage.innerHTML = (`
        <p style:"text-align: center"> </strong>Precisa informar um repositório.
        </strong></p>
    `)
    alert.appendChild(alertMessage)

  } else {

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
              <p><strong> ${data[i].sha.slice(0,7)}</strong></p>
              <p><strong>Autor: </strong> ${data[i].commit.author.name}</p>
              <p><strong>Data: </strong> ${data[i].commit.author.date}</p>
              <p><strong>Mensagem: </strong> ${data[i].commit.message}</p>
            `);
            
              ul.appendChild(li);
          }
        }
      })
    }

})

async function requestUserRepos(username) {
  return await fetch(`https://api.github.com/users/${username}/repos`);
}

async function requestRepoCommits(username, repo) {
  return await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
}