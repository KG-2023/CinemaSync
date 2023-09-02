'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

$(document).ready(function () {
    sidebar();

    const genreName = window.localStorage.getItem('genreName');
    const urlParam = window.localStorage.getItem('urlParam');
    const pageContent = $('[page-content]');

    let currentPage = 1;
    let totalPages = 0;

    fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${urlParam}&page=${currentPage}&api_key=${api_key}&include_adult=false`, function ({ results: movieList, total_pages }) {
        totalPages = total_pages;
        document.title = `${genreName} Movies - Cinema_Sync`;
        const movieListElem = $('<section>').addClass('movie-list genre-list').attr('ariaLabel', `${genreName} Movies`);
        movieListElem.html(`
            <div class="title-wrapper">
                <h1 class="heading">All ${genreName} Movies</h1>
            </div>
            <div class="grid-list"></div>
            <button class="btn load-more" load-more>Load More</button>
        `);

        /**
         * ! add movie card based on fetched data
         */

        for (const movie of movieList) {
            const movieCard = createMovieCard(movie);
            movieListElem.find('.grid-list').append(movieCard);
        }

        pageContent.append(movieListElem);

        /**
         * ! load more button functionality
         */

        $('[load-more]').on('click', function () {
            if (currentPage >= totalPages) {
                $(this).hide(); // Using jQuery .hide() method to hide the button
                return;
            }

            currentPage++;
            $(this).addClass('loading'); // Using jQuery .addClass() to add 'loading' class
            fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${urlParam}&page=${currentPage}&api_key=${api_key}&include_adult=false`, ({ results: movieList }) => {
                $(this).removeClass('loading'); // Using jQuery .removeClass() to remove 'loading' class
                for (const movie of movieList) {
                    const movieCard = createMovieCard(movie);
                    movieListElem.find('.grid-list').append(movieCard); // Using jQuery to append movieCard
                }
            });
        });
    });

    search();
});
