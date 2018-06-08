import React, { Component } from 'react';
import axios from 'axios';

class About extends Component {
	constructor(props){
		super(props);
		this.state = {
			aboutInfo: ''
		}
	}

	componentDidMount() {
		let context = this;
		// fetch data for the about section for this project
		axios.get(`http://localhost:3003/about/${this.props.projectId}`)
		.then(result => {
			context.setState({aboutInfo: result.data});
		})
		.catch(err => {
			// console.log('ERROR', err);
		})
	}

	render() {
		return (
			<div id="about-master-container">
				<div id="about-container">
					<h1 className="section-header">About</h1>
					<div id="about-info">{this.state.aboutInfo}</div>
				</div>
			</div>
		)
	}
}

export default About;