import { Card, Image, Text, Badge, Button, Group, Divider, Loader, Title, Tooltip } from '@mantine/core';
import { _ActivityInfo } from '../../types';
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
					العنوان: {activityInfo.title}
				</Title>
				<Title order={2} weight={500}>
					النوع: {activityInfo.type}
				</Title>
				<Title order={2} weight={500}>
					التاريخ: {activityInfo?.date?.toDateString()}
				</Title>
			</Group>
			<Divider mt='md' mb='md' />
			<Group position='apart' mt='md' mb='xs'>
				<Text>الأهداف: {activityInfo?.ActivityGoal?.map((x) => x.Goal?.title).join(', ') || ''}</Text>
				<Text>الميزانية: {activityInfo.budget}</Text>
				<Text>الهدف: {activityInfo.target}</Text>
				<Text>الربع: {activityInfo.quarter}</Text>
			</Group>
			<Group position='right' mt='md'>
				<Button.Group>
					<DeleteModal
						id={activityInfo.id!}
						title={'النشاط'}
						url={'api/activity/'}
						// type='Delete'
						// updateCard={updateCard}
					/>

					<Tooltip label={'تعديل'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/edit/${activityInfo.id}`);
							}}
							color='yellow'>
							<IconEdit />
						</Button>
					</Tooltip>
					<Tooltip label={'تفاصيل'}>
						<Button
							onClick={() => {
								router.push(`${router.asPath}/${activityInfo.id}`);
							}}
							color='blue'>
							<IconInfoCircle />
						</Button>
					</Tooltip>
					<Tooltip label={'تنفيذ'}>
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
