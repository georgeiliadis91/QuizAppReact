import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase';
import { useAlert } from 'react-alert';
import { AuthContext } from '../contexts/Auth';
import { Container } from 'react-grid';
import axios from 'axios';

const SignUp = ({ history }) => {
	const alert = useAlert();
	const { currentUser } = useContext(AuthContext);

	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password, password2 } = event.target.elements;

			if (password.value === password2.value) {
				try {
					await app
						.auth()
						.createUserWithEmailAndPassword(email.value, password.value)
						.then((user) => {
							//Getting user data as a response and then pushing the user data that is userfull on our backend
							let username;
							if (user.user.displayName === null) {
								username = email.value;
							}
							axios
								.post(process.env.REACT_APP_BASE_URL + '/users', {
									name: username,
									email: email.value,
									firebase_id: user.user.uid,
								})
								.then((response) => {
									// console.log(response);
									var user = app.auth().currentUser;

									user
										.sendEmailVerification()
										.then(() => {
											alert.success('Please check your email for verification');
										})
										.catch((error) => {
											console.log(error.message);
										});
								})
								.catch((error) => {
									console.log(error.message);
								});
							//Send verification mail.
						});

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

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<h2 className="page-title">Εγγραφή χρήστη</h2>
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
				<button type="submit">Εγγραφή</button>
			</form>
			<br />
			<Link to="/login">Έχετε ήδη λογαριασμό?</Link>
		</Container>
	);
};

export default withRouter(SignUp);
