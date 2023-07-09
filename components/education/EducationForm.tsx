import { useEffect, useState } from 'react';
import {
	Education,
	STATUS_CODE,
	_Attendance,
	_Orphan,
	_OrphanAttendance,
	_UserWithGuardianAndSponsor,
} from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
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

interface Props {
	education?: Education;
	orphans: Orphan[];
}
export default function EducationForm({ orphans, education }: Props): JSX.Element {
	console.log('🚀 ~ file: EducationForm.tsx:39 ~ EducationForm ~ education:', education);
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
		if (!education) {
			console.log('Education not exist.');
			const url = `${serverLink}api/education/create`;
			await axios
				.post(url, data)
				.then((data) => {
					console.log('🚀 ~ file: EducationForm.tsx:49 ~ await axios.post ~ data:', data);
					data.status === STATUS_CODE.OK
						? (myNotification('Create', data.data.msg, 'green', <IconCheck />), router.push(serverLink + 'education'))
						: myNotification('Create', data.data.msg, 'red', <IconX />);
				})
				.catch((err) => console.log('error at creating new education--', err));
		} else {
			console.log('Education exist.', education.id);
			const url = `${serverLink}/api/education/${education.id}`;
			await axios
				.put(url, data)
				.then((data) => {
					data.status === STATUS_CODE.OK
						? (myNotification('Update', data.data.msg, 'green', <IconCheck />), router.push(serverLink + 'education'))
						: myNotification('Update', data.data.msg, 'red', <IconX />);
				})
				.catch((e) => {
					console.log('🚀 ~ file: EducationForm.tsx:78 ~ await axios.put ~ e:', e);
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
			<Center p={10}>{education ? <Title>Edit Education Info</Title> : <Title>Education Info</Title>}</Center>
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
										onChange={(value) => {
											setValue('orphanId', Number(value || education?.orphanId.toString()));
										}}
										label='Orphans'
										placeholder='choose orphan'
										// description='select an orphan '

										defaultValue={education?.orphanId.toString()}
										searchable
										w={'45%'}
										withAsterisk
										error={errors.orphanId && errors.orphanId.message}
										nothingFound='Not Found'
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
							rules={{ required: 'Date is required' }}
							control={control}
							defaultValue={education ? education.date : new Date()}
							render={({ field }) => {
								return (
									<DatePickerInput
										{...field}
										label='data'
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
										label='User name'
										defaultValue={education?.User?.name}
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
										label='Score Sheet'
										accept='image/*'
										w={'45%'}
										placeholder='upload Score Sheet'
										withAsterisk
									/>
								);
							}}
						/>
						<Controller
							name='schoolYear'
							control={control}
							rules={{ required: 'School Year  is required' }}
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
										label='School Year'
										withAsterisk
										error={errors.schoolYear?.message && errors.schoolYear.message}
									/>
								);
							}}
						/>
						<Controller
							name='degree'
							control={control}
							rules={{ required: 'degree  is required' }}
							render={({ field }) => {
								return (
									<Select
										{...field}
										data={$enum(Degree).map((x) => x.toString())}
										w={'45%'}
										multiple={true}
										label='Degree'
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
							rules={{ required: 'School Name  is required' }}
							render={({ field }) => {
								return (
									// @ts-ignore
									<TextInput
										{...field}
										w={'45%'}
										multiple={true}
										label='School Name'
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
									<Textarea {...field} name='note' label='Note' autosize minRows={3} maxRows={5} w={'80%'} />
								);
							}}
						/>
					</Group>
					<Group position='center' p={50}>
						<Button type='submit' size='md' w={'100%'}>
							Submit
						</Button>
					</Group>
				</form>
			</Paper>
		</>
	);
}
