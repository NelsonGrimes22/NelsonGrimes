//Scrape IMDB

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const movieURL = 'https://www.imdb.com/title/';
const searchCache = [];
const movieCache = [];

// const url = 'https://www.imdb.com/find?s=tt&ref_=fn_al_tt_mr&q=';
const url = 'https://www.imdb.com/find?s=tt&ref_=fn_tt_pop&q=';

function searchMovies(searchTerm) {
    if (searchCache[searchTerm]) {
        return Promise.resolve(searchCache[searchTerm]);
    }

    return fetch(`${url}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const movies = [];
            $('.findResult').each(function (i, element) {

                const $element = $(element);
                const $img = $element.find('td a img');
                const $title = $element.find('td.result_text a');
                let imdbID = $title.attr('href');

                if ($title.attr('href').includes('title')) {
                    imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
                    const movie = {
                        title: $title.text(),
                        image: $img.attr('src'),
                        imdbID
                    };
                    movies.push(movie);
                }
            });
            searchCache[searchTerm] = movies;
            
            return movies;
        });
}

function getMovie(imdbID) {

    if (movieCache[imdbID]) {
        return Promise.resolve(movieCache[imdbID]);
    }

    return fetch(`${movieURL}${imdbID}`)
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);

            const $title = $('.title_wrapper').find('h1').text().trim();
            const $img = $('.poster a img').attr('src').trim();

            tmpRating = '';
            $('#titleStoryLine > div:nth-child(12) > span:nth-child(2)').text()

            let rT = '';
            if ($('.txt-block time').text().split('min')[0]) {
                rT = $('.txt-block time').text().split('min')[0] + 'min'
            }
            const $runTime = rT;
            const $genre = [];

            //Make the code smaller if possible
            ($('#titleStoryLine > div:nth-child(10)')
                .text().split('|')
                .join('').split('\n'))
                .forEach(element => {
                    if (element != '') {
                        $genre.push(element.trim());
                    }
                });
            $genre.shift();
            $genre.pop();

            //Make the code smaller if possible
            const $year = $('#titleDetails > div:nth-child(6)').text().trim().split('\n')[0].split(':')[1].trim();
            const $summary = $('.summary_text').text().trim();
            const $actors = [];
            let type = '';
            let tmpACT = []

            // document.querySelector("#title-overview-widget > div.vital > div.button_panel.navigation_panel > a > div > div > div")



            if ($('#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div:nth-child(4)') == "") {
                //TV SHOW
                type = 'TV SHOW';
                tmpRating = $('#titleStoryLine > div:nth-child(12) > span:nth-child(2)').text();
                $('#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div:nth-child(3)').text().split('\n')
                    .forEach(element => {
                        if (element != "") {
                            tmpACT.push(element.trim());
                        }
                    });
                    $actors.push(tmpACT[1].replace('|', '').trim().split(','));
            } else { //MOVIE
                type = 'MOVIE';
                tmpRating = $('#titleStoryLine > div:nth-child(12) > span:nth-child(2)').text().split(' ')[1];
                $('#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div:nth-child(4)').text().split('\n')[2].replace('|', "").split(',')
                    .forEach(element => {
                        $actors.push(element);
                    });
            }

            const $rating = tmpRating;
            console.log($rating);
            let tmpDir = [];
            const $directors = [];

            $('#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div:nth-child(2)').text().split('\n')
                .forEach(element => {
                    if (element != '') {
                        tmpDir.push(element.trim());
                    }
                });
            tmpDir = tmpDir[1].split(',').forEach(element => {
                $directors.push(element.trim());
            });

            const $imdbRating = $('.ratingValue strong span').text();

            const movie = {
                title: $title,
                runTime: $runTime,
                rating: $rating,
                genres: $genre,
                yearReleased: $year,
                imdbRating: $imdbRating,
                summary: $summary,
                directors: $directors,
                actors: $actors,
                image: $img,
                type: type
            };

            movieCache[imdbID] = movie;

            return movie;
        });

}
module.exports = {
    getMovie,
    searchMovies
};