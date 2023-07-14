import { Card, Group, SimpleGrid } from '@mantine/core';
import { Text } from '@mantine/core';
import { Contact, ROOM } from '../../types';

interface Props {
	room: ROOM;
}
function RoomCard({ room }: Props) {
	return (
		<>
			<Card shadow='sm' padding='lg' radius='md' withBorder>
				<SimpleGrid cols={2} spacing={'xl'} verticalSpacing={'md'}>
					<Text weight={700}>ID: </Text>
					<Text>{room.id}</Text>
					<Text weight={700}>Created By: </Text>
					<Text> {room.User.name}</Text>
					<Text weight={700}>Person Name: </Text>
					<Text> {room.wing}</Text>
					<Text weight={700}>Phone Number: </Text>
					<Text> {room.number}</Text>
					<Text weight={700}>Orphans in the room: </Text>
					<Text className='text-ellipsis overflow-hidden'> {room.Orphan.map((x) => x.name).join(',')}</Text>
				</SimpleGrid>
			</Card>
		</>
	);
}
export default RoomCard;
