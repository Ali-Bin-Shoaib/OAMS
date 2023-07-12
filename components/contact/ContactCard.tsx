import { Card, Group, SimpleGrid } from '@mantine/core';
import { Text } from '@mantine/core';
import { Contact } from '../../types';

interface Props {
	contact: Contact;
}
function ContactCard({ contact }: Props) {
	console.log('🚀 ~ file: ContactCard.tsx:9 ~ ContactCard ~ contact:', contact);
	console.log('🚀 ~ file: ContactCard.tsx:9 ~ ContactCard ~ ContactCard:', ContactCard);
	return (
		<>
			<Card shadow='sm' padding='lg' radius='md' withBorder>
				<SimpleGrid cols={1} spacing={'xl'} verticalSpacing={'md'}>
					<Text>ID: {contact.id}</Text>
					<Text>Created By: {contact.User.name}</Text>
					<Text>Name: {contact.name}</Text>
					<Text>Phone Number: {contact.phone}</Text>
					<Text>Orphan Name: {contact.Orphan.name}</Text>
				</SimpleGrid>
			</Card>
		</>
	);
}
export default ContactCard;
