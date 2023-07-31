import { Avatar, Container, Divider, Flex, Group, List, Rating, Text, useMantineColorScheme } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
	w?: string | number;
}
export default function ListComponent({ children, className = '' }: Props) {
	const { colorScheme } = useMantineColorScheme();
	return (
		<>
			<List
				className={` border-solid border-gray-400 border-spacing-3 rounded-md pl-3 my-2 mx-5 mt-4 h-screen 
				overflow-y-auto scrollbar scroll-smooth  shadow-xl m-0.5 ${className}`}>
				{children}
			</List>
		</>
	);
}
interface ListItemProps {
	id?: number;
	img?: string | StaticImageData;
	title?: string;
	leftData?: { label?: string; data: string | number };
	middleData?: { label?: string; data: string | number };
	rightData?: { label?: string; data: string | number };
	className?: string;
	onClick?: MouseEventHandler<HTMLLIElement>;
}
export function ListItemComponent({
	id,
	img,
	title,
	leftData,
	middleData,
	rightData,
	className = '',
	onClick,
}: ListItemProps) {
	const { colorScheme } = useMantineColorScheme();
	return (
		<>
			{/* <Card withBorder className='hover:bg-gray-200'> */}
			<List.Item
				className={`list-none hover:bg-gray-100 hover:cursor-pointer my-0.5 px-2 py-3 border border-gray-50 border-solid 
				rounded-md w-full  bg-white ${className}`}
				// w={'100%'}
				// py={10}
				onClick={onClick}
				icon={
					img && (
						<Avatar>
							<Image src={img} alt={title!} width={50} height={50} />
						</Avatar>
					)
				}>
				<div className='flex  flex-row content-between w-full'>
					<div>
						<h3 className='text-ellipsis overflow-hidden m-0 max-w-xs w-52 whitespace-nowrap'>{title}</h3>
						<Group position='apart'>
							<Text className='text-ellipsis overflow-hidden'>
								{leftData?.label}: {leftData?.data}
							</Text>

							<Text className='text-ellipsis overflow-hidden mx-5'>{middleData?.data}</Text>
							<Rating readOnly value={rightData?.data as number} />
						</Group>
					</div>
				</div>
			</List.Item>
			{/* </Card> */}
			<Divider py={4} />
		</>
	);
}
