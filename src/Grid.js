import React from 'react';

const GridBox = ({ data, handleRecordClick }) => {

  const recordList = data.map((record, index) => (<RecordCell key={record.id} index={index} record={record} handleRecordClick={handleRecordClick} />));

  return(
    <div id='record-grid' className='record-grid'>
      {recordList}
    </div>
  );
}

const RecordCell = ({ index, record, handleRecordClick }) => {

  return(
    <div className='main-box' onClick={() => handleRecordClick(index)}>
      <img className='img' loading="lazy" alt='' src={record.cover_image}></img>
      <div id='record-info'>
        <h2 id="main-box-title">{record.album}</h2>
        <h3>{record.artist}</h3>
      </div>
    </div>
  );
}

export default GridBox;
