import React, { Component } from 'react';
import axios from 'axios';

class PledgeInputArea extends Component {
	constructor(props){
		super(props);
		this.state = {
			amount: '',
			minAmount: '',
			badInput: false,
			activeInputArea: false,
			inputClicked: false,
			hoverInputArea: false
		}
	}

	componentDidMount() {
		if (this.props.level && this.props.levelClicked) {
			console.log('textInput', this[`node${this.props.levelId}`].querySelector('input'));
			this[`node${this.props.levelId}`].querySelector('input').focus();
			let context = this;
			this.setState({activeInputArea: true, amount: context.props.startingAmount, minAmount: context.props.startingAmount});
		} else {
			let context = this;
			this.setState({amount: context.props.startingAmount, minAmount: '1'});
		}
	}

	componentWillMount() {
		document.addEventListener('mousedown', this.handleClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

	handleInputChange = (e) => {
		// update amount whenever value is changed in input text
		let badInput = false;
		let originalInput = e.target.value;
		let input = e.target.value.trim();
		// check for empty string before running isNaN
		if (!originalInput) {
			badInput = true;
		// filter out non-numbers
		} else if (isNaN(input)) {
			badInput = true;
		} else {
			// check for valid currency decimal values
			if (input.includes('.') && input.split('.')[1].length > 2) {
				badInput = true;
			// make sure amount is greater than minAmount (could add check to ensure not too large/small, overflow)
			} else if (parseFloat(input) < parseFloat(this.state.minAmount)) {
				badInput = true;
			}
		}
		this.setState({amount: originalInput, badInput: badInput});
	}

	handleInputTextClick = (e) => {
		// display continue button
		// highlight input text area and currency div in green
		this.setState({activeInputArea: true, inputClicked: true});
	}

	handleClickOutside = () => {
		// when user clicks out of that input text area, have to unhighlight
		let cleanedInput = this.state.amount.trim();
		this.setState({amount: cleanedInput, activeInputArea: false});
	}

	handleClick = (e) => {
		console.log('click target', e.target);
		console.log('node', this.node);
		if (this.props.pledgeBox) {
			if (this.node.contains(e.target)) {
				return;
			}
		} else {
			if (this[`node${this.props.levelId}`].querySelector('input').contains(e.target)) {
				return;
			}
		}
		this.handleClickOutside();
	}

	handleInputTextMouseEnter = (e) => {
		// highlight input text area
		this.setState({hoverInputArea: true});
	}

	handleInputTextMouseLeave = (e) => { 
		// stop highlighting input text area
		this.setState({hoverInputArea: false});
	}

	handleContinueButtonClick = (e) => {
		let context = this;
		if (this.state.amount && ((!this.props.cutoffAmount) || (this.state.amount >= this.props.cutoffAmount))) {
			let userNewBackedProject = {};
			userNewBackedProject.username = this.props.username;
			userNewBackedProject.projectId = this.props.projectId;
			userNewBackedProject.amount = this.state.amount;
			axios.post('http://localhost:3003/users', userNewBackedProject)
			.then(response => {
				if (this.props.levelId) {
					return axios.post(`http://localhost:3003/${this.props.projectId}/${this.props.levelId}/${this.state.amount}`)
				} else {
					return axios.post(`http://localhost:3003/${this.props.projectId}/${this.state.amount}`)
				}	
			})
			.then(response => {
				context.setState({amount: ''});
				this.props.fetchLevels();
			})
			.catch(err => {
				// console.log('ERROR', err);
			})
		}
	}


	render() {
		return (
			<div ref={ node => {
				this.props.level ? this[`node${this.props.levelId}`] = node : this.node = node; 
			}}>
				<div className="pledge-amount-container" onMouseEnter={this.handleInputTextMouseEnter} onMouseLeave={this.handleInputTextMouseLeave}>
						<span className={
							(this.state.activeInputArea || this.state.hoverInputArea) 
							? 'pledge-amount-currency-symbol highlight' 
							: 'pledge-amount-currency-symbol no-highlight'
							}>$</span>
						<input type="text" 
							className={
								(this.state.activeInputArea || this.state.hoverInputArea) 
								? ' pledge-amount-chosen highlight' 
								: 'pledge-amount-chosen no-highlight'} 
							placeholder={(this.props.pledgeBox && !this.state.amount) ? 'Pledge any amount' : ''}
							value={this.state.amount} 
							onChange={this.handleInputChange} 
							onClick={this.handleInputTextClick}
						/>
				</div>
				<button type="button" className={
					this.state.badInput
					? (this.props.level 
						? "continue-button invalid-continue-button extra-info" 
						: (this.state.inputClicked
							? "continue-button invalid-continue-button"
							: "hide-area continue-button")
						)
					: (this.props.level
						? "continue-button valid-continue-button extra-info"
						: (this.state.inputClicked
							? "continue-button valid-continue-button"
							: "hide-area continue-button")
						)
					}
					onClick={this.handleContinueButtonClick}>Continue</button>
			</div>
		)
	}
}

export default PledgeInputArea;