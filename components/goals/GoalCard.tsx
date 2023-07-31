import { Card, Group, SimpleGrid } from '@mantine/core';
import { ActivityGoal, ActivityInfo, Goal, GoalEvaluation, User } from '@prisma/client';
import MyModal from '../common/MyModal';
import { Text } from '@mantine/core';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';

interface Props {
	goal?: Goal & {
		GoalEvaluation: GoalEvaluation[];
		ActivityGoal: (ActivityGoal & { ActivityInfo: ActivityInfo })[];
		User: User;
	};
}
function GoalCard({ goal }: Props) {
	console.log('🚀 ~ file: GoalCard.tsx:29 ~ GoalCard ~ goal:', goal);
	return (
		<>
			<Card shadow='sm' padding='lg' radius='md' withBorder>
				<SimpleGrid cols={1} spacing={'xl'} verticalSpacing={'md'}>
					<Text>
						<span className='font-bold'>ID</span>: {goal?.id}
					</Text>
					<Text>
						<span className='font-bold'>Title:</span> {goal?.title}
					</Text>
					<Text>
						<span className='font-bold'>Created By:</span> {goal?.User?.name}
					</Text>
					<Text>
						<span className='font-bold'>Total Evaluation in all Activity Executions:</span>{' '}
						{(goal?.GoalEvaluation &&
							(
								goal.GoalEvaluation.reduce((total, object) => total + object?.evaluation!, 0) / goal?.GoalEvaluation?.length
							).toFixed(2)) != 'NaN' || '0'}
					</Text>
					<Text>
						<span className='font-bold'>NO of Activities assign to :</span> {goal?.ActivityGoal.length}
					</Text>
					<Text>
						<span className='font-bold'>Activities titles assign this goal:</span>{' '}
						{goal?.ActivityGoal.map((x) => x.ActivityInfo.title).join(', ')}
					</Text>
					{/* <Text>Activities titles assign this goal: </Text>
					{goal.ActivityGoal.map((x) => (
						<Text key={x.id}>{x.ActivityInfo.title}</Text>
					))} */}
				</SimpleGrid>
			</Card>
		</>
	);
}
export default GoalCard;
