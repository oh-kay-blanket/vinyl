import React from 'react';

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23ccc' stroke-width='2'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='15' fill='%23ccc'/%3E%3Ccircle cx='100' cy='100' r='5' fill='%23bbb'/%3E%3C/svg%3E";

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
      <img className='img' loading="lazy" alt='' src={record.cover_image || placeholder} onError={e => e.target.src = placeholder}></img>
      <div id='record-info'>
        <h2 id="main-box-title">{record.album}</h2>
        <h3>{record.artist}</h3>
      </div>
    </div>
  );
}

export default GridBox;
