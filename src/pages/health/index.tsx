import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Button, Container, Loader, Select } from '@mantine/core';
import SuperJSON from 'superjson';
import { EducationInfo, Orphan, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import EducationTable from '../../../components/education/EducationTable';
import axios from 'axios';
import myNotification from '../../../components/MyNotification';
import { STATUS_CODE, Behavior, Education, Health } from '../../../types';
import orphans from '../orphans';
import HealthTable from '../../../components/health/HealthTable';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const health = await prisma.healthInfo.findMany({
		include: { User: true, Orphan: true },
		orderBy: { id: 'asc' },
	});
	const orphans = await prisma.orphan.findMany({ orderBy: { id: 'asc' } });
	const data = { health, orphans };
	const stringJson = SuperJSON.stringify(data);
	return { props: { stringJson } };
};

interface Props {
	stringJson: string;
}
export default function Index({ stringJson }: Props) {
	console.log('Health Index');
	const { health, orphans } = SuperJSON.parse<{ health: Health[]; orphans: Orphan[] }>(stringJson);

	const [orphanHealth, setOrphanHealth] = useState<Health[]>();
	console.log('🚀 ~ file: index.tsx:37 ~ orphanHealth:', orphanHealth);
	const [id, setId] = useState<number>();
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	const fetchOrphanHealth = async (id: number) => {
		console.log('🚀 ~ file: index.tsx:40 ~ fetchOrphanHealth ~ id:', id);
		await axios
			.get(`${serverLink}api/health/${Number(id)}`)
			.then((data) => {
				console.log('🚀 ~ file: index.tsx:46 ~ .then ~ data:', data);
				data.status === STATUS_CODE.OK
					? (setOrphanHealth(SuperJSON.parse(data.data.data) as Health[]),
					  myNotification('Get Info', data.data.msg, 'green', <IconCheck />))
					: myNotification('Get Info', data.data.msg, 'red', <IconX />);
			})
			.catch((err) => {
				console.log('🚀 ~ file: index.tsx:52 ~ fetchOrphanHealth ~ e:', err);
				myNotification('Not Found', 'orphan has no related health info', 'red', <IconX />);
			});
	};
	useEffect(() => {
		setHydration(true);
		id && fetchOrphanHealth(id);
	}, [hydration, id, stringJson]);

	if (!hydration || !orphans) return <Loader size={100} />;
	return (
		<>
			<div className='text-center'>
				<Button size='xl' m={15} onClick={() => router.push(`${serverLink}health/create`)}>
					<IconPlus />
					Add new Health info
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
					description={'Select an orphan to show related health info'}
					searchable
					w={'45%'}
					withAsterisk
					nothingFound='Orphan Not Found'
					data={orphans?.map((x) => ({ value: x.id.toString(), label: x.name }))}
				/>
			</Container>

			<HealthTable health={orphanHealth || []} />
		</>
	);
}
