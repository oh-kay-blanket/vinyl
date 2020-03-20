import React from "react";
import ReactDOM from "react-dom";

import records from './records.csv';

import App from './App';
import './style.css';

ReactDOM.render(<App records={records} />, document.getElementById("root"));
