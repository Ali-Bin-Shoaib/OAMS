import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { _ActivityInfo, } from '../../types/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Paths, serverLink } from '../../shared/links';
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
//* type user is not allowed in creating or editing activityInfo TYpe remove it and fix the forms.
interface Props {
	activityInfo?: _ActivityInfo;
	// activityInfo?: ActivityAndGoals;

	goalInfo: GoalInfo[];
}

export default function ActivityForm({ activityInfo, goalInfo }: Props): JSX.Element {
	const defaultValues: _ActivityInfo = activityInfo
		? activityInfo
		: {
			// ActivityGoal:{}
			date: new Date(),
			title: undefined,
			budget: undefined,
			target: undefined,
			type: undefined,
			quarter: null,

			// userId: undefined,
			User: undefined,
		};
	activityInfo ? defaultValues.selectedGoals = activityInfo.ActivityGoal.map(x => x.goalInfoId.toString()) : ''
	const [hydrate, setHydrate] = useState(false);
	// type test = Prisma.ActivityInfoCreateInput & { goals: GoalInfo[] };

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<_ActivityInfo>({
		defaultValues: activityInfo,
	});
	{
	}
	const router = useRouter();
	const onSubmit = async (data: _ActivityInfo) => {
		// console.log("🚀 ~ file: ActivityForm.tsx:62 ~ onSubmit ~ data:", data);
		data.ActivityGoal = data.selectedGoals.map((x) => {
			return { goalInfoId: Number(x) }
		})
		// data.selectedGoals.map((x) => {
		// 	// data.ActivityGoal = [{ goalInfoId: Number(x) }]
		// 	data.ActivityGoal

		// })

		delete data.selectedGoals;
		console.log('🚀 ~ file: ActivityForm.tsx:57 ~ onSubmit ~ data:', data);
		if (!activityInfo) {
			console.log('activityInfo not exist.');
			const url = serverLink + 'api/activity/create';
			const res = await axios.post(url, data).catch((err) => console.log('error at creating new activityInfo--', err));
		}
		else {
			console.log('activityInfo exist.', activityInfo.id);

			const url = serverLink + 'api/activity/' + activityInfo.id;
			// delete data.User
			console.log("🚀 ~ file: ActivityForm.tsx:86 ~ onSubmit ~ data:", data);
			const res = await axios.put(url, data);
			router.push(serverLink + 'activities/')
		}
		close();
		router.push(serverLink + 'activities/');
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<Container>
			<Card withBorder p={'xl'}>
				<Title align='center'>Activity Info</Title>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='date'
						control={control}
						rules={{ required: 'date is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									label='data'
									defaultDate={activityInfo ? activityInfo.date : new Date()}
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
						rules={{ required: 'title is required' }}
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
						rules={{ required: 'budget is required' }}
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
						rules={{ required: 'target is required' }}
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
						rules={{ required: 'type is required' }}
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
						rules={{ required: 'startDate is required' }}
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
						name='selectedGoals'
						control={control}
						// defaultValue={ }
						rules={{ required: 'select at lest one goal' }}
						// render={({ field :{onChange,value}}) => {
						render={({ field }) => {

							return (
								<MultiSelect

									data={goalInfo.map((goal) => ({
										value: goal.id.toString(),
										label: goal.title,
									}))}
									{...field}
									// onChange={(e)=>{
									// 	onChange(e){goalInfo.map(x=>value=x)}
									// }}
									// value={value}

									clearable
									size={'md'}
									label='Select activity goals'
									withAsterisk
									error={errors.ActivityGoal?.message && errors.ActivityGoal.message}
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