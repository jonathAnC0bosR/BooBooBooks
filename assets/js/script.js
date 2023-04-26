// DOM ELEMENTS

var topicInputEl = document.querySelector('#topic');
var authorInputEl = document.querySelector('#author');
var searchBtn = document.querySelector('#search');
var booksCards = document.querySelector('.book-cards');
var enterDataEl = document.querySelector('#enter-data');
var errorEl = document.querySelector('#error');
var connectEl = document.querySelector('#connect');
var availableEl = document.querySelector('#available');
let loader = document.getElementById('loader');

// GLOBAL VAR 

var googleApiKey = 'AIzaSyBnclLTbT1mhObu7gIM7GD2zyWPGJMmCdA';

var handleFormSubmit = function(event) {
    event.preventDefault();
    booksCards.textContent = '';

    var author = authorInputEl.value.trim();
    var topic = topicInputEl.value.trim();
    if (author && topic) {
        getGoogleBooksInfo(author, topic)
    } else {
        enterDataEl.style.display = 'block';
    }
}

var getGoogleBooksInfo = function(author, topic) {
    
    var googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author + '+subject:' + topic + '&key=' + googleApiKey;
    fetch(googleUrl)
        .then(function(response) {
            if(response.ok) {
                response.json()
                .then(function(data){
                    console.log(data);
                    displayBooksCards(data);
                })
            } else {
                errorEl.style.display = 'block';
                return;
            }
        }).catch(function(error) {
            connectEl.style.display = 'block';
            return;
        })
    
}

var displayBooksCards = function(books) {
    
    if (books.totalItems === 0) {
        availableEl.style.display = 'block';
        return;
    }

    let count = 0;
    for(var i = 0; i < books.items.length; i++) {
        var bookCardEl = document.createElement('a');
        var bookTitle = books.items[i].volumeInfo.title;
        var bookTitleEl = document.createElement('h1');
        var bookImageLink = books.items[i].volumeInfo.imageLinks
        var bookThumbnail = document.createElement('img');
        var bookLink = books.items[i].volumeInfo.infoLink;
        bookCardEl.setAttribute('href', bookLink);
        bookTitleEl.textContent = bookTitle;
        bookCardEl.appendChild(bookTitleEl);
        
        
        if(bookImageLink) {
            bookThumbnail.setAttribute('src', bookImageLink.smallThumbnail);
            bookCardEl.appendChild(bookThumbnail);
        } else {
            bookThumbnail.setAttribute('src', './assets/images/No_Image_Available.jpg');
            bookCardEl.appendChild(bookThumbnail);
        }
        

        booksCards.appendChild(bookCardEl);

        
        console.log(bookTitle);
        count ++;
        if (count === 5){
            break;
        }
    }
    

}

searchBtn.addEventListener('click', handleFormSubmit);

enterDataEl.addEventListener('click', function() {
    enterDataEl.style.display = 'none';
})

connectEl.addEventListener('click', function() {
    connectEl.style.display = 'none';
})

errorEl.addEventListener('click', function() {
    errorEl.style.display = 'none';
})

availableEl.addEventListener('click', function() {
    availableEl.style.display = 'none';
})