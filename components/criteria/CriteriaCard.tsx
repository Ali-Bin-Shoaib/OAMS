import { Card, Group, SimpleGrid } from '@mantine/core';
import { BehaviorCriteria, BehaviorInfo, Criteria, User } from '@prisma/client';
import { Text } from '@mantine/core';

interface Props {
	criterion?: Criteria & {
		BehaviorCriteria: BehaviorCriteria[];
		BehaviorInfo: (BehaviorInfo & { BehaviorCriteria: BehaviorCriteria[] })[];
		User: User;
	};
	id?: number;
}
function CriteriaCard({ criterion, id }: Props) {
	console.log('🚀 ~ file: CriteriaCard.tsx:17 ~ CriteriaCard ~ criteria:', criterion);
	return (
		<>
			<Card shadow='sm' padding='lg' radius='md' withBorder>
				<SimpleGrid cols={1} spacing={'xl'} verticalSpacing={'md'}>
					<Text>ID: {criterion?.id}</Text>
					<Text>العنوان: {criterion?.title}</Text>
					<Text>تمت الإضافة بواسطة: {criterion?.User.name}</Text>
					{/* <Text>
						Total Evaluation in all Activity Executions:{' '}
						{(
							criterion.BehaviorCriteria.reduce((total, object) => total + object.evaluation, 0) /
							criterion.BehaviorCriteria.length
						).toFixed(2) != 'NaN' || '0'}
					</Text> */}
					{/* <Text>NO of Activities assign to : {criterion.BehaviorCriteria.length}</Text> */}
					{/* <Text>Activities titles assign this goal: {criteria.BehaviorCriteria.map((x) => x.ActivityInfo.title).join(', ')}</Text> */}
					{/* <Text>Activities titles assign this goal: </Text>
					{goal.ActivityGoal.map((x) => (
						<Text key={x.id}>{x.ActivityInfo.title}</Text>
					))} */}
				</SimpleGrid>
			</Card>
		</>
	);
}
export default CriteriaCard;
