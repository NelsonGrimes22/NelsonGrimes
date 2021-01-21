const express = require('express');
const scraper  = require('./movieScraper');
const cors = require('cors')
const app = express();

app.use(cors());
app.get('/', (req,res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/movie/:imdbID', (req,res) => {
    scraper.getMovie(req.params.imdbID)
    .then(movie => {
        res.json(movie);
    })
});

app.get('/search/:title', (req,res) => {
    scraper.searchMovies(req.params.title)
    .then(movies => {
        res.json(movies);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});