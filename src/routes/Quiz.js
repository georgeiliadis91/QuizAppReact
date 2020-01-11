import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { Container, Row, Col } from 'react-grid';

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
		<div id="quiz-page">
			<h2>Απαντήστε στο quiz</h2>
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
					<Slider>
						{quiz.questions.map((question, index) => (
							<div key={quiz.index} className="quiz-slider-div">
								<Row>
									<Col xs={12}>
										<div className="quiz-question">
											Question: {question.questionTitle}
										</div>
									</Col>
								</Row>
								<Row>
									<Col xs={6}>
										<div className="quiz-answer">A: {question.answerA}</div>
									</Col>
									<Col xs={6}>
										<div className="quiz-answer">B: {question.answerB}</div>
									</Col>
								</Row>
								<Row>
									<Col xs={6}>
										<div className="quiz-answer">C: {question.answerC}</div>
									</Col>
									<Col xs={6}>
										<div className="quiz-answer">D: {question.answerD}</div>
									</Col>
								</Row>
								<Row>
									<Col xs={12}>
										<div>Correct Answer: {question.correctAnswer}</div>
									</Col>
								</Row>
							</div>
						))}
					</Slider>
				)}
			</Container>
		</div>
	);
};

export default Quiz;
