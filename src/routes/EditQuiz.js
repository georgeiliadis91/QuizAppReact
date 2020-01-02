import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

// Link to the form example from codepen

const EditQuiz = ({ match }) => {
	const { id } = match.params;
	// const alert = useAlert();

	// const [inputFields, setInputFields] = useState([
	// 	{
	// 		questionTitle: '',
	// 		questionA: '',
	// 		questionB: '',
	// 		questionC: '',
	// 		questionD: '',
	// 		correctAnswer: ''
	// 	}
	// ]);

	// const handleAddFields = () => {
	// 	const values = [...inputFields];
	// 	values.push({
	// 		questionTitle: '',
	// 		questionA: '',
	// 		questionB: '',
	// 		questionC: '',
	// 		questionD: '',
	// 		correctAnswer: ''
	// 	});
	// 	setInputFields(values);
	// };

	// const handleRemoveFields = index => {
	// 	const values = [...inputFields];
	// 	values.pop();
	// 	setInputFields(values);
	// };

	// // const handleInputChange = (index, event) => {
	// // 	const values = [...inputFields];
	// // 	if (event.target.name === 'firstName') {
	// // 		values[index].firstName = event.target.value;
	// // 	} else {
	// // 		values[index].lastName = event.target.value;
	// // 	}

	// // 	setInputFields(values);
	// // };

	// const handleInputChange = (index, event) => {
	// 	setInputFields(previousValues => [
	// 		...previousValues,
	// 		{ [event.target.name]: event.target.value }
	// 	]);
	// };

	// const handleSubmit = e => {
	// 	e.preventDefault();
	// 	console.log('inputFields', inputFields);
	// };

	// useEffect(() => {
	// 	axios
	// 		.get('http://geoili.me:4000/quizes/' + id)
	// 		.then(res => {
	// 			console.log(res.data);
	// 		})
	// 		.catch(err => {
	// 			alert.error(err.message);
	// 		});
	// }, []);

	return (
		<div>
			<h3>ID: {id}</h3>
			{/* <h1>Edit quiz</h1>
			<form onSubmit={handleSubmit}>
				<button type="button" onClick={() => handleAddFields()}>
					+
				</button>
				<div>
					{inputFields.map((inputField, index) => (
						<Fragment key={`${inputField}~${index}`}>
							<div>
								<label htmlFor="firstName">First Name</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									value={inputField.firstName}
									onChange={event => handleInputChange(index, event)}
								/>
							</div>
							<div className="form-group col-sm-4">
								<label htmlFor="lastName">Last Name</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={inputField.lastName}
									onChange={event => handleInputChange(index, event)}
								/>
							</div>
							<div>
								<button type="button" onClick={() => handleRemoveFields(index)}>
									Remove
								</button>
							</div>
						</Fragment>
					))}
				</div>

				<button
					className="btn btn-primary mr-2"
					type="submit"
					onSubmit={handleSubmit}
				>
					Save
				</button>

				<br />
				<pre>{JSON.stringify(inputFields, null, 2)}</pre>
			</form> */}
		</div>
	);
};

export default EditQuiz;
