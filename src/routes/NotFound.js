import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<h2 className="page-title">Error 404, page not found.</h2>
			<Link to="/">Take me to the front page</Link>
		</div>
	);
};

export default NotFound;
