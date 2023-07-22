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
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 60, size: 30 },
			{
				accessorFn: (row) => row?.User?.name,
				id: 'User.name',
				header: 'Created By',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.name,
				id: 'name',
				header: 'Name',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.phone,
				id: 'phone',
				header: 'Phone number',
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
				initialState={{ density: 'xs' }}
				enableColumnResizing
				columnResizeMode='onEnd'
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableRowActions
				enableToolbarInternalActions
				positionActionsColumn='last'
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'Contact'} url={'api/contact/'} />
						<MyModal
							ModelForm={<ContactForm contact={row.original} />}
							modalTitle={'Edit Contact'}
							buttonColor='yellow'
							icon={<IconEdit />}
							size='xs'
							tooltip='Edit'
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
				<Title align='center'>Contact Info</Title>
				<Divider m={10} p={10} />
				{contact && <ContactCard contact={contact} />}
				<Group position='center'>
					<Button color='gray' m={15} onClick={close}>
						Close
					</Button>
				</Group>
			</Modal>
			<Group>
				<Tooltip label={'Info'}>
					<Button
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
