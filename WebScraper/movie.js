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
    const loader = document.getElementById('loader');
    console.log(
        movie
    );
    document.getElementById('title').textContent = movie.title;
    document.getElementById('description').textContent = movie.summary;
    document.getElementById('genre').textContent = 'Genre(s): ' + movie.genres.join(', ');
    document.getElementById('yearReleased').textContent = 'Year Released: ' + movie.yearReleased;
    document.getElementById('actors').textContent = 'Actors: ' + movie.actors.join(', ');
    document.getElementById('director').textContent = 'Director(s): ' + movie.directors;
    document.getElementById('img').src = movie.image;

    if(movie.rating){
        document.getElementById('rating').textContent = movie.rating + ' - ' + movie.runTime;
    } else {
        if(movie.runTime){
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
    loader.remove();
    starsList.outerHTML = '<style> .movieBox  {opacity:100;}</style>';
}

getMovie(imdbID)
    .then(showMovie);