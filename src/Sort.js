import React, { useState } from 'react';

const Sort = ({ setSortDirection }) => {

  return (
    <div className='sort-box'>
      <p>Sort by
        <select onChange={e => setSortDirection(e.target.value)}>
          <option value='alb-rnd'>Random</option>
          <option value='art-asc'>Artist A-Z</option>
          <option value='art-dsc'>Artist Z-A</option>
          <option value='yr-asc'>Year &#8593;</option>
          <option value='yr-dsc'>Year &#8595;</option>
        </select>
      </p>
    </div>
  )
}

export default Sort;
