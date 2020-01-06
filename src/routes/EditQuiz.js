import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

// TODO NEEN TO HANDLE THE ONCHANGE FOR EACH FIELD. INDEX MIGHT BE USEFULL

// Link to the form example from codepen
//https://codesandbox.io/s/react-dynamic-form-fields-3fjbd?from-embed
// TODO create a new state that is temp and take all the data from the original quiz.

// Can be a string as well. Need to ensure each key-value pair ends with ;

const test = {
	name: 'Tralalix',
	questions: [
		{
			questionTitle: 'asdasd',
			answerA: '213652',
			answerB: '236',
			answerC: 'C23623',
			answerD: 'Dwegweg',
			correctAnswer: 1
		},
		{
			questionTitle: 'Question 1',
			answerA: 'gwegwegA',
			answerB: 'Bwegweg',
			answerC: 'Casgasg',
			answerD: 'Dasgasg',
			correctAnswer: 1
		},
		{
			questionTitle: 'Qasmjutjkm 1',
			answerA: 'asfasf',
			answerB: 'Basfasf',
			answerC: 'Casfasf',
			answerD: 'Dasfasf',
			correctAnswer: 1
		}
	]
};

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
				console.log('default triggered');
				break;
		}

		setQuiz({ ...quiz, values });
	};

	//==================================Submit======================================

	const handleSubmit = useCallback(
		event => {
			event.preventDefault();
			console.log(quiz);

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
		<div>
			<h3>ID: {id}</h3>
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
		</div>
	);
};

export default EditQuiz;
