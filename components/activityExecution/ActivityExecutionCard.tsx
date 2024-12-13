import { Card, Image, Text, Badge, Button, Group, Divider, Loader, Title, Tooltip, Rating } from '@mantine/core';
import { _ActivityExecutionInfo, _ActivityInfo } from '../../types';
import { useRouter } from 'next/router';
import { serverLink } from '../../shared/links';
import DeleteModal from '../common/DeleteModal';
import { IconEdit, IconInfoCircle, IconPlayCard, IconPlayerPlay } from '@tabler/icons-react';
interface Props {
	activityExecutionInfo: _ActivityExecutionInfo;
}
export default function ActivityExecutionCard({ activityExecutionInfo }: Props) {
	const router = useRouter();
	if (!activityExecutionInfo) return <Loader size={100} />;
	return (
		<Card shadow='sm' padding='lg' radius='md' withBorder>
			<Group position='apart' mt='md' mb='xs'>
				<Title order={2} weight={500}>
					العنوان:{activityExecutionInfo.ActivityInfo?.title}
				</Title>
				<Title order={2} weight={500}>
					النوع:{activityExecutionInfo.ActivityInfo?.type}
				</Title>
				<Title order={2} weight={500}>
					تاريخ البداية:{activityExecutionInfo?.startDate?.toDateString()}
				</Title>
			</Group>

			<Divider mt='md' mb='md' />
			<Group position='apart' mt='md' mb='xs'>
				<Text>
					التقييم:
					{activityExecutionInfo?.GoalEvaluation!.reduce((total, goal) => total + goal.evaluation!, 0) /
						activityExecutionInfo?.GoalEvaluation!.length}
				</Text>
				<Text>التكلفة: {activityExecutionInfo.cost}</Text>
			</Group>
			<Group position='right' mt='md'>
				<Button.Group>
					<DeleteModal
						id={activityExecutionInfo.id!}
						title={'النشاط'}
						url={'api/activity/'}
						// type='Delete'
						// updateCard={updateCard(undefined)}
					/>

					<Tooltip label={'تعديل'}>
						<Button
							onClick={() => {
								router.push(serverLink + 'activities/' + activityExecutionInfo.id);
							}}
							color='yellow'>
							<IconEdit />
						</Button>
					</Tooltip>
					<Tooltip label={'تفاصيل'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/${activityExecutionInfo.id}`);
							}}
							color='blue'>
							<IconInfoCircle />
						</Button>
					</Tooltip>
				</Button.Group>
			</Group>
		</Card>
	);
}
