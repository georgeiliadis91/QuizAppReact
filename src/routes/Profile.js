import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/Auth';
import { GoUnverified } from 'react-icons/go';
import { MdVerifiedUser } from 'react-icons/md';
import app from '../firebase/firebase';
import { useAlert } from 'react-alert';

import { Container, Row, Col } from 'react-grid';

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
		<div id="user-profile">
			<h2 className="page-title">Προφίλ Χρήστη</h2>
			<Container>
				<Row>
					<Col xs={12} sm={3} className="user-data">
						<h3>Στοιχεία Χρήστη</h3>
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

						<div id="password-change">
							<h3>Αλλαγή κωδικού πρόσβασης</h3>

							<form onSubmit={handlePasswordReset}>
								<label>
									Νέος Κωδικός
									<input
										name="password"
										type="password"
										placeholder="Password"
									/>
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
					</Col>
					<Col xs={12} sm={9} className="user-stats">
						<div>
							<h3>Στατιστικά και σκορ</h3>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Profile;
