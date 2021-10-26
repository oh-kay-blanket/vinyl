import React, { useState, useEffect, useRef } from 'react';
import movingShadow from 'moving-shadow';

import Filter from './Filter';
import Sort from './Sort';
import Grid from './Grid';
import List from './List';
import ModalSlick from './ModalSlick';
import { handleFilter, handleSort, buildModalFunctionality } from './AppFunctions.js';

const App = ({ rawData }) => {

  let data = rawData.slice();

  // Set up state
  // const [data, setData] = useState(rawData.slice());
  const [filterType, setFilterType] = useState('artist');
  const [filterInput, setFilterInput] = useState('');
  const [sortDirection, setSortDirection] = useState('art-asc');
  const [modalId, setModalId] = useState('');
  const [gridView, setGridView] = useState(true);

  // Body no scroll on modal
  modalId === '' ? document.body.classList.remove('modal-open') : document.body.classList.add('modal-open');

  // Sort data
  // Run filter & sort
  data = handleFilter(data, filterType, filterInput);
  handleSort(data, sortDirection);

  // Listen for ESC key close modal
  buildModalFunctionality(setModalId);

  // Slick ref
  const slider = useRef(null);

  function handleRecordClick(index, id) {
      setModalId(id);
      slider.current.slickGoTo(index, true);
  }

  return (
    <>
      <h1 className="title">vinyl</h1>
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
          <div className={gridView && `active`} onClick={() => setGridView(true)}>
            <i className="fa fa-th-large"></i>
          </div>

          <div className={!gridView && `active`} onClick={() => setGridView(false)}>
            <i className="fa fa-list"></i>
          </div>
        </div>
      </div>
      <ModalSlick
        data={data}
        slider={slider}
        handleRecordClick={handleRecordClick}
        modalId={modalId}
      />
      {gridView ?
        <Grid
          data={data}
          handleRecordClick={handleRecordClick}
        /> :
        <List
          data={data}
          handleRecordClick={handleRecordClick}
        />
      }
    </>
  )
}

export default App;
