import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<h3>Error 404, page not found.</h3>
			<Link to="/">Take me to the front page</Link>
		</div>
	);
};

export default NotFound;
