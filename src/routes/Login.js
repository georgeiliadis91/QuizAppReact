import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase';
import { AuthContext } from '../contexts/Auth';

const Login = ({ history }) => {
	const alert = useAlert();

	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);

				history.push('/');
			} catch (error) {
				alert.error(error.message);
				// console.log(error);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<h1>Είσοδος</h1>
			<form onSubmit={handleLogin}>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<button type="submit">Είσοδος</button>
			</form>
			<Link to="/signup">Δεν έχω λογαριασμό</Link>
		</div>
	);
};

export default withRouter(Login);
