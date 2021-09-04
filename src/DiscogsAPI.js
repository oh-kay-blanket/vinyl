// var Discogs = require('disconnect').Client;

export default function getReleases() {
    fetch('https://api.discogs.com/users/misterblanket/collection/folders/0/releases')
    .then(response => response.json())
    .then(data => console.log(data));
    
    // var col = new Discogs().user().collection();
    // col.getReleases(`misterblanket`, 0, {page: 1, per_page: 75}, function(err, data){
    //     console.log(data);
    // });
}


