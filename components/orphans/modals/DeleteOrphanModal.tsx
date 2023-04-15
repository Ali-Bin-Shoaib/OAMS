import { Button, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { URL } from '../../../sharid/links';

export default function DeleteOrphanModal({ id = -1 }) {
	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Delete Orphan info',
			centered: true,
			children: (
				<Text size='sm'>Are you sure you want to delete Orphan?</Text>
			),
			labels: { confirm: 'Delete ', cancel: "No don't delete it" },
			confirmProps: { color: 'red' },
			onCancel: () => console.log('Cancel'),
			onConfirm: () => {
				deleteOrphan(id);
				notifications.show({
					title: 'Deleted',
					message: 'Orphan Deleted',
					color: 'green',
					icon: <IconCheck />,
				});
			},
		});

	return (
		<Button onClick={openDeleteModal} color='red'>
			Delete
		</Button>
	);
}

const deleteOrphan: any = async (id: number) => {
	console.log(
		'🚀 ~ file: DeleteOrphanModal.tsx:8 ~ deleteOrphan ~ id:',
		id
	);
	const res = await fetch(URL + 'api/orphan/' + id, {
		method: 'delete',
		headers: { 'content-type': 'application/json' },
	});
	const response = res.json();
	console.log(
		'🚀 ~ file: DeleteOrphanModal.tsx:46 ~ constdeleteOrphan:any= ~ response:',
		response
	);
};
