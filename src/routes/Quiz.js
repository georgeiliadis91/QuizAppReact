import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import 'react-animated-slider/build/horizontal.css';
import { Container, Row, Col } from 'react-grid';
import { useAlert } from 'react-alert';
import { AuthContext } from '../contexts/Auth';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Quiz = ({ match }) => {
	const alert = useAlert();
	const { id } = match.params;
	const [quiz, setQuiz] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useContext(AuthContext);

	// console.log(currentUser);

	const handleSubmit = useCallback(
		event => {
			event.preventDefault();
			// console.log(quiz);
			// console.log(answers);

			axios
				.post(process.env.REACT_APP_BASE_URL + '/quizes/submit/' + id, {
					answers: answers,
					firebase_id: currentUser.uid,
					quiz_id: id
				})
				.then(res => {
					setLoading(true);
					console.log(res.data);
					console.log('here');
					alert.success(res.data.message);
				})
				.catch(err => {
					alert.error(err.message);
				});
		},
		[quiz]
	);

	const setCorrectAnswer = (index, event) => {
		const values = answers;
		// values[index] = parseInt(event.target.value);
		if (index !== -1) {
			values[index] = event.target.value;
		}
		setAnswers(values);
		console.log(answers);
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + '/quizes/' + id)
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
		<div id="quiz-page">
			<h2 className="page-title">Απαντήστε στο quiz</h2>
			The quiz {id}
			<Container>
				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						color={'coral'}
						loading={loading}
					/>
				) : (
					<form onSubmit={handleSubmit}>
						{quiz.questions.map((question, index) => (
							<div key={index} className="quiz-slider-div">
								<Row>
									<Col xs={12}>
										<div className="quiz-question">
											Question: {question.questionTitle}
										</div>
									</Col>
								</Row>
								<div
									id={'radio-group' + index}
									onChange={event => setCorrectAnswer(index, event)}
								>
									<Row>
										<Col md={3}>
											<label>
												{question.answerA}
												<input
													type="radio"
													value={1}
													name={'radio-group' + index}
												/>
											</label>
										</Col>
										<Col md={3}>
											<label>
												{question.answerB}
												<input
													type="radio"
													value={2}
													name={'radio-group' + index}
												/>
											</label>
										</Col>
										<Col md={3}>
											<label>
												{question.answerC}
												<input
													type="radio"
													value={3}
													name={'radio-group' + index}
												/>
											</label>
										</Col>
										<Col md={3}>
											<label>
												{question.answerD}
												<input
													type="radio"
													value={4}
													name={'radio-group' + index}
												/>
											</label>
										</Col>
									</Row>
								</div>
							</div>
						))}
						<button type="submit">Submit Answers</button>
					</form>
				)}
			</Container>
		</div>
	);
};

export default Quiz;
