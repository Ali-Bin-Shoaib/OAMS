import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import OrphanForm from '../OrphanForm';
import { Orphan } from '@prisma/client';
import { IconPlus } from '@tabler/icons-react';
import FormTest from '../../FormTest';

export default function AddOrphanModal() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} size={'auto'} onClose={close} title='Add Orphan'>
				{/* Modal content */}
				<OrphanForm />
				{/* <FormTest /> */}
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
