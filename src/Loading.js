import React from 'react';

const Loading = ({ data, handleRecordClick }) => {

  return(
    <div className='loading'>
      <i className="fa fa-circle-o-notch fa-spin" style={{fontSize:"80px"}}></i>
    </div>
  );
}

export default Loading;
