import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { ResponseType, STATUS_CODE, _ActivityInfo } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { Goal, Grade, Quarter } from '@prisma/client';
import myNotification from 'components/MyNotification';
import { IconCheck } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
//* type user is not allowed in creating or editing activityInfo TYpe remove it and fix the forms.
interface Props {
	activityInfo?: _ActivityInfo;
	goalInfo: Goal[];
}

export default function ActivityForm({ activityInfo, goalInfo }: Props): JSX.Element {
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		setValue,
		setError,
		formState: { errors, isValid },
	} = useForm<_ActivityInfo>({
		defaultValues: activityInfo,
	});
	const router = useRouter();
	const { data: session, status } = useSession({ required: true });
	console.log('🚀 ~ file: ActivityForm.tsx:48 ~ ActivityForm ~ status:', status);
	console.log('🚀 ~ file: ActivityForm.tsx:48 ~ ActivityForm ~ session:', session);
	const onSubmit = async (data: _ActivityInfo) => {
		if (session?.user) data.userId = session?.user?.id;

		console.log('🚀 ~ file: ActivityForm.tsx:57 ~ onSubmit ~ data:', data);
		if (!activityInfo) {
			console.log('activityInfo not exist.');
			const url = serverLink + 'api/activity/create';
			// const res = await axios.post(url, data).catch((err) => console.log('error at creating new activityInfo--', err));
			const res = await axios.post<ResponseType>(url, data);
			console.log('🚀 ~ file: ActivityForm.tsx:55 ~ onSubmit ~ res:', res);

			if (res.status === STATUS_CODE.OK) {
				myNotification('Success', res.data.msg, 'green', <IconCheck />);
				router.push(serverLink + 'activities/');
			}
		} else {
			console.log('activityInfo exist.', activityInfo.id);

			const url = serverLink + 'api/activity/' + activityInfo.id;
			// delete data.User
			console.log('🚀 ~ file: ActivityForm.tsx:86 ~ onSubmit ~ data:', data);
			const res = await axios.put<ResponseType>(url, data);
			if (res.status === STATUS_CODE.OK) {
				myNotification('Success', res.data.msg, 'green', <IconCheck />);
				router.push(serverLink + 'activities/');
			}
		}
		// close();
		// router.push(serverLink + 'activities/');
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<Container>
			<Card withBorder p={'xl'}>
				<Title align='center'>معلومات النشاط</Title>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='date'
						control={control}
						defaultValue={(activityInfo?.date as Date) || (new Date() as Date)}
						rules={{ required: 'date is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									size={'md'}
									label='التاريخ'
									placeholder='التاريخ'
									withAsterisk
									error={errors.date && errors.date.message}
								/>
							);
						}}
					/>

					<Controller
						name='title'
						control={control}
						rules={{ required: 'العنوان مطلوب', pattern: { value: /^[\w\S]/, message: 'إدخال خاطئ.' } }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									size={'md'}
									label='العنوان'
									placeholder='العنوان'
									withAsterisk
									error={errors.title && errors.title.message}
								/>
							);
						}}
					/>
					<Controller
						name='budget'
						control={control}
						rules={{ required: 'الميزانية مطلوبة', min: { value: 0, message: 'لا يمكن إدخال قيمة أقل من صفر.' } }}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									size={'md'}
									label='الميزانية'
									placeholder='الميزانية'
									withAsterisk
									error={errors.budget && errors.budget.message}
								/>
							);
						}}
					/>
					<Controller
						name='target'
						control={control}
						rules={{ required: 'المستهدفين مطلوب' }}
						render={({ field }) => {
							return (
								<Select
									{...field}
									size={'md'}
									label='المستهدفين'
									placeholder='المستهدفين'
									data={$enum(Grade).map((x) => x)}
									withAsterisk
									error={errors.target && errors.target.message}
								/>
							);
						}}
					/>
					<Controller
						name='type'
						control={control}
						rules={{ required: 'النوع مطلوب', pattern: { value: /^[\w\S]/, message: 'ادخال خاطئ.' } }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									size={'md'}
									label='النوع'
									placeholder='النوع'
									withAsterisk
									error={errors.type && errors.type.message}
								/>
							);
						}}
					/>
					<Controller
						name='quarter'
						control={control}
						rules={{ required: 'الربع السنوي مطلوب' }}
						render={({ field }) => {
							return (
								<Select
									{...field}
									size={'md'}
									data={$enum(Quarter).map((x) => x.toString())}
									multiple={true}
									label='الربع السنوي'
									withAsterisk
									error={errors.quarter?.message && errors.quarter.message}
								/>
							);
						}}
					/>
					<Controller
						name='ActivityGoal'
						control={control}
						rules={{ required: 'اختر هدف واحد على الأقل' }}
						render={({ field: { onChange } }) => {
							return (
								<MultiSelect
									// {...field}
									defaultValue={activityInfo?.ActivityGoal?.map((x) => x?.goalId!.toString())}
									data={goalInfo.map((goal) => ({
										value: goal.id.toString(),
										label: goal.title,
									}))}
									onChange={(value) => {
										console.log('🚀 ~ file: ActivityForm.tsx:214 ~ value:', value);
										setValue(
											'ActivityGoal',
											value.map((x) => ({ goalId: Number(x) }))
										);
									}}
									clearable
									size={'md'}
									label='اختر أهداف النشاط'
									withAsterisk
									error={errors.ActivityGoal?.message && errors.ActivityGoal.message}
								/>
							);
						}}
					/>
					<Group position='center' pt={50}>
						<Button type='submit' fullWidth>
							إرسال
						</Button>
					</Group>
				</form>
			</Card>
		</Container>
	);
}
