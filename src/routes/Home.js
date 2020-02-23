import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { Container } from 'react-grid';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Home = () => {
	const [quizes, setQuizes] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();

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
		<div id="home-page">
			<h2 className="page-title">Αρχική</h2>

			<h3>Λίστα με quiz</h3>
			<Container>
				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						color={'coral'}
						loading={loading}
					/>
				) : (
					quizes.map(quiz => (
						<Link to={'quiz/' + quiz.id}>
							<div className="quiz-list-item" key={quiz.id}>
								<div className="quiz-item-name">{quiz.name}</div>
							</div>
						</Link>
					))
				)}
			</Container>
		</div>
	);
};

export default Home;
