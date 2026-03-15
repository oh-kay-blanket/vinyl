import React from 'react';

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
