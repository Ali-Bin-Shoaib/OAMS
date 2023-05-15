import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Tooltip } from '@mantine/core';
import OrphanForm from '../OrphanForm';
import { Orphan } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import { _Orphan } from '../../../types/types';
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
				<OrphanForm orphan={orphan as unknown as _Orphan} close={close} />
			</Modal>
			<Group position='center'>
				<Tooltip label='Edit'>
					<Button onClick={open} color='yellow'>
						<IconEdit onClick={open} />
					</Button>
				</Tooltip>
			</Group>
		</>
	);
}
