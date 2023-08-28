import { Divider, SimpleGrid, Text } from '@mantine/core';
import { v4 } from 'uuid';
import { ReactNode } from 'react';
interface Props {
	data: { label: string; value: ReactNode }[];
	title?: string;
}
function InfoComponent({ data, title }: Props) {
	return (
		<>
			{title && <h1 className='text-center shadow p-2'>{title}</h1>}
			{data.map((x) => (
				<SimpleGrid key={v4()} cols={2}>
					<Text weight={700} p={5}>
						{x.label}
					</Text>
					<Text p={5}>{x.value}</Text>
				</SimpleGrid>
			))}
		</>
	);
}
export default InfoComponent;
