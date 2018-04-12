import React from 'react';
import ReactDOM from 'react-dom';
import LevelBackersSection from './LevelBackersSection.jsx';

// 	'levels': [{'cutoffAmount': Number, 
				// 'name': String, 
				// 'description': String, 
				// 'includes': [String], 
				// 'estimatedDelivery': Date, 
				// 'shipsTo': String, 
				// 'numberOfBackers': Number, 
				// 'maxBackers': Number}],


class SingleCurrentLevel extends React.component {
	constructor(props){
		super(props);
		this.state = {
			currentLevels: [],
			limitedLevels: []
		}
	}

	render() {
		return (
			<div className="current-level">
				<h2 className="level-pledge-amount">Pledge $${this.props.level.cutoffAmount} or more</h2>
				<h3 className="level-name">{this.props.level.name}</h3>
				<p className="level-description">{this.props.level.description}</p>
				<div className="level-includes-section">
					<h4 className="level-additional-info-header">INCLUDES</h4>
					<ul>
						{this.props.level.includes.map(item => <li className="includes-list-item">item</li>)}
					</ul>
				</div>
				<div className="level-delivery-date-section">
					<h4 className="level-additional-info-header">ESTIMATED DELIVERY</h4>
					<div className="level-additional-info-item">{this.props.level.estimatedDelivery}</div>
				</div>
				<div className="level-delivery-region-section">
					<h4 className="level-additional-info-header">SHIPS TO</h4>
					<div className="level-additional-info-item">{this.props.level.shipsTo}</div>
				</div>
				<LevelBackersSection level={this.props.level} levelType={this.props.levelType}/>
			</div>
		)
	}
}

export default SingleCurrentLevel;