

// A FUNCTION THAT LETS THE USER CHANGE THE TOPIC
let submitBtn = document.getElementById('search');

let subject;
function selectTopic(){
    subject = document.getElementById('topic').value;
    if(!subject){
        return
    }
    searchBook();
}

function searchBook(){
    var requestUrl = 'https://openlibrary.org/subjects/'+subject+ '.json';
fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log('Data From Open Library');
        console.log(data)

        let count = 0;
        for(let i = 0; i<data.works.length; i++){
                if(data.works[i].availability.is_lendable == true && data.works[i].has_fulltext == true){
                    console.log(data.works[i])
                    console.log('https://openlibrary.org' + data.works[i].key);
                    count++;
                    if(count == 5){
                        break;
                    }
                }
            } 
    });
}

//TODO: ADD A FUNCTION THAT CREATES ELEMENTS IN THE DOM AND APPENDS THEM TO THE HTML FILE
function createCards(){
    /*TODO: 
    OBTENER EL TITULO: DENTRO DE LA DATA
    OBTENER EL LINK: YA ESTÁ, LINEA 16
    OBTENER LA PORTADA :
        https://covers.openlibrary.org/b/id/240727-S.jpg
        https://openlibrary.org/dev/docs/api/covers
    OBTENER AUTOR; DENTRO DE LA DATA

    */
}

submitBtn.addEventListener('click',selectTopic);


