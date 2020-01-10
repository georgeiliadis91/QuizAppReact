import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Home = () => {
	const [quizes, setQuizes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setQuizes([]);
		axios
			.get('http://geoili.me:4000/quizes/')
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
		<div>
			<h2>Home</h2>

			<div>
				<h3>List of quizes to take</h3>
				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						color={'coral'}
						loading={loading}
					/>
				) : (
					quizes.map(quiz => (
						<div key={quiz.id}>
							<Link to={'quiz/' + quiz.id}>{quiz.name}</Link>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Home;
