// DOM ELEMENTS

var topicInputEl = document.querySelector('#topic');
var authorInputEl = document.querySelector('#author');
var searchBtn = document.querySelector('#search');
var booksCards = document.querySelector('.google-books');
var enterDataEl = document.querySelector('#enter-data');
var errorEl = document.querySelector('#error');
var connectEl = document.querySelector('#connect');
var availableEl = document.querySelector('#available');
var googleBooksTitle = document.querySelector('.google-books');
var histoyBtn = document.querySelector('#history');
var resultsEl = document.querySelector('.results');


// GLOBAL VAR  

var googleApiKey = 'AIzaSyBnclLTbT1mhObu7gIM7GD2zyWPGJMmCdA';

var handleFormSubmit = function(event) {
    event.preventDefault();
    booksCards.textContent = '';
    var author = authorInputEl.value.trim();
    localStorage.setItem("lastAuthor", author);
    var topic = topicInputEl.value.trim();
    localStorage.setItem("lastTopic", topic);
    if (author && topic) {
        resultsEl.style.display = 'block';
        getGoogleBooksInfo(author, topic);
    } else {
        enterDataEl.style.display = 'block';
        console.log('no data')
    }
}

//Search history function
function lastSearch(){
    booksCards.textContent = '';
    author = localStorage.getItem('lastAuthor');
    topic = localStorage.getItem('lastTopic');
    getGoogleBooksInfo(author, topic);
}


var getGoogleBooksInfo = function(author, topic) {
    
    var googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author + '+subject:' + topic + '&key=' + googleApiKey;
    fetch(googleUrl)
        .then(function(response) {
            if(response.ok) {
                response.json()
                .then(function(data){
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

    var googleTitle = document.createElement('h1');
    googleTitle.textContent = 'Link to buy ';
    googleBooksTitle.append(googleTitle);
    
   

    let count = 0;
    for(var i = 0; i < books.items.length; i++) {
        var bookDiv = document.createElement('div');
        var bookCardEl = document.createElement('a');
        bookCardEl.setAttribute('target', '_blank');
        var bookTitle = books.items[i].volumeInfo.title;
        var bookTitleEl = document.createElement('h2');
        var bookImageLink = books.items[i].volumeInfo.imageLinks
        var bookThumbnail = document.createElement('img');
        var bookLink = books.items[i].volumeInfo.infoLink;
        bookCardEl.setAttribute('href', bookLink);
        bookTitleEl.textContent = bookTitle;
        bookCardEl.appendChild(bookTitleEl);
        bookCardEl.classList.add('.card');
        
        if(bookImageLink) {
            bookThumbnail.setAttribute('src', bookImageLink.smallThumbnail);
            bookCardEl.appendChild(bookThumbnail);
        } else {
            bookThumbnail.setAttribute('src', './assets/images/No_Image_Available.jpg');
            bookCardEl.appendChild(bookThumbnail);
        }
        
        bookDiv.appendChild(bookCardEl);
        booksCards.appendChild(bookDiv);

        
        count ++;
        if (count === 5){
            break;
        }
    }
    

}

searchBtn.addEventListener('click', handleFormSubmit);
histoyBtn.addEventListener('click', lastSearch);

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