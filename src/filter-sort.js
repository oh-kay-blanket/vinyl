import React, { useState } from 'react';

const FunctionsBox = ({ data, setData, filterType, setFilterType, filterInput, setFilterInput, sortDirection, setSortDirection }) => {

  return(
    <div className='functions-box'>
      <FilterBox
        filterType={filterType}
        setFilterType={setFilterType}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
      />
      <SortBox
        data={data}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>
  )
}

const FilterBox = ({ filterType, setFilterType, filterInput, setFilterInput }) => {

  return (
    <div className='filter-box'>
      <p>Filter by
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

const SortBox = ({ setSortDirection }) => {

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

export default FunctionsBox;
