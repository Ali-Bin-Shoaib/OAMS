import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import OrphanForm from '../orphanForm';
import { Orphan } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
interface Props {
	orphan: Orphan;
}
export default function EditOrphanModal({ orphan }: Props) {
	console.log('🚀 ~ file: EditOrphanModal.tsx:24 ~ EditOrphanModal ~ orphan:', orphan);

	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} size={'auto'} onClose={close} title='Edit Orphan'>
				{/* Modal content */}
				<h1>{orphan.id}</h1>
				<OrphanForm orphan={orphan} />
			</Modal>
			<Group position='center'>
				<Button onClick={open} color='yellow'>
					<IconEdit />
				</Button>
			</Group>
		</>
	);
}
