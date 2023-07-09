import {
	Button,
	Card,
	Checkbox,
	FileInput,
	Flex,
	Group,
	NumberInput,
	Radio,
	Select,
	TextInput,
	Textarea,
} from '@mantine/core';
import { $enum } from 'ts-enum-util';
import { useContext, useEffect, useState } from 'react';
import { Gender, Grade, Guardian, HomeType, Status, User } from '@prisma/client';
import { v4 } from 'uuid';
import { DatePickerInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { _Orphan, _Guardian } from '../../types';
import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig } from 'axios';
import { serverLink } from '../../shared/links';
import SuperJSON from 'superjson';
import { GuardianContext } from '../../src/pages/orphans/contexts';
import { GetServerSideProps, GetStaticProps } from 'next';
import prisma from '../../lib/prisma';
// export const getStaticProps: GetStaticProps = async () => {
// 	// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	try {
// 		const guardians = prisma.guardian.findMany();

// 		if (!guardians) return { notFound: true };
// 		return {
// 			props: { guardians },
// 		};
// 	} catch (error) {
// 		return { notFound: true }
// 	}
// };
interface Props {
	orphan?: _Orphan;
	guardians: (Guardian & {
		user: User;
	})[];
	close: () => void;
}
export default function OrphanForm({ orphan, close, guardians }: Props): JSX.Element {
	// const [guardians, setGuardians] = useState(useContext(GuardianContext));
	const router = useRouter();
	const [hydrate, setHydrate] = useState(false);
	console.log('🚀 ~ file: OrphanForm.tsx:36 ~ OrphanForm ~ guardians:', guardians);

	const {
		control,
		watch,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<_Orphan>({ defaultValues: orphan });

	const onSubmit = async (data: _Orphan) => {
		console.log('🚀 ~ file: OrphanForm.tsx:44 ~ onSubmit ~ data:', data);
		if (data.guardianId) {
			data.guardianId = Number(data.guardianId);
		}
		const config: AxiosRequestConfig = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		// const form = new FormData();
		// form.append('image', data.image as File);
		// for (const key in data) {
		// 	form.append(key, data[key]);
		// }

		if (!orphan) {
			console.log('orphan not exist.');

			const url = serverLink + '/api/orphan/create/';
			const res = await axios.post(url, data).catch((err) => console.log('error uploaded file', err));
			console.log('🚀 ~ file: OrphanForm.tsx:54 ~ onSubmit ~ res:', res);
		} else {
			console.log('orphan exist.', orphan.id);
			const url = serverLink + '/api/orphan/' + orphan.id;
			const res = await axios.put(url, data);
			console.log('🚀 ~ file: OrphanForm.tsx:58 ~ onSubmit ~ res:', res);
		}
		close();
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
					<Flex
						direction={{ base: 'column', sm: 'row' }}
						wrap='wrap'
						gap={{ base: 'md', sm: 'lg' }}
						justify={{ sm: 'center' }}>
						<Controller
							name='guardianId'
							control={control}
							rules={{ required: "select orphan's guardian" }}
							render={({ field }) => {
								// const { ref, onChange, onBlur, value } = field;
								// const stringValue = value ? value + '' : '';

								return (
									<Select
										{...field}
										data={guardians.map((guardian) => ({
											value: guardian.userId!.toString(),
											label: guardian.user.name,
										}))}
										label="Select Orphan's Guardian"
										name='guardianId'
										value={orphan?.guardianId.toString()}
										withAsterisk
										error={errors.guardianId && errors.guardianId.message}
									/>
								);
							}}
						/>
						<Controller
							name='name'
							control={control}
							rules={{ required: 'name is required' }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										label='name'
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
										label='image'
										accept='image/*'
										w={200}
										placeholder='choose an image'
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
								min: { value: 6, message: 'age must be 6 or higher' },
								max: { value: 14, message: 'age must be 14 or less' },
							}}
							render={({ field }) => {
								return (
									<NumberInput
										{...field}
										hideControls
										label='age'
										placeholder='age'
										w={99}
										withAsterisk
										error={errors.age && errors.age.message}
									/>
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
										label='birthplace'
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
										name='birthdate'
										label='birthdate'
										placeholder='birthdate'
										w={100}
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
										name='joinDate'
										label='joinDate'
										placeholder='joinDate'
										w={100}
										error={errors.joinDate && errors.joinDate.message}
									/>
								);
							}}
						/>
						<Controller
							name='schoolName'
							control={control}
							rules={{ required: 'schoolName is required' }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										label='schoolName'
										placeholder='schoolName'
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
										label='grade level'
										name='gradeLevel'
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
									<NumberInput
										{...field}
										placeholder='lastYearPercentage'
										label='lastYearPercentage'
										name='lastYearPercentage'
										precision={2}
										hideControls
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
										name='fatherDeathDate'
										label='fatherDeathDate'
										placeholder='fatherDeathDate'
										w={120}
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
										label='fatherWork'
										placeholder='fatherWork'
										withAsterisk
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
										label='fatherDeathCos'
										placeholder='fatherDeathCos'
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
										hideControls
										error={errors.males && errors.males.message}
										label='males'
										placeholder='males'
										w={99}
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
										hideControls
										error={errors.females && errors.females.message}
										label='females'
										placeholder='females'
										w={99}
										withAsterisk
									/>
								);
							}}
						/>
						<Controller
							name='motherName'
							control={control}
							rules={{ required: 'motherName is required' }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										error={errors.motherName && errors.motherName.message}
										label='motherName'
										placeholder='motherName'
										withAsterisk
									/>
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
									<Select
										{...field}
										data={$enum(Status).map((s) => s)}
										error={errors.motherStatus && errors.motherStatus.message}
										label='mother status'
										name='motherStatus'
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
										defaultChecked={orphan && (orphan.isMotherWorks as unknown as boolean)}
										error={errors.isMotherWorks && errors.isMotherWorks.message}
										label='is mother works'
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
										return (
											<TextInput
												{...field}
												error={errors.motherJob && errors.motherJob.message}
												label='motherJob'
												name='motherJob'
											/>
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
											<TextInput
												{...field}
												type='tel'
												error={errors.motherJobPhone && errors.motherJobPhone.message}
												label='mother job Phone'
												name='motherJobPhone'
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
												label='monthlyIncome'
												name='monthlyIncome'
												precision={2}
												hideControls
											/>
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
									<TextInput
										{...field}
										error={errors.liveWith && errors.liveWith.message}
										label='liveWith'
										name='liveWith'
										withAsterisk
									/>
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
									<Select
										{...field}
										data={$enum(HomeType).map((type) => type)}
										error={errors.homeType && errors.homeType.message}
										label='home type'
										name='homeType'
									/>
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
									<TextInput
										{...field}
										type='tel'
										error={errors.homePhone && errors.homePhone.message}
										label='homePhone'
										name='homePhone'
										placeholder='514640'
										withAsterisk
									/>
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
									<TextInput
										{...field}
										error={errors.currentAddress && errors.currentAddress.message}
										label='currentAddress'
										name='currentAddress'
										placeholder='currentAddress'
										withAsterisk
									/>
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
									<Checkbox
										defaultChecked={orphan && (orphan.isSponsored as unknown as boolean)}
										error={errors.isSponsored && errors.isSponsored.message}
										label='isSponsored'
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
												label='foundationName'
												name='foundationName'
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
												label='foundationAmount'
												name='foundationAmount'
												precision={2}
												hideControls
												withAsterisk
											/>
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
