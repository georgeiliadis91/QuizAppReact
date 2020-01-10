import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { GoUnverified } from 'react-icons/go';
import { MdVerifiedUser } from 'react-icons/md';

const Profile = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div>
			<h2>Προφίλ Χρήστη</h2>
			<div>email: {currentUser.email}</div>
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

			<div>
				<h2>Στατιστικά και σκορ</h2>
			</div>
		</div>
	);
};

export default Profile;
