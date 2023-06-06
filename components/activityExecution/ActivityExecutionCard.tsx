import { Card, Image, Text, Badge, Button, Group, Divider, Loader, Title, Tooltip, Rating } from '@mantine/core';
import { _ActivityExecutionInfo, _ActivityInfo } from '../../types/types';
import { useRouter } from 'next/router';
import { serverLink } from '../../shared/links';
import DeleteOrphanModal from '../orphans/modals/DeleteOrphanModal';
import DeleteModal from '../common/DeleteModal';
import EditModel from '../common/EditModel';
import { IconCheckbox, IconEdit, IconInfoCircle, IconPlayCard, IconPlayerPlay, IconRun } from '@tabler/icons-react';
interface Props {
	activityExecutionInfo: _ActivityExecutionInfo;
	updateCard: (activityExecutionInfo: _ActivityExecutionInfo | undefined) => void;
}
export default function ActivityExecutionCard({ activityExecutionInfo, updateCard }: Props) {
	const router = useRouter();
	if (!activityExecutionInfo) return <Loader size={100} />;
	return (
		<Card shadow='sm' padding='lg' radius='md' withBorder>
			<Group position='apart' mt='md' mb='xs'>
				<Title order={2} weight={500}>
					Title:{activityExecutionInfo.ActivityInfo?.title}
				</Title>
				<Title order={2} weight={500}>
					Type:{activityExecutionInfo.ActivityInfo?.type}
				</Title>
				<Title order={2} weight={500}>
					StartDate:{activityExecutionInfo?.startDate?.toDateString()}
				</Title>
			</Group>
			{/* <Text size="xl" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes
                with tours and activities on and around the fjords of Norway
            </Text> */}
			<Divider mt='md' mb='md' />
			<Group position='apart' mt='md' mb='xs'>
				<Text>
					Evaluation:
					{activityExecutionInfo?.GoalEvaluation!.reduce((total, goal) => total + goal.evaluation!, 0) /
						activityExecutionInfo?.GoalEvaluation!.length}
				</Text>
				{/* <Rating
					readOnly
					fractions={2}
					value={
						activityExecutionInfo?.GoalEvaluation!.reduce((total, goal) => total + goal.evaluation!, 0) /
						activityExecutionInfo?.GoalEvaluation!.length
					}
				/> */}
				<Text>Cost: {activityExecutionInfo.cost}</Text>
			</Group>
			{/* <Group position='apart' mt='md' mb='xs'>
				<Text>Target: {activityExecutionInfo.target}</Text>
				<Text>Quarter: {activityExecutionInfo.quarter}</Text>
			</Group> */}
			<Group position='right' mt='md'>
				<Button.Group>
					<DeleteModal
						id={activityExecutionInfo.id!}
						title={'activity'}
						url={'api/activity/'}
						type='Delete'
						updateCard={updateCard}
					/>

					<Tooltip label={'Edit'}>
						<Button
							onClick={() => {
								router.push(serverLink + 'activities/' + activityExecutionInfo.id);
							}}
							color='yellow'>
							<IconEdit />
						</Button>
					</Tooltip>
					<Tooltip label={'Info'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/${activityExecutionInfo.id}`);
							}}
							color='blue'>
							<IconInfoCircle />
						</Button>
					</Tooltip>
					{/* <Tooltip label={'Execute'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/execute/${activityExecutionInfo.id}`);
							}}
							color='green'>
							<IconCheckbox />
						</Button>
					</Tooltip> */}
				</Button.Group>
			</Group>
		</Card>
	);
}
