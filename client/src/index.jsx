import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import About from '../components/About.jsx';
import Support from '../components/Support.jsx';

class App extends React.component {
	constructor(props) {
		super(props)
		this.state = {
			projectId: this.props.projectId
		}
	}

	render() {
		return (
			<About projectId={this.state.projectId} />
			<Support projectId={this.state.projectId} />
		)
	}
}

$(document).ready(function() {
	ReactDOM.render(<App projectId="99"/>, document.getElementById('container'));
});

export default App;
