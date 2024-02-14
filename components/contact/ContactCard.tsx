import { Card, Group, SimpleGrid } from '@mantine/core';
import { Text } from '@mantine/core';
import { Contact } from '../../types';

interface Props {
	contact: Contact;
}
function ContactCard({ contact }: Props) {
	console.log('🚀 ~ file: ContactCard.tsx:9 ~ ContactCard ~ contact:', contact);
	return (
		<>
			<Card shadow='sm' padding='lg' radius='md' withBorder dir='rtl'>
				<SimpleGrid cols={2} spacing={'xl'} verticalSpacing={'md'}>
					<Text weight={700}>#: </Text>
					<Text>{contact.id}</Text>
					<Text weight={700}>بواسطة: </Text>
					<Text> {contact?.User?.name}</Text>
					<Text weight={700}>اسم الشخص: </Text>
					<Text> {contact.name}</Text>
					<Text weight={700}>رقم الجوال: </Text>
					<Text> {contact.phone}</Text>
					<Text weight={700}>اسم اليتيم: </Text>
					<Text> {contact?.Orphan?.name}</Text>
				</SimpleGrid>
			</Card>
		</>
	);
}
export default ContactCard;
