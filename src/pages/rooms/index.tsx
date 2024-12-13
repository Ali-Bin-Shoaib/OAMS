import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Center, Container, Loader, Select } from '@mantine/core';
import SuperJSON from 'superjson';
import { Orphan } from '@prisma/client';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios, { isAxiosError } from 'axios';
import myNotification from '../../../components/MyNotification';
import { STATUS_CODE, ROOM, ResponseType } from '../../../types';
import RoomTable from '../../../components/rooms/RoomTable';
import MyModal from '../../../components/common/MyModal';
import RoomForm from '../../../components/rooms/RoomForm';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const rooms = await prisma.room.findMany({
		select: {
			User: { select: { id: true, name: true } },
			Orphan: { select: { id: true, name: true } },
			capacity: true,
			number: true,
			wing: true,
			id: true,
		},
		orderBy: { id: 'asc' },
	});
	const orphans = await prisma.orphan.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true } });
	const data = { rooms, orphans };
	const stringJson = SuperJSON.stringify(data);
	return { props: { stringJson } };
};

interface Props {
	stringJson: string;
}
export default function Index({ stringJson }: Props) {
	console.log('Rooms Index');
	const { rooms, orphans } = SuperJSON.parse<{ rooms: ROOM[]; orphans: Pick<Orphan, 'id' | 'name'>[] }>(stringJson);

	const [orphanRoom, setOrphanRoom] = useState<ROOM[]>();
	const [id, setId] = useState<number>();
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	const fetchOrphanRoom = async (id: number) => {
		console.log('🚀 ~ file: index.tsx:45 ~ fetchOrphanRoom ~ id:', id);
		await axios
			.get<ResponseType>(`${serverLink}api/room/${Number(id)}`)
			.then((data) => {
				console.log('🚀 ~ file: index.tsx:46 ~ .then ~ data:', data);
				data.status === STATUS_CODE.OK
					? (setOrphanRoom(SuperJSON.parse(data.data.data) as ROOM[]),
					  myNotification('جلب البيانات', data.data.msg, 'green', <IconCheck />))
					: myNotification('جلب البيانات', data.data.msg, 'red', <IconX />);
			})
			.catch((e) => {
				if (isAxiosError(e)) {
					console.log('🚀 ~ file: index.tsx:57 ~ fetchOrphanRoom ~ e:', e);
					myNotification('لا يوجد بيانات', e.response?.data.msg, 'red', <IconX />);
				}
			});
	};
	useEffect(() => {
		setHydration(true);
		id && fetchOrphanRoom(id);
	}, [hydration, id, stringJson]);

	if (!hydration || !orphans) return <Loader size={100} />;
	return (
		<>
			<Center>
				<MyModal ModelForm={<RoomForm />} modalTitle={'Add Room'} buttonText={'Add Room'} modalSize={'xl'} />
			</Center>
			<Container p={10}>
				<Select
					onChange={(id) => {
						console.log('🚀 ~ file: index.tsx:71 ~ onChange={ ~ id:', id);
						setId(Number(id));
					}}
					label='الأيتام'
					placeholder='اختر يتيم'
					description={'اختر يتيم لعرض البيانات التعليمية'}
					searchable
					w={'45%'}
					withAsterisk
					nothingFound='اليتيم غير موجود'
					data={orphans?.map((x) => ({ value: x.id.toString(), label: x.name }))}
				/>
			</Container>

			<RoomTable rooms={orphanRoom || []} />
		</>
	);
}
