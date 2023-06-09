import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Title, DefaultMantineColor, GroupPosition, MantineSize, Divider } from '@mantine/core';
import OrphanForm from '../orphans/OrphanForm';
import { IconPlus } from '@tabler/icons-react';
import React, { ReactNode } from 'react';
import { UseFormTrigger } from 'react-hook-form';
interface Props {
	ModelForm: ReactNode;
	modalTitle: string;
	buttonText: string;
	buttonColor?: DefaultMantineColor | undefined;
	position?: GroupPosition;
	size?: MantineSize;
	// open: () => void;
	// close: () => void;
	// opened: boolean;
}

// export default function MyModal({ ModelForm, modalTitle, buttonText, buttonColor, opened, open, close }: Props) {
export default function MyModal({
	ModelForm,
	modalTitle,
	buttonText,
	buttonColor,
	position = 'center',
	size = 'xl',
}: Props) {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Modal opened={opened} size={'100%'} onClose={close} closeOnClickOutside={false}>
				{/* Modal content */}
				<Title align='center'>{modalTitle}</Title>
				<Divider m={10} p={10} />
				{ModelForm}
				{/* <Group position='right' p={10}>
					<Button onClick={close}>OK</Button>
				</Group> */}
			</Modal>
			<Group position={position}>
				<Button color={buttonColor} size={size} m={15} onClick={open}>
					<IconPlus />
					{buttonText}
				</Button>
			</Group>
		</>
	);
}
