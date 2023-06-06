import { Button, NavLink, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

interface Props {
	href: string;
	text: string;
	className?: string;
	// onClick?: any | undefined;
}
export default function MyLink({ href = '/', text = 'link', className = '' }: Props) {
	const theme = useMantineTheme();

	return (
		<Link href={href} className={'p-2 m-2 text-xl font-semibold  ' + className}>
			{text}
		</Link>
	);
}
