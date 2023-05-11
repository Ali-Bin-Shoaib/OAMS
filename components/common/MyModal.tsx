import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Title, DefaultMantineColor } from '@mantine/core';
import OrphanForm from '../orphans/OrphanForm';
import { IconPlus } from '@tabler/icons-react';
import React, { ReactNode } from 'react';
interface Props {
	ModelForm: ReactNode;
	modalTitle: string;
	buttonText: string;
	buttonColor?: DefaultMantineColor | undefined;
	open: () => void;
	close: () => void;
	opened: boolean;
}
export default function MyModal({ ModelForm, modalTitle, buttonText, buttonColor, opened, open, close }: Props) {
	return (
		<>
			<Modal opened={opened} size={'100%'} onClose={close}>
				{/* Modal content */}
				<Title align='center'>{modalTitle}</Title>
				{ModelForm}
			</Modal>
			<Group position='center'>
				<Button color={buttonColor} size='md' onClick={open}>
					<IconPlus />
					{buttonText}
				</Button>
			</Group>
		</>
	);
}
