import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import DataTable from 'react-data-table-component';
import { Container } from 'react-grid';
import { useAlert } from 'react-alert';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: #0abde3;
`;

const columns = [
	{
		name: 'Name',
		selector: 'name',
		sortable: true,
	},
	{
		name: 'Average',
		selector: 'average',
		sortable: true,
	},
	{
		name: 'Total',
		selector: 'total',
		sortable: true,
		right: true,
	},
];

const Rankings = () => {
	const alert = useAlert();
	const [rankings, setRankings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setRankings([]);
		axios
			.get(process.env.REACT_APP_BASE_URL + '/results/rankings')
			.then((res) => {
				const rankings = res.data;

				rankings.map((rank) => {
					return setRankings((previousUsers) => [
						...previousUsers,
						{
							name: rank.name,
							total: rank.total,
							average: rank.average,
							id: rank.firebase_id,
						},
					]);
				});
				setLoading(false);
			})
			.catch((error) => {
				alert.error(error.message);
			});
	}, [loading]);

	return (
		<div className="rankings-list">
			<Container className="quiz-list-home">
				<h2 className="page-title">Rankings should go here</h2>

				{loading ? (
					<ClipLoader
						css={override}
						size={150}
						color={'coral'}
						loading={loading}
					/>
				) : (
					<DataTable title="Κατάταξη" columns={columns} data={rankings} />
				)}
			</Container>
		</div>
	);
};

export default Rankings;
