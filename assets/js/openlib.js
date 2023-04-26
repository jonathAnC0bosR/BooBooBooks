// DOM ELEMENTS

let submitBtn = document.getElementById('search');
let cardHolder = document.querySelector('.internet-archive');

let subject;
let author;
function selectTopic(){
    subject = document.getElementById('topic').value;
    author = document.getElementById('author').value;
    if(!subject){
        return
    }
    searchBook();
}

function searchBook(){
    var requestUrl = 'https://openlibrary.org/search.json?author='+author+'&subject:='+subject;
    cardHolder.textContent = '';
fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log('Data From Open Library');
        console.log(data)
        createCards(data)
    });
}

   //CREATE A CARD ELEMENT
function createCards(data){
    let count = 0;
        for(let i = 0; i<data.docs.length; i++){
                if(data.docs[i].ebook_access == "borrowable" && data.docs[i].has_fulltext == true){
                    let bookCardEl = document.createElement('a');
                    let bookLink = 'https://openlibrary.org/'+data.docs[i].key;
                    bookCardEl.setAttribute('href', bookLink)
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


