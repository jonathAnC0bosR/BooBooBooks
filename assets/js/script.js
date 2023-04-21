// DOM ELEMENTS

var topicInputEl = document.querySelector('#topic');
var kewordInputEl = document.querySelector('#keyword');
var searchBtn = document.querySelector('#search');

// GLOBAL VAR 

var googleApiKey = 'AIzaSyBnclLTbT1mhObu7gIM7GD2zyWPGJMmCdA';

addEventListener('click', function() {
    var googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=' + googleApiKey;
    fetch(googleUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

})