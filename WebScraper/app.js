//Server can't find js file so typing in on html
const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const searchURL = 'http://localhost:3000/search/';
const resultListDiv = document.querySelector("#result_list"); const resultsList = document.querySelector('#results');
form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
    event.preventDefault();

    const searchTerm = searchInput.value;
    getSearchResults(searchTerm)
        .then(showResults);
}

function getSearchResults(searchTerm) {
    return fetch(`${searchURL}${searchTerm}`)
        .then(res => res.json());

}

function showResults(results) {
    console.log('here');
    console.log(results);
    document.querySelectorAll("#results").forEach(e => e.parentNode.removeChild(e));
    const ul = document.createElement('ul');
    ul.className = 'list-group';
    ul.id = 'results';
    resultListDiv.appendChild(ul);
    const resultsList = document.querySelector('#results');
    results.forEach(movie => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = movie.image;
        li.appendChild(img);

        const a = document.createElement('a');
        a.textContent = movie.title;
        a.href = '/movie.html?imdbID=' + movie.imdbID
        li.appendChild(a);
        resultsList.appendChild(li);
    });
}
