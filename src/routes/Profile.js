import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { GoUnverified } from 'react-icons/go';
import { MdVerifiedUser } from 'react-icons/md';

const Profile = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div>
			<h2>User Profile</h2>
			<div>{currentUser.email}</div>
			<div>
				{currentUser.emailVerified ? (
					<div>
						Verified <MdVerifiedUser size="2rem" />
					</div>
				) : (
					<div>
						Unverified
						<GoUnverified size="2rem" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
