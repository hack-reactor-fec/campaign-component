import React from 'react';
import ReactDOM from 'react-dom';
import CurrentLevels from './CurrentLevels.jsx';
import FullLevels from './FullLevels.jsx';

// 	'levels': [{'cutoffAmount': Number, 
				// 'name': String, 
				// 'description': String, 
				// 'includes': [String], 
				// 'estimatedDelivery': Date, 
				// 'shipsTo': String, 
				// 'numberOfBackers': Number, 
				// 'maxBackers': Number}],


class Levels extends React.component {
	constructor(props){
		super(props);
		this.state = {
			currentLevels: [],
			fullLevels: []
		}
	}

	componentDidMount() {
		let currentLevels = [];
		let fullLevels = [];
		for (let i = 0; i < this.props.levels; i++) {
			if (this.props.levels[i].numberOfBackers === this.props.levels[i].maxBackers) {
				fullLevels.push(this.props.levels[i]);
			} else {
				currentLevels.push(this.props.levels[i]);
			}
		}
		this.setState({currentLevels: currentLevels, fullLevels: fullLevels});
	}

	render() {
		return (
			<div className="levels">
				<CurrentLevels levels={this.state.currentLevels}/>
				<FullLevels levels={this.state.fullLevels}/>
			</div>
		)
	}
}

export default Levels;