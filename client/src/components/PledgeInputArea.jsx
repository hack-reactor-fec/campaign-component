import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class PledgeInputArea extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}


	render() {
		return (
			<div id="pledge-amount-container">
				<span id="pledge-amount-currency-symbol" className={this.props.highlightInputArea ? 'highlight' : 'no-highlight'}>$</span>
				<span><input type="text" id="pledge-amount-chosen" className={this.props.highlightInputArea ? 'highlight' : 'no-highlight'} placeholder="Pledge any amount" onChange={this.props.handleInputChange} onClick={this.props.handleInputTextClick}/></span>
			</div>
		)
	}
}

export default PledgeInputArea;