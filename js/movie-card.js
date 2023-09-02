'use strict';

import { imageBaseUrl } from "./api.js";

export function createMovieCard(movie) {
    const {
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie;

    const card = $('<div>').addClass('movie-card'); // Using jQuery to create a div element with the 'movie-card' class
    card.html(`
        <figure class="poster-box card-banner">
            <img
                src="${imageBaseUrl}w342${poster_path}"
                alt="${title}"
                class="img-cover"
            />
        </figure>
        <h4 class="title">${title}</h4>
        <div class="meta-list">
            <div class="meta-item">
                <img
                    src="../images/star.png"
                    width="20"
                    height="20"
                    loading="lazy"
                    alt="rating"
                />
                <span class="span">${vote_average.toFixed(1)}</span>
            </div>
            <div class="meta-item card-badge">${release_date.split('-')[0]}</div>
        </div>
    `);

    const cardBtn = $('<a>').addClass('card-btn') // Using jQuery to create an anchor element with the 'card-btn' class
        .attr('href', '../pages/detail.html')
        .attr('title', title)
        .click(function () {
            getMovieDetail(id); // Using jQuery click event binding
        });

    card.append(cardBtn); // Appending the cardBtn to the card

    return card;
}
