import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { useAlert } from 'react-alert';

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
			.delete('http://geoili.me:4000/quizes/' + id)
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
			.post('http://geoili.me:4000/quizes/', {
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
			.get('http://geoili.me:4000/quizes/')
			.then(res => {
				const quizes = res.data;

				quizes.map(quiz => {
					setQuizes(previousQuizes => [
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
		<div>
			<h2>Dashboard</h2>
			<h3>Create new Quiz</h3>
			<form onSubmit={handleSubmit}>
				<label>
					Quiz name:
					<input name="name" type="name" placeholder="Enter name..." />
				</label>
				<button type="submit">Create</button>
			</form>
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
							{quiz.name}
							{quiz.createdAt}
							{quiz.questionNum}
							<button onClick={() => handleEdit(quiz.id)}>edit</button>
							<button onClick={() => handleDelete(quiz.id)}>delete</button>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default Dashboard;
