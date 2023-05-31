import { Modal, Group, Tooltip, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Guardian, User } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import { useContext } from 'react';
import { _Orphan } from '../../types/types';
import OrphanForm from '../orphans/OrphanForm';
interface Props {
	orphan: _Orphan;
	guardians: (Guardian & {
		user: User;
	})[]
}
export default function EditModel({ orphan, guardians }: Props) {
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
