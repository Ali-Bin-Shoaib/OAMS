import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import MyModal from '../../../components/common/MyModal';
import { Contact, ResponseType, STATUS_CODE } from '../../../types';
import ContactTable from '../../../components/contact/ContactTable';
import ContactForm from '../../../components/contact/ContactForm';
import { OrphanContext } from '../../../shared/contexts';
import { useEffect, useState } from 'react';
import { Center, Container, Group, Select } from '@mantine/core';
import { errors } from 'formidable';
import axios from 'axios';
import { serverLink } from '../../../shared/links';
import SuperJSON from 'superjson';
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
	const [orphanContact, setOrphanContact] = useState<Contact[]>([]);
	const [id, setId] = useState<number>(undefined);
	const fetchOrphanContact = async (id: number) => {
		await axios
			.get<ResponseType>(`${serverLink}api/contact/${Number(id)}orphanId`)
			.then((data) => {
				console.log('🚀 ~ file: index.tsx:40 ~ .then ~ data:', data);
				data.status === STATUS_CODE.OK
					? (setOrphanContact(data.data.data as Contact[]),
					  myNotification('Get Info', data.data.msg, 'green', <IconCheck />))
					: (setOrphanContact([]), myNotification('Get Info', data.data.msg, 'red', <IconX />));
			})
			.catch((e) => {
				console.log('🚀 ~ file: index.tsx:50 ~ fetchOrphanContact ~ e:', e);
				myNotification('Not Found', e.response.data.msg, 'red', <IconX />);
			});
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
