import { useEffect, useState } from 'react';
import { Education, _Attendance, _Orphan, _OrphanAttendance, _UserWithGuardianAndSponsor } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { DatePickerInput } from '@mantine/dates';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Group, Loader, Select, TextInput, FileInput, Title, Center, Paper } from '@mantine/core';
import { Degree, Orphan } from '@prisma/client';
import { $enum } from 'ts-enum-util';

interface Props {
	education?: Education;
	orphans: Orphan[];
}
export default function EducationForm({ orphans, education }: Props): JSX.Element {
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
			const res = await axios.post(url, data).catch((err) => console.log('error at creating new education--', err));
			console.log('🚀 ~ file: EducationForm.tsx:38 ~ onSubmit ~ res:', res);
		} else {
			console.log('Education exist.', education.id);
			const url = `${serverLink}/api/education/${education.id}`;
			const res = await axios.put(url, data);
			console.log('🚀 ~ file: EducationForm.tsx:43 ~ onSubmit ~ res:', res);
		}
		// close();
		// router.push(router.asPath);
		router.push(serverLink + 'education');
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
					<Group spacing={'xl'} position='center'>
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
						<Controller
							name='Orphan.schoolName'
							control={control}
							rules={{ required: 'School Name  is required' }}
							render={({ field }) => {
								return (
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
					</Group>
					<Group position='center' p={50}>
						<Button type='submit'>Submit</Button>
					</Group>
				</form>
			</Paper>
		</>
	);
}
