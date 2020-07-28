import React, {useState } from 'react';
import { getQuote, getGrade, setModalId } from './AppFunctions.js';

// Build 'images' var for development
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const imagesSmall = importAll(require.context('./img/250', false, /\.(jpe?g)$/));

const GridBox = ({ data, modalId, setModalId }) => {

  const recordList = data.map((record) => (<RecordCell key={record.id} record={record} setModalId={setModalId} />));

  return(
    <div className='record-list'>
      {recordList}
    </div>
  );
}

const RecordCell = ({ record, setModalId }) => {

  // Build image path
  record.image = imagesSmall[`${record.id}.jpg`];

  return(
    <div className='main-box' onClick={() => setModalId(record.id)}>
      <img className='img' loading="lazy" alt='' src={record.image}></img>
      <div id='record-info'>
        <h2 id="main-box-title">{record.album}</h2>
        <h3>{record.artist}</h3>
      </div>
    </div>
  );
}

export default GridBox;
