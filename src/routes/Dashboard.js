import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Dashboard = ({ history }) => {
	const [quizes, setQuizes] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleDelete = id => {
		axios
			.delete('http://geoili.me:4000/quizes/' + id)
			.then(res => {
				setLoading(true);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleEdit = id => {
		history.push('/editquiz/' + id);
	};

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
				console.log(error);
			});
	}, [loading]);

	return (
		<div>
			<h2>Dashboard</h2>
			<ul>
				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						//size={"150px"} this also works
						color={'#123abc'}
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
