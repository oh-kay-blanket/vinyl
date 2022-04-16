import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';

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
  const [sortDirection, setSortDirection] = useState('rnd');
  const [modalId, setModalId] = useState('');
  const [gridView, setGridView] = useState(true);
  const [currentItems, setCurrentItems] = useState(data);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 75;

  // Body no scroll on modal
  modalId === '' ? document.body.classList.remove('modal-open') : document.body.classList.add('modal-open');

  // Filter & sort
  data = handleFilter(data, filterType, filterInput);
  handleSort(data, sortDirection);
  
  // Pagination
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  useEffect(() => {
    setItemOffset(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [sortDirection, filterType, filterInput]);

  // Invoke when user click to request another page.
  const handlePaginationClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // Listen for ESC key close modal
  buildModalFunctionality(setModalId);

  // Slick ref
  const slider = useRef(null);
  
  // Open Modal
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
        data={currentItems}
        slider={slider}
        handleRecordClick={handleRecordClick}
        modalId={modalId}
      />
      {gridView ?
        <Grid
          data={currentItems}
          handleRecordClick={handleRecordClick}
        /> :
        <List
          data={currentItems}
          handleRecordClick={handleRecordClick}
        />
      }
      <ReactPaginate
        breakLabel="..."
        nextLabel="▶"
        onPageChange={handlePaginationClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="◀"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </>
  )
}

export default App;
