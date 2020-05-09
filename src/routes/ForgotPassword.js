import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { useAlert } from 'react-alert';
import app from '../firebase/firebase';
import { Container } from 'react-grid';
import * as firebase from 'firebase';

const Login = ({ history }) => {
	const alert = useAlert();

	const handleForgotPassword = useCallback(
		async (event) => {
			event.preventDefault();
			const { email } = event.target.elements;
			try {
				await app.auth().sendPasswordResetEmail(email.value);
				alert.success('A mail has been send to ' + email.value);
				history.push('/');
			} catch (error) {
				alert.error(error.message);
				// console.log(error);
			}
		},
		[history]
	);

	return (
		<Container>
			<h2 className="page-title">Ανανέωση κωδικού.</h2>
			<form onSubmit={handleForgotPassword}>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>

				<button type="submit">Είσοδος</button>
			</form>
		</Container>
	);
};

export default withRouter(Login);
