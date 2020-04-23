import React from 'react';

const FormRadioBtn = ({ correctAnswer, index, setCorrectAnswer }) => {
	return (
		<div
			id={'radio-group' + index}
			onChange={(event) => setCorrectAnswer(index, event)}
		>
			<input
				type="radio"
				value={1}
				name={'radio-group' + index}
				checked={correctAnswer === 1}
			/>
			1
			<input
				type="radio"
				value={2}
				name={'radio-group' + index}
				checked={correctAnswer === 2}
			/>
			2
			<input
				type="radio"
				value={3}
				name={'radio-group' + index}
				checked={correctAnswer === 3}
			/>
			3
			<input
				type="radio"
				value={4}
				name={'radio-group' + index}
				checked={correctAnswer === 4}
			/>
			4
		</div>
	);
};

export default FormRadioBtn;
