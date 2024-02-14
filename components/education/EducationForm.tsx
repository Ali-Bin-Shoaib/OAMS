import { useEffect, useState } from 'react';
import {
	Education,
	ResponseType,
	STATUS_CODE,
	_Attendance,
	_Orphan,
	_OrphanAttendance,
	_UserWithGuardianAndSponsor,
} from '../../types';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { serverLink } from '../../shared/links';
import { DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Button,
	Group,
	Loader,
	Select,
	TextInput,
	FileInput,
	Title,
	Center,
	Paper,
	Textarea,
	Text,
} from '@mantine/core';
import { Degree, Orphan } from '@prisma/client';
import { $enum } from 'ts-enum-util';
import myNotification from '../MyNotification';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

interface Props {
	education?: Education;
	orphans: Orphan[];
}
export default function EducationForm({ orphans, education }: Props): JSX.Element {
	console.log('🚀 ~ file: EducationForm.tsx:39 ~ EducationForm ~ education:', education);
	const { data: session } = useSession();
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<Education>({
		defaultValues: education,
	});
	const dates: number[] = [];
	let i: number = new Date().getFullYear() - 10;
	while (dates.length < 11) {
		dates.push(new Date(i, 1, 1).getFullYear());
		i++;
	}
	const router = useRouter();
	const onSubmit = async (data: Education) => {
		console.log('🚀 ~ file: EducationForm.tsx:31 ~ onSubmit ~ data:', data);
		data.userId = session?.user.id;
		if (!education) {
			console.log('Education not exist.');
			const url = `${serverLink}api/education/create`;
			await axios
				.post<ResponseType>(url, data)
				.then((data) => {
					console.log('🚀 ~ file: EducationForm.tsx:49 ~ await axios.post ~ data:', data);
					data.status === STATUS_CODE.OK
						? (myNotification('Create', data.data.msg, 'green', <IconCheck />), router.push(serverLink + 'education'))
						: myNotification('Error', data.data.msg, 'red', <IconX />);
				})
				.catch((err) => {
					console.log('error at creating new education--', err);
					myNotification('Error', 'Something went wrong', 'red', <IconX />);
				});
		} else {
			console.log('Education exist.', education.id);
			const url = `${serverLink}/api/education/${education.id}`;
			await axios
				.put<ResponseType>(url, data)
				.then((data) => {
					data.status === STATUS_CODE.OK
						? (myNotification('Update', data.data.msg, 'green', <IconCheck />), router.push(serverLink + 'education'))
						: myNotification('Error', data.data.msg, 'red', <IconX />);
				})
				.catch((e) => {
					console.log('🚀 ~ file: EducationForm.tsx:78 ~ await axios.put ~ e:', e);
					myNotification('Error', 'Something went wrong', 'red', <IconX />);
				});
		}
		// router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Center p={10}>{education ? <Title>تعديل المعلومات التعليمية</Title> : <Title>المعلومات التعليمية</Title>}</Center>
			<Paper shadow='sm' withBorder p={10} mx={100}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Center pb={20}>
						<Controller
							name='orphanId'
							control={control}
							rules={{
								required: 'يجب اختيار يتيم لعرض معلوماته',
							}}
							render={({ field: { onChange } }) => {
								return (
									<Select
										onChange={(id) => {
											setValue('orphanId', Number(id || education?.orphanId?.toString()));
											setValue(
												'Orphan',
												orphans.find((x) => x.id === Number(id))
											);
										}}
										label='الأيتام'
										placeholder='اختر يتيم'
										// description='select an orphan '
										required
										defaultValue={education?.orphanId?.toString()}
										searchable
										selectOnBlur
										w={'45%'}
										withAsterisk
										error={errors.orphanId && errors.orphanId.message}
										nothingFound='غير موجود'
										data={orphans.map((x) => ({ value: x.id.toString(), label: x.name }))}
										hoverOnSearchChange
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
							defaultValue={education ? education.date : new Date()}
							render={({ field }) => {
								return (
									<DatePickerInput
										{...field}
										label='التاريخ'
										w={'45%'}
										placeholder='date'
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
										name='User.name'
										label='بواسطة'
										defaultValue={education?.User?.name || session?.user.name}
										w={'45%'}
									/>
								);
							}}
						/>
						<Controller
							name='scoreSheet'
							control={control}
							rules={{ required: 'Score Sheet is required' }}
							render={({ field }) => {
								return (
									<FileInput
										{...field}
										error={errors.scoreSheet && errors.scoreSheet.message}
										label='كشف الدرجات'
										accept='image/*'
										w={'45%'}
										placeholder='ارفع كشف الدرجات'
										withAsterisk
									/>
								);
							}}
						/>
						<Controller
							name='schoolYear'
							control={control}
							rules={{ required: 'السنة الدراسية مطلوبة' }}
							render={({ field: { onChange } }) => {
								return (
									<Select
										// {...field}
										onChange={(value) => {
											setValue('schoolYear', Number(value));
										}}
										data={dates.map((x) => x.toString())}
										defaultValue={education?.schoolYear?.toString()}
										w={'45%'}
										multiple={true}
										label='السنة الدراسية'
										withAsterisk
										error={errors.schoolYear?.message && errors.schoolYear.message}
									/>
								);
							}}
						/>
						<Controller
							name='degree'
							control={control}
							rules={{ required: 'الدرجة مطلوبة' }}
							render={({ field }) => {
								return (
									<Select
										{...field}
										data={$enum(Degree).map((x) => x.toString())}
										w={'45%'}
										multiple={true}
										label='الدجة'
										withAsterisk
										error={errors.schoolYear?.message && errors.schoolYear.message}
									/>
								);
							}}
						/>
						{/* @ts-ignore */}

						<Controller
							name='Orphan.schoolName'
							control={control}
							rules={{ required: 'اسم المدرسة مطلوب' }}
							render={({ field }) => {
								return (
									// @ts-ignore
									<TextInput
										{...field}
										w={'45%'}
										multiple={true}
										disabled
										label='اسم المدرسة'
										withAsterisk
										error={errors.Orphan?.schoolName?.message && errors.Orphan.schoolName.message}
									/>
								);
							}}
						/>
						<Controller
							name='note'
							control={control}
							render={({ field }) => {
								return (
									// @ts-ignore
									<Textarea {...field} name='note' label='ملاحظة' autosize minRows={3} maxRows={5} w={'80%'} />
								);
							}}
						/>
					</Group>
					<Group position='center' p={50}>
						<Button type='submit' size='md' w={'100%'}>
							اضافة
						</Button>
					</Group>
				</form>
			</Paper>
		</>
	);
}
