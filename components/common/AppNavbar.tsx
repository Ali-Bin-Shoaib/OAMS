import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import MyLink from './MyLink';
import { useState } from 'react';

const AppNavbar = () => {
	const router = useRouter();
	const paths = {
		links: [
			{ label: 'Home', link: '/' },
			{ label: 'orphans', link: '/orphans/' },
			{ label: 'create', link: '/orphans/Create' },
			{ label: 'update', link: '/orphans/Update' },
			{ label: 'remove', link: '/orphans/Remove' },
		],
	};
	// const [currentRout, setCurrentRout] = useState(router.asPath);
	// console.log('🚀 ~ file: AppNavbar.tsx:17 ~ AppNavbar ~ currentRout:', currentRout);

	return (
		<nav className='w-full bg-blue-500 text-white mb-6 rounded-b-lg'>
			<ul className='flex flex-wrap '>
				{paths.links.map((link) => (
					<MyLink key={v4()} href={link.link} text={link.label} />
				))}
				{/* <MyLink href={paths.Home} text='Home' />
				<MyLink href={paths.orphans} text='Orphans' />
				<MyLink href={paths.create} text='Create' />
				<MyLink href={paths.update} text='Update' />
				<MyLink href={paths.remove} text='Remove' /> */}
			</ul>
		</nav>
	);
};
export default AppNavbar;
