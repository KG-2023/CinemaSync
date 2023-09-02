'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";

export function search() {
    const searchWrapper = $('[search-wrapper]'); // Using jQuery to select the search wrapper element
    const searchField = $('[search-field]'); // Using jQuery to select the search field element
    const searchResultModal = $('<div>').addClass('search-modal'); // Using jQuery to create the search result modal element

    $('main').append(searchResultModal); // Using jQuery to append the search result modal to the main element

    let searchTimeout;

    searchField.on('input', function () {
        if (!searchField.val().trim()) {
            searchResultModal.removeClass('active'); // Using jQuery to remove the 'active' class
            searchWrapper.removeClass('searching'); // Using jQuery to remove the 'searching' class
            clearTimeout(searchTimeout);
            return;
        }

        searchWrapper.addClass('searching'); // Using jQuery to add the 'searching' class
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?page=1&api_key=${api_key}&include_adult=false&query=${searchField.val().trim()}`, function ({ results: movieList }) {
                searchWrapper.removeClass('searching'); // Using jQuery to remove the 'searching' class
                searchResultModal.addClass('active'); // Using jQuery to add the 'active' class
                searchResultModal.html('');

                searchResultModal.html(`
                <p class="label">Results for</p>
                <h1 class="heading">${searchField.val().trim()}</h1>
                <div class="movie-list">
                    <div class="grid-list"></div>
                </div>
                `);
                for (const movie of movieList) {
                    const movieCard = createMovieCard(movie);
                    searchResultModal.find('.grid-list').append(movieCard); // Using jQuery to append movieCard
                }
            });
        }, 500);
    });
}
