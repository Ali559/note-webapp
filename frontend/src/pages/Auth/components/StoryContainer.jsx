import React from 'react';

export default function StoryContainer({ storyVector, move }) {
	return (
		<div className={move === true ? 'story clicked' : 'story'}>
			<div className="text-container">
				{move === false ? (
					<h1>
						<span>Hey,</span> Long time no see!
					</h1>
				) : (
					<h1>
						<span>Hi,</span> Good to see you!
					</h1>
				)}
			</div>
			<div className="story-container">
				<img src={storyVector} alt="Story" />
			</div>
		</div>
	);
}
