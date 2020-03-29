import React from "react";
import ReactDOM from "react-dom";

import rawData from './records.csv';
rawData.sort(function(a, b){return 0.5 - Math.random()});

import App from './App';
import './style.css';

ReactDOM.render(<App rawData={rawData} />, document.getElementById("root"));
