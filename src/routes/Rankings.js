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
	const [searchValue, setSearchValue] = useState('');
	const [tempData, setTempData] = useState();

	const filterTableData = (event) => {
		setTempData(rankings);
		setSearchValue(event.target.value);

		var tempRankings = rankings.filter((searchData) => {
			return searchData.name.includes(event.target.value);
		});
		setTempData(tempRankings);
	};

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
				setTempData(rankings);
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
						<div className="rankings-block">
							<label>
								Αναζήτηση
								</label>
							<input
								name="search"
								type="text"
								value={searchValue}
								placeholder="Αναζήτηση"
								onChange={(event) => filterTableData(event)}
							/>
							<h3 >Κατάταξη</h3>
							<DataTable className="rankings-data-table" noHeader columns={columns} data={tempData} />
						</div>
					)}
			</Container>
		</div>
	);
};

export default Rankings;
