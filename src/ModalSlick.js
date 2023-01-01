import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Build 'images' var for development
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}


const imagesLarge = importAll(require.context('./img/600', false, /\.(jpe?g)$/));

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

  // HandleKeyPress
    // const handleKeyPress = e => {
    //     if (e.keyCode === 37) {
    //     // modalAction('prev');
    //     }

    //     // Forward
    //     if (e.keyCode === 39) {
    //     // modalAction('next');
    //     }
    // }

    // Keypress listen
    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyPress);

    //     return () => {
    //     document.removeEventListener('keydown', handleKeyPress);
    //     };

    // }, [modalId]);

    const modalList = modalId !== "" && data.map((record) => (<ModalCell key={record.id} record={record} />));

    return(
        <div className={modalId === "" ? 'modal hidden': 'modal'}>
            <div id="modal-table" className="modal-table">
                <div className="icon icon-close" onClick={() => handleRecordClick(0,"")}><i className="fa fa-times" aria-hidden="true"></i></div>
                <Slider ref={slider} {...sliderSettings}>
                    {modalList}
                </Slider>
            </div>
        </div>
    );
}

const ModalCell = ({ record, setModalId }) => {

    record.image = imagesLarge[`${record.id}.jpg`].default;

    if(record.genre) {
        record.genre = record.genre.replaceAll(", ", ' / ');
    }
  
    return(
        <div className="modal-cell">
            <div className="caption">
                <h2>{record.album}</h2>
                <h3>{record.artist}</h3>
                <p className="record__genre">{record.genre}</p>
                <p className="record__year">{record.year}</p>
                <p className="record__speed">{record.speed} rpm</p>
            </div>
            <img loading="lazy" alt='' src={record.image}></img>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

export default ModalSlick