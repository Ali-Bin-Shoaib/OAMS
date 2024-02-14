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
			<Card shadow='sm' padding='lg' radius='md' withBorder dir='rtl'>
				<SimpleGrid cols={1} spacing={'xl'} verticalSpacing={'md'}>
					<Text>
						<span className='font-bold'>#</span>: {goal?.id}
					</Text>
					<Text>
						<span className='font-bold'>الهدف:</span> {goal?.title}
					</Text>
					<Text>
						<span className='font-bold'>بواسطة:</span> {goal?.User?.name}
					</Text>
					<Text>
						<span className='font-bold'>التقييم الإجمالي لكل التنفيذات السابقة:</span>{' '}
						{(goal?.GoalEvaluation &&
							(
								goal.GoalEvaluation.reduce((total, object) => total + object?.evaluation!, 0) / goal?.GoalEvaluation?.length
							).toFixed(2)) != 'NaN' || '0'}
					</Text>
					<Text>
						<span className='font-bold'>عدد الأنشطة المرتبطة بالهدف :</span> {goal?.ActivityGoal.length}
					</Text>
					<Text>
						<span className='font-bold'>عناوين الأنشطة المرتبطة بالهدف:</span>{' '}
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
