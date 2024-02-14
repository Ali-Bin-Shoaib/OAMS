import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Button, Group, Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import { _ActivityInfo, _Orphan, _Sponsor, _Sponsorship, _User } from '../../../types';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import dynamic from 'next/dynamic';

// ******************************** ACTIVITYiNFO PAGE ********************************
// * get activity from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const activities = await prisma.activityInfo.findMany({
		include: {
			User: { select: { id: true, name: true } },
			ActivityGoal: { select: { Goal: { select: { id: true, title: true } } } },
		},
		orderBy: { id: 'asc' },
	});
	if (!activities) return { props: { undefined } };
	activities.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	const data = { activities };
	const stringData = SuperJSON.stringify(data);
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
export default function Index({ stringData }: Props) {
	console.log('ActivityList Index');
	const ActivityTable = dynamic(() => import('../../../components/activities/ActivityTable'));

	const jsonData: { activities: _ActivityInfo[] } = SuperJSON.parse(stringData);
	const { activities } = jsonData;
	const [activitiesList, setActivitiesList] = useState<_ActivityInfo[]>(activities);
	const [cardInfo, setCardInfo] = useState<_ActivityInfo>(activitiesList[0]);
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	const updateCard = (activityInfo: _ActivityInfo) => {
		activityInfo ? setCardInfo(activityInfo) : setCardInfo(activities[0]);
	};

	useEffect(() => {
		setActivitiesList(SuperJSON.parse(stringData));
		setCardInfo(cardInfo);

		setHydration(true);
	}, [hydration, stringData, cardInfo]);

	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<>
			<div className='text-center pb-4'>
				<Group position='center'>
					<Button size='xl' m={15} onClick={() => router.push(serverLink + 'activities/create')}>
						<IconPlus />
						أضف نشاط جديد
					</Button>
				</Group>
				<ActivityTable activities={activities} />
			</div>
		</>
	);
}
