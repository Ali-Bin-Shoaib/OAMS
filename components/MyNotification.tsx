import { MantineColor } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ReactNode } from 'react';

export default function myNotification(
	title: string,
	message: string,
	color: MantineColor,
	icon: ReactNode,
	loading = false
) {
	notifications.show({
		title: title,
		message: message,
		color: color,
		icon: icon,
		withBorder: true,
		loading: loading,
	});
}
