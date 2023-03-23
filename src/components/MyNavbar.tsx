import React from 'react';
import MyLink from './MyLink';
import { AppBar, List } from '@mui/material';
// passing props to allow MyNavbar component to have children inside it
export default function MyNavbar() {
	return (
		<>
			<AppBar component='nav' position='relative'>
				<h1>MyNavbar</h1>
				<List>
					<MyLink path='/' text='Home' />
					<MyLink path='/manageOrphan' text='manage Orphan' />
					<MyLink path='/manageAttendance' text='manage Attendance' />
				</List>
			</AppBar>
		</>
	);
}
