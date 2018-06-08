import React from 'react';

function LevelBackersSection(props) {
	if (props.levelType === 'current' || props.levelType === 'limited') {
		return (
			<div className="level-backers-section">
				{props.levelType === 'limited' && 
					<div className="limited-backers-line">
						Limited ({props.level.maxBackers - props.level.numberOfBackers} of {props.level.maxBackers})
					</div>
				}
				<div className="backers-line">
					{`${props.level.numberOfBackers} backer${props.level.numberOfBackers === 1 ? '' : 's'}`}
				</div>
			</div>
		)
	} else {
		return (
			<div className="level-backers-section">
				<div className="full-backers-line">
					Reward no longer available
				</div>
				<div className="backers-line">
					{`${props.level.numberOfBackers} backer${props.level.numberOfBackers === 1 ? '' : 's'}`}
				</div>
			</div>
		)
	}
}

export default LevelBackersSection;