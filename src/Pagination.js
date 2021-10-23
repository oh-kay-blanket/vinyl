import React from 'react';

const Pagination = ({ pagination, setfetchURL }) => {

    console.log(pagination.urls)

  return(
    <div className='pagination'>
        {pagination.page !== 1 && <>
            <i className="fas fa-angle-double-left" onClick={() => setfetchURL(pagination.urls.first)}></i>
            <i className="fas fa-angle-left" onClick={() => setfetchURL(pagination.urls.prev)}></i>
        </>}

        <p>{pagination.page} of {pagination.pages}</p>

        {pagination.page !== pagination.pages && <>
            <i className="fas fa-angle-right" onClick={() => setfetchURL(pagination.urls.next)}></i>
            <i className="fas fa-angle-double-right" onClick={() => setfetchURL(pagination.urls.last)}></i>
        </>}        
    </div>
  );
}

export default Pagination;
