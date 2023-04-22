import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import MyLink from './MyLink';
import { useEffect, useState } from 'react';

const AppNavbar = () => {
	const router = useRouter();
	const paths = {
		links: [
			{ label: 'Home', link: '/' },
			{ label: 'orphans', link: '/orphans' },
		],
	};
	const [currentRout, setCurrentRout] = useState(router.asPath);

	useEffect(() => {
		setCurrentRout(router.asPath);
		console.log('currentRout', currentRout);
	}, [currentRout, router.asPath]);
	return (
		<nav className='w-full bg-blue-500 text-white mb-6 rounded-b-lg'>
			<ul className='flex flex-wrap '>
				{paths.links.map((link) => (
					<MyLink
						key={v4()}
						href={link.link}
						text={link.label}
						className={link.link === router.asPath ? 'underline' : ''}
					/>
				))}
			</ul>
		</nav>
	);
};
export default AppNavbar;
