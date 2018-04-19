import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import LevelBackersSection from './LevelBackersSection.jsx';

function FullLevels(props) {
	return (
		<div id="full-levels-container">
			<h1 id="all-gone">All gone!</h1>
			{props.fullLevels.map(level => {
				return (
					<div className="full-level support-item">
						<div className="full-level-subcontainer">
							<h2 className="level-pledge-amount">Pledge ${level.cutoffAmount} or more</h2>
							<h3 className="level-name">{level.name}</h3>
							<p className="level-description">{level.description}</p>
							<div className="level-includes-section">
								<h4 className="level-additional-info-header">INCLUDES:</h4>
								<ul>
									{level.includes.map(item => <li className="includes-list-item">{item}</li>)}
								</ul>
							</div>
							<div className="level-extra-info-section">
								<div className="level-delivery-date-section">
									<span className="level-additional-info-header">ESTIMATED DELIVERY</span>
									<span className="level-additional-info-item">{moment(level.estimatedDelivery).format('MMM YYYY')}</span>
								</div>
								<div className="level-delivery-region-section">
									<span className="level-additional-info-header">SHIPS TO</span>
									<span className="level-additional-info-item">{level.shipsTo}</span>
								</div>
							</div>
						</div>
						<LevelBackersSection level={level} levelType="full"/>
					</div>
				)
			})}
		</div>
	)
}

export default FullLevels;