import React from 'react';
import CurrentLevels from './CurrentLevels.jsx';
import FullLevels from './FullLevels.jsx';

function Levels(props) {
	return (
		<div>
			<CurrentLevels projectId={props.projectId} username={props.username} fetchLevels={props.fetchLevels} allCurrentLevels={props.allCurrentLevels} currentLevels={props.currentLevels} limitedLevels={props.limitedLevels} />
			{ props.fullLevels.length > 0 && <FullLevels fullLevels={props.fullLevels} /> }
		</div>
	)
}

export default Levels;