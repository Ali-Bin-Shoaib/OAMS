import { Button, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Pages, serverLink } from '../../shared/links';
import { STATUS_CODE, _ActivityInfo } from '../../types/types';
import axios from 'axios';
import { ActivityInfo } from '@prisma/client';
import { Url } from 'next/dist/shared/lib/router/router';
import myNotification from '../MyNotification';
interface Props {
	id: number | -1;
	updateCard?: (activityInfo: _ActivityInfo | undefined) => void;
	tooltip?: string;

	title: string;
	url: Url;
}
export default function DeleteModal({ id, title, url, tooltip = 'Delete', updateCard }: Props) {
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
					message: `cancel Delete`,
					color: 'gray',
				}),
			onConfirm: async () => {
				const result = await deleteRecord(id, url);
				console.log('🚀 ~ file: DeleteModal.tsx:32 ~ onConfirm: ~ result:', result);
				try {
					if (result.status === STATUS_CODE.OK) {
						myNotification('Success', result.data.msg, 'green', <IconCheck />);
						// notifications.show({
						// 	title: `Success`,
						// 	// message: `${result.data.data.id}: ${result.data.data.title} Was Deleted`,
						// 	message: result.data.msg,

						// 	color: 'green',
						// 	icon: <IconCheck />,
						// });
						router.push(router.asPath);
					} else {
						myNotification('Error', result.data.msg, 'red', <IconX />);

						// notifications.show({
						// 	title: 'Error',
						// 	message: result.data.msg,
						// 	color: 'red',
						// 	icon: <IconX />,
						// });
						router.push(router.asPath);
					}
				} catch (error) {
					myNotification('Error', result, 'red', <IconX />);

					// notifications.show({
					// 	title: 'Error',
					// 	message: error.msg,
					// 	color: 'red',
					// 	icon: <IconX />,
					// });
					router.push(router.asPath);

					console.log('🚀 ~ file: DeleteModal.tsx:55 ~ onConfirm: ~ error:', error);
				}
			},
		});
	return (
		<Tooltip label={tooltip}>
			<Button size='xs' onClick={openDeleteModal} color='red'>
				<IconTrash />
			</Button>
		</Tooltip>
	);
}

const deleteRecord = async (id: number, url: Url) => {
	console.log('🚀 ~ file: DeleteModal.tsx:8 ~ deleteOrphan ~ id:', id);

	try {
		const res = await axios.delete<{ msg: string; data: any }>(serverLink + url + id);
		console.log('🚀 ~ file: DeleteModal.tsx:77 ~ deleteRecord ~ res:', res.data.msg);
		return res;
	} catch (error) {
		console.log('🚀 ~ file: DeleteModal.tsx:78 ~ deleteRecord ~ error:', error);
		return error.response;
	}
	// .then(res => {
	// 	if (res.status === STATUS_CODE.OK)
	// 		return res.data
	// }).catch((error) => {
	// 	console.log("🚀 ~ file: DeleteModal.tsx:76 ~ res ~ error:", error)
	// })
};
