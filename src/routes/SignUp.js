import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase';

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(
		async event => {
			event.preventDefault();
			const { email, password, password2 } = event.target.elements;

			if (password === password2) {
				try {
					await app
						.auth()
						.createUserWithEmailAndPassword(email.value, password.value);
					history.push('/');
				} catch (error) {
					alert(error);
				}
			} else {
				alert('passwords do not match!');
			}
		},
		[history]
	);

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
						type="password2"
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
