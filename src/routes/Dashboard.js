import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Container } from 'react-grid';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Dashboard = ({ history }) => {
	const alert = useAlert();
	const [quizes, setQuizes] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleDelete = id => {
		axios
			.delete('https://geoili.me:4000/quizes/' + id)
			.then(res => {
				setLoading(true);
			})
			.catch(err => {
				alert.error(err.message);
			});
	};

	const handleEdit = id => {
		history.push('/editquiz/' + id);
	};

	const handleSubmit = useCallback(async event => {
		event.preventDefault();
		const { name } = event.target.elements;

		axios
			.post('https://geoili.me:4000/quizes/', {
				name: name.value
			})
			.then(res => {
				setLoading(true);
			})
			.catch(err => {
				alert.error(err);
			});
	}, []);

	useEffect(() => {
		setQuizes([]);
		axios
			.get('https://geoili.me:4000/quizes/')
			.then(res => {
				const quizes = res.data;

				quizes.map(quiz => {
					return setQuizes(previousQuizes => [
						...previousQuizes,
						{
							id: quiz._id,
							name: quiz.name,
							createdAt: quiz.createdAt,
							questionNum: quiz.questions.length
						}
					]);
				});
				setLoading(false);
			})
			.catch(error => {
				alert.error(error.message);
			});
	}, [loading]);

	return (
		<div id="admin-dashboard">
			<h2 className="page-title">Πάνελ Διαχείρησης</h2>
			<Container>
				<div className="create-new-quiz">
					<h3>Δημιουργία νέου Quiz</h3>
					<form onSubmit={handleSubmit}>
						<label>
							Όνομα
							<input name="name" type="name" placeholder="Εισάγετε όνομα..." />
						</label>
						<button type="submit">Δημιουργία</button>
					</form>
				</div>
				<ul>
					{loading ? (
						<ClipLoader
							css={override}
							size={150}
							color={'coral'}
							loading={loading}
						/>
					) : (
						quizes.map(quiz => (
							<li key={quiz.id}>
								<label>
									Όνομα:
									{quiz.name}
								</label>
								<label></label>
								Ημ. Δημιουργίας:
								{quiz.createdAt}
								<label>
									Αρ.Ερωτήσων:
									{quiz.questionNum}
								</label>
								<button onClick={() => handleEdit(quiz.id)}>Επεξεργασία</button>
								<button onClick={() => handleDelete(quiz.id)}>Διαγραφή</button>
							</li>
						))
					)}
				</ul>
			</Container>
		</div>
	);
};

export default Dashboard;
