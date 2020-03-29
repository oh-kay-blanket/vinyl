import React, { useState, useEffect } from 'react';

import FunctionsBox from './filter-sort';
import GridBox from './Grid';
import Modal from './Modal';
import { handleFilter, handleSort, buildModalFunctionality } from './AppFunctions.js';

const App = ({ rawData }) => {

  let data = rawData.slice();

  // Set up state
  // const [data, setData] = useState(rawData.slice());
  const [filterType, setFilterType] = useState('artist');
  const [filterInput, setFilterInput] = useState('');
  const [sortDirection, setSortDirection] = useState('alb-rnd');
  const [modalId, setModalId] = useState('');

  // Filter data
  // useEffect(() => { setData(handleFilter(data, filterType, filterInput)) }, [filterType, filterInput]);

  // Sort data
  // Run filter & sort
  data = handleFilter(data, filterType, filterInput);
  handleSort(data, sortDirection);

  // Listen for ESC key close modal
  buildModalFunctionality(setModalId);

  return (
    <>
      <h1>vinyl</h1>
      <FunctionsBox
        data={data}
        filterType={filterType}
        setFilterType={setFilterType}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <GridBox
        data={data}
        modalId={modalId}
        setModalId={setModalId}
      />
      {modalId !== '' &&
        <Modal
          data={data}
          modalId={modalId}
          setModalId={setModalId}
        />
      }

    </>
  )
}

export default App;
