/* 
THE BOOKS DISPLAYED NEED TO HAVE
ebook_access: "borrowable" || true
has_fulltext: true
*/

// This URL needs to be able to be changed by the user
var requestUrl = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings';

fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log('Data From Open Library');
        console.log(data)
        //This logs the first five results which are available to be borrowed and that have the full text
        //PROBLEM: SOLO LOGEA LOS PRIMEROS 5 ITEMS DEL ARRAY E LUGAR DE SEGUIR EVALUANDO HASTA REGRESAR 5 RESULTADOS
        //PROBLEM: ebook_access puede tener dos valores: borrowable y true
        for(let i = 0; i < 5; i++){
            let singleBook = data.docs[i];
            if(singleBook.ebook_access == "borrowable" && singleBook.has_fulltext == true){
                console.log(singleBook)
                console.log('https://openlibrary.org' + singleBook.key);
            }
        }
    });