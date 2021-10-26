import React, {useState } from 'react';
import { getQuote, getGrade, setModalId } from './AppFunctions.js';

// Build 'images' var for development
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const imagesSmall = importAll(require.context('./img/250', false, /\.(jpe?g)$/));

const List = ({ data, handleRecordClick }) => {

  const recordList = data.map((record, index) => (<RecordCell key={record.id} index={index} record={record} handleRecordClick={handleRecordClick} />));

  return(
    <div className='record-list'>
      {recordList}
    </div>
  );
}

const RecordCell = ({ record, index, handleRecordClick }) => {


  return(
    <div className="list-item" onClick={() => handleRecordClick(index)}>
        <p><span className="list-artist">{record.artist}</span> - {record.album}</p>
    </div>
  );
}

export default List;
