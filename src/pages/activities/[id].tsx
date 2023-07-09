import { Group, Paper, Grid, Text, Loader, SimpleGrid, Button, Tooltip, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import { record } from 'zod';
import prisma from '../../../lib/prisma';
import { Goal, ActivityInfo, User, ActivityGoal } from '@prisma/client';
import { useState, useEffect } from 'react';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { IconEdit } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../../../components/common/DeleteModal';
import { Pages } from '../../../shared/links';
import { _ActivityExecutionInfo } from '../../../types';
import { CalculateAverage, CalculateTotalEvaluation } from '../../../utils/Calculation';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	console.log('🚀 ~ file: [id].tsx:14 ~ constgetServerSideProps:GetServerSideProps= ~ id:', id);
	const activity = await prisma.activityInfo.findFirst({
		where: { id: id },
		include: {
			User: true,
			ActivityExecutionInfo: { include: { GoalEvaluation: true, OrphanActivityExecution: true } },
			ActivityGoal: { include: { Goal: true }, orderBy: { id: 'asc' } },
		},
	});

	if (!activity) {
		return { notFound: true };
	}
	console.log('🚀 ~ file: [id].tsx:16 ~ constgetServerSideProps:GetServerSideProps= ~ activity:', activity);
	const data = { activity };
	const stringData = SuperJSON.stringify(data);
	return { props: { stringData } };
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
	// console.log('🚀 ~ file: [id].tsx:39 ~ Edit ~ activity:', activity);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<div style={{ margin: 'auto', maxWidth: 800 }}>
			<Group position='center' style={{ margin: 20 }}>
				<Title weight={700}>Activity Info</Title>
				{/* add other components as needed */}
			</Group>
			{activity ? (
				<Paper p={'xl'} shadow='sm' m={40}>
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
						<Text>{activity.ActivityGoal.map((x) => x.Goal.title).join(',')}</Text>
						<Text weight={700}>No Of Execution:</Text>
						<Text>{activity.ActivityExecutionInfo.reduce((total, object) => total + 1, 0)}</Text>
						<Text weight={700}>Total Evaluation:</Text>
						<Text>
							{CalculateTotalEvaluation(
								activity.ActivityExecutionInfo.map((x) => x.GoalEvaluation.map((x) => x.evaluation)),
								activity.ActivityExecutionInfo.map((x) => x.OrphanActivityExecution.map((x) => x.evaluation))
							).toFixed(2)}
						</Text>
					</SimpleGrid>
					<Group position='right'>
						<Button.Group>
							<DeleteModal id={activity.id!} title={'activity'} url={'api/activity/'} updateCard={undefined} />

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
