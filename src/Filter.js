import React, { useState } from 'react';

const Filter = ({ filterType, setFilterType, filterInput, setFilterInput }) => {

  return (
    <div className='filter-box'>
      <p>
        <span className="material-symbols-rounded">filter_alt</span>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value='artist'>Artist</option>
          <option value='album'>Album</option>
          <option value='genre'>Genre</option>
          <option value='year'>Year</option>
        </select>

        <input
          className='input-box'
          type="text"
          placeholder='search'
          value={filterInput}
          onChange={e => setFilterInput(e.target.value)}
          autoFocus
        /></p>
    </div>
  )
}

export default Filter;
