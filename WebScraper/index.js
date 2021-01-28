const express = require('express');
const scraper = require('./js/movieScraper');
const cors = require('cors')
const app = express();


app.use(cors());
app.get('/', (req, res) => {
    res.sendFile('html/index.html', { root: __dirname })
});
app.get('/app.js', (req, res) => {
    res.sendFile('js/app.js', { root: __dirname })
});
app.get('/styles.css', (req, res) => {
    res.sendFile('css/styles.css', { root: __dirname })
});
app.get('/movie/:imdbID', (req, res) => {
    scraper.getMovie(req.params.imdbID)
        .then(movie => {
            res.json(movie);
        })
});
app.get('/movie.html', (req, res) => {
    res.sendFile('html/movie.html', { root: __dirname })
});
app.get('/movie.js', (req, res) => {
    res.sendFile('js/movie.js', { root: __dirname })
});


app.get('/search/:title', (req, res) => {
    scraper.searchMovies(req.params.title)
        .then(movies => {
            res.json(movies);
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});