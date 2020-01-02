import React from 'react';

const EditQuiz = ({ match }) => {
	return (
		<div>
			<h3>ID: {match.params.id}</h3>
		</div>
	);
};

export default EditQuiz;
