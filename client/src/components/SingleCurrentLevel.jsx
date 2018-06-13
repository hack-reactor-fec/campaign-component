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
		}
	}

	handleLevelClick = () => {
		// drop down additional information section and remove level highlight
		if (!this.state.orderInfoDisplay) {
			this.setState({orderInfoDisplay: true});
		}
	}

	render() {
		return (
			<div id={this.props.level.id} className={!this.state.orderInfoDisplay ? "single-current-level-master-container support-item" : "single-current-level-master-container support-item clicked"} onClick={this.handleLevelClick}>
				<div className={!this.state.orderInfoDisplay ? "pledge-hover-container" : "hide-area"}>
					<div className={!this.state.orderInfoDisplay ? "pledge-hover-content" : "hide-area"}>
						<p className={!this.state.orderInfoDisplay ? "select-this-reward" : "hide-area"}>Select this reward</p>
					</div>
				</div>
				<div className="content-container">
					<div className="single-current-level-subcontainer">
						<div className="level-pledge-amount">Pledge ${this.props.level.cutoffAmount} or more</div>
						<div className="level-name">{this.props.level.name}</div>
						<div className="level-description">{this.props.level.description}</div>
						<div className="level-additional-info-section">
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
						{this.state.orderInfoDisplay &&
							<div className="level-pledge-form">
								<ShippingSelect shipsTo={this.props.level.shipsTo} />
								<label className="pledge-label">
									Pledge amount
									<div className="label-separation">
										<PledgeInputArea 
											startingAmount={this.props.level.cutoffAmount.toString()} 
											levelClicked={this.state.orderInfoDisplay} 
											cutoffAmount={this.props.level.cutoffAmount.toString()}
											username={this.props.username}
											projectId={this.props.projectId}
											levelId={this.props.level.id}
											level={true}
										/>
									</div>
								</label>
							</div>
						}
					</div>
				</div>
			</div>
		)
	}
	
}

export default SingleCurrentLevel;