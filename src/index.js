import React from "react";
import ReactDOM from "react-dom";

import data from './records.csv';

import App from './App';
import './style.css';

ReactDOM.render(<App data={data} />, document.getElementById("root"));
