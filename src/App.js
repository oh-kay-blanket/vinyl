import React, { useState } from 'react';

import FunctionsBox from './filter-sort';
import GridBox from './Grid';
import { handleSort, handleFilter, getQuote, getGrade, modalId, setModalId, buildModalFunctionality } from './AppFunctions.js';

const App = ({ data }) => {

  // Set up state
  const [filterType, setFilterType] = useState('artist');
  const [filterInput, setFilterInput] = useState('');
  const [sortDirection, setSort] = useState('alb-rnd');
  const [modalId, setModalId] = useState('');


  data = handleFilter(data, filterType, filterInput);
  handleSort(data, sortDirection);
  return (
    <>
      <h1>vinyl collection</h1>
      <FunctionsBox
        filterType={filterType}
        setFilterType={setFilterType}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        sortDirection={sortDirection}
        setSort={setSort}
      />
      <GridBox
        data={data}
        // modalId={modalId}
        // setModalId={setModalId}
      />
    </>
  )
}

export default App
