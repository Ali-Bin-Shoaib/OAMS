import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Button, Container, Loader, Select } from '@mantine/core';
import SuperJSON from 'superjson';
import { Orphan } from '@prisma/client';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import EducationTable from '../../../components/education/EducationTable';
import axios from 'axios';
import myNotification from '../../../components/MyNotification';
import { STATUS_CODE, Education, ResponseType } from '../../../types';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const education = await prisma.educationInfo.findMany({
		include: { User: true, Orphan: true },
		orderBy: { id: 'asc' },
	});
	const orphans = await prisma.orphan.findMany({ orderBy: { id: 'asc' } });
	const data = { education, orphans };
	const stringJson = SuperJSON.stringify(data);
	return { props: { stringJson } };
};

interface Props {
	stringJson: string;
}
export default function Index({ stringJson }: Props) {
	console.log('Education Index');
	const { education, orphans } = SuperJSON.parse<{ education: Education[]; orphans: Orphan[] }>(stringJson);

	const [orphanEducation, setOrphanEducation] = useState<Education[]>();
	const [id, setId] = useState<number>();
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	const fetchOrphanEducation = async (id: number) => {
		console.log('🚀 ~ file: index.tsx:40 ~ fetchOrphanEducation ~ id:', id);
		try {
			const res = await axios.get<ResponseType>(`${serverLink}api/education/getOrphanEducation/${Number(id)}`);
			if (res.status === STATUS_CODE.OK) {
				console.log('🚀 ~ file: index.tsx:46 ~ .then ~ data:', res.data);
				setOrphanEducation(SuperJSON.parse(res.data.data) as Education[]);
				myNotification('Get Info', res.data.msg, 'green', <IconCheck />);
			} else {
				myNotification('Get Info', res.data.msg, 'red', <IconX />);
			}
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:53 ~ fetchOrphanEducation ~ error:', error);
			setOrphanEducation([]);
			myNotification('Get Info', error.response.data, 'red', <IconX />);
		}
	};
	useEffect(() => {
		setHydration(true);
		id && fetchOrphanEducation(id);
	}, [hydration, id, stringJson]);

	if (!hydration || !orphans) return <Loader size={100} />;
	return (
		<>
			<div className='text-center'>
				<Button size='xl' m={15} onClick={() => router.push(`${serverLink}education/create`)}>
					<IconPlus />
					Add new Education info
				</Button>
			</div>
			<Container p={10}>
				<Select
					onChange={(id) => {
						console.log('🚀 ~ file: index.tsx:71 ~ onChange={ ~ id:', id);
						setId(Number(id));
					}}
					label='Orphans'
					placeholder='choose orphan'
					description={'Select an orphan to show related education info'}
					searchable
					w={'45%'}
					withAsterisk
					nothingFound='Orphan Not Found'
					data={orphans?.map((x) => ({ value: x.id.toString(), label: x.name }))}
				/>
			</Container>

			<EducationTable education={orphanEducation || []} action={true} />
		</>
	);
}
