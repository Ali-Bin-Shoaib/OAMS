import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Group, Container, Loader, Card, TextInput } from '@mantine/core';
import { Criteria, User } from '@prisma/client';
import myNotification from '../MyNotification';
import MyModal from '../common/MyModal';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
interface Props {
	criteria?: Criteria & { User?: User };
	close?: () => void;
}
export default function CriteriaForm({ criteria, close }: Props): JSX.Element {
	const { data: session } = useSession();
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Criteria>({
		defaultValues: criteria,
	});
	const router = useRouter();
	const onSubmit = async (data: Criteria) => {
		if (session?.user) data.userId = session?.user.id;
		console.log('🚀 ~ file: CriteriaForm.tsx:28 ~ onSubmit ~ data:', data);
		if (!criteria) {
			console.log('criteria dose not exist.');
			const url = serverLink + 'api/criteria/create';
			await axios
				.post<{ msg: string; data: Criteria }>(url, data)
				.then((d) => {
					if (d.status === 200) myNotification('Create', d.data.msg, 'green', <IconCheck />);
					else myNotification('Create', d.data.msg, 'red', <IconX />);

					return d;
				})
				.catch((err) => console.log('error at creating new Criteria--', err));
		} else {
			console.log('criteria exist.', criteria.id);
			const url = ` ${serverLink}api/criteria/${criteria.id}`;

			const res = await axios.put(url, data);
			console.log('🚀 ~ file: CriteriaForm.tsx:43 ~ onSubmit ~ res:', res);
			res.status === 200
				? myNotification('Update', res.data.msg, 'green', <IconCheck />)
				: myNotification('Update', res.data.msg, 'red', <IconX />);
		}
		close?.();
		router.push(serverLink + 'criteria/');
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
						name='title'
						control={control}
						rules={{ required: 'title is required', pattern: { value: /^[\w\S]/, message: 'invalid input.' } }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									size='md'
									label='title'
									placeholder='title'
									withAsterisk
									error={errors.title && errors.title.message}
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
