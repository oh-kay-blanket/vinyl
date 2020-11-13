import React, { useState, useEffect } from 'react';
import movingShadow from 'moving-shadow';

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
  const [sortDirection, setSortDirection] = useState('art-asc');
  const [modalId, setModalId] = useState('');
  const [gridView, setGridView] = useState(true);

  // Filter data
  // useEffect(() => { setData(handleFilter(data, filterType, filterInput)) }, [filterType, filterInput]);

  useEffect(() => {
    const fixedColor = "#665200"
    const settings = {
      shadowType:   "shadow", // "shadow", "dropShadow"
      selector:     ".title", // tag, class, or id to apply shadow to
      angle:        20, // height of view source. Should be between 10 - 100
      diffusion:    0, // blur-radius
      color:        "#997a00", // shadow-color
      xOffset:      -7, // X offset value, set to max fixedShadow x offset
      yOffset:      12, // Y offset value, set to max fixedShadow y offset
      fixedShadow:  `
        -1px 1px 0px ${fixedColor},
        -1px 2px 0px ${fixedColor},
        -2px 3px 0px ${fixedColor},
        -2px 4px 0px ${fixedColor},
        -3px 5px 0px ${fixedColor},
        -3px 6px 0px ${fixedColor},
        -4px 7px 0px ${fixedColor},
        -4px 8px 0px ${fixedColor},
        -5px 9px 0px ${fixedColor},
        -5px 10px 0px ${fixedColor},
        -6px 11px 0px ${fixedColor},
        -7px 12px 0px ${fixedColor}`,  // "5px 5px #555" to include an optional fixed shadow
    }
    movingShadow(settings);
  }, [])

  // Sort data
  // Run filter & sort
  data = handleFilter(data, filterType, filterInput);
  handleSort(data, sortDirection);

  // Listen for ESC key close modal
  buildModalFunctionality(setModalId);

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
