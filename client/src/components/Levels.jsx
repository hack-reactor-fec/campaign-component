import React from 'react';
import ReactDOM from 'react-dom';
import CurrentLevels from './CurrentLevels.jsx';
import FullLevels from './FullLevels.jsx';

function Levels(props) {
	return (
		<div id="all-levels-container">
			<CurrentLevels allCurrentLevels={props.allCurrentLevels} currentLevels={props.currentLevels} limitedLevels={props.limitedLevels} />
			<FullLevels fullLevels={props.fullLevels} />
		</div>
	)
}

export default Levels;