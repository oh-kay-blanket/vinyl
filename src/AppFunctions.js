import React, { useState } from 'react';

// Filter & sort
const handleFilter = (data, filterType, filterInput) => {
  switch(filterType) {
    case 'artist':
      return data.filter(record => (record.artist && record.artist.toUpperCase().includes(filterInput.toUpperCase())));
    case 'album':
      return data.filter(record => (record.album && record.album.toString().toUpperCase().includes(filterInput.toUpperCase())));
    case 'genre':
      return data.filter(record => (record.genre && record.genre.toString().toUpperCase().includes(filterInput.toUpperCase())));
    case 'year':
      return data.filter(record => (record.year && record.year.toString().toUpperCase().includes(filterInput.toUpperCase())));
    default:
  }
}

const albumRandom = data => {
  data.sort(function(a, b){return 0.5 - Math.random()});
}

const artistAsc = data => {

  // First sort by year
  data.sort(function(a,b) {
    return a.year - b.year;
  });

  // sort results
  data.sort(function(a,b) {
    if(a.artist < b.artist) { return -1; }
    if(a.artist > b.artist) { return 1; }
    return 0;
  });
}

const artistDsc = data => {

  // First sort by year
  data.sort(function(a,b) {
    return a.year - b.year;
  });

  // sort results
  data.sort(function(a,b) {
    if(b.artist < a.artist) { return -1; }
    if(b.artist > a.artist) { return 1; }
    return 0;
  });
}

const yrAsc = data => {

  // Fist sort by artist
  data.sort(function(a,b) {
    if(a.artist < b.artist) { return -1; }
    if(a.artist > b.artist) { return 1; }
    return 0;
  });

  // sort results
  data.sort(function(a,b) {
    return a.year - b.year;
  });
}

const yrDsc = data => {

  // Fist sort by artist
  data.sort(function(a,b) {
    if(a.artist < b.artist) { return -1; }
    if(a.artist > b.artist) { return 1; }
    return 0;
  });

  // sort results
  data.sort(function(a,b) {
    return b.year - a.year;
  });
}

const handleSort = (data, sortDirection) => {
  switch(sortDirection) {
    case 'alb-rnd':
      return data;
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


// Modal
const buildModalFunctionality = (setModalId) => {
  // Keypress listener
  document.addEventListener("keydown", function(event) {
    if(event.which === 27){
      setModalId('');
    }
  });
}

export { handleFilter, handleSort, buildModalFunctionality };
