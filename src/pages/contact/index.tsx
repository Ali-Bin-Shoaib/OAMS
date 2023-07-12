import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import MyModal from '../../../components/common/MyModal';
import { Contact, ResponseType, STATUS_CODE } from '../../../types';
import ContactTable from '../../../components/contact/ContactTable';
import ContactForm from '../../../components/contact/ContactForm';
import { OrphanContext } from '../../../shared/contexts';
import { useEffect, useState } from 'react';
import { Center, Container, Group, Select } from '@mantine/core';
import axios from 'axios';
import { serverLink } from '../../../shared/links';
import myNotification from '../../../components/MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';

// ******************************** CRITERIA PAGE ********************************
// * get Goal from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	// const contact = await prisma.emergencyContactInfo.findMany({
	// 	include: { User: { select: { id: true, name: true } }, Orphan: { select: { id: true, name: true } } },
	// 	orderBy: { id: 'asc' },
	// });
	const orphans = await prisma.orphan.findMany({ select: { id: true, name: true } });
	if (!orphans) return { notFound: true };
	// contact.sort(function (a, b) {
	// 	return a.id > b.id ? 1 : -1;
	// });
	// return { props: { contact, orphans } };
	return { props: { orphans } };
};
interface Props {
	// contact: Contact[];
	orphans?: { id: number; name: string }[];
}
function Index({ orphans }: Props) {
	const [orphansList, setOrphansList] = useState(orphans);
	const [orphanContact, setOrphanContact] = useState<Contact[]>(undefined);
	console.log('🚀 ~ file: index.tsx:39 ~ Index ~ orphanContact:', orphanContact);
	const [id, setId] = useState<number>(undefined);
	console.log('🚀 ~ file: index.tsx:39 ~ Index ~ id:', id);
	const fetchOrphanContact = async (id: number) => {
		try {
			const res = await axios.get<ResponseType>(`${serverLink}api/contact/${Number(id)}orphanId`);
			console.log('🚀 ~ file: index.tsx:44 ~ fetchOrphanContact ~ res:', res);
			if (res.status === STATUS_CODE.OK) {
				setOrphanContact(res.data.data as Contact[]);
				myNotification('Get Info', res.data.msg, 'green', <IconCheck />);
			} else {
				setOrphanContact(undefined);
				myNotification('Get Info', res.data.msg, 'red', <IconX />);
			}
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:49 ~ fetchOrphanContact ~ error:', error);
			setOrphanContact(undefined);

			myNotification('Not Found', error.response.data.msg, 'red', <IconX />);
		}
	};
	useEffect(() => {
		setOrphansList(orphans);
		id && fetchOrphanContact(id);
	}, [id, orphans]);
	return (
		<>
			<OrphanContext.Provider value={orphansList}>
				<Group px={'xl'} py={'xs'} position='apart'>
					<Select
						onChange={(id) => {
							console.log('🚀 ~ file: index.tsx:61 ~ Index ~ id:', id);
							setId(Number(id));
							// setValue('orphanId', Number(id));
							// setValue(
							// 	'Orphan',
							// 	orphans.find((x) => x.id === Number(id))
							// );
						}}
						data={orphans.map((x) => ({ label: x.name, value: x.id.toString() }))}
						size='md'
						label='Orphan name'
						placeholder='Orphan name'
						withAsterisk
						// error={errors.Orphan && errors.Orphan.name.message}
						description='select an orphan to show related emergency contact info'
						required
						// defaultValue={contact?.orphanId.toString()}
						searchable
						selectOnBlur
						w={'45%'}
						nothingFound='Not Found'
						hoverOnSearchChange
					/>
					<MyModal ModelForm={<ContactForm />} modalTitle={'Add Contact'} buttonText={'Add Contact'} modalSize={'md'} />
				</Group>

				<ContactTable contact={orphanContact || []} />
			</OrphanContext.Provider>
		</>
	);
}
export default Index;
