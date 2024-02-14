import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import MyModal from '../../../components/common/MyModal';
import { Contact, ResponseType, STATUS_CODE } from '../../../types';
import ContactTable from '../../../components/contact/ContactTable';
import ContactForm from '../../../components/contact/ContactForm';
import { OrphanContext } from '../../../shared/contexts';
import { useContext, useEffect, useState } from 'react';
import { Center, Container, Group, Loader, Select, Skeleton } from '@mantine/core';
import axios from 'axios';
import { serverLink } from '../../../shared/links';
import myNotification from '../../../components/MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';

// ******************************** CRITERIA PAGE ********************************
// * get Goal from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.findMany({ select: { id: true, name: true } });
	console.log('🚀 ~ file: index.tsx:23 ~ constgetStaticProps:GetStaticProps= ~ orphans:', orphans);
	return orphans ? { props: { orphans } } : { props: {} };
};
interface Props {
	// contact: Contact[];
	orphans: { id: number; name: string }[] | undefined;
}
function Index({ orphans }: Props) {
	console.log('🚀 ~ file: index.tsx:27 ~ Index ~ orphans:', orphans);
	const [orphansList, setOrphansList] = useState(orphans);
	const [orphanContact, setOrphanContact] = useState<Contact[]>();
	console.log('🚀 ~ file: index.tsx:39 ~ Index ~ orphanContact:', orphanContact);
	const [id, setId] = useState<number>();
	const [isLoading, setIsLoading] = useState(false);
	const [hydration, setHydration] = useState(false);

	console.log('🚀 ~ file: index.tsx:39 ~ Index ~ id:', id);
	const fetchOrphanContact = async (id: number) => {
		setIsLoading(true);
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
		setIsLoading(false);
	};
	useEffect(() => {
		setOrphansList(orphans);
		id && fetchOrphanContact(id);
		setHydration(true);
	}, [id, orphans]);
	if (!hydration) return <Loader />;
	if (!orphans) return <h1>لا يوجد أيتام</h1>;
	return (
		<>
			<OrphanContext.Provider value={orphansList || []}>
				<Group px={'xl'} py={'xs'} position='apart' >
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
						label='الاسم'
						placeholder='الاسم'
						withAsterisk
						// error={errors.Orphan && errors.Orphan.name.message}
						description={<h4 className='text-orange-300 p-0 m-0'>اختر يتيم لعرض معلومات الاتصال</h4>}
						required
						// defaultValue={contact?.orphanId.toString()}
						searchable
						selectOnBlur
						w={'45%'}
						nothingFound='لا يوجد'
						hoverOnSearchChange
					/>
					<MyModal
						ModelForm={<ContactForm />}
						modalTitle={'أضف معلومات اتصال'}
						buttonText={'أضف معلومات اتصال'}
						modalSize={'md'}
					/>
				</Group>
				<Skeleton visible={isLoading}>
					<ContactTable contact={orphanContact || []} />
				</Skeleton>
			</OrphanContext.Provider>
		</>
	);
}
export default Index;
