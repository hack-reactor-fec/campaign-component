import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import LevelBackersSection from './LevelBackersSection.jsx';

function SingleCurrentLevel(props) {
	return (
		<div className="single-current-level-container support-item">
			<div className="single-current-level-subcontainer">
				<h2 className="level-pledge-amount">Pledge ${props.level.cutoffAmount} or more</h2>
				<h3 className="level-name">{props.level.name}</h3>
				<p className="level-description">{props.level.description}</p>
				<div className="level-includes-section">
					<h4 className="level-additional-info-header">INCLUDES:</h4>
					<ul>
						{props.level.includes.map(item => <li className="includes-list-item">{item}</li>)}
					</ul>
				</div>
				<div className="level-extra-info-section">
					<div className="level-delivery-date-section">
						<span className="level-additional-info-header">ESTIMATED DELIVERY</span>
						<span className="level-additional-info-item">{moment(props.level.estimatedDelivery).format('MMM YYYY')}</span>
					</div>
					<div className="level-delivery-region-section">
						<span className="level-additional-info-header">SHIPS TO</span>
						<span className="level-additional-info-item">{props.level.shipsTo}</span>
					</div>
				</div>
				<LevelBackersSection level={props.level} levelType={props.levelType}/>
			</div>
		</div>
	)
}

export default SingleCurrentLevel;