import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Levels from './Levels.jsx';
import PledgeBox from './PledgeBox.jsx';

class Support extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			allCurrentLevels: [],
			currentLevels: [],
			limitedLevels: [],
			fullLevels: []
		}
		this.fetchLevels = this.fetchLevels.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	fetchLevels() {
		let context = this;
		axios.get(`http://54.209.149.1:80/levels/${this.props.projectId}`)
		.then(results => {
			let levels = results.data;
			let updatedAllCurrentLevels = [];
			let updatedCurrentLevels = [];
			let updatedLimitedLevels = [];
			let updatedFullLevels = [];
			for (let i = 0; i < levels.length; i++) {
				if (levels[i].numberOfBackers === levels[i].maxBackers) {
					updatedFullLevels.push(levels[i]);
				} else if (levels[i].numberOfBackers / levels[i].maxBackers > 0.90) {
					updatedAllCurrentLevels.push(levels[i]);
					updatedLimitedLevels.push(levels[i]);
				} else {
					updatedAllCurrentLevels.push(levels[i]);
					updatedCurrentLevels.push(levels[i]);
				}
			}
			context.setState({allCurrentLevels: updatedAllCurrentLevels, currentLevels: updatedCurrentLevels, limitedLevels: updatedLimitedLevels, fullLevels: updatedFullLevels});
		})
		.catch(err => {
			console.log('ERROR IN SUPPORT COMPONENT', err);
			console.log(err);
		})
	}

	componentDidMount() {
		let context = this;
		axios.get(`http://54.209.149.1:80/levels/${this.props.projectId}`)
		.then(results => {
			let levels = results.data;
			let updatedAllCurrentLevels = [];
			let updatedCurrentLevels = [];
			let updatedLimitedLevels = [];
			let updatedFullLevels = [];
			for (let i = 0; i < levels.length; i++) {
				if (levels[i].numberOfBackers === levels[i].maxBackers) {
					updatedFullLevels.push(levels[i]);
				} else if (levels[i].numberOfBackers / levels[i].maxBackers > 0.90) {
					updatedAllCurrentLevels.push(levels[i]);
					updatedLimitedLevels.push(levels[i]);
				} else {
					updatedAllCurrentLevels.push(levels[i]);
					updatedCurrentLevels.push(levels[i]);
				}
			}
			context.setState({allCurrentLevels: updatedAllCurrentLevels, currentLevels: updatedCurrentLevels, limitedLevels: updatedLimitedLevels, fullLevels: updatedFullLevels});
		})
		.catch(err => {
			console.log('ERROR IN SUPPORT COMPONENT', err);
			console.log(err);
		})
	}

	render() {
		return (
			<div id="support-master-container">
				<div id="support-container">
					<h1 id="support-header" className="section-header">Support</h1>
					<div id="support-components-container">
							<PledgeBox projectId={this.props.projectId} username={this.props.username} />
							<Levels fetchLevels={this.fetchLevels} allCurrentLevels={this.state.allCurrentLevels} currentLevels={this.state.currentLevels} limitedLevels={this.state.limitedLevels} fullLevels={this.state.fullLevels} />
					</div>
				</div>
			</div>
		)
	}
}

export default Support;