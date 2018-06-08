import React, { Component } from 'react';
import moment from 'moment';
import LevelBackersSection from './LevelBackersSection.jsx';
import PledgeInputArea from './PledgeInputArea.jsx';
import ShippingSelect from './ShippingSelect.jsx';

class SingleCurrentLevel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderInfoDisplay: false,
			levelHover: false
		}
	}

	handleLevelClick = () => {
		// drop down additional information section and remove level highlight
		this.setState({orderInfoDisplay: true, levelHover: false});
	}

	handleMouseEnter = () => {
		if (!this.state.orderInfoDisplay) {
			this.setState({levelHover: true})
		}
	}

	handleMouseLeave = () => {
		if (!this.state.orderInfoDisplay) {
			this.setState({levelHover: false})
		}
	}

	render() {
		return (
			<div id={this.props.level.id} className="single-current-level-master-container support-item" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleLevelClick}>
				<div className="content-container">
					<div className="single-current-level-subcontainer">
						<div className="level-pledge-amount">Pledge ${this.props.level.cutoffAmount} or more</div>
						<div className="level-name">{this.props.level.name}</div>
						<p className="level-description">{this.props.level.description}</p>
						<div>
							<div className="level-additional-info-header">INCLUDES:</div>
							<ul className="level-includes-list">
								{this.props.level.includes.map(item => <li key={this.props.level.id + '' + item} className="includes-list-item">{item}</li>)}
							</ul>
						</div>
						<div className="level-extra-info-section">
							<div className="level-delivery-date-section">
								<span className="level-additional-info-header">ESTIMATED DELIVERY</span>
								<span className="level-additional-info-item">{moment(this.props.level.estimatedDelivery).format('MMM YYYY')}</span>
							</div>
							<div className="level-delivery-region-section">
								<span className="level-additional-info-header">SHIPS TO</span>
								<span className="level-additional-info-item">{this.props.level.shipsTo}</span>
							</div>
						</div>
						<LevelBackersSection level={this.props.level} levelType={this.props.levelType} />
						<div className={this.state.orderInfoDisplay ? 'level-pledge-form' : 'level-pledge-form hide-area'}>
							<ShippingSelect shipsTo={this.props.level.shipsTo} />
							<label className="pledge-label">
								Pledge amount
								<div className="label-separation">
									<PledgeInputArea 
										startingAmount={this.props.level.cutoffAmount} 
										levelClicked={this.state.orderInfoDisplay} 
										cutoffAmount={this.props.level.cutoffAmount}
										username={this.props.username}
										projectId={this.props.projectId}
										levelId={this.props.level.id}
										level={true}
									/>
								</div>
							</label>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

export default SingleCurrentLevel;