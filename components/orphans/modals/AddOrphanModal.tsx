import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Title } from '@mantine/core';
import OrphanForm from '../OrphanForm';
import { IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { GuardianContext } from '../../../shared/contexts';

export default function AddOrphanModal() {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Modal opened={opened} size={'auto'} onClose={close}>
				{/* Modal content */}
				<Title align='center'>Add Orphan</Title>
				<OrphanForm close={close} guardians={[]} />
				{/* <FormTest /> */}
			</Modal>
			<Group position='center'>
				<Button size='xl' onClick={open}>
					<IconPlus />
					Add New Orphan
				</Button>
			</Group>
		</>
	);
}
