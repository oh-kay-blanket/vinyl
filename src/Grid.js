import React, {useState } from 'react';
import { getQuote, getGrade, setModalId } from './AppFunctions.js';

// Build 'images' var for development
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./img/250', false, /\.(jpe?g)$/));

const GridBox = ({ data, modalId, setModalId }) => {

  return(
    <div className='record-list'>
      {data.map((record) => (
        <div className='cell-parent' key={record.id} id={record.id}>
          <MainBox
            record={record}
          />
        </div>
      ))}
    </div>
  );
}

const MainBox = ({ record }) => {

  // Build image path
  record.image = images[`${record.id}.jpg`];

  return(
    <div className='main-box'>
      <img className='img' alt='' src={record.image}></img>
      <div id='record-info'>
        <h2 id="main-box-title">{record.album}</h2>
        <h3>{record.artist}</h3>
      </div>
    </div>
  );
}

const ModalWindow = ({ book, modalId, setModalId }) => {
  const imageSource = `./img/${book.id}.jpg`;
  const imageId = `img${book.id}`;
  const modalDivId = `modal${book.id}`;

  let modalDisplay = 'none';
  if (modalId === book.id) {modalDisplay = 'grid'};

  const divClick = () => {
    setModalId('');
  }

  return (
    <div className='modal' id={modalDivId} style={{display: modalDisplay}}>
      <div className="modal-table" onClick={divClick}>
        <div className="modal-cell">
          <img className="modal-content" alt='' src={imageSource} id={imageId}></img>
          <div className="caption">
            <p><b>Title:</b> {book.title}</p>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Thoughts:</b> {book.description}</p>
            {getGrade(book.grade)}
            <p><b>Published:</b> {book.published}
            <b>&nbsp; &nbsp; &nbsp; Read:</b> {book.yearRead}</p>
            <p><b>Genre:</b> {book.genre.substr(0,1).toUpperCase()}{book.genre.substr(1)}</p>
            {getQuote(book.quote)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridBox;
