import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23ccc' stroke-width='2'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='15' fill='%23ccc'/%3E%3Ccircle cx='100' cy='100' r='5' fill='%23bbb'/%3E%3C/svg%3E";

const ModalSlick = ({ data, modalId, slider, handleRecordClick }) => {

    var sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                infinite: true,
                arrows: false,
                }
            },
        ]
    }

    const modalList = modalId !== "" && data.map((record) => (<ModalCell key={record.id} record={record} />));

    return(
        <div className={modalId === "" ? 'modal hidden': 'modal'}>
            <div id="modal-table" className="modal-table">
                <div className="icon icon-close" onClick={() => handleRecordClick(0,"")}><span className="material-symbols-rounded">close</span></div>
                <Slider ref={slider} {...sliderSettings}>
                    {modalList}
                </Slider>
            </div>
        </div>
    );
}

const ModalCell = ({ record }) => {

    const displayGenre = record.genre ? record.genre.replaceAll(", ", ' / ') : '';

    return(
        <div className="modal-cell">
            <div className="caption">
                <h2>{record.album}</h2>
                <h3>{record.artist}</h3>
                <p className="record__genre">{displayGenre}</p>
                <p className="record__year">{record.year}</p>
                <p className="record__speed">{record.speed} rpm</p>
            </div>
            <img loading="lazy" alt='' src={record.cover_image || placeholder} onError={e => e.target.src = placeholder}></img>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick} />
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick} />
    );
  }

export default ModalSlick
