import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import PledgeInputArea from './PledgeInputArea.jsx';

class PledgeBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			amount: '',
			continueButtonDisplay: false,
			highlightInputArea: false
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
		this.handleInputTextClick = this.handleInputTextClick.bind(this);
	}

	handleClickOutside() {
		this.setState({highlightInputArea: false});
	}

	handleInputChange(e) {
		this.setState({amount: e.target.value});
	}

	handleInputTextClick(e) {
		// display continue button
		this.setState({continueButtonDisplay: true, highlightInputArea: true});
		// highlight input text area and currency div in green
		// when user clicks out of that input text area, have to unhighlight but leave continue button
	}

	handleContinueButtonClick() {
		let userNewBackedProject = {};
		userNewBackedProject.username = this.props.username;
		userNewBackedProject.projectId = this.props.projectId;
		userNewBackedProject.amount = $('#pledge-amount-chosen').val();
		axios.post('/users', userNewBackedProject)
		.then(response => {
			// what actually happens, is there a thank you message?
			$('#pledge-amount-chosen').val('');
		})
		.catch(err => {
			console.log('ERROR', err);
		})
	}

	render() {
		return (
			<div id="pledge-component-container" className="support-item">
				<div id="pledge-component-subcontainer">
					<div className="pledge-flex-div">
						<div id="pledge-header" className="pledge-component">Make a pledge without a reward</div>
					</div>
					<div className="pledge-flex-div">
						<PledgeInputArea handleInputChange={this.handleInputChange} handleInputTextClick={this.handleInputTextClick} handleClickOutside={this.handleClickOutside} highlightInputArea={this.state.highlightInputArea}/>
					</div>
					<div className="pledge-flex-div">
						<button type="button" id="continue-button" onClick={this.handleContinueButtonClick} className={this.state.continueButtonDisplay ? 'pledge-component display-button' : 'pledge-component hide-button'}>Continue</button>
					</div>
				</div>
			</div>
		)
	}
}

export default PledgeBox;