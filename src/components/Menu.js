import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import app from '../firebase/firebase';
import { Link } from 'react-router-dom';

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
						<Link to="/rankings">Rankings</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<button onClick={() => app.auth().signOut()}>Sign out</button>
					</li>
				</ul>
			) : (
				<div>
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
