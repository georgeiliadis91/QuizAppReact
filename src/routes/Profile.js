import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/Auth';
import { GoUnverified } from 'react-icons/go';
import { MdVerifiedUser } from 'react-icons/md';
import app from '../firebase/firebase';
import { useAlert } from 'react-alert';

const Profile = () => {
	const alert = useAlert();

	const { currentUser } = useContext(AuthContext);

	const handlePasswordReset = useCallback(async event => {
		event.preventDefault();
		var user = app.auth().currentUser;

		const { password, password2 } = event.target.elements;
		if (password.value === password2.value) {
			try {
				user
					.updatePassword(password.value)
					.then(() => {
						alert.success('Επιτυχης αλλαγη κωδικου');
					})
					.catch(error => {
						alert.error(error.message);
					});
			} catch (error) {
				alert.error(error.message);
				console.log(error);
			}
		} else {
			alert.error('Passwords do not match.');
		}
	}, []);

	return (
		<div>
			<h2>Προφίλ Χρήστη</h2>
			<div>email: {currentUser.email}</div>
			<div>
				{currentUser.emailVerified ? (
					<div>
						Verified <MdVerifiedUser size="2rem" />
					</div>
				) : (
					<div>
						Unverified
						<GoUnverified size="2rem" />
					</div>
				)}
			</div>

			<div>
				<h3>Αλλαγή κωδικού πρόσβασης</h3>

				<form onSubmit={handlePasswordReset}>
					<label>
						Νέος Κωδικός
						<input name="password" type="password" placeholder="Password" />
					</label>
					<label>
						Επιβεβαίωση κωδικού
						<input
							name="password2"
							type="password"
							placeholder="Verify Password"
						/>
					</label>
					<button type="submit">Αλλαγή κωδικού</button>
				</form>
			</div>

			<div>
				<h2>Στατιστικά και σκορ</h2>
			</div>
		</div>
	);
};

export default Profile;
