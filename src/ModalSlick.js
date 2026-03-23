import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import AudioPreview from "./AudioPreview";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3Cmask id='hole'%3E%3Crect width='200' height='200' fill='white' rx='5'/%3E%3Ccircle cx='100' cy='100' r='24' fill='black'/%3E%3C/mask%3E%3C/defs%3E%3Crect fill='%23e8e4df' width='200' height='200' rx='5' mask='url(%23hole)'/%3E%3Ccircle cx='100' cy='100' r='24' fill='none' stroke='%23d5d0c9' stroke-width='1'/%3E%3Cline x1='5' y1='0' x2='5' y2='200' stroke='%23d5d0c9' stroke-width='0.5'/%3E%3Cline x1='195' y1='0' x2='195' y2='200' stroke='%23d5d0c9' stroke-width='0.5'/%3E%3Cline x1='60' y1='15' x2='60' y2='185' stroke='%23ddd8d2' stroke-width='0.3' opacity='0.5'/%3E%3Cline x1='140' y1='15' x2='140' y2='185' stroke='%23ddd8d2' stroke-width='0.3' opacity='0.5'/%3E%3C/svg%3E";

const ModalSlick = ({ data, modalId, modalIndex, slider, handleRecordClick }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(modalIndex);

  // Sync activeSlideIndex when modal opens on a specific record
  useEffect(() => {
    if (modalId !== "") {
      setActiveSlideIndex(modalIndex);
    }
  }, [modalId, modalIndex]);

  var sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (index) => setActiveSlideIndex(index),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  const modalList =
    modalId !== "" &&
    data.map((record, index) => (
      <ModalCell
        key={record.id}
        record={record}
        isActive={modalId !== "" && index === activeSlideIndex}
        loadPreview={
          modalId !== "" &&
          Math.abs(index - activeSlideIndex) <= 1
        }
      />
    ));

  return (
    <div className={modalId === "" ? "modal hidden" : "modal"}>
      <div id="modal-table" className="modal-table">
        <div
          className="icon icon-close"
          onClick={() => handleRecordClick(0, "")}
        >
          <span className="material-symbols-rounded">close</span>
        </div>
        <Slider ref={slider} {...sliderSettings}>
          {modalList}
        </Slider>
      </div>
    </div>
  );
};

const ModalCell = ({ record, isActive, loadPreview }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const displayGenre = record.genre ? record.genre.replaceAll(", ", " / ") : "";
  const titleLen = record.album.length + record.artist.length;
  const sizeClass = titleLen > 90 ? "caption--xs" : titleLen > 70 ? "caption--sm" : titleLen > 50 ? "caption--md" : "";

  const captionClass = `caption${isPlaying ? " spinning" : ""}${sizeClass ? ` ${sizeClass}` : ""}`;

  return (
    <div className="modal-cell">
      <img
        loading="lazy"
        alt=""
        src={record.cover_image || placeholder}
        onError={(e) => (e.target.src = placeholder)}
      ></img>
      <div className="vinyl-wrapper">
        <div className="tonearm"></div>
        <div className="vinyl-shadow"></div>
        <div className={captionClass}>
          <h2>{record.album}</h2>
          <h3>{record.artist}</h3>
          <p className="record__genre">{displayGenre}</p>
          {record.year && record.year !== "0" && (
            <p className="record__year">{record.year}</p>
          )}
          {record.speed && <p className="record__speed">{record.speed} rpm</p>}
        </div>
        {loadPreview && (
          <AudioPreview
            artist={record.artist}
            album={record.album}
            isActive={isActive}
            onPlayStateChange={setIsPlaying}
          />
        )}
      </div>
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

export default ModalSlick;
