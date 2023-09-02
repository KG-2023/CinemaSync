'use strict';

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {

    /**
     * fetch all genres eg: [ { "id" : "123", "name" : "Action" } ]
     * then change genre format eg: { 123 : "Action" }
     */

    const genreList = {};
    fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
        for (const { id, name } of genres) {
            genreList[id] = name;
        }
        genreLink();
    });

    const sidebarInner = $('<div>').addClass('sidebar-inner');
    sidebarInner.html(`
    <div class="sidebar-list">
      <p class="title">Genre</p>
    </div>
    
    <div class="sidebar-footer">
      <img
          src="../images/kode_motion.png"
          width="130"
        height="17"
        alt="kode_motion"
      />
      <br>
      <p class="copyright">
        Copyright 2023
        <a href="https://github.com/KG-2023/CinemaSync" target="_blank"
        >kode_motion</a
        >
       </p>

      <img
        src="../images/tmdb-logo.svg"
        width="130"
        height="17"
        alt="the movie database logo"
      />

    </div> 
 `);

    const genreLink = function () {
        for (const [genreId, genreName] of Object.entries(genreList)) {
            const link = $('<a>').addClass('sidebar-link');
            link.attr('href', '../pages/movie-list.html');
            link.attr('menu-close', '');
            link.attr('onclick', `getMovieList("with_genres=${genreId}","${genreName}")`);
            link.text(genreName);
            sidebarInner.find('.sidebar-list').append(link);
        }

        const sidebar = $('[sidebar]');
        sidebar.append(sidebarInner);
        toggleSidebar(sidebar);
    }

    const toggleSidebar = function (sidebar) {
        // Toggle sidebar in mobile screen
        const sidebarBtn = $('[menu-btn]');
        const sidebarTogglers = $('[menu-toggler]');
        const sidebarClose = $('[menu-close]');
        const overlay = $('[overlay]');

        // Event handling with jQuery
        sidebarTogglers.on('click', function () {
            sidebar.toggleClass('active');
            sidebarBtn.toggleClass('active');
            overlay.toggleClass('active');
        });

        sidebarClose.on('click', function () {
            sidebar.removeClass('active');
            sidebarBtn.removeClass('active');
            overlay.removeClass('active');
        });
    }
}
