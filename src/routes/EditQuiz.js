import React, { useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

const EditQuiz = ({ match }) => {
	const alert = useAlert();

	const [inputFields, setInputFields] = useState([
		{ firstName: '', lastName: '' }
	]);

	const handleAddFields = () => {
		const values = [...inputFields];
		values.push({ firstName: '', lastName: '' });
		setInputFields(values);
	};

	const handleRemoveFields = index => {
		const values = [...inputFields];
		values.pop();
		setInputFields(values);
	};

	const handleInputChange = (index, event) => {
		const values = [...inputFields];
		if (event.target.name === 'firstName') {
			values[index].firstName = event.target.value;
		} else {
			values[index].lastName = event.target.value;
		}

		setInputFields(values);
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('inputFields', inputFields);
	};

	useEffect(() => {
		axios
			.get('http://geoili.me:4000/quizes/' + id)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				alert.error(err.message);
			});
	}, []);

	return (
		<div>
			<h3>ID: {match.params.id}</h3>
		</div>
	);
};

export default EditQuiz;
