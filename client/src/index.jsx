import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import About from './components/About.jsx';
import Support from './components/Support.jsx';

class App extends React.component {
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
				<About projectId={this.state.projectId} />
				<Support projectId={this.state.projectId} />
			</div>
		)
	}
}

// for now use project 99 and user Audrey28
$(document).ready(function() {
	ReactDOM.render(<App projectId="99" username="Audrey28"/>, document.getElementById('container'));
});

export default App;
