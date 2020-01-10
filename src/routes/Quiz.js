import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Quiz = ({ match }) => {
	const { id } = match.params;
	const [quiz, setQuiz] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get('http://geoili.me:4000/quizes/' + id)
			.then(res => {
				const quiz = res.data;

				setQuiz({
					id: quiz._id,
					name: quiz.name,
					questions: quiz.questions
				});

				setLoading(false);
			})
			.catch(error => {
				alert.error(error.message);
			});
	}, [loading]);

	return (
		<div>
			<h2>Απαντήστε στο quiz</h2>
			The quiz {id}
			{loading ? (
				<ClipLoader
					css={override}
					size={150}
					color={'coral'}
					loading={loading}
				/>
			) : (
				<div>
					{quiz.questions.map((question, index) => (
						<div key={quiz.index}>
							<div>Title: {question.questionTitle}</div>
							<div>A: {question.answerA}</div>
							<div>B: {question.answerB}</div>
							<div>C: {question.answerC}</div>
							<div>D: {question.answerD}</div>
							<div>Correct Answer: {question.correctAnswer}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Quiz;
