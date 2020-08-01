import React, { useState } from 'react';

import GridBox from './Grid';
import { handleSort, handleFilter, getQuote, getGrade, modalId, setModalId, buildModalFunctionality } from './AppFunctions.js';

// Build 'images' var for development
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const imagesLarge = importAll(require.context('./img/600', false, /\.(jpe?g)$/));

const Modal = ({ data, modalId, setModalId }) => {

  let record = data.filter(record => record.id === modalId)[0];

  record.image = imagesLarge[`${record.id}.jpg`];

  return (
    <div className='modal' style={{display: 'grid'}}>
      <div className="modal-table" onClick={() => setModalId('')}>
        <div className="modal-cell">
          <img className="modal-content" loading="lazy" alt='' src={record.image}></img>
          <div className="caption">
            <h2>{record.album}</h2>
            <h3>{record.artist}</h3>
            <p>{record.year}</p>
            <p>{record.genre}</p>
            <p>{record.speed} rpm</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
