import { useEffect, useState } from 'react';
import { Health, STATUS_CODE, _Attendance, _Orphan, _OrphanAttendance, _UserWithGuardianAndSponsor } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Group, Loader, Select, TextInput, Title, Center, Paper } from '@mantine/core';
import { Orphan } from '@prisma/client';
import myNotification from '../MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

interface Props {
	health?: Health;
	orphans: Orphan[];
}
export default function HealthForm({ orphans, health }: Props): JSX.Element {
	console.log('🚀 ~ file: HealthForm.tsx:40 ~ HealthForm ~ health:', health);
	const { data: session } = useSession();

	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<Health>({
		defaultValues: health,
	});

	const router = useRouter();
	const onSubmit = async (data: Health) => {
		data.userId = session?.user.id;
		console.log('🚀 ~ file: HealthForm.tsx:53 ~ onSubmit ~ data:', data);
		if (!health) {
			console.log('Health not exist.');
			const url = `${serverLink}api/health/create`;
			await axios
				.post(url, data)
				.then((data) => {
					console.log('🚀 ~ file: HealthForm.tsx:60 ~ .then ~ data:', data);
					data.status === STATUS_CODE.OK
						? (myNotification('Create', data.data.msg, 'green', <IconCheck />), router.push(`${serverLink}health`))
						: myNotification('Create', data.data.msg, 'red', <IconX />);
				})
				.catch((err) => {
					console.log('🚀 ~ file: HealthForm.tsx:66 ~ onSubmit ~ err:', err);
					myNotification('Error', err.msg, 'red', <IconX />);
				});
		} else {
			console.log('Health exist.', health.id);
			const url = `${serverLink}/api/health/${health.id}`;
			await axios
				.put(url, data)
				.then((data) => {
					data.status === STATUS_CODE.OK
						? (myNotification('Update', data.data.msg, 'green', <IconCheck />), router.push(`${serverLink}health`))
						: myNotification('Update', data.data.msg, 'red', <IconX />);
				})
				.catch((err) => {
					console.log('🚀 ~ file: HealthForm.tsx:66 ~ onSubmit ~ err:', err);
					myNotification('Error', err.msg, 'red', <IconX />);
				});
		}
		// close();
		// router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Center p={10}>{health ? <Title>تعديل المعلومات الصحية</Title> : <Title>المعلومات الصحية</Title>}</Center>
			<Paper shadow='sm' withBorder p={10} mx={100}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Center pb={20}>
						<Controller
							name='orphanId'
							control={control}
							rules={{
								required: 'Orphan is required',
							}}
							render={({ field: { onChange } }) => {
								return (
									<Select
										onChange={(id) => {
											setValue('orphanId', Number(id || health?.orphanId.toString()));
											setValue(
												'Orphan',
												orphans.find((x) => x.id === Number(id))
											);
										}}
										label='الايتام'
										placeholder='اختر يتيم'
										// description='select an orphan '

										defaultValue={health?.orphanId.toString()}
										searchable
										w={'45%'}
										withAsterisk
										error={errors.orphanId && errors.orphanId.message}
										nothingFound='غير موجود'
										data={orphans.map((x) => ({ value: x.id.toString(), label: x.name }))}
									/>
								);
							}}
						/>
					</Center>
					<Group spacing={'xl'} position='center'>
						{/* @ts-ignore */}

						<Controller
							name='date'
							rules={{ required: 'التاريخ مطلوب' }}
							control={control}
							defaultValue={health ? health.date : new Date()}
							render={({ field }) => {
								return (
									<DatePickerInput
										{...field}
										label='التاريخ'
										w={'45%'}
										placeholder='التاريخ'
										withAsterisk
										error={errors.date && errors.date.message}
									/>
								);
							}}
						/>

						<Controller
							name='User.name'
							control={control}
							// rules={{ required: 'User' }}
							render={({ field }) => {
								return (
									// @ts-ignore
									<TextInput
										{...field}
										disabled
										label='بواسطة'
										defaultValue={health?.User?.name || session?.user.name}
										w={'45%'}
									/>
								);
							}}
						/>

						<Controller
							name='description'
							control={control}
							rules={{
								required: 'الوصف مطلوب',
								pattern: { value: /^[\w\S]/, message: 'إدخال غير صحيح' },
							}}
							render={({ field }) => {
								return (
									// @ts-ignore
									<TextInput
										{...field}
										w={'45%'}
										multiple={true}
										label='الوصف'
										withAsterisk
										error={errors.description && errors.description.message}
									/>
								);
							}}
						/>
						<Controller
							name='disease'
							rules={{ required: 'اسم المرض مطلوب', pattern: { value: /^[\w\S]/, message: 'invalid input' } }}
							control={control}
							render={({ field }) => {
								return (
									// @ts-ignore
									<TextInput
										{...field}
										w={'45%'}
										multiple={true}
										label='المرض'
										withAsterisk
										error={errors.disease && errors.disease.message}
									/>
								);
							}}
						/>
					</Group>
					<Group position='center' p={50}>
						<Button type='submit' size='md' w={'100%'}>
							إضافة
						</Button>
					</Group>
				</form>
			</Paper>
		</>
	);
}
