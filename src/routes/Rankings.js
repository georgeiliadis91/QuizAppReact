import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

import { Container } from 'react-grid';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const Rankings = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setUsers([]);
		axios
			.get('http://geoili.me:4000/users')
			.then(res => {
				const users = res.data;

				users.map(user => {
					return setUsers(previousUsers => [
						...previousUsers,
						{
							id: user._id,
							name: user.name
						}
					]);
				});
				setLoading(false);
			})
			.catch(error => {
				alert.error(error.message);
			});
	}, [loading]);

	return (
		<div className="rankings-list">
			<Container>
				<h2 className="page-title">Rankings should go here</h2>

				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						color={'coral'}
						loading={loading}
					/>
				) : (
					users.map(user => (
						<li key={user.id}>
							<label>
								Όνομα:
								{user.name}
							</label>
						</li>
					))
				)}
			</Container>
		</div>
	);
};

export default Rankings;
