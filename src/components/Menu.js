import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import app from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Menu = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<div className="main-menu">
			{currentUser ? (
				<ul>
					<li>
						<Link to="/">Αρχική</Link>
					</li>
					<li>
						<Link to="/rankings">Κατάταξη</Link>
					</li>
					<li>
						<Link to="/profile">Προφίλ</Link>
					</li>
					{currentUser.email == process.env.REACT_APP_ADMINISTRATOR_EMAIL && (
						<li>
							<Link to="/dashboard">Διαχείριση</Link>
						</li>
					)}
					<li>
						<button onClick={() => app.auth().signOut()}>Αποσύνδεση</button>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to="/login">Είσοδος</Link>
					</li>
					<li>
						<Link to="/signup">Εγγραφή</Link>
					</li>
				</ul>
			)}
		</div>
	);
};

export default Menu;
