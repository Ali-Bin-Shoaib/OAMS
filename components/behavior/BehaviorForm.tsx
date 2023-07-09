import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { Behavior } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DateInput } from '@mantine/dates';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
	Button,
	Group,
	Container,
	Loader,
	Divider,
	Textarea,
	TextInput,
	Select,
	Text,
	Rating,
	Table,
	Title,
	Center,
	ActionIcon,
} from '@mantine/core';
import { Criteria, Orphan, Prisma } from '@prisma/client';
interface Props {
	behavior?: Behavior;
	orphans: Orphan[];
	criteria: Criteria[];
}
export default function BehaviorForm({ orphans, behavior, criteria }: Props): JSX.Element {
	console.log('🚀 ~ file: BehaviorForm.tsx:33 ~ BehaviorForm ~ behavior:', behavior);
	let defaultValue: Behavior = behavior
		? behavior
		: { date: new Date(), BehaviorCriteria: criteria.map((x) => ({ criteriaId: x.id, evaluation: 5, userId: 1 })) };
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Behavior & { OrphanID: string }>({
		defaultValues: { ...defaultValue, OrphanID: defaultValue.orphanId?.toString() },
	});
	const { fields, update } = useFieldArray({ control, name: 'BehaviorCriteria' });
	console.log('🚀 ~ file: BehaviorForm.tsx:46 ~ BehaviorForm ~ fields:', fields);
	const router = useRouter();
	const onSubmit = async (data: Behavior & { OrphanID: string }) => {
		console.log('🚀 ~ file: BehaviorForm.tsx:34 ~ onSubmit ~ data:', data);
		Number(data.OrphanID) && (data.orphanId = Number(data.OrphanID));
		delete data.OrphanID;
		if (!behavior) {
			console.log('behavior not exist.');
			const url = serverLink + 'api/behavior/create';
			const res = await axios.post(url, data).catch((err) => console.log('error at creating new behavior--', err));
		} else {
			console.log('behavior exist.', behavior.id);
			const url = serverLink + '/api/behavior/' + behavior.id;
			const res = await axios.put(url, data);
			console.log('🚀 ~ file: BehaviorForm.tsx:59 ~ onSubmit ~ res:', res);
		}
		router.push(serverLink + 'behavior');
	};
	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);
	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Center>{behavior ? <Title>Edit Behavior Info</Title> : <Title>Add New Behavior Info</Title>}</Center>
			<Container fluid>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container className='flex flex-wrap space-x-5' p={15}>
						<Controller
							name='date'
							rules={{ required: 'Date is required' }}
							control={control}
							render={({ field }) => {
								return (
									<DateInput
										{...field}
										label='Behavior data'
										w={'45%'}
										defaultDate={behavior?.date as Date}
										placeholder='date'
										withAsterisk
										error={errors.date && errors.date.message}
									/>
								);
							}}
						/>
						<Controller
							name='userId'
							control={control}
							// rules={{ required: 'User' }}
							render={({ field }) => {
								return (
									<TextInput {...field} disabled name='User.name' label='User name' defaultValue={behavior?.userId} w={'45%'} />
								);
							}}
						/>
						<Controller
							name='note'
							control={control}
							// rules={{ required: 'User' }}
							render={({ field }) => {
								return <Textarea {...field} name='note' label='Note' defaultValue={behavior?.note} w={'45%'} />;
							}}
						/>
						<Controller
							name='OrphanID'
							control={control}
							rules={{
								required: 'Orphan is required',
								//  pattern: { value: /^\d/i, message: 'select orphan' }
							}}
							render={({ field }) => {
								return (
									<Select
										{...field}
										label='Orphans'
										placeholder='choose orphan'
										searchable
										w={'45%'}
										withAsterisk
										error={errors.OrphanID && errors.OrphanID.message}
										nothingFound='Not Found'
										data={orphans.map((x) => ({ value: x.id.toString(), label: x.name }))}
									/>
								);
							}}
						/>
					</Container>
					<Divider p={10} />
					<Container>
						<Table striped highlightOnHover withBorder p={10}>
							<thead>
								<tr>
									<th>id</th>
									<th>title</th>
									<th>evaluation</th>
								</tr>
							</thead>
							<tbody>
								{fields.map((field, index) => (
									<tr key={field.id}>
										<td>
											<Text>{index + 1}</Text>
										</td>
										<td>
											<Text>{criteria.filter((x) => x.id === field.criteriaId)[0].title}</Text>
										</td>
										<td>
											<Controller
												name={`BehaviorCriteria.${index}.evaluation`}
												control={control}
												defaultValue={field.evaluation}
												rules={{
													required: 'Rate orphan performance',
												}}
												render={({ field }) => {
													return <Rating {...field} placeholder='choose orphan' />;
												}}
											/>
										</td>
									</tr>
								))}
								{/* <tr>
									<td>
										<Button.Group>
											<ActionIcon></ActionIcon>
										</Button.Group>
									</td>
								</tr> */}
							</tbody>
						</Table>
					</Container>
					<Group position='center' pt={45}>
						<Button type='submit'>Submit</Button>
					</Group>
				</form>
			</Container>
		</>
	);
}
