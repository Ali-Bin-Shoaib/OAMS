import { Card, MantineColor } from '@mantine/core';
import React from 'react';

interface Props {
	title: string | 'title';
	count: number | 55;
	color: MantineColor;
	icon: JSX.Element;
	className?: string | 'text-3xl text-white mr-4'; // optional prop
}

export default function MyCard({ title, count, color, icon, className }: Props) {
	return (
		<Card
			className='hover:-translate-y-1 hover:shadow-md hover:cursor-pointer'
			m={25}
			shadow='md'
			radius='lg'
			w={330}
			h={250}
			bg={color}
			style={{
				display: 'flex',
				alignItems: 'center',
				transform: 'translateY(0)',
				transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
			}}>
			{React.cloneElement(icon, { className })}
			<div>
				<div className='text-white font-semibold text-3xl mx-5'>{title}</div>
				<div className='text-white font-bold text-4xl mx-5'>{count}</div>
			</div>
		</Card>
	);
}
