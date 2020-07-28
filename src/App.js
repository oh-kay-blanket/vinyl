import React, { useState, useEffect } from 'react';

import Filter from './Filter';
import Sort from './Sort';
import Grid from './Grid';
import List from './List';
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
  const [gridView, setGridView] = useState(true);

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
      <h1 class="title">vinyl</h1>
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
        <div className="display-select">
          <i className={gridView ? `fa fa-th-large` : `fa fa-th-large active`} onClick={() => setGridView(true)}></i>
          <i className={gridView ? `fa fa-list active` : `fa fa-list`}  onClick={() => setGridView(false)}></i>
        </div>
      </div>
      {gridView ?
        <Grid
          data={data}
          modalId={modalId}
          setModalId={setModalId}
        /> :
        <List
          data={data}
          modalId={modalId}
          setModalId={setModalId}
        />
      }

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
