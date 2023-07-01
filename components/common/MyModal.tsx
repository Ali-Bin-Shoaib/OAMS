import { useDisclosure } from '@mantine/hooks';
import {
	Modal,
	Button,
	Group,
	Title,
	DefaultMantineColor,
	GroupPosition,
	MantineSize,
	Divider,
	MantineNumberSize,
	SpacingValue,
	SystemProp,
	Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { ReactNode } from 'react';
interface Props {
	ModelForm?: JSX.Element;
	modalTitle: string;
	buttonText?: string;
	buttonColor?: DefaultMantineColor | undefined;
	position?: GroupPosition;
	modalSize?: MantineNumberSize;
	icon?: JSX.Element;
	size?: MantineSize;
	m?: SystemProp<SpacingValue>;
	tooltip?: string;
	isOpen?: boolean;
}

// export default function MyModal({ ModelForm, modalTitle, buttonText, buttonColor, opened, open, close }: Props) {
export default function MyModal({
	ModelForm,
	modalTitle,
	buttonText,
	buttonColor,
	tooltip,
	position = 'center',
	modalSize = '100%',
	icon = <IconPlus />,
	size = 'xl',
	isOpen,
	m = 15,
}: Props) {
	const [opened, { open, close }] = useDisclosure(isOpen || false);
	return (
		<>
			<Modal opened={opened} size={modalSize} onClose={close} closeOnClickOutside={false}>
				{/* Modal content */}
				<Title align='center'>{modalTitle}</Title>
				<Divider m={10} p={10} />
				{/* {ModelForm} */}
				{React.cloneElement(ModelForm, { close: close })}
			</Modal>
			<Group position={position}>
				<Tooltip label={tooltip} hidden={!tooltip ? true : false}>
					<Button color={buttonColor} size={size} m={m} onClick={open}>
						{icon} {buttonText}
					</Button>
				</Tooltip>
			</Group>
		</>
	);
}
