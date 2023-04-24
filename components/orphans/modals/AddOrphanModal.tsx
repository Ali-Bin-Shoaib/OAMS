import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import OrphanForm from '../orphanForm';
import { Orphan } from '@prisma/client';
import { IconPlus } from '@tabler/icons-react';

export default function AddOrphanModal() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} size={'auto'} onClose={close} title='Add Orphan'>
				{/* Modal content */}
				<OrphanForm />
			</Modal>
			<Group position='center'>
				<Button size='md' onClick={open}>
					<IconPlus />
					Add New Orphan
				</Button>
			</Group>
		</>
	);
}
