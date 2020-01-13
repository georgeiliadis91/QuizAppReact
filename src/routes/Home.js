import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

import { Container } from 'react-grid';

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
		<div id="home-page">
			<h2 className="page-title">Αρχική</h2>

			<h3>Λίστα με quiz</h3>
			<Container>
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
								<Link to={'quiz/' + quiz.id}>{quiz.name}</Link>
							</li>
						))
					)}
				</ul>
			</Container>
		</div>
	);
};

export default Home;
