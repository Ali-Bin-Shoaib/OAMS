import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import OrphanForm from '../orphanForm';
import { Orphan } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
interface Props {
	orphan: Orphan;
}
export default function EditOrphanModal({ orphan }: Props) {
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
					<IconEdit onClick={open} />
				</Button>
			</Group>
		</>
	);
}
