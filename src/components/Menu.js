import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase';

const Menu = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div>
			{currentUser ? (
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
					<li>
						<button onClick={() => app.auth().signOut()}>Sign out</button>
					</li>
				</ul>
			) : (
				<div>
					something
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
				</div>
			)}
		</div>
	);
};

export default Menu;
