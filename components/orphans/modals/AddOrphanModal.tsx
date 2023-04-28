import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text, Title } from '@mantine/core';
import OrphanForm from '../OrphanForm';
import { IconPlus } from '@tabler/icons-react';

export default function AddOrphanModal() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} size={'auto'} onClose={close}>
				{/* Modal content */}
				<Title align='center'>Add Orphan</Title>
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
