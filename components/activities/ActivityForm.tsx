import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { ActivityAndGoals, _ActivityInfo } from '../../types/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DatePickerInput, DateInput } from '@mantine/dates';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
	Button,
	Group,
	Container,
	Loader,
	Card,
	Select,
	TextInput,
	NumberInput,
	Title,
	MultiSelect,
} from '@mantine/core';
import { GoalInfo, Prisma, Quarter, ActivityInfo } from '@prisma/client';
import { z } from 'zod';

interface Props {
	// activityInfo?: _ActivityInfo;
	activityInfo?: ActivityAndGoals;

	goalInfo: GoalInfo[];
}

export default function ActivityForm({ activityInfo, goalInfo }: Props): JSX.Element {
	const defaultValues: ActivityAndGoals = activityInfo
		? activityInfo
		: {
				ActivityGoal: [{ date: new Date(), evaluation: undefined, GoalInfo: undefined, goalInfoId: null }],
				date: new Date(),
				title: undefined,
				budget: undefined,
				target: undefined,
				type: undefined,
				quarter: undefined,

				// userId: undefined,
				User: undefined,
		  };
	console.log('🚀 ~ file: ActivityForm.tsx:32 ~ ActivityForm ~ defaultValues:', defaultValues);
	const [hydrate, setHydrate] = useState(false);
	// type test = Prisma.ActivityInfoCreateInput & { goals: GoalInfo[] };

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<ActivityAndGoals>({
		defaultValues: activityInfo,
	});
	{
	}
	const router = useRouter();
	const onSubmit = async (data: ActivityAndGoals) => {
		console.log('🚀 ~ file: ActivityForm.tsx:57 ~ onSubmit ~ data:', data);
		if (!activityInfo) {
			console.log('activityInfo not exist.');
			const url = serverLink + 'api/activity/create';
			const res = await axios.post(url, data).catch((err) => console.log('error at creating new activityInfo--', err));
		}
		// else {
		// 	console.log('activityInfo exist.', activityInfo.id);
		// 	const url = serverLink + '/api/activityInfo/' + activityInfo.id;
		// 	const res = await axios.put(url, data);
		// }
		// close();
		// router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Container>
				<Title align='center'>Activity Info</Title>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Card withBorder p={'xl'}>
						<Card.Section>
							<Controller
								name='date'
								control={control}
								// rules={{ required: 'date is required' }}
								render={({ field }) => {
									return (
										<DatePickerInput
											{...field}
											label='data'
											defaultDate={activityInfo?.date as Date}
											placeholder='date'
											withAsterisk
											error={errors.date && errors.date.message}
										/>
									);
								}}
							/>
							<Controller
								name='title'
								control={control}
								// rules={{ required: 'title is required' }}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											size={'md'}
											label='title'
											placeholder='title'
											withAsterisk
											error={errors.title && errors.title.message}
										/>
									);
								}}
							/>
							<Controller
								name='budget'
								control={control}
								// rules={{ required: 'budget is required' }}
								render={({ field }) => {
									return (
										<NumberInput
											{...field}
											size={'md'}
											label='budget'
											placeholder='budget'
											withAsterisk
											error={errors.budget && errors.budget.message}
										/>
									);
								}}
							/>
							<Controller
								name='target'
								control={control}
								// rules={{ required: 'target is required' }}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											size={'md'}
											label='target'
											placeholder='target'
											withAsterisk
											error={errors.target && errors.target.message}
										/>
									);
								}}
							/>
							<Controller
								name='type'
								control={control}
								// rules={{ required: 'type is required' }}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											size={'md'}
											label='type'
											placeholder='type'
											withAsterisk
											error={errors.type && errors.type.message}
										/>
									);
								}}
							/>
							<Controller
								name='quarter'
								control={control}
								// rules={{ required: 'startDate is required' }}
								render={({ field }) => {
									return (
										<Select
											{...field}
											size={'md'}
											data={$enum(Quarter).map((x) => x.toString())}
											multiple={true}
											label='quarter'
											withAsterisk
											error={errors.quarter?.message && errors.quarter.message}
										/>
									);
								}}
							/>
							<Controller
								name='ActivityGoal'
								control={control}
								// rules={{ required: 'startDate is required' }}
								render={({ field }) => {
									return (
										// <Select
										// {...field}
										// size={'md'}
										// data={goalInfo.map((goal) => ({
										// 	value: goal.id.toString(),
										// 	label: goal.title,
										// }))}
										// 	label='Select activity goals'
										// 	withAsterisk
										// 	error={errors.ActivityGoal?.message && errors.ActivityGoal.message}
										// />
										<MultiSelect
											data={goalInfo.map((goal) => ({
												value: goal.id.toString(),
												label: goal.title,
											}))}
											{...field}
											size={'md'}
											label='Select activity goals'
											withAsterisk
											error={errors.ActivityGoal?.message && errors.ActivityGoal.message}
										/>
									);
								}}
							/>
						</Card.Section>
						<Group position='center' pt={50}>
							<Button type='submit' fullWidth>
								Submit
							</Button>
						</Group>
					</Card>
				</form>
			</Container>
		</>
	);
}
