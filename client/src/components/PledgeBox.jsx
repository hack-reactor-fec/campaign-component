import React, { Component } from 'react';
import axios from 'axios';
import PledgeInputArea from './PledgeInputArea.jsx';

function PledgeBox(props) {
	return (
		<div id="pledge-component-container" className="support-item">
			<div id="pledge-component-subcontainer">
				<div className="pledge-flex-div pledge-box-header">
					<div id="pledge-header">Make a pledge without a reward</div>
				</div>
				<div className="pledge-flex-div">
					<PledgeInputArea
						startingAmount={'10'}
						username={props.username}
						projectId={props.projectId}
						pledgeBox={true}
					/>
				</div>
			</div>
		</div>
	)
}

export default PledgeBox;