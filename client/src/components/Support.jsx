import React from 'react';
import ReactDOM from 'react-dom';
import Levels from './Level.jsx';
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
			<h1 id="Support" className="section-header">Support</h1>
			<PledgeBox projectId={this.props.projectId} />
			<Levels levels={this.state.levels} />
		)
	}
}

export default Support;