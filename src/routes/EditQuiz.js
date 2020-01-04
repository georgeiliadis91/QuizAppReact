import React, { useEffect, useCallback, useState, Fragment } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

// Link to the form example from codepen
//https://codesandbox.io/s/react-dynamic-form-fields-3fjbd?from-embed

// const handleRemoveFields = index => {
// 	const values = [...inputFields];
// 	values.pop();
// 	setInputFields(values);
// };

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

	const alert = useAlert();

	//========Funtions==========
	const handleAddQuestion = () => {
		const values = quiz.questions;
		values.push({ answerA: 'asdasd', answerB: '123123' });
		setQuiz(previousValues => ({
			...previousValues,
			questions: values
		}));

		console.log(values);
	};

	const handleRemoveFields = index => {
		const values = quiz.questions;
		values.splice(index, 1);
		console.log(values);
		setQuiz(previousValues => ({
			...previousValues,
			questions: values
		}));
	};

	const handleSubmit = useCallback(async event => {
		event.preventDefault();
		const { name } = event.target.elements;

		axios
			.put('http://geoili.me:4000/quizes/' + id, JSON.Stringify(quiz))
			.then(res => {
				setLoading(true);
			})
			.catch(err => {
				alert.error(err);
			});
	}, []);

	useEffect(() => {
		setQuiz([]);
		axios
			.get('http://geoili.me:4000/quizes/' + id)
			.then(res => {
				const quiz = res.data;

				setQuiz({
					id: quiz._id,
					name: quiz.name,
					questions: quiz.questions
				});

				console.log(quiz.questions);
				setLoading(false);
			})
			.catch(error => {
				alert.error(error.message);
			});
	}, []);

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
					<form onSubmit={() => handleSubmit()}>
						<label>
							Quiz name:
							<input name="name" type="name" value={quiz.name} />
						</label>
						{quiz.questions.map((question, index) => (
							<div key={index} className="question-row">
								<label>
									Question:
									<input
										name="name"
										type="name"
										value={question.questionTitle}
									/>
								</label>

								<label>
									Answer A:
									<input name="name" type="name" value={question.answerA} />
								</label>
								<label>
									Answer B:
									<input name="name" type="name" value={question.answerB} />
								</label>
								<label>
									Answer C:
									<input name="name" type="name" value={question.answerC} />
								</label>
								<label>
									Answer D:
									<input name="name" type="name" value={question.answerD} />
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
			<button onClick={() => handleAddQuestion()}>test</button>
		</div>
	);
};

export default EditQuiz;
