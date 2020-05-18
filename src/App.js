import React, { useState, useEffect } from 'react';

import Filter from './Filter';
import Sort from './Sort';
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
      <div className='functions-box'>
        <Filter
          filterType={filterType}
          setFilterType={setFilterType}
          filterInput={filterInput}
          setFilterInput={setFilterInput}
        />
        <Sort
          data={data}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
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
