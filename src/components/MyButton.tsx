import { Button } from '@mui/material';
// import { Button, Checkbox, Container, Form, Icon } from 'semantic-ui-react'

// import { Button } from "@nextui-org/react";

export default function MyButton({
	text,
	type,
}: {
	text: string;
	type: 'submit' | 'button' | 'reset' ;
}) {
	if (type === 'submit') {
		return (
			<Button type='submit' variant='contained' color='primary'>
				{text}
			</Button>
		);
	} else if (type === 'button') {
		return (
			<Button type='button' variant='contained' color='inherit'>
				{text}
			</Button>
		);
	}
	return (
		<Button type='reset' variant='contained' color='warning'>
			{text}
		</Button>
	);

	// <Button >{text}</Button>
}
