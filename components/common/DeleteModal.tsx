import { Button, MantineSize, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconInfoCircle, IconTrash, IconX, TablerIconsProps } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Pages, serverLink } from '../../shared/links';
import { ResponseType, STATUS_CODE, _ActivityInfo } from '../../types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ActivityInfo } from '@prisma/client';
import { Url } from 'next/dist/shared/lib/router/router';
import myNotification from '../MyNotification';
import React from 'react';
interface Props {
	id: number | -1;
	tooltip?: string;
	size?: MantineSize;
	title: string;
	url: Url;
	redirectUrl?: Url;
	buttonOrIcon?: (props: TablerIconsProps) => JSX.Element;
}
export default function DeleteModal({
	id,
	title,
	url,
	tooltip = 'Delete',
	redirectUrl,
	size = 'xs',
	buttonOrIcon,
}: Props) {
	const router = useRouter();
	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: `Delete ${title} Info.`,
			centered: true,
			children: <Text size='sm'>Are you sure you want to delete this {title}?</Text>,
			labels: { confirm: `Delete`, cancel: `No don't Delete it` },
			confirmProps: { color: 'red' },
			onCancel: () =>
				notifications.show({
					title: 'Cancel',
					message: `Cancel Delete`,
					color: 'gray',
					icon: <IconInfoCircle />,
				}),
			onConfirm: async () => {
				try {
					const res: AxiosResponse<ResponseType> = await axios.delete<ResponseType>(`${serverLink}/${url}/${id}`);
					if (res.status === STATUS_CODE.OK) {
						myNotification('Success', res.data.msg, 'green', <IconCheck />);
						redirectUrl ? router.push(redirectUrl) : router.push(router.asPath);
					} else {
						myNotification('Error', res.data.msg || 'Record to be deleted was not found.', 'red', <IconX />);
					}
				} catch (error) {
					if (axios.isAxiosError(error)) myNotification('Error', 'Something went wrong.', 'red', <IconX />);
					redirectUrl ? router.push(redirectUrl) : router.push(router.asPath);
					console.log('🚀 ~ file: DeleteModal.tsx:55 ~ onConfirm: ~ error:', error);
				}
			},
		});
	return (
		<Tooltip label={tooltip}>
			<Button size={size} onClick={openDeleteModal} color='red'>
				{<IconTrash />}
			</Button>
		</Tooltip>
	);
}
