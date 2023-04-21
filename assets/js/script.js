$(document).ready(function() {
    $('#search').on('click', function() {
        var topic = $('#topic').val();
        var keywords = $('#keywords').val();
        var googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + topic + '+' + keywords;
        var internetArchiveUrl = 'https://archive.org/advancedsearch.php?q=' + topic + '+' + keywords + '&fl[]=identifier,downloads,title&rows=5&output=json';
        $('.google-books'). }}