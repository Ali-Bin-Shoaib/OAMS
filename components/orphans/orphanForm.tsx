import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { Gender, Grade, Status } from '@prisma/client';
import { v4 } from 'uuid';
import { Button, Card, Checkbox, FileInput, Flex, Group, NumberInput, Radio, Select, TextInput, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';

import { _Orphan } from '../../types/types';
import { useRouter } from 'next/router';
interface Props {
	orphan?: _Orphan;
}
export default function OrphanForm({ orphan }: Props): JSX.Element {
	const router = useRouter();
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<_Orphan>({ defaultValues: { ...orphan } });

	const onSubmit = async (data: _Orphan) => {
		console.log('🚀 ~ file: orphanForm.tsx:22 ~ onSubmit ~ data:', data);

		if (!orphan) {
			console.log('orphan not exist.');

			const url = '/api/orphan/create/';
			const res = await fetch(url, {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
		} else {
			console.log('orphan exist.', orphan);

			const url = '/api/orphan/' + orphan.id;
			const res = await fetch(url, {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
		}
		router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <h1>...Loading</h1>;
	return (
		<>
			<form className=' flex flex-wrap p-2 m-2 ' onSubmit={handleSubmit(onSubmit)}>
				<Card withBorder>
					<Flex direction={{ base: 'column', sm: 'row' }} wrap='wrap' gap={{ base: 'sm', sm: 'lg' }} justify={{ sm: 'center' }}>
						<Controller
							name='name'
							control={control}
							rules={{ required: 'name is required' }}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} label='name' placeholder='name' withAsterisk />
										{errors.name && <p className='text-red-500'>*{errors.name.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='image'
							control={control}
							rules={{ required: 'image is required' }}
							render={({ field }) => {
								return (
									<div>
										<FileInput
											{...field}
											id='image'
											label='image'
											accept='image/*'
											defaultValue={null}
											w={200}
											placeholder='choose an image'
											withAsterisk
										/>
										{errors.image && <p className='text-red-500'>*{errors.image.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='gender'
							control={control}
							rules={{ required: 'gender is required' }}
							render={({ field }) => {
								return (
									<Radio.Group {...field} label={'Gender'} withAsterisk>
										<Group mt='md'>
											{$enum(Gender).map((g) => (
												<Radio key={v4()} value={g} label={g.toLowerCase()} />
											))}
										</Group>
										{errors.gender && <p className='text-red-500'>*{errors.gender.message}</p>}
									</Radio.Group>
								);
							}}
						/>
						<Controller
							name='age'
							control={control}
							rules={{
								required: 'age is required',
								min: { value: 6, message: 'age must be 6 or higher' },
								max: { value: 14, message: 'age must be 14 or less' },
							}}
							render={({ field }) => {
								return (
									<div>
										<NumberInput {...field} hideControls label='age' placeholder='age' w={99} withAsterisk />
										{errors.age && <p className='text-red-500'>*{errors.age.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='birthplace'
							control={control}
							rules={{ required: 'birthplace is required' }}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} label='birthplace' placeholder='birthplace' withAsterisk />
										{errors.birthplace && <p className='text-red-500'>*{errors.birthplace.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='birthdate'
							control={control}
							rules={{ required: 'birthdate is required' }}
							render={({ field }) => {
								return (
									<div>
										<DatePickerInput
											{...field}
											valueFormat='YYYY MM D'
											name='birthdate'
											label='birthdate'
											placeholder='birthdate'
											w={100}
											withAsterisk
										/>
										{errors.birthdate && <p className='text-red-500'>*{errors.birthdate.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='joinDate'
							control={control}
							rules={{ required: 'joinDate is required' }}
							render={({ field }) => {
								return (
									<div>
										<DatePickerInput {...field} valueFormat='D M YYYY' name='joinDate' label='joinDate' placeholder='joinDate' w={100} />
										{errors.joinDate && <p className='text-red-500'>*{errors.joinDate.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='schoolName'
							control={control}
							rules={{ required: 'schoolName is required' }}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} label='schoolName' placeholder='schoolName' withAsterisk />
										{errors.schoolName && <p className='text-red-500'>*{errors.schoolName.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='gradeLevel'
							control={control}
							rules={{ required: 'gradeLevel is required' }}
							render={({ field }) => {
								return (
									<div>
										<Select {...field} data={$enum(Grade).map((g) => g)} label='grade level' name='gradeLevel' />
										{errors.gradeLevel && <p className='text-red-500'>*{errors.gradeLevel.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='lastYearPercentage'
							control={control}
							rules={{
								required: 'lastYearPercentage is required',
								max: {
									value: 100,
									message: 'value must be less than or equal 100',
								},
								min: {
									value: 50,
									message: 'value must be greater than or equal 50',
								},
							}}
							render={({ field }) => {
								return (
									<div>
										<NumberInput
											{...field}
											placeholder='lastYearPercentage'
											label='lastYearPercentage'
											name='lastYearPercentage'
											withAsterisk
											precision={2}
											hideControls
										/>
										{errors.lastYearPercentage && <p className='text-red-500'>*{errors.lastYearPercentage.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='fatherDeathDate'
							control={control}
							rules={{ required: 'fatherDeathDate is required' }}
							render={({ field }) => {
								return (
									<div>
										<DatePickerInput
											{...field}
											valueFormat='D M YYYY'
											name='fatherDeathDate'
											label='fatherDeathDate'
											placeholder='fatherDeathDate'
											w={120}
										/>
										{errors.fatherDeathDate && <p className='text-red-500'>*{errors.fatherDeathDate.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='fatherWork'
							control={control}
							rules={{ required: 'fatherWork is required' }}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} label='fatherWork' placeholder='fatherWork' withAsterisk />
										{errors.fatherWork && <p className='text-red-500'>*{errors.fatherWork.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='fatherDeathCos'
							control={control}
							rules={{ required: 'fatherDeathCos is required' }}
							render={({ field }) => {
								return (
									<div>
										<Textarea {...field} label='fatherDeathCos' placeholder='fatherDeathCos' withAsterisk />
										{errors.fatherDeathCos && <p className='text-red-500'>*{errors.fatherDeathCos.message}</p>}
									</div>
								);
							}}
						/>

						<Controller
							name='males'
							control={control}
							rules={{ required: 'males is required' }}
							render={({ field }) => {
								return (
									<div>
										<NumberInput {...field} hideControls label='males' placeholder='males' w={99} withAsterisk />
										{errors.males && <p className='text-red-500'>*{errors.males.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='females'
							control={control}
							rules={{ required: 'females is required' }}
							render={({ field }) => {
								return (
									<div>
										<NumberInput {...field} hideControls label='females' placeholder='females' w={99} withAsterisk />
										{errors.females && <p className='text-red-500'>*{errors.females.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='motherName'
							control={control}
							rules={{ required: 'motherName is required' }}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} label='motherName' placeholder='motherName' withAsterisk />
										{errors.motherName && <p className='text-red-500'>*{errors.motherName.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='motherStatus'
							control={control}
							rules={{
								required: 'motherStatus is required',
							}}
							render={({ field }) => {
								return (
									<div>
										<Select {...field} data={$enum(Status).map((s) => s)} label='mother status' name='motherStatus' />
										{errors.motherStatus && <p className='text-red-500'>*{errors.motherStatus?.message}</p>}
									</div>
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
									<div>
										<Checkbox label='is mother works' {...field} />
										{errors.isMotherWorks && <p className='text-red-500'>*{errors.isMotherWorks?.message}</p>}
									</div>
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
										return (
											<div>
												<TextInput {...field} label='motherJob' name='motherJob' />
												{errors.motherJob && <p className='text-red-500'>*{errors.motherJob?.message}</p>}
											</div>
										);
									}}
								/>
								<Controller
									name='motherJobPhone'
									control={control}
									rules={{
										required: false,
										max: { value: 799999999, message: '> 799999999' },
										min: { value: 699999999, message: '> 699999999' },
									}}
									render={({ field }) => {
										return (
											<div>
												<TextInput {...field} type='tel' label='mother job Phone' name='motherJobPhone' />
												{errors.motherJobPhone && <p className='text-red-500'>*{errors.motherJobPhone?.message}</p>}
											</div>
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
											<div>
												<NumberInput {...field} placeholder='monthlyIncome' label='monthlyIncome' name='monthlyIncome' precision={2} hideControls />
												{errors.monthlyIncome && <p className='text-red-500'>*{errors.monthlyIncome?.message}</p>}
											</div>
										);
									}}
								/>
							</>
						)}
						<Controller
							name='liveWith'
							control={control}
							rules={{
								required: 'liveWith is required.',
							}}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} label='liveWith' name='liveWith' withAsterisk />
										{errors.liveWith && <p className='text-red-500'>*{errors.liveWith?.message}</p>}
									</div>
								);
							}}
						/>

						<Controller
							name='homeType'
							control={control}
							rules={{
								required: 'homeType is required',
							}}
							render={({ field }) => {
								return (
									<div>
										<Select {...field} data={['Rent', 'Owned']} label='home type' name='homeType' />
										{errors.homeType && <p className='text-red-500'>*{errors.homeType.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='homePhone'
							control={control}
							rules={{
								required: 'homePhone is required',
								// max: { value: 799999999, message: '> 799999999' },
								// min: { value: 699999999, message: '> 699999999' },
							}}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} type='tel' label='homePhone' name='homePhone' placeholder='514640' withAsterisk />
										{errors.homePhone && <p className='text-red-500'>*{errors.homePhone?.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='currentAddress'
							control={control}
							rules={{
								required: 'currentAddress is required.',
							}}
							render={({ field }) => {
								return (
									<div>
										<TextInput {...field} label='currentAddress' name='currentAddress' placeholder='currentAddress' withAsterisk />
										{errors.currentAddress && <p className='text-red-500'>*{errors.currentAddress?.message}</p>}
									</div>
								);
							}}
						/>
						<Controller
							name='isSponsored'
							control={control}
							rules={{
								required: false,
							}}
							render={({ field }) => {
								return (
									<div>
										<Checkbox label='isSponsored' {...field} />
										{errors.homeType && <p className='text-red-500'>*{errors.isSponsored?.message}</p>}
									</div>
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
											<div>
												<TextInput {...field} label='foundationName' name='foundationName' placeholder='foundationName' />
												{errors.foundationName && <p className='text-red-500'>*{errors.foundationName?.message}</p>}
											</div>
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
											<div>
												<NumberInput
													{...field}
													placeholder='15000.00'
													label='foundationAmount'
													name='foundationAmount'
													precision={2}
													hideControls
													withAsterisk
												/>
												{errors.foundationAmount && <p className='text-red-500'>*{errors.foundationAmount?.message}</p>}
											</div>
										);
									}}
								/>
							</>
						)}
						<Button type='submit'>Submit</Button>
					</Flex>
				</Card>
			</form>
		</>
	);
}
