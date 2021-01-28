const express = require('express');
const db = require('./db/db');
const scraper = require('./youtubeScraper')

const app = express();


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
});


app.get('/scrape/:youtubeURL', (req, res) => {
    scraper.scrapeYouTube(req.params.youtubeURL)
        .then(video => {
            res.json(video);
        })
});
app.get('/db', (req, res) => {
    db.getReviews()
    .then(reviews => {
        res.json(reviews);
    })
});

// app.get('/db/insert',(req,res) => {

//     db.insertReview();
//     res.json('Review Inserted');
// });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});