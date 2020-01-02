import React from 'react';
import app from '../firebase/firebase';

const Home = () => {
	return (
		<div>
			<h3>Home</h3>
			<button onClick={() => app.auth().signOut()}>Sign out</button>
		</div>
	);
};

export default Home;
