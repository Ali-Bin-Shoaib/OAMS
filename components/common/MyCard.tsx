import { Card, Center, Container, MantineColor, Paper, Text, useMantineTheme } from '@mantine/core';
import React, { useContext } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { ColorSchemeContext } from '../../shared/contexts';

interface Props {
	title: string | 'title';
	count?: number;
	color: MantineColor;
	icon: JSX.Element;
	className?: string | 'text-3xl text-white mr-4'; // optional prop
	path: Url;
}

export default function MyCard({ title, count, color, icon, className, path }: Props) {
	const scheme = useContext(ColorSchemeContext);
	const theme = useMantineTheme();

	return (
		<Card
			className='shadow-md hover:shadow-lg hover:cursor-pointer hover:shadow-slate-500 m-4  rounded-3xl w-60 max-w-xs transition-all 
			duration-300'
			withBorder
			radius='md'>
			<Link href={path} className={`no-underline flex flex-wrap  h-full w-full`}>
				{/* <div className=''> */}
				<Center sx={{ color: theme.colors[color][7] }} className='px-3 mx-auto '>
					{icon}
				</Center>

				<div className='p-3 w-full flex flex-col justify-between '>
					<h1 className={`${scheme === 'dark' ? 'text-gray-200' : 'text-gray-500'} font-bold text-3xl  my-1`}>{title}</h1>
					<h2 className={`${scheme === 'dark' ? 'text-gray-300' : 'text-gray-400'} font-semibold text-4xl  my-3`}>
						{count}
					</h2>
				</div>
				{/* </div> */}
			</Link>
		</Card>
	);
}
