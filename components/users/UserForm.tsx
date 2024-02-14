import { Button, Card, Group, Loader, PasswordInput, Radio, Select, TextInput } from '@mantine/core';
import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { ResponseType, STATUS_CODE, _UserWithGuardianAndSponsor } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
import { IconCheck, IconEye, IconEyeOff, IconX } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { Gender, UserType } from '@prisma/client';
import myNotification from 'components/MyNotification';

interface Props {
	bigUser?: _UserWithGuardianAndSponsor;
	userType?: UserType | undefined;
}
export default function UserForm({ bigUser, userType }: Props): JSX.Element {
	console.log('🚀 ~ file: UserForm.tsx:20 ~ UserForm ~ bigUser:', bigUser);
	const router = useRouter();
	const [hydrate, setHydrate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<_UserWithGuardianAndSponsor>({ defaultValues: { ...bigUser, type: userType } });

	const onSubmit = async (data: _UserWithGuardianAndSponsor) => {
		setIsLoading(true);
		console.log('🚀 ~ file: UserForm.tsx:29 ~ onSubmit ~ data:', data);
		data.username = data.username.trim();
		data.password = data.password.trim();
		try {
			if (!bigUser) {
				console.log('user not exist.');
				const url = serverLink + 'api/user/create/';
				const res = await axios.post<ResponseType>(url, data);
				console.log('🚀 ~ file: UserForm.tsx:42 ~ onSubmit ~ res:', res);
				if (res.status === STATUS_CODE.OK) {
					myNotification('Success', res.data.msg, 'green', <IconCheck />);
					if (router.asPath.includes('guardians')) router.push(serverLink + 'guardians/');
					else if (router.asPath.includes('sponsors')) router.push(serverLink + 'sponsors/');
					else router.push(serverLink + 'users/');
				} else myNotification('Error', res.data.msg, 'red', <IconX />);
			} else {
				console.log('user exist.', bigUser.id);
				const url = serverLink + '/api/user/' + bigUser.id;
				const res = await axios.put(url, data);
				console.log('🚀 ~ file: UserForm.tsx:53 ~ onSubmit ~ res:', res);
				if (res.status === STATUS_CODE.OK) {
					myNotification('Success', res.data.msg, 'green', <IconCheck />);
					if (router.asPath.includes('guardians')) router.push(serverLink + 'guardians/');
					else if (router.asPath.includes('sponsors')) router.push(serverLink + 'sponsors/');
					else router.push(serverLink + 'users/');
				} else myNotification('Error', res.data.msg, 'red', <IconX />);
			}
		} catch (error) {
			console.log('🚀 ~ file: UserForm.tsx:50 ~ onSubmit ~ error:', error.response?.data.msg);
			myNotification('Error', error.response.data.msg || 'Something was wrong', 'red', <IconX />);
		}
		setIsLoading(false);

		// router.push(router.asPath);
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <Loader size={100} />;
	return (
		<>
			<div className='container mx-auto py-3'>
				<Card withBorder p={'xl'}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name='name'
							control={control}
							rules={{ required: 'name is required', pattern: { value: /^[\w\S]/, message: 'invalid input.' } }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										label='الاسم'
										error={errors.name && errors.name.message}
										placeholder='الاسم'
										withAsterisk
									/>
								);
							}}
						/>
						<Controller
							name='gender'
							control={control}
							rules={{ required: 'الجنس مطلوب' }}
							render={({ field }) => {
								return (
									<Radio.Group {...field} label={'الجنس'} error={errors.gender && errors.gender.message} withAsterisk>
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
							name='username'
							control={control}
							rules={{ required: 'اسم المستخدم مطلوب', pattern: { value: /^[\w\S]/, message: 'ادخال خاطئ.' } }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										// onChange={(value)=>{
										// }}
										label='اسم المستخدم'
										placeholder='اسم المستخدم'
										withAsterisk
										error={errors.username && errors.username.message}
									/>
								);
							}}
						/>
						<Controller
							name='password'
							control={control}
							rules={{
								required: 'كلمة المرور مطلوبة',
								pattern: { value: /^[\w\S]/, message: 'ادخال خاطئ.' },
								// pattern: {
								// 	value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-]).{8,}$/,
								// 	message: `invalid password. it should contains:At least: 8 characters, one lowercase letter, one uppercase letter, one digit, one special character`,
								// },
							}}
							render={({ field }) => {
								return (
									<PasswordInput
									dir='ltr'
										{...field}
										label='كملة المرور'
										placeholder='كملة المرور'
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
							rules={{
								required: 'البريد الإلكتروني مطلوب',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'بريد إلكتروني خاطئ. مثال للإدخال الصحيح: yourEmail@gmail.com ',
								},
							}}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										label='البريد الإلكتروني'
										placeholder='البريد الإلكتروني'
										type='email'
										required
										withAsterisk
										error={errors.email && errors.email.message}
									/>
								);
							}}
						/>

						<Controller
							name='address'
							control={control}
							// rules={{ required: 'address is required', pattern: { value: /^[\w\S]/, message: 'invalid input.' } }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										error={errors.address && errors.address.message}
										label='العنوان'
										placeholder='العنوان'
										// withAsterisk
									/>
								);
							}}
						/>
						<Controller
							name='phone'
							control={control}
							// rules={{
							// 	required: 'Phone number is required.',
							// 	// max: { value: 799999999, message: '> 799999999' },
							// 	// min: { value: 699999999, message: '> 699999999' },
							// 	// $/^(?:(?:\+|00)9677|0?7)[01378]\d{7}|(?:(?:\+|00)967|0)[1-7]\d{6}$/
							// 	pattern: {
							// 		value: /^(^\+\d{0,3})?(\s)?(\d{9,12})$/,
							// 		message: 'invalid phone number. valid value: +967 776640541',
							// 	},
							// }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										type='tel'
										// withAsterisk
										error={errors.phone && errors.phone.message}
										label='رقم الجوال'
										name='رقم الجوال'
									/>
								);
							}}
						/>

						{userType != 'GUARDIAN' && userType != 'SPONSOR' && (
							<Controller
								name='type'
								control={control}
								rules={{
									required: 'نوع المستخدم مطلوب',
								}}
								render={({ field }) => {
									return (
										<Select
											{...field}
											data={$enum(UserType).map((t) => t)}
											error={errors.type && errors.type.message}
											defaultValue={bigUser?.type}
											withAsterisk
											label='نوع المستخدم'
											name='type'
											// dropdownPosition='bottom'
										/>
									);
								}}
							/>
						)}

						{watch('type')?.valueOf() === 'GUARDIAN' ? (
							<Controller
								name='Guardian.relationship'
								control={control}
								rules={{ required: 'علاقة الوصي باليتيم مطلوبة', pattern: { value: /^[\w\S]/, message: 'ادخال خاطئ' } }}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											error={errors.Guardian?.relationship && errors.Guardian.message}
											label='العلاقة'
											placeholder='العلاقة'
											withAsterisk
										/>
									);
								}}
							/>
						) : (
							(setValue('Guardian', undefined) as undefined)
						)}
						{watch('type')?.valueOf() === 'SPONSOR' ? (
							<>
								<Controller
									name='Sponsor.birthdate'
									control={control}
									// rules={{ required: 'birthdate is required' }}
									render={({ field }) => {
										return (
											<DatePickerInput
												{...field}
												valueFormat='YYYY MM D'
												label='تاريخ الميلاد'
												placeholder='تاريخ الميلاد'
												withAsterisk
												error={errors.Sponsor?.birthdate && errors.Sponsor.birthdate.message}
											/>
										);
									}}
								/>
								<Controller
									name='Sponsor.fax'
									control={control}
									// rules={{ required: 'fax is required' }}
									render={({ field }) => {
										return (
											<TextInput
												{...field}
												error={errors.Sponsor?.fax && errors.Sponsor.fax.message}
												label='الفاكس'
												placeholder='الفاكس'
												withAsterisk
											/>
										);
									}}
								/>
								<Controller
									name='Sponsor.identityNumber'
									control={control}
									rules={{ required: 'رقم الهوية مطلوب' }}
									render={({ field }) => {
										return (
											<TextInput
												{...field}
												error={errors.Sponsor?.identityNumber && errors.Sponsor.identityNumber.message}
												label='رقم الهوية مطلوب'
												placeholder='رقم الهوية مطلوب'
												// hideControls
												withAsterisk
											/>
										);
									}}
								/>
							</>
						) : (
							(setValue('Sponsor', undefined) as undefined)
						)}
						<Group position='center' pt={50}>
							<Button type='submit' fullWidth loading={isLoading}>
								إرسال
							</Button>
						</Group>
					</form>
				</Card>
			</div>
		</>
	);
}
