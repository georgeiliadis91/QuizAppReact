import React from 'react';

const Quiz = ({ match }) => {
	const { id } = match.params;
	return (
		<div>
			<h2>Take the quizform</h2>
			The quiz {id}
		</div>
	);
};

export default Quiz;
