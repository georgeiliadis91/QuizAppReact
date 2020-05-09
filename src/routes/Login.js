import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import app, { uiConfig } from '../firebase/firebase';
import { AuthContext } from '../contexts/Auth';
import { Container } from 'react-grid';
import * as firebase from 'firebase';
import axios from 'axios';

const Login = ({ history }) => {
	const alert = useAlert();

	const handleLogin = useCallback(
		async (event) => {
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

	const handleGoogleLogin = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await app
				.auth()
				.signInWithPopup(provider)
				.then((user) => {
					//Getting user data as a response and then pushing the user data that is userfull on our backend

					axios
						.post(process.env.REACT_APP_BASE_URL + '/users', {
							name: user.user.displayName,
							email: user.user.email,
							firebase_id: user.user.uid,
						})
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error.message);
						});
				});

			history.push('/');
		} catch (error) {
			alert.error(error.message);
		}
	};

	const handleFacebookLogin = async () => {
		const provider = new firebase.auth.FacebookAuthProvider();
		try {
			await app
				.auth()
				.signInWithPopup(provider)
				.then((user) => {
					//Getting user data as a response and then pushing the user data that is userfull on our backend
					let email;

					if (user.user.email == null) {
						email = 'N/A - Facebook Login';
					} else {
						email = user.user.email;
					}
					console.log(user.user);

					axios
						.post(process.env.REACT_APP_BASE_URL + '/users', {
							name: user.user.displayName,
							email: email,
							firebase_id: user.user.uid,
						})
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error.message);
						});
				});
			history.push('/');
		} catch (error) {
			alert.error(error.message);
		}
	};

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<h2 className="page-title">Είσοδος</h2>
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
			{/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} /> */}
			<br />
			<Link to="/forgotpassword">Εχω ξεχάσει τον κωδικό μου</Link>
			<br />
			<div className="social-login-block">
				<div className="social-login-btn" onClick={() => handleGoogleLogin()}>
					<div className="social-login-icon-wrapper">
						<img
							className="social-login-icon"
							src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
						/>
					</div>
					<p>Google</p>
				</div>

				<div className="social-login-btn" onClick={() => handleFacebookLogin()}>
					<div className="social-login-icon-wrapper">
						<img
							className="social-login-icon"
							src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
						/>
					</div>
					<p>Facebook</p>
				</div>
			</div>
			<br />
			<Link to="/signup">Δεν έχω λογαριασμό</Link>
		</Container>
	);
};

export default withRouter(Login);
