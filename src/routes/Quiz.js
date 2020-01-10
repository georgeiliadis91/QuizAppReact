import React from 'react';

const Quiz = ({ match }) => {
	const { id } = match.params;
	return <div>The quiz {id}</div>;
};

export default Quiz;
