import React from 'react';
import MyLink from './MyLink';
import { BottomNavigation } from '@mui/material';
// passing props to allow MyNavbar component to have children inside it
export default function MyNavbar() {
	return (
		<>
			<BottomNavigation className=''>
				<MyLink path='/' text='Home' />
				<MyLink path='/manageOrphan' text='manage Orphan' />
				<MyLink path='/manageAttendance' text='manage Attendance' />
			</BottomNavigation>
		</>
	);
}
