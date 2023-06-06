import { GetServerSideProps } from 'next';
import prisma from '../../../../lib/prisma';
import { _ActivityExecutionInfo, _ActivityInfo } from '../../../../types/types';
import ActivityExecutionTable from '../../../../components/activityExecution/ActivityExecutionTable';
import { Container, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import SuperJSON from 'superjson';
import activities from '..';
import { usePageTitle } from '../../../../hooks/usePageTitle';
import ActivityExecutionCard from '../../../../components/activityExecution/ActivityExecutionCard';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const activitiesExecutions = await prisma.activityExecutionInfo.findMany({
		include: {
			Executor: true,
			ActivityInfo: true,
			GoalEvaluation: { include: { Goal: true } },
			OrphanActivityExecution: true,
		},
		orderBy: { id: 'asc' },
	});
	if (activitiesExecutions) {
		return { props: { activitiesExecutions } };
	}
	return { notFound: true };
};
interface Props {
	activitiesExecutions: _ActivityExecutionInfo[];
}
function Index({ activitiesExecutions }: Props) {
	console.log('🚀 ~ file: index.tsx:26 ~ Index ~ activitiesExecutions:', activitiesExecutions);
	console.log('ActivityExecution Index');
	// const jsonData: { activities: _ActivityExecutionInfo[] } = SuperJSON.parse(stringData);
	// const { activities } = jsonData;
	const [activitiesExecutionList, setActivitiesExecutionList] = useState<_ActivityExecutionInfo[]>(activitiesExecutions);
	const [cardInfo, setCardInfo] = useState<_ActivityExecutionInfo>(activitiesExecutions[0]);
	const [hydration, setHydration] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const title = usePageTitle();
	const router = useRouter();
	const updateCard = (activityExecution: _ActivityExecutionInfo) => {
		activityExecution ? setCardInfo(activityExecution) : setCardInfo(activities[0]);
	};

	useEffect(() => {
		// setActivitiesList(SuperJSON.parse(stringData));
		setCardInfo(cardInfo);

		setHydration(true);
	}, [hydration, cardInfo]);

	// if (!hydration || !jsonData) return <Loader size={100} />;
	if (!hydration) return <Loader size={100} />;

	return (
		<>
			<h1>activities Ids:</h1>
			<Container fluid px={10}>
				{activitiesExecutions.map((x) => x.activityInfoId)}
				<h1>activityExecution Index</h1>
				{/* <ActivityExecutionCard activityExecutionInfo={cardInfo} updateCard={updateCard} /> */}
				<ActivityExecutionTable activitiesExecutions={activitiesExecutions} updateCard={updateCard} />
			</Container>
		</>
	);
}
export default Index;