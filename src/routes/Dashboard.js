import React from 'react';
import DataTable from 'react-data-table-component';

const data = [
	{ id: 1, title: 'Conan the Barbarian', year: '1982' },
	{ id: 2, title: 'Conan the Hairman', year: '1983' },
	{ id: 3, title: 'Conan the Actor', year: '1983' },
	{ id: 4, title: 'Conan the DrugDealer', year: '1983' }
];
const columns = [
	{
		name: 'Title',
		selector: 'title',
		sortable: true
	},
	{
		name: 'Year',
		selector: 'year',
		sortable: true,
		right: true
	}
];

const Dashboard = () => {
	return (
		<div>
			<h2>Dashboard</h2>
			<DataTable title="Arnold Movies" columns={columns} data={data} />
		</div>
	);
};

export default Dashboard;
