import React from 'react';

const Sort = ({ setSort }) => {

  return (
    <div className='sort-box'>
      <p>
      <i className="fas fa-sort"></i>
        <select onChange={e => setSort(e.target.value)}>
          <option value='sort=artist'>Artist</option>
          <option value='sort=title'>Album</option>
          <option value='sort=year'>Year (asc)</option>
          <option value='sort=year&sort_order=desc'>Year (dsc)</option>
        </select>
      </p>
    </div>
  )
}

export default Sort;
