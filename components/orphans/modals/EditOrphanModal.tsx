import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Tooltip, MantineSize } from '@mantine/core';
import OrphanForm from '../OrphanForm';
import { Guardian, Orphan, User } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import { _Guardian, _Orphan } from '../../../types';
import { useContext } from 'react';
interface Props {
	orphan: _Orphan;
	// guardians: (Guardian & {
	// 	user: User;
	// })[];
	size?: MantineSize;
}
export default function EditOrphanModal({ orphan, size = 'xs' }: Props) {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Modal opened={opened} size={'auto'} onClose={close} title='تعديل بيانات اليتيم'>
				{/* Modal content */}
				<h1>{orphan.id}</h1>
				<OrphanForm orphan={orphan} close={close} guardians={[]} />
			</Modal>
			<Tooltip label='Edit'>
				<Button onClick={open} color='yellow' size={size}>
					<IconEdit onClick={open} />
				</Button>
			</Tooltip>
		</>
	);
}
