import { Button, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
	IconCheck,
	IconSettingsCancel,
	IconX,
} from '@tabler/icons-react';
import { URL } from '../../../shared/links';
import { Orphan } from '@prisma/client';
import { useRouter } from 'next/router';
import { STATUS_CODE } from '../../../types/types';
export default function DeleteOrphanModal({ id = -1 }) {
	const router = useRouter();
	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Delete Orphan info',
			centered: true,
			children: (
				<Text size='sm'>Are you sure you want to delete Orphan?</Text>
			),
			labels: { confirm: 'Delete ', cancel: "No don't delete it" },
			confirmProps: { color: 'red' },
			onCancel: () =>
				notifications.show({
					title: 'Cancel',
					message: 'cancel delete',
					color: 'gray',

				}),
			onConfirm: async () => {
				const result = await deleteOrphan(id);
				console.log(
					'🚀 ~ file: DeleteOrphanModal.tsx:23 ~ onConfirm: ~ result:',
					result
				);
				try {
					if (result) {
						notifications.show({
							title: `${result.orphan.name} Deleted`,
							message: `${result.orphan.id}: ${result.orphan.name} Was Deleted`,
							color: 'green',
							icon: <IconCheck />,
						});
						router.push(router.asPath);
					} else {
						notifications.show({
							title: 'Error',
							message: `Orphan dose not exist.`,
							color: 'red',
							icon: <IconX />,
						});
					}
				} catch (error) {
					console.log(error);
				}
			},
		});

	return (
		<Button onClick={openDeleteModal} color='red'>
			Delete
		</Button>
	);
}

const deleteOrphan = async (id: number) => {
	console.log(
		'🚀 ~ file: DeleteOrphanModal.tsx:8 ~ deleteOrphan ~ id:',
		id
	);
	const res = await fetch(URL + 'api/orphan/' + id, {
		method: 'delete',
		headers: { 'content-type': 'application/json' },
	});

	if (res.status === STATUS_CODE.Success) return res.json();
	return;
};
