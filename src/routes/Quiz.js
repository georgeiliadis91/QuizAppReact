import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import 'react-animated-slider/build/horizontal.css';
import { Container, Row, Col } from 'react-grid';
import { useAlert } from 'react-alert';
import { AuthContext } from '../contexts/Auth';
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: #0abde3;
`;

const Quiz = ({ match }) => {
	const alert = useAlert();
	const { id } = match.params;
	const [quiz, setQuiz] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [scoreData, setScoreData] = useState();
	const { currentUser } = useContext(AuthContext);

	// console.log(currentUser);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();

			if (answers.length != quiz.questions.length) {
				alert.error('Δεν έχετε απαντήσει σε όλες τις ερωτήσεις');
			} else {
				axios
					.post(process.env.REACT_APP_BASE_URL + '/quizes/submit/' + id, {
						answers: answers,
						firebase_id: currentUser.uid,
						quiz_id: id,
					})
					.then((res) => {
						setLoading(true);
						if (res.data.status) {
							alert.success(res.data.message);
						} else {
							alert.error(res.data.message);
						}
					})
					.catch((err) => {
						alert.error(err.message);
					});
			}
		},
		[quiz]
	);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + '/quizes/' + id)
			.then((res) => {
				const quiz = res.data;
				setQuiz({
					id: quiz._id,
					name: quiz.name,
					questions: quiz.questions,
				});
				setLoading(false);
			})
			.catch((error) => {
				alert.error(error.message);
			});
	}, [loading]);

	const setCorrectAnswer = (index, event) => {
		const values = answers;
		// values[index] = parseInt(event.target.value);
		if (index !== -1) {
			values[index] = event.target.value;
		}
		setAnswers(values);
		// console.log(answers);
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + '/quizes/' + id)
			.then((res) => {
				const quiz = res.data;
				setQuiz({
					id: quiz._id,
					name: quiz.name,
					questions: quiz.questions,
				});
				setLoading(false);
			})
			.catch((error) => {
				alert.error(error.message);
			});
	}, [loading]);

	return (
		<div id="quiz-page">
			<Container className="quiz-panel">
				<h2 className="page-title">Απαντήστε στο quiz</h2>
				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						color={'coral'}
						loading={loading}
					/>
				) : (
					<CarouselProvider
						naturalSlideWidth={100}
						naturalSlideHeight={50}
						dragEnabled={false}
						totalSlides={quiz.questions.length}
					>
						<form onSubmit={handleSubmit}>
							<Slider>
								{quiz.questions.map((question, index) => (
									<div>
										<Slide
											index={index}
											key={index}
											className="quiz-slider-div"
										>
											<div className="quiz-btn-row">
												{index != 0 && (
													<ButtonBack className="btn-back">
														<FiArrowLeftCircle size="2rem" />
													</ButtonBack>
												)}
												{index + 1 != quiz.questions.length && (
													<ButtonNext className="btn-next">
														<FiArrowRightCircle size="2rem" />
													</ButtonNext>
												)}
											</div>
											<p>
												Ερώτηση {index + 1} απο {quiz.questions.length}
											</p>
											<Row>
												<Col xs={12}>
													<div className="question-title">
														<h4>Ερώτηση:</h4>
														<div className="quiz-question">
															{question.questionTitle}
														</div>
													</div>
												</Col>
											</Row>
											<div
												id={'radio-group' + index}
												onChange={(event) => setCorrectAnswer(index, event)}
											>
												<Row>
													<Col md={6}>
														<input
															type="radio"
															value={1}
															name={'radio-group' + index}
														/>
														<label>{question.answerA}</label>
													</Col>
													<Col md={6}>
														<input
															type="radio"
															value={2}
															name={'radio-group' + index}
														/>
														<label>{question.answerB}</label>
													</Col>
												</Row>
												<Row>
													<Col md={6}>
														<input
															type="radio"
															value={3}
															name={'radio-group' + index}
														/>
														<label>{question.answerC}</label>
													</Col>
													<Col md={6}>
														<input
															type="radio"
															value={4}
															name={'radio-group' + index}
														/>
														<label>{question.answerD}</label>
													</Col>
												</Row>
											</div>
										</Slide>
									</div>
								))}
							</Slider>

							<button type="submit">Ολοκλήρωση</button>
						</form>
					</CarouselProvider>
				)}
			</Container>
		</div>
	);
};

export default Quiz;
