/*
* A state less component which will just render the list of array recieved from parent.
*/

//Dependancies
import React, { Component } from "react";
import PropTypes from "prop-types";

class ContestPreveiw extends Component {

	handleClick = () => {
		this.props.onClick(this.props.id);
	}

	render() {
		return (
			<div className="ContestPreview" onClick={ this.handleClick }>
				<div className="category-name">
					{ this.props.categoryName }
				</div>
				<div className="contest-name">
					{ this.props.contestName }
				</div>
			</div>
		)
	}
}

ContestPreveiw.propTypes = {
	id: PropTypes.number.isRequired,
	categoryName: PropTypes.string.isRequired,
	contestName: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

export default ContestPreveiw;