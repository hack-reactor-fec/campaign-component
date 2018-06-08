import React, { Component } from 'react';
import axios from 'axios';

class PledgeInputArea extends Component {
	constructor(props){
		super(props);
		this.state = {
			amount: props.startingAmount,
			activeInputArea: false,
			inputClicked: false,
			hoverInputArea: false
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
		this.setState({amount: e.target.value});
	}

	handleInputTextClick = (e) => {
		// display continue button
		// highlight input text area and currency div in green
		this.setState({activeInputArea: true, inputClicked: true});
	}

	handleClickOutside = () => {
		// when user clicks out of that input text area, have to unhighlight
		this.setState({activeInputArea: false});
	}

	handleClick = (e) => {
		if (this.node.contains(e.target)) {
			return;
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
			<div ref={node => {this.node = node}}>
				<div className="pledge-amount-container" onMouseEnter={this.handleInputTextMouseEnter} onMouseLeave={this.handleInputTextMouseLeave}>
						<span className={(this.state.activeInputArea || this.state.hoverInputArea) ? 'pledge-amount-currency-symbol highlight' : 'pledge-amount-currency-symbol no-highlight'}>$</span>
						<input type="text" 
							className={(this.state.activeInputArea || this.state.hoverInputArea) ? ' pledge-amount-chosen highlight' : 'pledge-amount-chosen no-highlight'} 
							placeholder={(this.props.pledgeBox && !this.state.amount) ? 'Pledge any amount' : ''}
							value={this.state.amount} 
							onChange={this.handleInputChange} 
							onClick={this.handleInputTextClick}
						/>
				</div>
				<button type="button" className={this.props.level ? (this.props.levelClicked ? "continue-button extra-info" : "hide-area continue-button extra-info") : (this.state.inputClicked ? "continue-button" : "hide-area continue-button")} onClick={this.handleContinueButtonClick}>Continue</button>
			</div>
		)
	}
}

export default PledgeInputArea;