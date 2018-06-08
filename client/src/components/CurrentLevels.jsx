import React from 'react';
import SingleCurrentLevel from './SingleCurrentLevel.jsx';

function CurrentLevels(props) {
	return (
		<div>
			{props.allCurrentLevels.map(level => {
				return (
					<div key={level.id}>
						<SingleCurrentLevel projectId={props.projectId} username={props.username} fetchLevels={props.fetchLevels} level={level} levelType={props.currentLevels.filter(currentLevel => currentLevel.id === level.id).length > 0 ? 'current' : 'limited'} />
					</div>
				)
			})}
		</div>
	)
}

export default CurrentLevels;