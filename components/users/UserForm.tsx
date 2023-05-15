import { Box, Button, Card, Group, Loader, NumberInput, PasswordInput, Radio, Select, TextInput } from '@mantine/core';
import { $enum } from 'ts-enum-util';
import { ReactNode, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { User, _UserWithGuardianAndSponsor } from '../../types/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { Gender, Prisma, UserType } from '@prisma/client';
import React from 'react';
interface Props {
	bigUser?: _UserWithGuardianAndSponsor;
	userType?: UserType | undefined;
	close: () => void;
}
export default function UserForm({ bigUser, userType, close }: Props): JSX.Element {
	const router = useRouter();
	const [hydrate, setHydrate] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<_UserWithGuardianAndSponsor>({ defaultValues: { ...bigUser, type: userType } });
	// } = useForm<User>({ defaultValues: { ...bigUser, type: userType } });

	const onSubmit = async (data: _UserWithGuardianAndSponsor) => {
		console.log('🚀 ~ file: UserForm.tsx:29 ~ onSubmit ~ data:', data);
		// const config: AxiosRequestConfig = {
		// 	headers: { 'content-type': 'multipart/form-data' },
		// };
		if (!bigUser) {
			console.log('user not exist.');
			const url = serverLink + '/api/user/create/';
			const res = await axios.post(url, data).catch((err) => console.log('error at creating new user--', err));
			console.log('🚀 ~ file: UserForm.tsx:36 ~ onSubmit ~ res:', res);
		} else {
			console.log('user exist.', bigUser.id);
			const url = serverLink + '/api/user/' + bigUser.id;
			const res = await axios.put(url, data);
			console.log('🚀 ~ file: UserForm.tsx:52 ~ onSubmit ~ res:', res);
		}
		close();
		router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<Box maw={1000} mx='auto'>
				<Card withBorder p={'xl'}>
					<form onSubmit={handleSubmit(onSubmit)}>
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
							name='userName'
							control={control}
							rules={{ required: 'userName is required' }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										label='userName'
										placeholder='userName'
										withAsterisk
										error={errors.userName && errors.userName.message}
									/>
								);
							}}
						/>
						<Controller
							name='password'
							control={control}
							rules={{ required: 'password is required' }}
							render={({ field }) => {
								return (
									<PasswordInput
										{...field}
										label='password'
										placeholder='password'
										withAsterisk
										visibilityToggleIcon={({ reveal, size }) => (!reveal ? <IconEye size={size} /> : <IconEyeOff size={size} />)}
										error={errors.password && errors.password.message}
									/>
								);
							}}
						/>
						<Controller
							name='email'
							control={control}
							rules={{ required: 'email is required' }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										label='email'
										placeholder='email'
										withAsterisk
										error={errors.email && errors.email.message}
									/>
								);
							}}
						/>

						<Controller
							name='address'
							control={control}
							rules={{ required: 'address is required' }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										error={errors.address && errors.address.message}
										label='address'
										placeholder='address'
										withAsterisk
									/>
								);
							}}
						/>
						<Controller
							name='phone'
							control={control}
							rules={{
								required: false,
								max: { value: 799999999, message: '> 799999999' },
								min: { value: 699999999, message: '> 699999999' },
							}}
							render={({ field }) => {
								return (
									<TextInput {...field} type='tel' error={errors.phone && errors.phone.message} label='phone' name='phone' />
								);
							}}
						/>

						{userType != 'GUARDIAN' && userType != 'SPONSOR' && (
							<Controller
								name='type'
								control={control}
								rules={{
									required: 'type is required',
								}}
								render={({ field }) => {
									return (
										<Select
											{...field}
											data={$enum(UserType).map((t) => t)}
											error={errors.type && errors.type.message}
											label='userType'
											name='type'
											// dropdownPosition='bottom'
										/>
									);
								}}
							/>
						)}

						{watch('type')?.valueOf() === 'GUARDIAN' ? (
							<Controller
								name='guardian.relationship'
								control={control}
								rules={{ required: 'relationship is required' }}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											error={errors.guardian?.relationship && errors.guardian.message}
											label='relationship'
											placeholder='relationship'
											withAsterisk
										/>
									);
								}}
							/>
						) : (
							(setValue('guardian', undefined) as undefined)
						)}
						{watch('type')?.valueOf() === 'SPONSOR' ? (
							<>
								<Controller
									name='sponsor.birthdate'
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
												withAsterisk
												error={errors.sponsor?.birthdate && errors.sponsor.birthdate.message}
											/>
										);
									}}
								/>
								<Controller
									name='sponsor.fax'
									control={control}
									rules={{ required: 'fax is required' }}
									render={({ field }) => {
										return (
											<TextInput
												{...field}
												error={errors.sponsor?.fax && errors.sponsor.fax.message}
												label='fax'
												placeholder='fax'
												withAsterisk
											/>
										);
									}}
								/>
								<Controller
									name='sponsor.identityNumber'
									control={control}
									rules={{ required: 'identityNumber is required' }}
									render={({ field }) => {
										return (
											<TextInput
												{...field}
												error={errors.sponsor?.identityNumber && errors.sponsor.identityNumber.message}
												label='identityNumber'
												placeholder='identityNumber'
												// hideControls
												withAsterisk
											/>
										);
									}}
								/>
							</>
						) : (
							(setValue('sponsor', undefined) as undefined)
						)}
						<Group position='center' pt={50}>
							<Button type='submit' fullWidth>
								Submit
							</Button>
						</Group>
					</form>
				</Card>
			</Box>
		</>
	);
}
