import { Button, Group, Notification as MNotification } from '@mantine/core';
import { Notification, NotificationType } from '@prisma/client';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import axios from 'axios';
import { Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { serverLink } from 'shared/links';
import { ResponseType } from 'types';
interface Props {
	notification: Notification;
	redirectUrl: Url;
	updateNotifications: () => void;
	toggleDrawer: (value: boolean) => void;
}
function NotificationComponent({ notification, redirectUrl = '', toggleDrawer, updateNotifications }: Props) {
	const [isVisible, setIsVisible] = useState(true);
	const router = useRouter();
	return (
		<MNotification
			onClick={() => {
				setIsVisible(false);
			}}
			className={`${isVisible ? '' : 'transition-opacity duration-300'} p-1 m-1`}
			icon={<IconInfoCircle size='1.1rem' />}
			color='blue'
			title={notification.type}
			withCloseButton={false}>
			{notification.type && createNotificationContent(notification.type)}
			<Group position='right'>
				<Button.Group>
					<Button
						color='teal'
						size='xs'
						m={0}
						onClick={() => {
							updateNotification(notification);
							updateNotifications();
							toggleDrawer(false);
							router.push(redirectUrl);
						}}>
						Open
					</Button>
					<Button
						color='gray'
						size='xs'
						m={0}
						onClick={() => {
							updateNotification(notification);
							updateNotifications();

							toggleDrawer(true);
						}}>
						Hide
					</Button>
				</Button.Group>
			</Group>
		</MNotification>
	);
}
export default NotificationComponent;
export const updateNotification = async (notification?: Notification) => {
	try {
		const url = `${serverLink}api/notification`;
		const response = await axios.put<ResponseType>(url, notification);
		console.log('🚀 ~ file: NotificationComponent.tsx:41 ~ updateNotification ~ response:', response);
	} catch (error) {}
};
const createNotificationContent = (type: NotificationType) => {
	switch (type) {
		case 'Attendance':
			return `One or more orphan are absent.`;
		case 'Education':
			return `Orphan has bad grades.`;
		case 'Behavior':
			return `Orphan has bad behaviors.`;
		case 'Health':
			return `Orphan has health issue.`;
		case 'ActivityExecution':
			return `One or more orphan has bad performance in activity execution.`;
		case 'Orphan':
			return `Orphan has total evaluation less than 2.5.`;
		case 'Sponsorship':
			return `Sponsorship will be expired in less than one month.`;
		default:
			console.log('switch default ');
			break;
	}
};
