import React, { useState } from 'react';

const Sort = ({ setSortDirection }) => {

  return (
    <div className='sort-box'>
      <p>
      <i className="fas fa-sort"></i>
        <select onChange={e => setSortDirection(e.target.value)}>
          <option value='alb-rnd'>Random</option>
          <option value='art-asc'>A-Z</option>
          <option value='art-dsc'>Z-A</option>
          <option value='yr-asc'>Year (asc)</option>
          <option value='yr-dsc'>Year (dsc)</option>
          <option value='pr-asc'>Purchased (asc)</option>
          <option value='pr-dsc'>Purchased (dsc)</option>
        </select>
      </p>
    </div>
  )
}

export default Sort;
