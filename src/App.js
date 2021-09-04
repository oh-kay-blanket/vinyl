import React, { useState, useEffect, useRef } from 'react';
import movingShadow from 'moving-shadow';

import Filter from './Filter';
import Sort from './Sort';
import Grid from './Grid';
import List from './List';
import Loading from './Loading';
import ModalSlick from './ModalSlick';
import { handleFilter, handleSort, buildModalFunctionality } from './AppFunctions.js';

import getReleases from './DiscogsAPI';

const App = () => {

    // Set up state
    const [data, setData] = useState([]);
    const [filterType, setFilterType] = useState('artist');
    const [filterInput, setFilterInput] = useState('');
    const [sort, setSort] = useState('sort=artist&sort_order=asc');
    const [modalId, setModalId] = useState('');
    const [gridView, setGridView] = useState(true);
    const [loading, setLoading] = useState(true);

    // Filter data
    // useEffect(() => { setData(handleFilter(data, filterType, filterInput)) }, [filterType, filterInput]);

    // Set moving shadow
    useEffect(() => {
        const fixedColor = "#665200"
        const settings = {
            shadowType:     "shadow", // "shadow", "dropShadow"
            selector:         ".title", // tag, class, or id to apply shadow to
            angle:                20, // height of view source. Should be between 10 - 100
            diffusion:        0, // blur-radius
            color:                "#997a00", // shadow-color
            xOffset:            -7, // X offset value, set to max fixedShadow x offset
            yOffset:            12, // Y offset value, set to max fixedShadow y offset
            fixedShadow:    `
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
                -7px 12px 0px ${fixedColor}`,    // "5px 5px #555" to include an optional fixed shadow
        }
        movingShadow(settings);
    }, [])

    // DISCOGS
    useEffect(() => {
        setLoading(true);

        fetch(`https://api.discogs.com/users/misterblanket/collection/folders/0/releases?${sort}&page=1&per_page=1`, {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'User-Agent': 'misterblanket-vinyl-app'
        })
        .then(response => response.json())
        .then(response => {
			setData(response.releases);
        })
        .catch(error => {
			console.error(error);
        })
        .finally(() => {
			setLoading(false);
        })
    }, [sort]);

    console.log(data);

    // Body no scroll on modal
    modalId === '' ? document.body.classList.remove('modal-open') : document.body.classList.add('modal-open');

    // Sort data
    // Run filter & sort
    // data = handleFilter(data, filterType, filterInput);
    // handleSort(data, sortDirection);

    // Listen for ESC key close modal
    buildModalFunctionality(setModalId);

    // Slick ref
    const slider = useRef(null);

    // Click on record
    function handleRecordClick(index, id) {
		setModalId(id);
		slider.current.slickGoTo(index, true);
    }

    // Keypress listen
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };

    }, [modalId]);

    // Arrow Keys
    const handleKeyPress = e => {
        if (e.keyCode === 37) {
            slider.current.slickPrev();
        }

        // Forward
        if (e.keyCode === 39) {
            slider.current.slickNext();
        }
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
                    sort={sort}
                    setSort={setSort}
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
            {loading ? <Loading /> :
                gridView ?
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