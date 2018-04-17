import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class PledgeBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			amount: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
	}

	handleChange(e) {
		this.setState({amount: e.target.value});
	}

	handleInputTextClick(e) {
		// display continue button
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
			<div id="pledge-component-container">
				<div id="pledge-component-subcontainer">
					<div id="pledge-header">Make a pledge without a reward</div>
					<div id="pledge-amount-container">
						<span id="pledge-amount-currency-symbol">$</span>
						<span><input type="text" id="pledge-amount-chosen" placeholder="Pledge any amount" onChange={this.handleChange} onClick={this.handleInputTextClick}/></span>
					</div>
					<button type="button" id="continue-button" onClick={this.handleContinueButtonClick}>Continue</button>
				</div>
			</div>
		)
	}
}

export default PledgeBox;