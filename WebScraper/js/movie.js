const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const url = 'http://localhost:3000/movie/'

function getMovie(imdbID) {
    return fetch(`${url}${imdbID}`)
        .then(res => res.json());

}

function showMovie(movie) {
    const rating = movie.imdbRating / 2;
    const ratingDecimal = (rating - Math.floor(rating)).toFixed(1);
    const starsList = document.getElementById('stars');
    const star_full = '<li class="list-inline-item m-0"><i class="fa fa-star text-success"></i> </li> ';
    const star_half = '<li class="list-inline-item m-0"><i class="fa fa-star-half-o text-success"></i></li>';

    document.getElementById('title').textContent = movie.title;
    document.getElementById('description').textContent = movie.summary;
    document.getElementById('genre').textContent = 'Genre(s): ' + movie.genres.join(', ');
    document.getElementById('yearReleased').textContent = 'Year Released: ' + movie.yearReleased;
    document.getElementById('actors').textContent = 'Actors: ' + movie.actors.join(', ');
    document.getElementById('img').src = movie.image;
    document.title = 'Movie Search ' + movie.title;

    if(movie.type == 'TV SHOW'){
        document.getElementById('search').textContent = 'TV Show Search';
    }else{
        document.getElementById('search').textContent = 'Movie Search';
    }

    if (movie.directors.length > 1) {
        document.getElementById('director').textContent = 'Director(s): ' + movie.directors.join(',');
    } else {
        document.getElementById('director').textContent = 'Director(s): ' + movie.directors;
    }

    if (movie.rating) {
        document.getElementById('rating').textContent = movie.rating + ' - ' + movie.runTime;
    } else {
        if (movie.runTime) {
            document.getElementById('rating').textContent = 'No Rating' + ' - ' + movie.runTime;
        } else {
            document.getElementById('rating').textContent = '';
        }
    }
    for (let i = 0; i < Math.floor(rating); i++) {
        starsList.innerHTML += star_full;
    }
    if (.7 >= ratingDecimal >= .3) {
        starsList.innerHTML += star_half;
    }

}
function stopLoading() {
    const loader = document.getElementById('loader');
    const body = document.getElementById('bodyStyle');

    loader.remove();
    body.innerHTML = '<style> .hide  {opacity:100;}</style>';

}

getMovie(imdbID)
    .then(showMovie)
    .then(stopLoading);