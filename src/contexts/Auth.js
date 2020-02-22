import React, { useEffect, useState } from 'react';
import app from '../firebase/firebase';
import { useAlert } from 'react-alert';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const alert = useAlert();

	const [currentUser, setCurrentUser] = useState(null, () => {
		const localData = localStorage.getItem('userData');
		return localData ? JSON.parse(localData) : [];
	});

	useEffect(() => {
		//firebase call with the setUseState methods to get user data
		app.auth().onAuthStateChanged(setCurrentUser);
		localStorage.setItem('userData', JSON.stringify(currentUser));
		//Check if user data is empty
		if (currentUser != null) {
			alert.success('logged in');
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
