import React from 'react';

// Filter & sort
const handleFilter = (data, filterType, filterInput) => {
  switch(filterType) {
    case 'artist':
      return data.filter(record => (record.artist && record.artist.toUpperCase().includes(filterInput.toUpperCase())));
    case 'album':
      return data.filter(record => (record.album && record.album.toString().toUpperCase().includes(filterInput.toUpperCase())));
    case 'genre':
      return data.filter(record => (record.genre && record.genre.toUpperCase().includes(filterInput.toUpperCase())));
    case 'year':
      return data.filter(record => (record.year && record.year.toString().toUpperCase().includes(filterInput.toUpperCase())));
    default:
  }
}

const albumRandom = data => {
  data.sort(function(a, b){return 0.5 - Math.random()});
  console.log(data);
}

const artistAsc = data => {
  // sort results
  data.sort(function(a,b) {
    if(a.artist < b.artist) { return -1; }
    if(a.artist > b.artist) { return 1; }
    return 0;
  });
}

const artistDsc = data => {
  // sort results
  data.sort(function(a,b) {
    if(b.artist < a.artist) { return -1; }
    if(b.artist > a.artist) { return 1; }
    return 0;
  });
}

const yrAsc = data => {
  // sort results
  data.sort(function(a,b) {
    return a.year - b.year;
  });
}

const yrDsc = data => {
  // sort results
  data.sort(function(a,b) {
    return b.year - a.year;
  });
}

const handleSort = (data, sortDirection) => {
  switch(sortDirection) {
    case 'alb-rnd':
      albumRandom(data);
      break;
    case 'art-asc':
      artistAsc(data);
      break;
    case 'art-dsc':
      artistDsc(data);
      break;
    case 'yr-asc':
      yrAsc(data);
      break;
    case 'yr-dsc':
      yrDsc(data);
      break;
    default:
      break;
  }
}

const getQuote = quote => {
  return (quote === '' ? '' : <p><b>Favorite Quote:</b> {quote}</p>)
};

const getGrade = grade => {
  grade = +grade;
  return (grade === 0 ? '' : <p><b>Rating:</b> {grade.toPrecision(2)}</p>)
};


// Modal
const buildModalFunctionality = (setModalId) => {
  // Keypress listener
  document.addEventListener("keydown", function(event) {
    if(event.which === 27){
      setModalId('');
    }
  });
}

export { handleFilter, handleSort, getQuote, getGrade, buildModalFunctionality };
