import React, { useEffect, useContext, useCallback, useState } from 'react';
import { AuthContext } from '../contexts/Auth';
import { GoUnverified } from 'react-icons/go';
import { MdVerifiedUser } from 'react-icons/md';
import app from '../firebase/firebase';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { Container, Row, Col } from 'react-grid';

const Profile = () => {
	const alert = useAlert();
	const [userData, setUserData] = useState([]);
	const [averages, setAverages] = useState({});

	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BASE_URL + '/results/allscores/' + currentUser.uid
			)
			.then(res => {
				setUserData(res.data);
			})
			.catch(err => {
				alert.error(err.message);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BASE_URL +
					'/results/totalscore/' +
					currentUser.uid
			)
			.then(res => {
				// setLoading(true);
				const { totalScore, average } = res.data;

				setAverages({
					totalScore: totalScore,
					average: average
				});
			})
			.catch(err => {
				alert.error(err.message);
			});
	}, []);

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

	console.log(userData);

	return (
		<div id="user-profile">
			<Container>
				<div className="title-wrapper">
					<h2 className="page-title">Προφίλ Χρήστη</h2>
				</div>
				<Row>
					<Col xs={12} sm={3} className="user-data">
						<div className="user-account-block">
							<h3>Στοιχεία Χρήστη</h3>
							<p>Email: {currentUser.email}</p>
							<div>
								{currentUser.emailVerified ? (
									<p>
										Verified: <MdVerifiedUser size="2rem" />
									</p>
								) : (
									<p>
										Unverified:
										<GoUnverified size="2rem" />
									</p>
								)}
							</div>
						</div>

						<div id="password-change">
							<h3>Αλλαγή κωδικού πρόσβασης</h3>

							<form onSubmit={handlePasswordReset}>
								<label>Νέος Κωδικός</label>
								<input name="password" type="password" placeholder="Password" />
								<label>Επιβεβαίωση κωδικού</label>
								<input
									name="password2"
									type="password"
									placeholder="Verify Password"
								/>
								<button type="submit">Αλλαγή κωδικού</button>
							</form>
						</div>
					</Col>
					<Col xs={12} sm={9} className="user-stats">
						<div>
							<h3>Στατιστικά και σκορ</h3>
						</div>
						<div className="user-data-body-stats">
							<div className="totals-wrapper">
								<p>Total Score: {averages.totalScore}</p>
								<p>Average: {averages.average}</p>
							</div>
							<ul>
								{userData.map((quiz, index) => (
									<li key={index}>
										{quiz.quiz_name} - Score: {quiz.bestScore}
									</li>
								))}
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Profile;
