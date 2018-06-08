import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import About from './About.jsx';
import Support from './Support.jsx';

class Campaign extends Component {
	constructor(props) {
		super(props)
		this.state = {
			projectId: this.props.projectId,
			username: this.props.username
		}
	}

	render() {
		return (
			<div id="app-container">
				<About projectId={this.props.projectId} />
				<Support projectId={this.props.projectId} username={this.props.username} />
			</div>
		)
	}
}

export default Campaign;
