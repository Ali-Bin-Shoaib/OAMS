import { Group, Paper, Text, Loader, SimpleGrid, Button, Tooltip, Badge, Container } from '@mantine/core';
import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../lib/prisma';
import { Goal, ActivityInfo, User, ActivityGoal } from '@prisma/client';
import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../../../components/common/DeleteModal';
import { Pages } from '../../../shared/links';
import { _ActivityExecutionInfo } from '../../../types';
import { CalculateTotalEvaluation } from '../../../utils/Calculation';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	console.log('🚀 ~ file: [id].tsx:14 ~ constgetServerSideProps:GetServerSideProps= ~ id:', id);
	try {
		const activity = await prisma.activityInfo.findFirst({
			where: { id: id },
			include: {
				User: { select: { id: true, name: true } },
				ActivityExecutionInfo: { select: { GoalEvaluation: true, OrphanActivityExecution: true } },
				ActivityGoal: { select: { Goal: { select: { title: true } } }, orderBy: { id: 'asc' } },
			},
		});
		console.log('🚀 ~ file: [id].tsx:25 ~ constgetServerSideProps:GetServerSideProps= ~ activity:', activity);

		if (!activity) {
			return { props: {} };
		}
		const data = { activity };
		const stringData = SuperJSON.stringify(data);
		return { props: { stringData } };
	} catch (error) {
		console.log('🚀 ~ file: [id].tsx:36 ~ constgetServerSideProps:GetServerSideProps= ~ error:', error);
		return { props: {} };
	}
};

interface Props {
	stringData: string;
}
function Info({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const jsonData: {
		activity: ActivityInfo & {
			ActivityExecutionInfo: _ActivityExecutionInfo[];
			User: User;
			ActivityGoal: (ActivityGoal & {
				Goal: Goal;
			})[];
		};
	} = SuperJSON.parse(stringData);
	const { activity } = jsonData;
	console.log('🚀 ~ file: [id].tsx:39 ~ Edit ~ activity:', activity);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<div style={{ margin: 'auto', maxWidth: 800 }}>
			<h1 className='text-center shadow p-2 bg-slate-50'>Activity Info</h1>
			{/* add other components as needed */}
			{activity ? (
				<Paper p={'xl'} withBorder className='hover:shadow-md' m={40}>
					<SimpleGrid cols={2}>
						<Text weight={700}>ID:</Text>
						<Text>{activity.id}</Text>
						<Text weight={700}>Title:</Text>
						<Text>{activity.title}</Text>
						<Text weight={700}>User:</Text>
						<Text>{activity.User.name}</Text>
						<Text weight={700}>Date:</Text>
						<Text>{activity.date.toDateString()}</Text>
						<Text weight={700}>Budget:</Text>
						<Text>{activity.budget}</Text>
						<Text weight={700}>Target:</Text>
						<Text>{activity.target}</Text>
						<Text weight={700}>Type:</Text>
						<Text>{activity.type}</Text>
						<Text weight={700}>Quarter:</Text>
						<Text>{activity.quarter}</Text>
						<Text weight={700}>Goals:</Text>
						<Container p={0} m={0}>
							{activity.ActivityGoal.map((x) => (
								<Badge key={x.id}>{x.Goal.title}</Badge>
							))}
						</Container>
						<Text weight={700}>Executions:</Text>
						<Text>{activity.ActivityExecutionInfo.reduce((total, object) => total + 1, 0)}</Text>
						<Text weight={700}>Total Evaluation:</Text>
						<Text>
							{activity.ActivityExecutionInfo.map((x) => x) &&
							CalculateTotalEvaluation(
								activity.ActivityExecutionInfo.map((x) => x.GoalEvaluation!.map((x) => x.evaluation!)),
								activity.ActivityExecutionInfo.map((x) => x.OrphanActivityExecution!.map((x) => x.evaluation!))
							)?.toFixed(2) === 'NaN'
								? 0
								: CalculateTotalEvaluation(
										activity.ActivityExecutionInfo.map((x) => x.GoalEvaluation!.map((x) => x.evaluation!)),
										activity.ActivityExecutionInfo.map((x) => x.OrphanActivityExecution!.map((x) => x.evaluation!))
								  )?.toFixed(2)}
						</Text>
					</SimpleGrid>
					<Group position='right'>
						<Button.Group>
							<DeleteModal id={activity.id!} title={'activity'} url={'api/activity/'} redirectUrl={Pages.Activities.link} />
							<Tooltip label={'Edit'}>
								<Button
									size='xs'
									onClick={() => {
										router.push(`${Pages.Activities.link}edit/${activity.id}`);
									}}
									color='yellow'>
									<IconEdit />
								</Button>
							</Tooltip>
						</Button.Group>
					</Group>
				</Paper>
			) : (
				<Text>Loading...</Text>
			)}
		</div>
	);
}
export default Info;
