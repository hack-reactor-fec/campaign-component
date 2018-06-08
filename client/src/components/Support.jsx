import React, { Component } from 'react';
import axios from 'axios';
import Levels from './Levels.jsx';
import PledgeBox from './PledgeBox.jsx';

class Support extends Component {
	constructor(props){
		super(props);
		this.state = {
			allCurrentLevels: [],
			currentLevels: [],
			limitedLevels: [],
			fullLevels: []
		}
	}

	fetchLevels = () => {
		let context = this;
		// fetch information for all of the pledge support levels for this project
		axios.get(`http://localhost:3003/levels/${this.props.projectId}`)
		.then(results => {
			// handle sorting when levels are fetched so all levels can be stored together in a single field in the database
			// otherwise there would be additional database read/write operations if current levels became limited or limited became full
			// and they were stored as separate fields 
			let levels = results.data;
			let updatedAllCurrentLevels = [];
			let updatedCurrentLevels = [];
			let updatedLimitedLevels = [];
			let updatedFullLevels = [];
			for (let i = 0; i < levels.length; i++) {
				if (levels[i].numberOfBackers === levels[i].maxBackers) {
					updatedFullLevels.push(levels[i]);
				} else if (levels[i].numberOfBackers / levels[i].maxBackers > 0.90) {
					// limited corresponds to less than 10% availability
					updatedAllCurrentLevels.push(levels[i]);
					updatedLimitedLevels.push(levels[i]);
				} else {
					updatedAllCurrentLevels.push(levels[i]);
					updatedCurrentLevels.push(levels[i]);
				}
			}
			context.setState({
				allCurrentLevels: updatedAllCurrentLevels, 
				currentLevels: updatedCurrentLevels, 
				limitedLevels: updatedLimitedLevels, 
				fullLevels: updatedFullLevels
			});
		})
		.catch(err => {
			// console.log('ERROR IN SUPPORT COMPONENT', err);
		})
	}

	componentDidMount() {
		this.fetchLevels();
	}

	render() {
		return (
			<div id="support-master-container">
				<div id="support-container">
					<h1 className="section-header">Support</h1>
					<PledgeBox projectId={this.props.projectId} username={this.props.username} />
					<Levels fetchLevels={this.fetchLevels} projectId={this.props.projectId} username={this.props.username} allCurrentLevels={this.state.allCurrentLevels} currentLevels={this.state.currentLevels} limitedLevels={this.state.limitedLevels} fullLevels={this.state.fullLevels} />
				</div>
			</div>
		)
	}
}

export default Support;