import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import LevelBackersSection from './LevelBackersSection.jsx';

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
			<div className="single-current-level-container">
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
					<div className="level-additional-info-item">{moment(this.props.level.estimatedDelivery).format('MMM YYYY')}</div>
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