import { useMemo, useState } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Divider, Group, Modal, Title, Tooltip } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconEdit, IconInfoCircle } from '@tabler/icons-react';
import DeleteModal from '../common/DeleteModal';
import MyModal from '../common/MyModal';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import ContactForm from './ContactForm';
import ContactCard from './ContactCard';
import { Contact, STATUS_CODE } from '../../types';
import axios from 'axios';
import { serverLink } from '../../shared/links';
interface Props {
	contact: Contact[];
}

function ContactTable({ contact }: Props) {
	console.log('🚀 ~ file: ContactTable.tsx:20 ~ ContactTable ~ contact:', contact);
	console.log('🚀 ~ file: ~ ContactTable');

	const router = useRouter();
	const columns = useMemo<MRT_ColumnDef<Contact>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: '#', maxSize: 60, size: 30 },
			{
				accessorFn: (row) => row?.User?.name,
				id: 'User.name',
				header: 'بواسطة',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.name,
				id: 'name',
				header: 'الاسم',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.phone,
				id: 'phone',
				header: 'رقم الجوال',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={contact}
				// positionActionsColumn='last'
				displayColumnDefOptions={{ 'mrt-row-actions': { size: 0 } }}
				initialState={{ density: 'xs' }}
				enableColumnResizing
				columnResizeMode='onEnd'
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableRowActions
				enableToolbarInternalActions
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'جهة الاتصال'} url={'api/contact/'} />
						<MyModal
							ModelForm={<ContactForm contact={row.original} />}
							modalTitle={'تعديل جهة الاتصال'}
							buttonColor='yellow'
							icon={<IconEdit />}
							size='xs'
							tooltip='تعديل'
							modalSize={'md'}
							m={0}
						/>
						<ContactInfo id={row.original.id!} />
					</Button.Group>
				)}
			/>
		</Container>
	);
}
export default ContactTable;
interface CardProps {
	id: number;
}
export function ContactInfo({ id }: CardProps) {
	const [opened, { open, close }] = useDisclosure(false);
	const [contact, setContact] = useState<Contact>();
	return (
		<>
			<Modal opened={opened} size={'lg'} onClose={close}>
				<Title align='center'>معلومات جهة الاتصال</Title>
				<Divider m={10} p={10} />
				{contact && <ContactCard contact={contact} />}
				<Group position='center'>
					<Button color='gray' m={15} onClick={close}>
						إغلاق
					</Button>
				</Group>
			</Modal>
			<Group>
				<Tooltip label={'تفاصيل'}>
					<Button
						color='gray'
						size={'xs'}
						onClick={async () => {
							try {
								const res = await axios.get(`${serverLink}api/contact/${id}`);
								console.log('🚀 ~ file: ContactTable.tsx:115 ~ res:', res);
								if (res.status === STATUS_CODE.OK) {
									setContact(res.data.data);
									open();
								} else {
								}
							} catch (error) {
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
