import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Tooltip } from '@mantine/core';
import OrphanForm from '../OrphanForm';
import { Guardian, Orphan, User } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import { _Guardian, _Orphan } from '../../../types';
import { useContext } from 'react';
interface Props {
	orphan: _Orphan;
	guardians: (Guardian & {
		user: User;
	})[];
}
export default function EditOrphanModal({ orphan, guardians }: Props) {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Modal opened={opened} size={'auto'} onClose={close} title='Edit Orphan'>
				{/* Modal content */}
				<h1>{orphan.id}</h1>
				<OrphanForm orphan={orphan} close={close} guardians={guardians} />
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
