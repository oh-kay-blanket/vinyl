import React from 'react';

// Build 'images' var for development
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const imagesSmall = importAll(require.context('./img/250', false, /\.(jpe?g)$/));

const GridBox = ({ data, handleRecordClick }) => {

  const recordList = data.map((record, index) => (<RecordCell key={record.id} index={index} record={record} handleRecordClick={handleRecordClick} />));

  return(
    <div id='record-grid' className='record-grid'>
      {recordList}
    </div>
  );
}

const RecordCell = ({ index, record, handleRecordClick }) => {

  // Build image path
  record.image = imagesSmall[`${record.id}.jpg`];

  return(
    <div className='main-box' onClick={() => handleRecordClick(index)}>
      <img className='img' loading="lazy" alt='' src={record.image}></img>
      <div id='record-info'>
        <h2 id="main-box-title">{record.album}</h2>
        <h3>{record.artist}</h3>
      </div>
    </div>
  );
}

export default GridBox;
