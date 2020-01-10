import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase';
import { useAlert } from 'react-alert';
import { AuthContext } from '../contexts/Auth';

const SignUp = ({ history }) => {
	const alert = useAlert();

	const handleSignUp = useCallback(
		async event => {
			event.preventDefault();
			const { email, password, password2 } = event.target.elements;

			if (password.value === password2.value) {
				try {
					await app
						.auth()
						.createUserWithEmailAndPassword(email.value, password.value);
					history.push('/');
				} catch (error) {
					alert.error(error.message);
				}
			} else {
				alert.error('Passwords do not match.');
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
			<h1>Sign up</h1>
			<form onSubmit={handleSignUp}>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<label>
					Password
					<input
						name="password2"
						type="password"
						placeholder="Verify Password"
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
			<Link to="/login">Already have an account?</Link>
		</div>
	);
};

export default withRouter(SignUp);
