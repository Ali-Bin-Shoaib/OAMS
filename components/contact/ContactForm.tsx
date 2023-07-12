import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Group, Container, Loader, Card, TextInput, Select } from '@mantine/core';
import myNotification from '../MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Contact, ResponseType } from '../../types';
import { OrphanContext } from '../../shared/contexts';
interface Props {
	contact?: Contact;
	close?: () => void;
}
export default function ContactForm({ contact, close }: Props): JSX.Element {
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Contact>({
		defaultValues: contact,
	});
	const orphans = useContext(OrphanContext);
	const router = useRouter();
	const onSubmit = async (data: Contact) => {
		console.log('🚀 ~ file: ContactForm.tsx:28 ~ onSubmit ~ data:', data);
		if (!contact) {
			console.log('Contact dose not exist.');
			const url = serverLink + 'api/contact/id';
			await axios
				.post<{ msg: string; data: Contact }>(url, data)
				.then((data) => {
					if (data.status === 200) myNotification('Create', data.data.msg, 'green', <IconCheck />);
					else myNotification('Create', data.data.msg, 'red', <IconX />);
				})
				.catch((err) => console.log('error at creating new Contact--', err));
		} else {
			console.log('Contact exist.', contact.id);
			const url = ` ${serverLink}api/contact/${contact.id}`;

			const res = await axios.put<ResponseType>(url, data);
			console.log('🚀 ~ file: CriteriaForm.tsx:43 ~ onSubmit ~ res:', res);
			res.status === 200
				? myNotification('Update', res.data.data.msg, 'green', <IconCheck />)
				: myNotification('Update', res.data.data.msg, 'red', <IconX />);
		}
		close();
		router.push(serverLink + 'contact/');
	};
	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);
	if (!hydrate) return <Loader size={100} />;
	return (
		<Container fluid>
			<Card withBorder p={'xl'}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='orphanId'
						control={control}
						rules={{ required: 'Name field is required' }}
						render={({ field: { onChange } }) => {
							return (
								<Select
									onChange={(id) => {
										setValue('orphanId', Number(id));
										setValue(
											'Orphan',
											orphans.find((x) => x.id === Number(id))
										);
									}}
									data={orphans.map((x) => ({ label: x.name, value: x.id.toString() }))}
									size='md'
									label='Name'
									placeholder='name'
									withAsterisk
									error={errors.Orphan && errors.Orphan.name.message}
									// description='select an orphan '
									required
									defaultValue={contact?.orphanId.toString()}
									searchable
									selectOnBlur
									// w={'45%'}
									nothingFound='Not Found'
									hoverOnSearchChange
								/>
							);
						}}
					/>

					<Controller
						name='name'
						control={control}
						rules={{ required: 'Name field is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									size='md'
									label='Name'
									placeholder='name'
									withAsterisk
									error={errors.name && errors.name.message}
								/>
							);
						}}
					/>
					<Controller
						name='phone'
						control={control}
						rules={{ required: 'Phone field is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									type='tel'
									size='md'
									label='Phone'
									placeholder='Phone'
									withAsterisk
									error={errors.phone && errors.phone.message}
								/>
							);
						}}
					/>
					<Group position='center' pt={50}>
						<Button type='submit' fullWidth>
							Submit
						</Button>
					</Group>
				</form>
			</Card>
		</Container>
	);
}
