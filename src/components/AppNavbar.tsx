import React from 'react';
import MyLi from './MyLi';
export default function AppNavbar() {
	return (
		<>
			<nav className='bg-blue-600 text-white p-2 rounded-b '>
				<ul className='flex flex-wrap p-2 '>
					<MyLi text='Home' href='/' />
					<MyLi text='Manage Orphans' href='/manageOrphans' />
				</ul>
			</nav>
			
		</>
	);
}
