const fetch = require('node-fetch');
const cheerio = require('cheerio');
const youtube = 'https://www.youtube.com/watch?';


function scrapeYouTube(url){

    return fetch(`${youtube}${url}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);


        const $Title = $('title').text();
        const vidURL = youtube + url;

        console.log($Views);
        return {
            'Title': $Title,
            'URL': vidURL
        };
    })
}

module.exports = {
    scrapeYouTube
};