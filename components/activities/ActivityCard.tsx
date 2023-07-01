import { Card, Image, Text, Badge, Button, Group, Divider, Loader, Title, Tooltip } from '@mantine/core';
import { _ActivityInfo } from '../../types/types';
import { useRouter } from 'next/router';
import { serverLink } from '../../shared/links';
import DeleteOrphanModal from '../orphans/modals/DeleteOrphanModal';
import DeleteModal from '../common/DeleteModal';
import EditModel from '../common/EditModel';
import { IconCheckbox, IconEdit, IconInfoCircle, IconPlayCard, IconPlayerPlay, IconRun } from '@tabler/icons-react';
interface Props {
	activityInfo: _ActivityInfo;
	updateCard: (activityInfo: _ActivityInfo | undefined) => void;
}
export default function ActivityCard({ activityInfo, updateCard }: Props) {
	const router = useRouter();
	if (!activityInfo) return <Loader size={100} />;
	return (
		<Card shadow='sm' padding='lg' radius='md' withBorder>
			<Group position='apart' mt='md' mb='xs'>
				<Title order={2} weight={500}>
					Title: {activityInfo.title}
				</Title>
				<Title order={2} weight={500}>
					Type: {activityInfo.type}
				</Title>
				<Title order={2} weight={500}>
					Date: {activityInfo?.date?.toDateString()}
				</Title>
			</Group>
			<Divider mt='md' mb='md' />
			<Group position='apart' mt='md' mb='xs'>
				<Text>Goals: {activityInfo?.ActivityGoal?.map((x) => x.Goal?.title).join(', ') || ''}</Text>
				<Text>Budget: {activityInfo.budget}</Text>
				<Text>Target: {activityInfo.target}</Text>
				<Text>Quarter: {activityInfo.quarter}</Text>
			</Group>
			<Group position='right' mt='md'>
				<Button.Group>
					<DeleteModal
						id={activityInfo.id!}
						title={'activity'}
						url={'api/activity/'}
						// type='Delete'
						updateCard={updateCard}
					/>

					<Tooltip label={'Edit'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/edit/${activityInfo.id}`);
							}}
							color='yellow'>
							<IconEdit />
						</Button>
					</Tooltip>
					<Tooltip label={'Info'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/${activityInfo.id}`);
							}}
							color='blue'>
							<IconInfoCircle />
						</Button>
					</Tooltip>
					<Tooltip label={'Execute'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/execute/create/${activityInfo.id}`);
							}}
							color='green'>
							<IconCheckbox />
						</Button>
					</Tooltip>
				</Button.Group>
			</Group>
		</Card>
	);
}
