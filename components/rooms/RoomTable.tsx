import { useMemo, useState } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Divider, Group, Modal, Title, Tooltip } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconEdit, IconInfoCircle, IconX } from '@tabler/icons-react';
import DeleteModal from '../common/DeleteModal';
import MyModal from '../common/MyModal';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { Contact, ROOM, ResponseType, STATUS_CODE } from '../../types';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import RoomCard from './RoomCard';
import myNotification from '../MyNotification';
import RoomForm from './RoomForm';
interface Props {
	rooms: ROOM[];
}

function RoomTable({ rooms }: Props) {
	console.log('🚀 ~ file: RoomTable.tsx:21 ~ RoomTable ~ rooms:', rooms);
	console.log('🚀 ~ file: ~ RoomTable');

	const router = useRouter();
	const columns = useMemo<MRT_ColumnDef<ROOM>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: '#', maxSize: 60, size: 30 },
			{
				accessorFn: (row) => row?.User?.name,
				id: 'User.name',
				header: 'تمت الإضافة بواسطة',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.wing,
				id: 'wing',
				header: 'جناح الغرفة',
				maxSize: 50,
				size: 40,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.number,
				id: 'number',
				header: 'رقم الغرفة',
				maxSize: 50,
				size: 40,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.capacity,
				id: 'capacity',
				header: 'سعة الغرفة',
				maxSize: 50,
				size: 40,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Orphan.length,
				id: 'Orphan.length',
				header: 'عدد الأيتام',
				maxSize: 50,
				size: 40,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={rooms}
				initialState={{ density: 'xs' }}
				enableColumnResizing
				columnResizeMode='onEnd'
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableRowActions
				enableToolbarInternalActions
				// positionActionsColumn='last'
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'Room'} url={'api/room/'} />
						<MyModal
							ModelForm={<RoomForm room={row.original} />}
							modalTitle={'تعديل بيانات الغرفة'}
							buttonColor='yellow'
							icon={<IconEdit />}
							size='xs'
							tooltip='Edit'
							modalSize={'md'}
							m={0}
						/>
						<RoomInfo id={row.original.id!} />
					</Button.Group>
				)}
			/>
		</Container>
	);
}
export default RoomTable;
interface CardProps {
	id: number;
}
export function RoomInfo({ id }: CardProps) {
	const [opened, { open, close }] = useDisclosure(false);
	const [room, setRoom] = useState<ROOM>();
	return (
		<>
			<Modal opened={opened} size={'lg'} onClose={close}>
				<Title align='center'>معلومات التواصل</Title>
				<Divider m={10} p={10} />
				{room && <RoomCard room={room} />}
				<Group position='center'>
					<Button color='gray' m={15} onClick={close}>
						إغلاق
					</Button>
				</Group>
			</Modal>
			<Group>
				<Tooltip label={'تفاصيل'}>
					<Button
						size={'xs'}
						onClick={async () => {
							try {
								const res = await axios.get<ResponseType>(`${serverLink}api/room/${id}`);
								if (res.status === STATUS_CODE.OK) {
									console.log('🚀 ~ file: RoomTable.tsx:115 ~ onClick={ ~ res:', res);
									setRoom(res.data.data);
									open();
								} else {
									myNotification('Error', res.data.data.msg, 'red', <IconX />);
								}
							} catch (error) {
								myNotification('Error', error.response.msg, 'red', <IconX />);

								console.log('🚀 ~ file: ContactTable.tsx:122 ~ onClick={ ~ error:', error);
							}
						}}>
						{<IconInfoCircle />}
					</Button>
				</Tooltip>
			</Group>
		</>
	);
}
