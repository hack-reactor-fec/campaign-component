import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class About extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			aboutInfo: ''
		}
	}

	componentDidMount() {
		axios.get(`/about/${this.props.projectId}`)
		.then(result => {
			this.setState({aboutInfo: result.data});
		})
		.catch(err => {
			console.log('ERROR', err);
		})
	}

	render() {
		return (
			<div id="about-container">
				<h1 id="about-header" className="section-header">About</h1>
				<div>{this.state.aboutInfo}</div>
			</div>
		)
	}
}

export default About;