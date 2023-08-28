import { useCallback, useEffect, useState } from 'react';
import { _ActivityExecutionInfo, _ActivityInfo } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import {
	Button,
	Text,
	Group,
	Container,
	Loader,
	Card,
	TextInput,
	NumberInput,
	Title,
	Rating,
	Divider,
	SimpleGrid,
	Checkbox,
	Table,
} from '@mantine/core';
import { Orphan } from '@prisma/client';
import { v4 } from 'uuid';
import myNotification from '../MyNotification';
import { IconCheck } from '@tabler/icons-react';
import { CalculateAverage } from 'utils/Calculation';
//* type user is not allowed in creating or editing activityInfo TYpe remove it and fix the forms.
interface Props {
	activityInfo?: _ActivityInfo;
	activityExecutionInfo?: _ActivityExecutionInfo;
	orphans: Orphan[];
}

export default function ExecutionForm({ activityInfo, activityExecutionInfo, orphans }: Props): JSX.Element {
	// console.log('🚀 ~ file: ExecutionForm.tsx:43 ~ ExecutionForm ~  activityExecutionInfo:', activityExecutionInfo);
	let defaultValues: _ActivityExecutionInfo;
	// if (activityExecutionInfo is exist set DefaultValues to it and if activityExecutionInfo.OrphanActivityExecution is exist
	//assign un assigned orphans to the OrphanActivityExecution with isAttended to false
	if (activityExecutionInfo && activityExecutionInfo.GoalEvaluation) {
		orphans.map((orphan) => {
			// activityExecutionInfo.OrphanActivityExecution.filter((x) => x.id != orphan.id);
			if (activityExecutionInfo?.OrphanActivityExecution?.filter((x) => x.id != orphan.id).length === 0) {
				activityExecutionInfo.OrphanActivityExecution.push({
					Orphan: orphan,
					orphanId: orphan.id,
					isAttended: false,
					evaluation: null,
				});
				console.log('true in orphans.map');
			}
		});
		defaultValues = activityExecutionInfo;
	} else {
		defaultValues = {
			activityInfoId: activityInfo?.id!,
			userId: activityInfo?.userId!,
			GoalEvaluation: activityInfo?.ActivityGoal?.map((x) => {
				return { Goal: x.Goal, goalId: x.goalId! };
			}),
			OrphanActivityExecution: orphans.map((orphan) => ({
				Orphan: orphan,
				orphanId: orphan.id,
				isAttended: true,
				evaluation: 5,
			})),
			activityEvaluation: 5,
			cost: '',
			description: '',
			note: '',
			startDate: new Date(),
		};
	}
	if (activityExecutionInfo && activityExecutionInfo.OrphanActivityExecution)
		if (!activityExecutionInfo.activityEvaluation)
			activityExecutionInfo.activityEvaluation = CalculateAverage(
				activityExecutionInfo.OrphanActivityExecution.map((x) => x.evaluation) as number[]
			);
	const [hydrate, setHydrate] = useState(false);
	const [activityEvaluation, setActivityEvaluation] = useState<number | undefined>(
		activityExecutionInfo?.activityEvaluation || 5
	);
	console.log('🚀 ~ file: ExecutionForm.tsx:79 ~ ExecutionForm ~ activityEvaluation:', activityEvaluation);

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		getValues,
		getFieldState,
		formState: { errors },
	} = useForm<_ActivityExecutionInfo>({
		defaultValues: defaultValues,
	});
	const { fields, update } = useFieldArray({ control, name: 'GoalEvaluation' });
	const { fields: orphanActivityExecutionFields } = useFieldArray({ control, name: 'OrphanActivityExecution' });

	const router = useRouter();
	const onSubmit = async (data: _ActivityExecutionInfo) => {
		console.log('🚀 ~ file: ExecutionForm.tsx:68 ~ onSubmit ~ data:', data);
		data.activityEvaluation = activityEvaluation || 0;
		if (!activityExecutionInfo) {
			console.log('activityExecutionInfo dose not exist.');
			const url = serverLink + 'api/execute/create';
			await axios
				.post<{ msg: string; data: _ActivityExecutionInfo }>(url, data)
				.then((d) => {
					// console.log('🚀 ~ file: ExecutionForm.tsx:76 ~ onSubmit ~ d:', d);
					return d;
				})
				.catch((err) => console.log('error at creating new activityExecutionInfo--', err));
		} else {
			console.log('activityExecutionInfo exist.', activityExecutionInfo.id);
			const url = serverLink + 'api/execute/' + activityExecutionInfo.id;
			const res = await axios.put(url, data);
			myNotification('Update', res.data.msg, 'green', <IconCheck />);

			console.log('🚀 ~ file: ExecutionForm.tsx:86 ~ onSubmit ~ res:', res);
		}
		// // close();
		router.push(serverLink + 'activities/execute/');
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	const calculateActivityEvaluation = useCallback((orphansEvaluations: number[]) => {
		setActivityEvaluation(CalculateAverage(orphansEvaluations));
	}, []);
	if (!hydrate) return <Loader size={100} />;

	watch(`OrphanActivityExecution`)?.map((x) => (x.isAttended ? '' : (x.evaluation = null)));
	return (
		<Container fluid>
			<Card withBorder p={'xl'}>
				<Group position='apart' mt='md' mb='xs'>
					<Title order={3}>activity id:{activityExecutionInfo?.ActivityInfo?.id || activityInfo?.id}</Title>
					<Title order={3}>activity title:{activityExecutionInfo?.ActivityInfo?.title || activityInfo?.title}</Title>
					<Title order={3}>created by:{activityExecutionInfo?.ActivityInfo?.User.name || activityInfo?.User?.name}</Title>
				</Group>
				<Divider />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='startDate'
						control={control}
						defaultValue={(activityExecutionInfo?.startDate as Date) || (new Date() as Date)}
						rules={{ required: 'startDate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									label='startDate'
									placeholder='startDate'
									size='md'
									withAsterisk
									error={errors.startDate && errors.startDate.message}
								/>
							);
						}}
					/>
					<Controller
						name='description'
						control={control}
						rules={{ required: 'description is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									size='md'
									label='description'
									placeholder='description'
									withAsterisk
									error={errors.description && errors.description.message}
								/>
							);
						}}
					/>
					<Controller
						name='cost'
						control={control}
						rules={{ required: 'cost is required' }}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									size={'md'}
									label='cost'
									placeholder='cost'
									withAsterisk
									error={errors.cost && errors.cost.message}
								/>
							);
						}}
					/>
					<Controller
						name='note'
						control={control}
						rules={{ required: 'note is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									size={'md'}
									label='note'
									placeholder='note'
									withAsterisk
									error={errors.note && errors.note.message}
								/>
							);
						}}
					/>
					<Divider m={10} />
					<Title align='center'>Activity Goals</Title>
					<Divider m={10} />
					<Group position='apart'>
						<SimpleGrid
							cols={8}
							spacing='xs'
							verticalSpacing='xs'
							w={'100%'}
							py={5}
							breakpoints={[
								{ maxWidth: '78rem', cols: 4, spacing: 'lg' },
								{ maxWidth: '62rem', cols: 3, spacing: 'md' },
								{ maxWidth: '48rem', cols: 2, spacing: 'sm' },
								{ maxWidth: '36rem', cols: 1, spacing: 'xs' },
							]}>
							{fields.map((item, index) => (
								<Card shadow='xs' padding='xs' radius='md' withBorder key={v4()}>
									<Text className='text-center'>{item.Goal?.title}</Text>
								</Card>
							))}
						</SimpleGrid>
						<Text className='text-center font-bold'>Activity Evaluation:{activityEvaluation?.toFixed(2)}</Text>
					</Group>
					<Divider m={10} />
					<Title align='center'>Attend Orphans and Evaluate Their Performance</Title>
					<Divider m={10} />
					<Table withBorder>
						<thead>
							<tr className='text-center'>
								<th>id</th>
								<th>Name</th>
								<th>Is Attended</th>
								<th>Evaluation</th>
							</tr>
						</thead>
						<tbody>
							{orphanActivityExecutionFields.map((item, index) => (
								<tr key={item.id}>
									<td>{item.Orphan?.id}</td>
									<td>{item.Orphan?.name}</td>
									<td>
										<Controller
											name={`OrphanActivityExecution.${index}.isAttended`}
											control={control}
											render={({ field: { value, onChange } }) => {
												return (
													<Checkbox
														defaultChecked={item.isAttended || false}
														value={item.isAttended ? 'true' : 'false'}
														// {...field}
														onChange={(e) => {
															setValue(`OrphanActivityExecution.${index}.isAttended`, e.target.checked);
															setValue(`OrphanActivityExecution.${index}.evaluation`, e.target.checked ? 5 : null);
															console.log('getValues', getValues('OrphanActivityExecution'));
															calculateActivityEvaluation(
																getValues('OrphanActivityExecution')?.map((x) => x.evaluation || 0) as number[]
															);
														}}
													/>
												);
											}}
										/>
									</td>
									<td>
										<Controller
											name={`OrphanActivityExecution.${index}.evaluation`}
											control={control}
											// rules={
											// 	watch(`OrphanActivityExecution`)[index].isAttended && { required: 'please evaluate attended orphans' }
											// }
											render={({ field: { onChange } }) => {
												return (
													<Rating
														// {...field}
														onChange={(value) => {
															console.log('🚀 ~ file: ExecutionForm.tsx:273 ~ ExecutionForm ~ value:', value);

															setValue(`OrphanActivityExecution.${index}.evaluation`, value);

															calculateActivityEvaluation(
																getValues('OrphanActivityExecution')?.map((x) => x.evaluation || 0) as number[]
															);
															console.log('getValues', getValues('OrphanActivityExecution'));
														}}
														defaultValue={item.evaluation ? item.evaluation : undefined}
														value={watch(`OrphanActivityExecution`)![index].evaluation || 0}
														readOnly={watch(`OrphanActivityExecution`)![index].isAttended ? false : true}
														display={watch(`OrphanActivityExecution`)![index].isAttended ? '' : 'none'}
													/>
												);
											}}
										/>
										{errors?.OrphanActivityExecution && (
											<Text color='red'>{errors?.OrphanActivityExecution[index]?.evaluation?.message} </Text>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</Table>

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
