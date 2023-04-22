import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import MyLink from './MyLink';
import { Group, Switch } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
interface Props {
	updateThem: () => void;
}
const AppNavbar = ({ updateThem }: Props) => {
	const router = useRouter();

	const paths = {
		links: [
			{ label: 'Home', link: '/' },
			{ label: 'orphans', link: '/orphans' },
		],
	};
	return (
		<nav className='w-full bg-blue-500 text-white mb-6 rounded-b-lg  flex '>
			<ul className='flex flex-wrap w-full'>
				{paths.links.map((link) => (
					<MyLink
						key={v4()}
						href={link.link}
						text={link.label}
						className={link.link === router.asPath ? 'bg-blue-400' : ''}
					/>
				))}
			</ul>
			<Group className='justify-end'>
				<Switch
					size='xl'
					onClick={updateThem}
					onLabel={<IconSun size='1rem' stroke={2.5} />}
					offLabel={<IconMoonStars size='1rem' stroke={2.5} />}
				/>
			</Group>
		</nav>
	);
};
export default AppNavbar;
