// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    let repoInput = document.getElementById('repositoryInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
    console.log(gitHubUsername)

    let gitHubRepo = repoInput.value;
    console.log(gitHubRepo)

    // Run GitHub API function, passing in the GitHub username
    requestRepoCommits(gitHubUsername, gitHubRepo)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github

            if (data.message === "Not Found") {
                let ul = document.getElementById('repoCommits');

                // Create variable that will create li's to be added to ul
                let li = document.createElement('li');

                // Add Bootstrap list item class to each li
                li.classList.add('list-group-item')
                // Create the html markup for each li
                li.innerHTML = (`
            <p><strong>O usuário ${gitHubUsername} não possui o repositório ${gitHubRepo}.</p>`);
                // Append each li to the ul
                ul.appendChild(li);
            }

            for (let i in data) {

                    let ul = document.getElementById('repoCommits');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    
                    // Create the html markup for each li
                    li.innerHTML = (`                
                <p><strong>Autor: </strong> ${data[i].commit.author.name}</p>
                <p><strong>Data: </strong> ${data[i].commit.author.date}</p>
                <p><strong>Mensagem: </strong> ${data[i].commit.message}</p>
                <a href="${data[i].commit.url}"><strong>URL commit</strong></a>
            `);

                    // Append each li to the ul
                    ul.appendChild(li);
            }
        })

})

function requestUserRepos(username) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}

async function requestRepoCommits(username, repo) {
    return await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
}