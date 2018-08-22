/*
* Fetch Data from Api. This is done if javascript in browser is disabled.
*
*/

// Dependancies
import axios from 'axios';
import React from 'react';
import config from './config';
import ReactDomServer from 'react-dom/server';

// User Defined Dependancies
import App from './src/components/App';

const getApiUrl = contestId => {
	if(contestId) {
		return `${config.serverUrl}/api/contests/${contestId}`
	}

	return `${config.serverUrl}/api/contests`;
}

const getIntialData = (contestId, apiData) => {
	if(contestId) {
		return {
			currentContestId: apiData.id,
			contests: {
				[apiData.id]: apiData
			}
		}
	}

	return {
		contests: apiData.contests
	}
}

const serverRender = (contestId) =>
	axios.get(getApiUrl(contestId)).then(response => {

		let initialData = getIntialData(contestId, response.data);
		return {
			initialMarkUp: ReactDomServer.renderToString(<App initialData={ initialData }/>),
			initialData
		}
	}).catch(e => {
		console.log(e);
	});

export default serverRender;