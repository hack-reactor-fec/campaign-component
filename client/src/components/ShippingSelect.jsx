import React, { Component } from 'react';

class ShippingSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: this.props.shipsTo
		}
	}

	handleChange = (e) => {
	    this.setState({value: e.target.value});
	  }

	render() {
		return (
			<div className="shipping-select-area">
				<label className="shipping-label">
					Shipping destination
					<div className="label-separation">
						<select className="select-dropdown" value={this.state.value} onChange={this.handleChange}>
							<option value={this.props.shipsTo}>{this.props.shipsTo}</option>
						</select>
					</div>
				</label>
			</div>
		)
	}
}

export default ShippingSelect;