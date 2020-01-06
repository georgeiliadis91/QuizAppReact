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

// const test = {
// 	name: 'Tralalix',
// 	questions: [
// 		{
// 			questionTitle: 'asdasd',
// 			answerA: '213652',
// 			answerB: '236',
// 			answerC: 'C23623',
// 			answerD: 'Dwegweg',
// 			correctAnswer: 1
// 		},
// 		{
// 			questionTitle: 'Question 1',
// 			answerA: 'gwegwegA',
// 			answerB: 'Bwegweg',
// 			answerC: 'Casgasg',
// 			answerD: 'Dasgasg',
// 			correctAnswer: 1
// 		},
// 		{
// 			questionTitle: 'Qasmjutjkm 1',
// 			answerA: 'asfasf',
// 			answerB: 'Basfasf',
// 			answerC: 'Casfasf',
// 			answerD: 'Dasfasf',
// 			correctAnswer: 1
// 		}
// 	]
// };

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const EditQuiz = ({ match }) => {
	const { id } = match.params;
	const [loading, setLoading] = useState(true);
	const [quiz, setQuiz] = useState(['']);

	const alert = useAlert();

	//========Funtions==========
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

		setQuiz(previousValues => ({
			...previousValues,
			questions: values
		}));
	};

	const handleTitleChange = e => {
		setQuiz(previousData => ({ ...previousData, name: e.target.value }));
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
				break;
		}

		setQuiz(previousdata => ({ ...previousdata, values }));
	};

	const handleSubmit = useCallback(event => {
		event.preventDefault();

		axios
			.patch('http://geoili.me:4000/quizes/5e0faca40b01ec775e1d54bf', test)
			.then(res => {
				setLoading(true);
				console.log(res.data);
			})
			.catch(err => {
				alert.error(err.message);
			});
	}, []);

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
				console.log(quiz);

				setLoading(false);
			})
			.catch(error => {
				alert.error(error.message);
			});
	}, [loading]);

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
					<form onSubmit={handleSubmit}>
						<label>
							Quiz name:
							<input
								name="name"
								type="name"
								value={quiz.name}
								onChange={handleTitleChange}
							/>
						</label>
						{quiz.questions.map((question, index) => (
							<div key={index} className="question-row">
								<label>
									Question:
									<input
										name="questionTitle"
										type="questionTitle"
										value={question.questionTitle}
										onChange={event => handleInputChange(index, event)}
									/>
								</label>

								<label>
									Answer A:
									<input
										name="name"
										type="answerA"
										value={question.answerA}
										onChange={event => handleInputChange(index, event)}
									/>
								</label>
								<label>
									Answer B:
									<input
										name="answerB"
										type="answerB"
										value={question.answerB}
										onChange={event => handleInputChange(index, event)}
									/>
								</label>
								<label>
									Answer C:
									<input
										name="name"
										type="name"
										value={question.answerC}
										onChange={event => handleInputChange(index, event)}
									/>
								</label>
								<label>
									Answer D:
									<input
										name="name"
										type="name"
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
				)}
			</ul>
			<button onClick={() => handleAddQuestion()}>Add new question </button>
		</div>
	);
};

export default EditQuiz;
