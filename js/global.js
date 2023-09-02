'use strict';

// ! ========== ADD EVENT ON MULTIPLE ELEMENTS ==========

const addEventOnElements = function (elements, eventType, callback) {
    elements.on(eventType, callback); // Use jQuery .on() method for event binding
};

// ! ========== TOGGLE SEARCH BOX IN SMALL DEVICES ==========

const searchBox = $('[search-box]'); // Using jQuery to select the search box element
const searchTogglers = $('[search-toggler]'); // Using jQuery to select the search togglers

addEventOnElements(searchTogglers, 'click', function () {
    searchBox.toggleClass('active'); // Use jQuery .toggleClass() to toggle the 'active' class
});

/**
 * ! store movieId in 'localStorage' when you click any movie card
 */

const getMovieDetail = function (movieId) {
    window.localStorage.setItem('movieId', String(movieId));
}

/**
 * ! store urlParam & genreName in 'localStorage' when you click any sidebar link
 */

const getMovieList = function (urlParam, genreName) {
    window.localStorage.setItem('urlParam', urlParam);
    window.localStorage.setItem('genreName', genreName);
}
