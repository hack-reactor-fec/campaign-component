import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class About extends React.component {
	constructor(props){
		super(props);
		this.state = {
			aboutInfo: ''
		}
	}

	componentDidMount() {
		axios.get(`/about/${this.props.projectId}`)
		.then(result => {
			this.setState({aboutInfo: result});
		})
		.catch(err => {
			console.log('ERROR', err);
		})
	}

	render() {
		return (
			<h1 id="About" className="section-header">About</h1>
			<div>{this.state.aboutInfo}</div>
		)
	}
}

export default About;