// DOM ELEMENTS

var topicInputEl = document.querySelector('#topic');
var authorInputEl = document.querySelector('#author');
var searchBtn = document.querySelector('#search');


// GLOBAL VAR 

var googleApiKey = 'AIzaSyBnclLTbT1mhObu7gIM7GD2zyWPGJMmCdA';

var handleFormSubmit = function(event) {
    event.preventDefault();
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
                    console.log(data)
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
        console.log(books.items[i]);
        var bookTitle = books.items[i].volumeInfo.title;
        
        count ++;
        if (count === 5){
            break;
        }
    }
    


    
}

searchBtn.addEventListener('click', handleFormSubmit);