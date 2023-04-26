// DOM ELEMENTS

let submitBtn = document.getElementById('search');
let cardHolder = document.querySelector('.internet-archive');

let subject;
let author;
function selectTopic(event){
    event.preventDefault();
    cardHolder.textContent = '';
    subject = document.getElementById('topic').value;
    author = document.getElementById('author').value;
    if(author && subject){
        searchBook(author, subject);
    }else{
        enterDataEl.style.display = 'block';
    }
    
}

function searchBook(author, subject){
    var requestUrl = 'https://openlibrary.org/search.json?author='+author+'&subject:='+subject;
fetch(requestUrl)
    .then(function(response){
        if(response.ok){
            response.json()
            .then(function(data){
                console.log('Data From Open Library');
                console.log(data)
                createCards(data)
            })
        }else{
            errorEl.style.display = 'block';
                return;
            }
        }).catch(function(error) {
            connectEl.style.display = 'block';
            return;
        })
    }


   //CREATE A CARD ELEMENT
function createCards(data){

    if (data.totalItems === 0) {
        availableEl.style.display = 'block';
        return;
    }

    let count = 0;
        for(let i = 0; i<data.docs.length; i++){
                if(data.docs[i].ebook_access == "borrowable" && data.docs[i].has_fulltext == true){
                    let bookCardEl = document.createElement('a');
                    let bookLink = 'https://openlibrary.org/'+data.docs[i].key;
                    bookCardEl.setAttribute('href', bookLink)
                    bookCardEl.setAttribute('target', '_blank')
                    let bookTitleEl = document.createElement('h2');
                    let bookTitle = data.docs[i].title;
                    bookTitleEl.textContent = bookTitle;
                    let imageLink = 'https://covers.openlibrary.org/b/id/'+data.docs[i].cover_i+'-S.jpg';
                    let imageEl = document.createElement('img');

                    cardHolder.appendChild(bookCardEl);
                    bookCardEl.appendChild(bookTitleEl);

                    if (imageLink) {
                        imageEl.setAttribute('src', imageLink);
                        bookCardEl.appendChild(imageEl); 
                    }else{
                        imageEl.setAttribute('src', './assets/images/No_Image_Available.jpg');
                        bookCardEl.appendChild(imageEl); 
                    }

                    count++;
                    if(count == 5){
                        break;
                    }
                }
            }
}



submitBtn.addEventListener('click',selectTopic);


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

