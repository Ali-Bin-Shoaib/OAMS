import {
	Button,
	Card,
	Checkbox,
	Container,
	FileInput,
	Flex,
	Group,
	NumberInput,
	Radio,
	Select,
	TextInput,
	Textarea,
	Title,
} from '@mantine/core';
import { $enum } from 'ts-enum-util';
import { useContext, useEffect, useState } from 'react';
import { Gender, Grade, Guardian, HomeType, Status, User } from '@prisma/client';
import { v4 } from 'uuid';
import { DatePickerInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { _Orphan, _Guardian, ResponseType, STATUS_CODE } from '../../types';
import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig } from 'axios';
import { serverLink } from '../../shared/links';
import { GuardianContext } from '../../shared/contexts';
import myNotification from 'components/MyNotification';
import { IconCheck } from '@tabler/icons-react';
interface Props {
	orphan?: _Orphan;
	guardians: {
		user: {
			id: number;
			name: string;
		};
	}[];
	close?: () => void;
}
export default function OrphanForm({ orphan, guardians }: Props): JSX.Element {
	const homePhoneRegex = /^(?:(?:\+|00)9677|0?7)[01378]\d{7}|(?:(?:\+|00)967|0)[1-7]\d{6}$/;
	// console.log('+++++++++++++++++++', homePhoneRegex.test('05515235'));

	const router = useRouter();
	const [hydrate, setHydrate] = useState(false);

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<_Orphan>({ defaultValues: orphan });

	const onSubmit = async (data: _Orphan) => {
		console.log('🚀 ~ file: OrphanForm.tsx:44 ~ onSubmit ~ data:', data);
		// const config: AxiosRequestConfig = {
		// 	headers: { 'content-type': 'multipart/form-data' },
		// };
		// const form = new FormData();
		// form.append('image', data.image as File);
		// for (const key in data) {
		// 	form.append(key, data[key]);
		// }

		try {
			if (!orphan) {
				console.log('orphan not exist.');

				const url = serverLink + '/api/orphan/create/';
				const res = await axios.post<ResponseType>(url, data);
				if (res.status === STATUS_CODE.OK) {
					myNotification('Success', res.data.msg, 'green', <IconCheck />);
				} else myNotification('Error', res.data.msg, 'red', <IconCheck />);
			} else {
				console.log('orphan exist.', orphan.id);
				const url = serverLink + '/api/orphan/' + orphan.id;
				const res = await axios.put<ResponseType>(url, data);
				if (res.status === STATUS_CODE.OK) {
					myNotification('Success', res.data.msg, 'green', <IconCheck />);
				} else myNotification('Error', res.data.msg, 'red', <IconCheck />);
			}
			router.push(`${serverLink}orphans`);
		} catch (error) {
			console.log('🚀 ~ file: OrphanForm.tsx:84 ~ onSubmit ~ error:', error);
			myNotification('Error', 'something went wrong', 'red', <IconCheck />);
		}
	};
	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <h1>...Loading</h1>;
	return (
		<div className='container p-1 mx-auto'>
			<Title align='center' className='shadow-md p-3 m-3 rounded-xl'>
				{orphan ? 'Edit Orphan Info' : 'Add Orphan Info'}
			</Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='guardianId'
					control={control}
					rules={{ required: "select orphan's guardian." }}
					render={({ field: { onChange } }) => {
						return (
							<Select
								// {...field}
								data={guardians?.map((guardian) => ({
									value: guardian.user.id!.toString(),
									label: guardian.user.name,
								}))}
								onChange={(id) => setValue('guardianId', Number(id))}
								className=' mx-auto py-2 mb-2'
								label="Select Orphan's Guardian"
								defaultValue={orphan?.guardianId.toString()}
								withAsterisk
								description='Link orphan with existing guardian'
								error={errors.guardianId && errors.guardianId.message}
							/>
						);
					}}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-3'>
					<Controller
						name='name'
						control={control}
						rules={{ required: 'name is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									label='Name'
									error={errors.name && errors.name.message}
									placeholder='name'
									defaultValue={orphan && (orphan.image as unknown as string | number | readonly string[] | undefined)}
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='image'
						control={control}
						rules={{ required: 'image is required' }}
						render={({ field }) => {
							return (
								<FileInput
									{...field}
									error={errors.image && errors.image.message}
									label='Image'
									accept='image/*'
									// w={200}
									placeholder='choose orphan image'
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='gender'
						control={control}
						rules={{ required: 'gender is required' }}
						render={({ field }) => {
							return (
								<Radio.Group {...field} label={'Gender'} error={errors.gender && errors.gender.message} withAsterisk>
									<Group mt='md'>
										{$enum(Gender).map((g) => (
											<Radio key={v4()} value={g} label={g.toLowerCase()} />
										))}
									</Group>
								</Radio.Group>
							);
						}}
					/>
					<Controller
						name='age'
						control={control}
						rules={{
							required: 'age is required',
							min: { value: 6, message: 'Age must be 6 or higher' },
							max: { value: 14, message: 'Age must be 14 or less' },
						}}
						render={({ field }) => {
							return (
								<NumberInput {...field} label='Age' placeholder='age' withAsterisk error={errors.age && errors.age.message} />
							);
						}}
					/>
					<Controller
						name='birthplace'
						control={control}
						rules={{ required: 'birthplace is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									label='Birthplace'
									placeholder='birthplace'
									withAsterisk
									error={errors.birthplace && errors.birthplace.message}
								/>
							);
						}}
					/>
					<Controller
						name='birthdate'
						control={control}
						rules={{ required: 'birthdate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='YYYY MM D'
									label='Birthdate'
									placeholder='birthdate'
									// w={100}
									withAsterisk
									error={errors.birthdate && errors.birthdate.message}
								/>
							);
						}}
					/>
					<Controller
						name='joinDate'
						control={control}
						rules={{ required: 'joinDate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='D M YYYY'
									label='Join Date'
									placeholder='joinDate'
									// w={100}
									error={errors.joinDate && errors.joinDate.message}
								/>
							);
						}}
					/>
					<Controller
						name='schoolName'
						control={control}
						rules={{ required: 'school name is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									label='School Name'
									placeholder='school name'
									withAsterisk
									error={errors.schoolName && errors.schoolName.message}
								/>
							);
						}}
					/>
					<Controller
						name='gradeLevel'
						control={control}
						rules={{ required: 'gradeLevel is required' }}
						render={({ field }) => {
							return (
								<Select
									{...field}
									data={$enum(Grade).map((g) => g)}
									label='Grade level'
									withAsterisk
									error={errors.gradeLevel && errors.gradeLevel.message}
								/>
							);
						}}
					/>
					<Controller
						name='lastYearPercentage'
						control={control}
						rules={{
							required: 'last year percentage is required',
							max: {
								value: 100,
								message: 'percentage must be less than or equal 100',
							},
							min: {
								value: 50,
								message: 'percentage must be greater than or equal 50',
							},
						}}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									placeholder='last year percentage'
									label='Last Year Percentage'
									precision={2}
									withAsterisk
									error={errors.lastYearPercentage && errors.lastYearPercentage.message}
								/>
							);
						}}
					/>
					<Controller
						name='fatherDeathDate'
						control={control}
						rules={{ required: 'fatherDeathDate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='D M YYYY'
									label='Father Death Date'
									placeholder='father death date'
									withAsterisk
									error={errors.fatherDeathDate && errors.fatherDeathDate.message}
								/>
							);
						}}
					/>
					<Controller
						name='fatherWork'
						control={control}
						rules={{ required: 'fatherWork is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									label='Father Work'
									placeholder='fatherWork'
									// withAsterisk
									error={errors.fatherWork && errors.fatherWork.message}
								/>
							);
						}}
					/>
					<Controller
						name='fatherDeathCos'
						control={control}
						rules={{ required: 'fatherDeathCos is required' }}
						render={({ field }) => {
							return (
								<Textarea
									{...field}
									error={errors.fatherDeathCos && errors.fatherDeathCos.message}
									label='Father Death Cos'
									placeholder='father death cos'
									withAsterisk
								/>
							);
						}}
					/>

					<Controller
						name='males'
						control={control}
						rules={{ required: 'males is required' }}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									error={errors.males && errors.males.message}
									label='Males'
									description='males members in the family'
									placeholder='males'
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='females'
						control={control}
						rules={{ required: 'females is required' }}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									error={errors.females && errors.females.message}
									label='Females'
									description='Females members in the family'
									placeholder='females'
									// w={99}
									withAsterisk
								/>
							);
						}}
					/>

					<Controller
						name='liveWith'
						control={control}
						rules={{
							required: 'live with is required.',
						}}
						render={({ field }) => {
							return (
								<TextInput {...field} error={errors.liveWith && errors.liveWith.message} label='Live With' withAsterisk />
							);
						}}
					/>

					<Controller
						name='homeType'
						control={control}
						rules={{
							required: 'home type is required',
						}}
						render={({ field }) => {
							return (
								<Select
									{...field}
									data={$enum(HomeType).map((type) => type)}
									error={errors.homeType && errors.homeType.message}
									label='Home Type'
									name='homeType'
								/>
							);
						}}
					/>
					<Controller
						name='homePhone'
						control={control}
						rules={{
							required: 'home phone is required',
							pattern: {
								value: homePhoneRegex,
								message: 'invalid telephone value',
							},
						}}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									type='tel'
									error={errors.homePhone && errors.homePhone.message}
									label='Home Phone'
									placeholder='05 514640'
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='currentAddress'
						control={control}
						rules={{
							required: 'current address is required.',
						}}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									error={errors.currentAddress && errors.currentAddress.message}
									label='Current Address'
									placeholder='currentAddress'
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='motherName'
						control={control}
						rules={{ required: 'mother name is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									error={errors.motherName && errors.motherName.message}
									label='Mother Name'
									placeholder='mother name'
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='motherStatus'
						control={control}
						rules={{
							required: 'mother status is required',
						}}
						render={({ field }) => {
							return (
								<Select
									{...field}
									data={$enum(Status).map((s) => s)}
									error={errors.motherStatus && errors.motherStatus.message}
									label='Mother Status'
								/>
							);
						}}
					/>

					<Controller
						name='isMotherWorks'
						control={control}
						rules={{
							required: false,
						}}
						render={({ field }) => {
							return (
								<Checkbox
									className='flex flex-col justify-center'
									defaultChecked={orphan && (orphan.isMotherWorks as unknown as boolean)}
									error={errors.isMotherWorks && errors.isMotherWorks.message}
									label='Is Mother Works'
									{...field}
								/>
							);
						}}
					/>
					{watch('isMotherWorks')?.valueOf() && (
						<>
							<Controller
								name='motherJob'
								control={control}
								rules={{
									required: false,
								}}
								render={({ field }) => {
									return <TextInput {...field} error={errors.motherJob && errors.motherJob.message} label='Mother Job' />;
								}}
							/>
							<Controller
								name='motherJobPhone'
								control={control}
								rules={{
									required: false,
									pattern: { value: homePhoneRegex, message: 'invalid phone number.' },
								}}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											type='tel'
											error={errors.motherJobPhone && errors.motherJobPhone.message}
											label='Mother Job Phone'
										/>
									);
								}}
							/>
							<Controller
								name='monthlyIncome'
								control={control}
								rules={{
									required: false,
								}}
								render={({ field }) => {
									return (
										<NumberInput
											{...field}
											placeholder='monthlyIncome'
											error={errors.monthlyIncome && errors.monthlyIncome.message}
											label='Monthly Income'
											precision={2}
										/>
									);
								}}
							/>
						</>
					)}
					<Controller
						name='isSponsored'
						control={control}
						rules={{
							required: false,
						}}
						render={({ field }) => {
							return (
								<Checkbox
									className='flex flex-col justify-center'
									defaultChecked={orphan && (orphan.isSponsored as unknown as boolean)}
									error={errors.isSponsored && errors.isSponsored.message}
									label='Is Sponsord'
									{...field}
								/>
							);
						}}
					/>
					{watch('isSponsored')?.valueOf() && (
						<>
							<Controller
								name='foundationName'
								control={control}
								rules={{
									required: false,
								}}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											error={errors.foundationName && errors.foundationName.message}
											label='Foundation Name'
											placeholder='foundationName'
										/>
									);
								}}
							/>
							<Controller
								name='foundationAmount'
								control={control}
								rules={{
									required: false,
								}}
								render={({ field }) => {
									return (
										<NumberInput
											{...field}
											placeholder='15000.00'
											error={errors.foundationAmount && errors.foundationAmount.message}
											label='Foundation Amount'
											precision={2}
											withAsterisk
										/>
									);
								}}
							/>
						</>
					)}
				</div>
				<div className='text-center'>
					<Button type='submit'>Submit</Button>
				</div>
			</form>
		</div>
	);
}
