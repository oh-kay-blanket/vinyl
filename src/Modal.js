import React, { useState, useEffect } from 'react';

// import GridBox from './Grid';
// import { handleSort, handleFilter, getQuote, getGrade, modalId, setModalId, buildModalFunctionality } from './AppFunctions.js';

// Build 'images' var for development
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const imagesLarge = importAll(require.context('./img/600', false, /\.(jpe?g)$/));

const Modal = ({ data, modalId, setModalId }) => {

  // Get current record
  let record = data.filter(record => record.id === modalId)[0];

  // Get position in data array
  let pos = data.map(function(e) { return e.id; }).indexOf(record.id);

  // Move function
  function modalAction(dir) {

    let back = pos-1;
    let forward = pos+1;

    // Back
    if (dir === 'prev') {
      back < 0 ? setModalId(data[data.length-1].id) : setModalId(data[back].id);
    }

    // Forward
    if (dir === 'next') {
      forward >= data.length ? setModalId(data[0].id) : setModalId(data[forward].id);
    }
  }

  // HandleKeyPress
  const handleKeyPress = e => {
    if (e.keyCode === 37) {
      modalAction('prev');
    }

    // Forward
    if (e.keyCode === 39) {
      modalAction('next');
    }
  }

  // Keypress listen
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };

  }, [modalId]);

  // Swipe Listen
  useEffect(() => {

    var box1 = document.getElementById('modal-table')
    var startx = 0
    var dist = 0

    // Get start point function
    const getStart = e => {
      var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
      startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
      // e.preventDefault()
    }

    // Calculate distance function
    const getDist = e => {
      var touchobj = e.changedTouches[0] // reference first touch point for this event
      dist = parseInt(touchobj.clientX) - startx;
      // e.preventDefault()

      // Swipe forward
      dist < -70 && modalAction('next');

      // Swipe back
      dist > 70 && modalAction('prev');
    }

    // Listen for start point
    box1.addEventListener('touchstart', getStart, false);

    // Listen for end point
    box1.addEventListener('touchend', getDist, false);

    return () => {
      box1.removeEventListener('touchstart', getStart);
      box1.removeEventListener('touchend', getDist);
    };

  }, [modalId]);

  record.image = imagesLarge[`${record.id}.jpg`].default;

  if(record.genre) {
    record.genre = record.genre.replaceAll(", ", ' / ');
  }

  return (
    <div className='modal' style={{display: 'grid'}}>
      <div id="modal-table" className="modal-table">
        <div className="modal-cell">
          <div className="icon icon-left" onClick={e => {e.stopPropagation();modalAction('prev')}}><i className="fas fa-caret-left"></i></div>
          <div className="icon icon-right" onClick={e => {e.stopPropagation();modalAction('next')}}><i className="fas fa-caret-right"></i></div>
          <div className="icon icon-close" onClick={() => setModalId('')}><i className="fa fa-times" aria-hidden="true"></i></div>
          <div className="caption">
            <h2>{record.album}</h2>
            <h3>{record.artist}</h3>
            <p className="record__genre">{record.genre}</p>
            <p className="record__year">{record.year}</p>
            <p className="record__speed">{record.speed} rpm</p>
          </div>
          <img loading="lazy" alt='' src={record.image}></img>
        </div>
      </div>
    </div>
  )
}

export default Modal
