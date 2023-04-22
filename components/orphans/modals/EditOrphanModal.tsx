import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { ORPHAN } from '../../../types/types';
import OrphanForm from '../orphanForm';
import { Orphan } from '@prisma/client';

export default function EditOrphanModal({ orphan }: { orphan: Orphan }) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} title='Edit Orphan'>
				{/* Modal content */}
				<OrphanForm orphan={orphan} />
			</Modal>

			<Group position='center'>
				<Button onClick={open} color='yellow'>
					Edit
				</Button>
			</Group>
		</>
	);
}
