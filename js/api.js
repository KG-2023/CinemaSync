'use strict';

const api_key = '4e635d8dba50e0a9a7ecd3fb9cc6bead';
const imageBaseUrl = 'https://image.tmdb.org/t/p/';

/*
    * fetch data from a server using the 'url' and passes 
    * the result in JSON data to a 'callback' function, 
    * along with an optional parameter if has 'optionalParam'
*/

const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}
export { imageBaseUrl, api_key, fetchDataFromServer };