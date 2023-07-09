import { Group, Paper, Grid, Text, Loader, SimpleGrid, Button, Tooltip, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import { object, record } from 'zod';
import { Goal, ActivityInfo, User, ActivityGoal } from '@prisma/client';
import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import router from 'next/router';
import prisma from '../../../../lib/prisma';
import DeleteModal from '../../../../components/common/DeleteModal';
import { Pages } from '../../../../shared/links';
import { _ActivityExecutionInfo } from '../../../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.infoId);
	console.log('🚀 ~ file: [infoId].tsx:16 ~ constgetServerSideProps:GetServerSideProps= ~ id:', id);
	const activityExecution = await prisma.activityExecutionInfo.findFirst({
		where: { id: id },
		include: {
			Executor: true,
			ActivityInfo: { include: { User: true } },
			GoalEvaluation: { include: { Goal: true } },
			OrphanActivityExecution: { include: { Orphan: true } },
		},
	});
	console.log(
		'🚀 ~ file: [infoId].tsx:27 ~ constgetServerSideProps:GetServerSideProps= ~ activityExecution:',
		activityExecution
	);

	if (!activityExecution) {
		return { notFound: true };
	}
	const data = { activityExecution };
	const stringData = SuperJSON.stringify(data);
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Info({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const jsonData: { activityExecution: _ActivityExecutionInfo } = SuperJSON.parse(stringData);
	const { activityExecution } = jsonData;
	console.log('🚀 ~ file: [id].tsx:39 ~ Edit ~ activity:', activityExecution);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<div style={{ margin: 'auto', maxWidth: 800 }}>
			<Group position='center' style={{ margin: 20 }}>
				<Title weight={700}>Activity Execution Info</Title>
				{/* add other components as needed */}
			</Group>
			{activityExecution ? (
				<Paper p={'xl'} shadow='sm' m={40}>
					<SimpleGrid cols={2}>
						<Text weight={700}>ID:</Text>
						<Text>{activityExecution.id}</Text>
						<Text weight={700}>Activity Title:</Text>
						<Text>{activityExecution.ActivityInfo.title}</Text>
						<Text weight={700}>Executer:</Text>
						<Text>{activityExecution.Executor.name}</Text>
						<Text weight={700}>Start Date:</Text>
						<Text>{activityExecution.startDate.toDateString()}</Text>
						<Text weight={700}>Cost:</Text>
						<Text>{activityExecution.cost}</Text>
						<Text weight={700}>Description:</Text>
						<Text>{activityExecution.description}</Text>
						<Text weight={700}>Note:</Text>
						<Text>{activityExecution.note}</Text>
						<Text weight={700}>Goals:</Text>
						{/* <Text>{activityExecution.GoalEvaluation.map((x) => x.Goal.title).join(',')}</Text> */}
						<Group>
							{activityExecution.GoalEvaluation.map((x) => {
								return (
									<Text key={x.id}>
										{x.Goal.title} : {x.evaluation}
									</Text>
								);
							})}
						</Group>
						<Text weight={700}>Evaluation:</Text>
						<Text>
							{(
								(activityExecution.GoalEvaluation.reduce((total, object) => total + object.evaluation, 0) /
									activityExecution.GoalEvaluation.length +
									activityExecution.OrphanActivityExecution.reduce((total, object) => total + object.evaluation, 0) /
										activityExecution.OrphanActivityExecution.length) /
								2
							).toFixed(2)}
						</Text>
					</SimpleGrid>
					<Group position='right'>
						<Button.Group>
							<DeleteModal
								id={activityExecution.id!}
								title={'ActivityExecution'}
								url={'api/execute/'}
								updateCard={undefined}
							/>

							<Tooltip label={'Edit'}>
								<Button
									size='xs'
									onClick={() => {
										router.push(`${Pages.ActivityExecution.link}edit/${activityExecution.id}`);
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
