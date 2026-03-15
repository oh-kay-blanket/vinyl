import React from 'react';

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3Cmask id='hole'%3E%3Crect width='200' height='200' fill='white' rx='5'/%3E%3Ccircle cx='100' cy='100' r='24' fill='black'/%3E%3C/mask%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='23' fill='%23333'/%3E%3Ccircle cx='100' cy='100' r='18' fill='none' stroke='%233a3a3a' stroke-width='0.3'/%3E%3Ccircle cx='100' cy='100' r='12' fill='none' stroke='%233a3a3a' stroke-width='0.3'/%3E%3Ccircle cx='100' cy='100' r='3' fill='%23555'/%3E%3Crect fill='%23e8e4df' width='200' height='200' rx='5' mask='url(%23hole)'/%3E%3Ccircle cx='100' cy='100' r='24' fill='none' stroke='%23d5d0c9' stroke-width='1'/%3E%3Cline x1='0' y1='5' x2='200' y2='5' stroke='%23d5d0c9' stroke-width='0.5'/%3E%3Cline x1='0' y1='195' x2='200' y2='195' stroke='%23d5d0c9' stroke-width='0.5'/%3E%3Cline x1='15' y1='60' x2='185' y2='60' stroke='%23ddd8d2' stroke-width='0.3' opacity='0.5'/%3E%3Cline x1='15' y1='140' x2='185' y2='140' stroke='%23ddd8d2' stroke-width='0.3' opacity='0.5'/%3E%3C/svg%3E";

const GridBox = ({ data, handleRecordClick }) => {

  const recordList = data.map((record, index) => (<RecordCell key={record.id} index={index} record={record} handleRecordClick={handleRecordClick} />));

  return(
    <div id='record-grid' className='record-grid'>
      {recordList}
    </div>
  );
}

const RecordCell = ({ index, record, handleRecordClick }) => {
  const titleLen = record.album.length + record.artist.length;
  const titleSize = titleLen > 60 ? '1rem' : titleLen > 40 ? '1.15rem' : '1.3rem';
  const artistSize = titleLen > 60 ? '0.85rem' : titleLen > 40 ? '0.9rem' : '1rem';

  return(
    <div className='main-box' onClick={() => handleRecordClick(index)}>
      <img className='img' loading="lazy" alt='' src={record.cover_image || placeholder} onError={e => e.target.src = placeholder}></img>
      <div id='record-info'>
        <h2 id="main-box-title" style={{ fontSize: titleSize }}>{record.album}</h2>
        <h3 style={{ fontSize: artistSize }}>{record.artist}</h3>
      </div>
    </div>
  );
}

export default GridBox;
