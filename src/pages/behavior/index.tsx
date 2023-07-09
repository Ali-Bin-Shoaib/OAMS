import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import AppHead from '../../../components/common/AppHead';
import { useEffect, useState } from 'react';
import { Button, Container, Loader, Select, Text } from '@mantine/core';
import { Behavior, STATUS_CODE, _Attendance, _Orphan } from '../../../types';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import BehaviorTable from '../../../components/behavior/BehaviorTable';
import { Orphan } from '@prisma/client';
import axios from 'axios';
import myNotification from '../../../components/MyNotification';
import SuperJSON from 'superjson';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async (context) => {
	const orphans = await prisma.orphan.findMany({
		where: {
			BehaviorInfo: {
				some: {},
			},
		},
	});
	return { props: { orphans } };
};

interface Props {
	// behaviors: Behavior[];
	orphans: Orphan[];
}
export default function Index({ orphans }: Props) {
	console.log('Behavior Index');
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	const title = usePageTitle();
	const [id, setId] = useState<number>(undefined);
	const [orphanBehavior, setOrphanBehavior] = useState<Behavior[]>(undefined);
	const fetchOrphanBehavior = async (id: number) => {
		await axios
			.get(`${serverLink}api/behavior/getOrphanBehaviors/${Number(id)}`)
			.then((data) => {
				data.status === STATUS_CODE.OK
					? (setOrphanBehavior(SuperJSON.parse(data.data.data) as Behavior[]),
					  myNotification('Get Info', data.data.msg, 'green', <IconCheck />))
					: myNotification('Get Info', data.data.msg, 'red', <IconX />);
			})
			.catch((e) => {
				myNotification('Not Found', e.response.data, 'red', <IconX />);
			});
	};
	useEffect(() => {
		setHydration(true);
		id && fetchOrphanBehavior(id);
	}, [hydration, orphans, id]);

	if (!hydration || !orphans) return <Loader size={100} />;
	return (
		<>
			<AppHead title={title} />
			<div className='text-center'>
				<Button size='xl' m={15} onClick={() => router.push(`${serverLink}behavior/create`)}>
					<IconPlus />
					Add new Behavior
				</Button>
			</div>
			<Container p={10}>
				{/* <Text>Select an orphan to show related behavior info</Text> */}
				<Select
					onChange={async (id) => {
						setId(Number(id));
					}}
					label='Orphans'
					placeholder='choose orphan'
					description={'Select an orphan to show related behavior info'}
					searchable
					w={'45%'}
					withAsterisk
					nothingFound='Not Found'
					data={orphans?.map((x) => ({ value: x.id.toString(), label: x.name }))}
				/>
			</Container>
			{/* {orphanBehavior != undefined && <BehaviorTable behavior={orphanBehavior} />} */}
			<BehaviorTable behavior={orphanBehavior ? orphanBehavior : []} />
		</>
	);
}
