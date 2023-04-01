import React from 'react';
import MyLi from './MyLi';
export default function AppNavbar() {
	return (
		<>
			<nav className='bg-blue-600 text-white p-2'>
				<ul className='flex flex-wrap p-2 '>
					<MyLi text='Home' href='/' />
					<MyLi text='Manage orphans' href='/manageOrphans' />
					<MyLi text='Add orphan' href='/manageOrphans/addOrphan' />
				</ul>
			</nav>
		</>
	);
}
