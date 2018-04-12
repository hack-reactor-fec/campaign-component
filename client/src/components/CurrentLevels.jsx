import React from 'react';
import ReactDOM from 'react-dom';
import SingleCurrentLevel from './SingleCurrentLevel.jsx';

class CurrentLevels extends React.component {
	constructor(props){
		super(props);
		this.state = {
			currentLevels: [],
			limitedLevels: []
		}
	}

	componentDidMount() {
		let currentLevels = [];
		let limitedLevels = [];
		for (let i = 0; i < this.props.levels; i++) {
			if (this.props.levels[i].numberOfBackers / this.props.levels[i].maxBackers > 0.90) {
				limitedLevels.push(this.props.levels[i]);
			} else {
				currentLevels.push(this.props.levels[i]);
			}
		}
		this.setState({currentLevels: currentLevels, limitedLevels: limitedLevels});
	}

	render() {
		return (
			<div className="current-level-container">
				{this.props.levels.map(level => {
					if (currentLevels.filter(currentLevel => currentLevel.name === level.name).length > 0) {
						return <SingleCurrentLevel level={level} levelType="current" />
					} else {
						return <SingleCurrentLevel level={level} levelType="limited" />
					}
				})}
			</div>
		)
	}
}

export default CurrentLevels;