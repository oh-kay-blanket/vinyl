import React from 'react';

const Filter = ({ filterType, setFilterType, filterInput, setFilterInput }) => {

  return (
    <div className='filter-box'>
      <p>
        <i className="fas fa-filter"></i>
        <select onChange={e => setFilterType(e.target.value)}>
          <option value='artist'>Artist</option>
          <option value='album'>Album</option>
          <option value='genre'>Genre</option>
          <option value='year'>Year</option>
        </select>

        <input
          className='input-box'
          type="text"
          placeholder='Query'
          value={filterInput}
          onChange={e => setFilterInput(e.target.value)}
          autoFocus
        /></p>
    </div>
  )
}

export default Filter;
