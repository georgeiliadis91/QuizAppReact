import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Container } from 'react-grid';
// import FormRadioBtn from '../components/FormRadioBtn';

// TODO NEEN TO HANDLE THE ONCHANGE FOR EACH FIELD. INDEX MIGHT BE USEFULL

// Link to the form example from codepen
//https://codesandbox.io/s/react-dynamic-form-fields-3fjbd?from-embed
// TODO create a new state that is temp and take all the data from the original quiz.

// Can be a string as well. Need to ensure each key-value pair ends with ;

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const EditQuiz = ({ match }) => {
	const { id } = match.params;
	const [loading, setLoading] = useState(true);
	const [quiz, setQuiz] = useState(['']);

	let { name } = quiz;

	const alert = useAlert();

	//==================================field add/remove======================================
	const handleAddQuestion = () => {
		const values = quiz.questions;
		values.push({});
		setQuiz(previousValues => ({
			...previousValues,
			questions: values
		}));
	};

	const handleRemoveFields = index => {
		const values = quiz.questions;
		values.splice(index, 1);

		setQuiz({
			...quiz,
			questions: values
		});
	};

	//==================================field data manipulation======================================

	const handmeNameChange = event => {
		setQuiz({ ...quiz, name: event.target.value });
	};

	const setCorrectAnswer = (index, event) => {
		const values = [...quiz.questions];
		values[index].correctAnswer = parseInt(event.target.value);

		setQuiz({ ...quiz, questions: values });
	};

	const handleInputChange = (index, event) => {
		const values = [...quiz.questions];
		switch (event.target.name) {
			case 'questionTitle':
				values[index].questionTitle = event.target.value;
				break;
			case 'answerA':
				values[index].answerA = event.target.value;
				break;
			case 'answerB':
				values[index].answerB = event.target.value;
				break;
			case 'answerC':
				values[index].answerC = event.target.value;
				break;
			case 'answerD':
				values[index].answerD = event.target.value;
				break;
			default:
				console.log('Error please contact the site admin');
				break;
		}

		setQuiz({ ...quiz, questions: values });
	};

	//==================================Submit======================================

	const handleSubmit = useCallback(
		event => {
			event.preventDefault();
			// console.log(quiz);

			axios
				.patch('http://geoili.me:4000/quizes/' + id, quiz)
				.then(res => {
					setLoading(true);
					console.log(res.data);
				})
				.catch(err => {
					alert.error(err.message);
				});
		},
		[quiz]
	);

	//==================================useEffect======================================
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

	//==================render===========================

	return (
		<Container>
			<h2 className="page-title">ID: {id}</h2>
			<ul>
				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						color={'coral'}
						loading={loading}
					/>
				) : (
					<div id="admin-quiz-creation-form">
						<button onClick={() => handleAddQuestion()}>
							Add new question{' '}
						</button>
						<form onSubmit={handleSubmit}>
							<label>
								Quiz name:
								<input
									name="name"
									type="text"
									value={name}
									onChange={event => handmeNameChange(event)}
								/>
							</label>
							{quiz.questions.map((question, index) => (
								<div key={index} className="question-row">
									<label>
										Question:
										<input
											name="questionTitle"
											type="text"
											value={question.questionTitle}
											onChange={event => handleInputChange(index, event)}
										/>
									</label>

									<label>
										Answer A:
										<input
											name="answerA"
											type="text"
											value={question.answerA}
											onChange={event => handleInputChange(index, event)}
										/>
									</label>
									<label>
										Answer B:
										<input
											name="answerB"
											type="text"
											value={question.answerB}
											onChange={event => handleInputChange(index, event)}
										/>
									</label>
									<label>
										Answer C:
										<input
											name="answerC"
											type="text"
											value={question.answerC}
											onChange={event => handleInputChange(index, event)}
										/>
									</label>
									<label>
										Answer D:
										<input
											name="answerD"
											type="text"
											value={question.answerD}
											onChange={event => handleInputChange(index, event)}
										/>
									</label>

									{/* <FormRadioBtn
										index={index}
										correctAnswer={question.correctAnswer}
										setCorrectAnswer={setCorrectAnswer}
									/> */}

									<div
										id={'radio-group' + index}
										onChange={event => setCorrectAnswer(index, event)}
									>
										<input
											type="radio"
											value={1}
											name={'radio-group' + index}
											checked={question.correctAnswer === 1}
										/>
										1
										<input
											type="radio"
											value={2}
											name={'radio-group' + index}
											checked={question.correctAnswer === 2}
										/>
										2
										<input
											type="radio"
											value={3}
											name={'radio-group' + index}
											checked={question.correctAnswer === 3}
										/>
										3
										<input
											type="radio"
											value={4}
											name={'radio-group' + index}
											checked={question.correctAnswer === 4}
										/>
										4
									</div>

									{/* <div className="radio">
										<label>
											<input
												type="radio"
												name="correctAnswer"
												value={1}
												checked={question.correctAnswer === 1}
												onChange={event => handleInputChange(index, event)}
											/>
											Option 1
										</label>
										<label>
											<input
												type="radio"
												name="correctAnswer"
												value={2}
												checked={question.correctAnswer === 2}
												onChange={event => handleInputChange(index, event)}
											/>
											Option 2
										</label>
										<label>
											<input
												type="radio"
												name="correctAnswer"
												value={3}
												checked={question.correctAnswer === 2}
												onChange={event => handleInputChange(index, event)}
											/>
											Option 3
										</label>
										<label>
											<input
												type="radio"
												name="correctAnswer"
												value={4}
												checked={question.correctAnswer === 4}
												onChange={event => handleInputChange(index, event)}
											/>
											Option 4
										</label>
									</div> */}
									<button onClick={() => handleRemoveFields(index)}>
										Remove Question
									</button>
								</div>
							))}

							<button type="submit">Submit Changes</button>
						</form>
					</div>
				)}
			</ul>
		</Container>
	);
};

export default EditQuiz;
