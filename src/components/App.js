/*
* App Component
*
*/


// Dependencies
import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// User Defined Components
import Header from './Header';
import Contest from './Contest';
import ContestList from './ContestList';
import * as api from "../api";

// Wrapper for Browser history management.
const pushState = (obj, url) => window.history.pushState(obj, '', url); 
const onpopState = handler => {
	window.onpopstate = handler;
}

class App extends Component {
	
	static propTypes = {
		initialData: PropTypes.object.isRequired
	}

	state = this.props.initialData

	componentDidMount() {
		onpopState((event) => {
			this.setState({
				currentContestId: event.state.currentContestId,
			});
		});
	}

	componentWillUnmount() {
		onpopState(null);
	}

	fetchContest = (contestId) => {
		pushState(
			{ currentContestId: contestId },
			`/contests/${contestId}`
		);

		api.fetchContest(contestId).then(contest => {
			this.setState({
				currentContestId: contest.id,
				contests: {
					...this.state.contests,
					[contest.id]: contest
				}
			});
		});
	};

	fetchContestList = () => {
		pushState(
			{ currentContestId: null },
			`/`
		);

		api.fetchContestList().then(contests => {
			this.setState({
				currentContestId: null,
				contests: contests
			});
		});
	};

	pageHeader() {
		if(this.state.currentContestId) {
			return this.currentContest().contestName;
		}

		return 'Naming Contests';
	}

	currentContest() {
		return this.state.contests[this.state.currentContestId];
	}

	currentContent() {
		if(this.state.currentContestId) {
			return <Contest 
				contestListClick={ this.fetchContestList }
				{ ...this.currentContest() } />
		}

		return <ContestList onContestClick={ this.fetchContest } contests={ this.state.contests } />
	}

	render() {
		return (
			<div className="App">
				<Header message={ this.pageHeader() } />
				{ this.currentContent() }
			</div>
		)
	}
}

export default App;