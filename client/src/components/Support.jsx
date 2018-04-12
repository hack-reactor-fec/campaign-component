import React from 'react';
import ReactDOM from 'react-dom';
import Levels from './Levels.jsx';
import PledgeBox from './PledgeBox.jsx';

class Support extends React.component {
	constructor(props){
		super(props);
		this.state = {
			levels: []
		}
	}

	componentDidMount() {
		axios.get(`/levels/${this.props.projectId}`)
		.then(results => {
			this.setState({levels: JSON.parse(results)});
		})
		.catch(err => {
			console.log('ERROR', err);
		})
	}

	render() {
		return (
			<div id="support-container">
				<h1 id="support-header" className="section-header">Support</h1>
				<div id="support-components-container">
						<PledgeBox projectId={this.props.projectId} username={this.props.username} />
						<Levels levels={this.state.levels} />
				</div>
			</div>
		)
	}
}

export default Support;