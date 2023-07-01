import { Button, NavLink, UnstyledButton, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

interface Props {
	href: string;
	label: string;
	className?: string;
	onClick?: (event: any) => void;
}
export default function MyLink({ href = '/', label = 'link', className = '', onClick }: Props) {
	const theme = useMantineTheme();

	return (
		<>
			<Link onClick={onClick} href={href} className={` ${className}`}>
				{label}
			</Link>
		</>
	);
}
