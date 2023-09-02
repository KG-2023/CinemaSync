'use strict';

/**
 * ! Import all components and functions
 */
import { sidebar } from "./sidebar.js";
import { api_key, imageBaseUrl, fetchDataFromServer } from "./api.js";
import { createMovieCard } from './movie-card.js';
import { search } from "./search.js";

const pageContent = $('[page-content]');

sidebar();

/**
 * ! Home Page Sections (Top rated, Upcoming, Trending movies)
 */

const homePageSections = [
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"
    },
    {
        title: "This Week's Trending Movies",
        path: "/trending/movie/week"
    },
    {
        title: "Top Rated Movies",
        path: "/movie/top_rated"
    },
];

/**
 * ? fetch all genres eg: [ { "id" : "123", "name" : "Action" } ]
 * ? then change genre format eg: { 123 : "Action" }
 */

const genreList = {
    /**
     * ! create genre string from genre_id eg: [23, 43] -> "Action Romance"
     */

    asString(genreIdList) {
        let newGenreList = [];

        for (const genreId of genreIdList) {
            if (this[genreId]) {
                newGenreList.push(this[genreId]); // this = genreList
            }
        }
        return newGenreList.join(', ');
    }
};
fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
    for (const { id, name } of genres) {
        genreList[id] = name;
    }

    fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=${api_key}`, heroBanner);
});

const heroBanner = function ({ results: movieList }) {
    const banner = $('<div>').addClass('banner').attr('ariaLabel', 'Popular Movies');
    banner.html(`
        <div class="banner-slider"></div>

        <div class="slider-control">
            <div class="control-inner"></div>
        </div>
    `);

    let controlItemIndex = 0;
    $.each(movieList, function (index, movie) {
        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;

        const sliderItem = $('<div>').addClass('slider-item').attr('slider-item', '');
        sliderItem.html(`
            <img
                src="${imageBaseUrl}w1280${backdrop_path}"
                alt="${title}"
                class="img-cover"
                loading="${index === 0 ? "eager" : "lazy"}"
            />
            <div class="banner-content">
                <h2 class="heading">${title}</h2>
                <div class="meta-list">
                    <div class="meta-item">${release_date.split('-')[0]}</div>
                    <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
                </div>
                <p class="genre">${genreList.asString(genre_ids)}</p>
                <p class="banner-text">${overview}</p>
                <a href="../pages/detail.html" class="btn" onclick="getMovieDetail(${id})">
                    <img
                        src="../images/play_circle.png"
                        width="24"
                        height="24"
                        aria-hidden="true"
                        alt="play circle"
                    />
                    <span class="span">Watch Now</span>
                </a>
            </div>
        `);
        banner.find('.banner-slider').append(sliderItem);
        const controlItem = $('<button>').addClass('poster-box slider-item').attr('slider-control', `${controlItemIndex}`);
        controlItemIndex++;
        controlItem.html(`
            <img
                src="${imageBaseUrl}w154${poster_path}"
                alt="Slide to ${title}"
                loading="lazy"
                draggable="false"
                class="img-cover"
            />
        `);
        banner.find('.control-inner').append(controlItem);
    });

    pageContent.append(banner);
    addHeroSlide();

    /**
     * ? fetch data for homepage sections (top rated, upcoming, trending)
     */

    for (const { title, path } of homePageSections) {
        fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`, createMovieList, title);
    }
};

/**
 * ! Hero Slider functionality
 */
const addHeroSlide = function () {
    const sliderItems = $('[slider-item]');
    const sliderControls = $('[slider-control]');

    let lastSliderItem = sliderItems.first();
    let lastSliderControl = sliderControls.first();
    let currentSliderIndex = 0;

    lastSliderItem.addClass('active');
    lastSliderControl.addClass('active');

    const sliderStart = function () {
        const controlIndex = Number($(this).attr('slider-control'));

        if (currentSliderIndex !== controlIndex) {
            lastSliderItem.removeClass('active');
            lastSliderControl.removeClass('active');

            // Here, 'this' is slider-control
            sliderItems.eq(controlIndex).addClass('active');
            $(this).addClass('active');
            lastSliderItem = sliderItems.eq(controlIndex);
            lastSliderControl = $(this);
            currentSliderIndex = controlIndex;
        }
    };

    const slideToNext = function () {
        const nextIndex = (currentSliderIndex + 1) % sliderItems.length;
        sliderControls.eq(nextIndex).click();
    };

    // Automatically sliding every 7 seconds
    setInterval(slideToNext, 7000);

    sliderControls.on('click', sliderStart);
};

/**
 * ! Create Movie List
 */
const createMovieList = function ({ results: movieList }, title) {
    const movieListElem = $('<section>').addClass('movie-list').attr('ariaLabel', title);

    movieListElem.html(`
        <div class="title-wrapper">
            <h3 class="title-large">${title}</h3>
        </div>
        <div class="slider-list">
            <div class="slider-inner"></div>
        </div>
    `);

    $.each(movieList, function (index, movie) {
        const movieCard = createMovieCard(movie); // called from movie_card.js
        movieListElem.find('.slider-inner').append(movieCard);
    });

    pageContent.append(movieListElem);
};

search();
