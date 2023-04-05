import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import MyLink from './MyLink';

const AppNavbar = () => {
	const router = useRouter();
	const paths = {
		Home: '/',
		orphans: '/orphans/',
		create: '/orphans/create',
		update: '/orphans/update',
		remove: '/orphans/remove',
	};

	return (
		<nav className='w-full bg-blue-500 text-white p-3 mb-6 rounded-b-lg'>
			<ul className='flex flex-wrap '>
				<MyLink href={paths.Home} text='Home' />
				<MyLink href={paths.orphans} text='Orphans' />
				<MyLink href={paths.create} text='Create' />
				<MyLink href={paths.update} text='Update' />
				<MyLink href={paths.remove} text='Remove' />
			</ul>
		</nav>
	);
};
export default AppNavbar;
