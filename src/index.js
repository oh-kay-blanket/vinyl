import React from "react";
import ReactDOM from "react-dom";

import ddata from './records.json';

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

const rawData = shuffle(ddata);
// rawData.sort(function(a, b){return 0.5 - Math.random()});

import App from './App';
import './sass/style.scss';

ReactDOM.render(<App rawData={rawData} />, document.getElementById("root"));
