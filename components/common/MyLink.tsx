import { NavLink } from '@mantine/core';
import Link from 'next/link';

export default function MyLink({ href = '/', text = 'link', className = '' }) {
	return (
		<Link href={href} className={'p-2 m-2 text-xl font-semibold ' + className}>
			{text}
		</Link>

		// <NavLink
		// 	label={
		// 		<Link href={href} className={'p-2 m-2 text-xl font-semibold '}>
		// 			{text}
		// 		</Link>
		// 	}
		// />

		// <List.Item className={'p-2  list-item rounded ' + className}>
		// <Link href={href} className={'p-2 m-2 text-xl font-semibold '}>
		// 	{text}
		// </Link>
		// </List.Item>
	);
}
