// DOM ELEMENTS

var topicInputEl = document.querySelector('#topic');
var authorInputEl = document.querySelector('#author');
var searchBtn = document.querySelector('#search');
var booksCards = document.querySelector('.book-cards');


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
        alert('Please enter data')
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
                alert('Error: ' + response.statusText);
            }
        }).catch(function(error) {
            alert('Unable to connect to Google Books API')
        })
    
}

var displayBooksCards = function(books) {
    
    if (books.totalItems === 0) {
        alert('Sorry, no books availabe');
        return;
    }

    let count = 0;
    for(var i = 0; i < books.items.length; i++) {
        var bookCardEl = document.createElement('div');
        var bookTitle = books.items[i].volumeInfo.title;
        var bookTitleEl = document.createElement('h1');
        var bookImageLink = books.items[i].volumeInfo.imageLinks
        var bookThumbnail = document.createElement('img');
        bookTitleEl.textContent = bookTitle;
        bookCardEl.appendChild(bookTitleEl);
        
        if(bookImageLink) {
            bookThumbnail.setAttribute('src', bookImageLink.smallThumbnail);
            bookCardEl.appendChild(bookThumbnail);
        } else {
            console.log('No image you silly')
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