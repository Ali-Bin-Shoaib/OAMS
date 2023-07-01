import { useEffect, useState } from 'react';
import { _ActivityExecutionInfo, _ActivityInfo } from '../../types/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Group, Container, Loader, Card, TextInput } from '@mantine/core';
import { Goal, User } from '@prisma/client';
import myNotification from '../MyNotification';
import MyModal from '../common/MyModal';
import { IconCheck } from '@tabler/icons-react';
interface Props {
	goal?: Goal & { User?: User };
	close?: () => void;
}
export default function GoalForm({ goal, close }: Props): JSX.Element {
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Goal>({
		defaultValues: goal,
	});
	const router = useRouter();
	const onSubmit = async (data: Goal) => {
		console.log('🚀 ~ file: GoalForm.tsx:29 ~ onSubmit ~ data:', data);
		if (!goal) {
			console.log('goal dose not exist.');
			const url = serverLink + 'api/goal/create';
			await axios
				.post<{ msg: string; data: Goal }>(url, data)
				.then((d) => {
					// console.log('🚀 ~ file: ExecutionForm.tsx:76 ~ onSubmit ~ d:', d);
					return d;
				})
				.catch((err) => console.log('error at creating new activityExecutionInfo--', err));
		} else {
			console.log('goal exist.', goal.id);
			const url = serverLink + 'api/goal/' + goal.id;
			const res = await axios.put(url, data);
			console.log('🚀 ~ file: GoalForm.tsx:71 ~ onSubmit ~ res:', res);
			myNotification('Update', res.data.msg, 'green', <IconCheck />);
		}
		close();
		router.push(serverLink + 'goals/');
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
						rules={{ required: 'title is required' }}
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
