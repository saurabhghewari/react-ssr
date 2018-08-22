/*
* Here comes the interesting part of frontend view library React. To render it from server start you react application
*
*/

// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// User Defined Components
import App from "./components/App";

ReactDOM.render(
	<App initialData = { window.initialData } />,
	document.getElementById('root')
)