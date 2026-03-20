import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";

import Filter from "./Filter";
import Sort from "./Sort";
import Grid from "./Grid";
import ModalSlick from "./ModalSlick";
import {
  handleFilter,
  handleSort,
  buildModalFunctionality,
} from "./AppFunctions.js";

const App = ({ rawData }) => {
  let data = rawData.slice();

  // Set up state
  // const [data, setData] = useState(rawData.slice());
  const [filterType, setFilterType] = useState("artist");
  const [filterInput, setFilterInput] = useState("");
  const [sortDirection, setSortDirection] = useState("alb-rnd");
  const [modalId, setModalId] = useState("");
  const [modalIndex, setModalIndex] = useState(0);
  const [currentItems, setCurrentItems] = useState(data);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 75;

  // Body no scroll on modal
  modalId === ""
    ? document.body.classList.remove("modal-open")
    : document.body.classList.add("modal-open");

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
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Listen for ESC key close modal
  buildModalFunctionality(setModalId);

  // Slick ref
  const slider = useRef(null);

  // Open Modal
  function handleRecordClick(index, id) {
    setModalId(id);
    setModalIndex(index);
    slider.current.slickGoTo(index, true);
  }

  return (
    <>
      <div className="title-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            <filter id="goo-sm">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1.5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -3"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            <filter id="goo-md">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="2.5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            <filter id="goo-lg">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <div className="title-liquid">
          <h1 className="title">VINYL</h1>
        </div>
      </div>
      <div className="functions-box">
        <Sort
          data={data}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        <Filter
          filterType={filterType}
          setFilterType={setFilterType}
          filterInput={filterInput}
          setFilterInput={setFilterInput}
        />
      </div>

      <ModalSlick
        data={currentItems}
        slider={slider}
        handleRecordClick={handleRecordClick}
        modalId={modalId}
        modalIndex={modalIndex}
      />
      <Grid data={currentItems} handleRecordClick={handleRecordClick} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="material-symbols-rounded">chevron_right</span>
        }
        onPageChange={handlePaginationClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={
          <span className="material-symbols-rounded">chevron_left</span>
        }
        renderOnZeroPageCount={null}
        className="pagination"
      />
      <a href="https://ohkaycomputer.com" className="footer-link">
        Oh, Kay
      </a>
    </>
  );
};

export default App;
