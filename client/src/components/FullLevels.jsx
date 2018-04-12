import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import LevelBackersSection from './LevelBackersSection.jsx';

class FullLevels extends React.component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="full-level-container">
				{this.props.levels.map(level => {
					return (
						<div className="full-level">
							<h2 className="level-pledge-amount">Pledge $${level.cutoffAmount} or more</h2>
							<h3 className="level-name">{level.name}</h3>
							<p className="level-description">{level.description}</p>
							<div className="level-includes-section">
								<h4 className="level-additional-info-header">INCLUDES</h4>
								<ul>
									{level.includes.map(item => <li className="includes-list-item">item</li>)}
								</ul>
							</div>
							<div className="level-delivery-date-section">
								<h4 className="level-additional-info-header">ESTIMATED DELIVERY</h4>
								<div className="level-additional-info-item">{moment(level.estimatedDelivery).format('MMM YYYY')}</div>
							</div>
							<div className="level-delivery-region-section">
								<h4 className="level-additional-info-header">SHIPS TO</h4>
								<div className="level-additional-info-item">{level.shipsTo}</div>
							</div>
							<LevelBackersSection level={level} levelType="full"/>
						</div>
					)
				})}
			</div>
		)
	}
}

export default FullLevels;