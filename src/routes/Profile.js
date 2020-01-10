import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import app from '../firebase/firebase';
import { GoVerified, GoUnverified } from 'react-icons/go';

const Profile = () => {
	const { currentUser } = useContext(AuthContext);
	console.log(currentUser);
	return (
		<div>
			<h2>User Profile</h2>
			<div>{currentUser.email}</div>
			<div>
				{currentUser.emailVerified ? (
					<div>
						Verified <GoVerified size="2rem" />
					</div>
				) : (
					<div>
						Unverified
						<GoUnverified size="2rem" />
					</div>
				)}
			</div>
			{/* <div>{currentUser.metadata.lastSignInTime}</div>
			<div>{currentUser.metadata.creationTime}</div> */}
		</div>
	);
};

export default Profile;
