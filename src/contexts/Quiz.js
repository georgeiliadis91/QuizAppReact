// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export const QuizContext = React.createContext();

// export const QuizProvider = props => {
// 	const [quizes, setQuizes] = useState([]);
// 	const [refresh, setRefresh] = useState(false);

// 	async function getquizes() {
// 	await axios
// 		.get('http://geoili.me:4000/quizes/')
// 		.then(res => {
// 			setQuizes({ quizes: res.data });
// 			setRefresh(false);
// 		})
// 		.catch(error => {
// 			console.log(error);
// 		});
// }

// 	useEffect(() => {
// 		getquizes();
// 	}, []);

// 	return (
// 		<QuizContext.Provider value={{ quizes: quizes, setRefresh: setRefresh }}>
// 			{props.children}
// 		</QuizContext.Provider>
// 	);
// };
