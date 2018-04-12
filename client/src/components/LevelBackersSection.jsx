import React from 'react';
import ReactDOM from 'react-dom';

// 	'levels': [{'cutoffAmount': Number, 
				// 'name': String, 
				// 'description': String, 
				// 'includes': [String], 
				// 'estimatedDelivery': Date, 
				// 'shipsTo': String, 
				// 'numberOfBackers': Number, 
				// 'maxBackers': Number}],


class LevelBackersSection extends React.component {
	constructor(props){
		super(props);
		this.state = {
			currentLevels: [],
			limitedLevels: []
		}
	}

	render() {
		if (this.props.levelType === 'current') {
			if (this.props.level.numberOfBackers === 1) {
				return (
					<div className="current-level-backers-section">
						<div className="backers-line">
							{this.props.level.numberOfBackers} backer
						</div>
					</div>
				)
			} else {
				return (
					<div className="current-level-backers-section">
						<div className="backers-line">
							{this.props.level.numberOfBackers} backers
						</div>
					</div>
				)
			}
		} else {
			if (this.props.level.numberOfBackers === 1) {
				return (
					<div className="limited-level-backers-section">
						<div className="limited-backers-line">
							Limited ({this.props.level.maxBackers - this.props.level.numberOfBackers} of {this.props.maxBackers})
						</div>
						<div className="backers-line">
							{this.props.level.numberOfBackers} backer
						</div>
					</div>
				)
			} else {
				return (
					<div className="limited-level-backers-section">
						<div className="limited-backers-line">
							Limited ({this.props.level.maxBackers - this.props.level.numberOfBackers} of {this.props.maxBackers})
						</div>
						<div className="backers-line">
							{this.props.level.numberOfBackers} backers
						</div>
					</div>
				)
			}
		}
	}
}

export default LevelBackersSection;