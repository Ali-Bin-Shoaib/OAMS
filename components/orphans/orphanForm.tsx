import {
	Button,
	Checkbox,
	FileInput,
	Group,
	NumberInput,
	Radio,
	Select,
	TextInput,
	Textarea,
	Title,
} from '@mantine/core';
import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { Gender, Grade, Guardian, HomeType, Status } from '@prisma/client';
import { v4 } from 'uuid';
import { DatePickerInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { _Orphan, _Guardian, ResponseType, STATUS_CODE } from '../../types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { serverLink } from '../../shared/links';
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
	console.log('🚀 ~ file: OrphanForm.tsx:40 ~ OrphanForm ~ guardians:', guardians);
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
				{orphan ? 'تعديل بيانات اليتيم' : 'إضافة معلومات اليتيم'}
			</Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='guardianId'
					control={control}
					rules={{ required: 'اختر وصي اليتيم.' }}
					render={({ field: { onChange } }) => {
						return (
							<Select
								// {...field}
								data={guardians?.map((guardian) => ({
									value: guardian.user.id!.toString(),
									label: guardian.user.name,
								}))}
								searchable
								clearable
								allowDeselect
								onChange={(id) => setValue('guardianId', Number(id))}
								className=' mx-auto py-2 mb-2'
								label='اختر وصي اليتيم'
								defaultValue={orphan?.guardianId.toString()}
								withAsterisk
								description='اربط اليتيم بوصي موجود'
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
									label='الاسم'
									error={errors.name && errors.name.message}
									placeholder='أحمد'
									defaultValue={orphan && (orphan.image as unknown as string | number | readonly string[] | undefined)}
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='image'
						control={control}
						rules={{ required: 'الصورة مطلوبة' }}
						render={({ field }) => {
							return (
								<FileInput
									{...field}
									error={errors.image && errors.image.message}
									label='صورة اليتيم'
									accept='image/*'
									// w={200}
									placeholder='اختر صورة اليتيم'
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
						name='birthdate'
						control={control}
						rules={{ required: 'تاريخ الميلاد مطلوب' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='YYYY MM D'
									minDate={new Date(2008, 1, 1)}
									maxDate={new Date(2017, 1, 1)}
									date={new Date(new Date().getFullYear() - 10, 5, 20)}
									label='تاريخ الميلاد'
									placeholder='تاريخ الميلاد'
									// w={100}
									withAsterisk
									error={errors.birthdate && errors.birthdate.message}
								/>
							);
						}}
					/>

					<Controller
						name='birthplace'
						control={control}
						rules={{ required: 'مكان الميلاد مطلوب' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									label='مكان الميلاد '
									placeholder='مكان الميلاد '
									withAsterisk
									error={errors.birthplace && errors.birthplace.message}
								/>
							);
						}}
					/>
					<Controller
						name='age'
						control={control}
						rules={{
							required: 'العمر مطلوب',
							min: { value: 6, message: ' يجيب ان بكون العمر 6 أو أكبر' },
							max: { value: 15, message: 'يجب أن يكون العمر أقل من 16' },
						}}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									label='العمر'
									placeholder='العمر'
									withAsterisk
									error={errors.age && errors.age.message}
								/>
							);
						}}
					/>

					<Controller
						name='joinDate'
						control={control}
						// rules={{ required: 'joinDate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='D M YYYY'
									label='تاريخ الإنضمام'
									date={new Date()}
									defaultValue={new Date()}
									placeholder={new Date().toDateString()}
									// w={100}
									error={errors.joinDate && errors.joinDate.message}
								/>
							);
						}}
					/>
					<Controller
						name='schoolName'
						control={control}
						rules={{ required: 'اسم المدرسة مطلوب' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									label='اسم المدرسة'
									placeholder='اسم المدرسة'
									withAsterisk
									error={errors.schoolName && errors.schoolName.message}
								/>
							);
						}}
					/>
					<Controller
						name='gradeLevel'
						control={control}
						rules={{ required: 'المستوى الدراسي مطلوب' }}
						render={({ field }) => {
							return (
								<Select
									{...field}
									data={$enum(Grade).map((g) => g)}
									label='المستوى الدراسي'
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
							required: 'نسبة آخر سنة دراسية مطلوبة',
							max: {
								value: 100,
								message: 'نسبة آخر سنة دراسية يجب أن تكون أقل من أو تساوي 100',
							},
							min: {
								value: 50,
								message: 'نسبة آخر سنة دراسية يجب أن تكون أكبر من 50',
							},
						}}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									placeholder=' نسبة آخر سنة دراسية'
									label=' نسبة آخر سنة دراسية'
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
						// rules={{ required: 'fatherDeathDate is required' }}
						render={({ field }) => {
							return (
								<DatePickerInput
									{...field}
									valueFormat='D M YYYY'
									label='تاريخ وفاة الأب'
									placeholder='تاريخ وفاة الأب'
									// withAsterisk
									// error={errors.fatherDeathDate && errors.fatherDeathDate.message}
								/>
							);
						}}
					/>
					<Controller
						name='fatherWork'
						control={control}
						// rules={{ required: 'fatherWork is required' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									label='عمل الأب'
									placeholder='عمل الأب'
									// withAsterisk
									// error={errors.fatherWork && errors.fatherWork.message}
								/>
							);
						}}
					/>
					<Controller
						name='fatherDeathCos'
						control={control}
						// rules={{ required: 'fatherDeathCos is required' }}
						render={({ field }) => {
							return (
								<Textarea
									{...field}
									// error={errors.fatherDeathCos && errors.fatherDeathCos.message}
									label='أسباب وفاة الأب'
									placeholder='أسباب وفاة الأب'
									// withAsterisk
								/>
							);
						}}
					/>

					<Controller
						name='males'
						control={control}
						// rules={{ required: 'males is required' }}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									// error={errors.males && errors.males.message}
									label='عدد الذكور في الأسرة'
									// description='males members in the family'
									placeholder='عدد الذكور في الأسرة'
									// withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='females'
						control={control}
						// rules={{ required: 'females is required' }}
						render={({ field }) => {
							return (
								<NumberInput
									{...field}
									// error={errors.females && errors.females.message}
									label='عدد الإناث في الأسرة'
									// description='Females members in the family'
									placeholder='عدد الإناث في الأسرة'
									// w={99}
									// withAsterisk
								/>
							);
						}}
					/>

					<Controller
						name='liveWith'
						control={control}
						rules={
							{
								// required: 'live with is required.',
							}
						}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									error={errors.liveWith && errors.liveWith.message}
									label='يسكن مع'
									// withAsterisk
								/>
							);
						}}
					/>

					<Controller
						name='homeType'
						control={control}
						rules={
							{
								// required: 'home type is required',
							}
						}
						render={({ field }) => {
							return (
								<Select
									{...field}
									data={$enum(HomeType).map((type) => type)}
									// error={errors.homeType && errors.homeType.message}
									label='نوع السكن'
									name='homeType'
								/>
							);
						}}
					/>
					<Controller
						name='homePhone'
						control={control}
						rules={{
							required: 'رقم المنزل مطلوب',
							pattern: {
								value: homePhoneRegex,
								message: 'رقم المنزل خاطىء',
							},
						}}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									type='tel'
									error={errors.homePhone && errors.homePhone.message}
									label='رقم المنزل'
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
							required: 'العنوان الحالي مطلوب.',
						}}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									error={errors.currentAddress && errors.currentAddress.message}
									label='العنوان الحالي'
									placeholder='العنوان الحالي'
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='motherName'
						control={control}
						rules={{ required: 'اسم الأم مطلوب' }}
						render={({ field }) => {
							return (
								<TextInput
									{...field}
									error={errors.motherName && errors.motherName.message}
									label='اسم الأم'
									placeholder='اسم الأم'
									withAsterisk
								/>
							);
						}}
					/>
					<Controller
						name='motherStatus'
						control={control}
						rules={{
							required: 'حالة الأم مطلوبة',
						}}
						render={({ field }) => {
							return (
								<Select
									{...field}
									data={$enum(Status).map((s) => s)}
									error={errors.motherStatus && errors.motherStatus.message}
									label='حالة الأم'
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
									label='هل الأم تعمل؟'
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
									return <TextInput {...field} error={errors.motherJob && errors.motherJob.message} label='عمل الأم' />;
								}}
							/>
							<Controller
								name='motherJobPhone'
								control={control}
								rules={{
									required: false,
									pattern: { value: homePhoneRegex, message: 'رقم خاطئ.' },
								}}
								render={({ field }) => {
									return (
										<TextInput
											{...field}
											type='tel'
											error={errors.motherJobPhone && errors.motherJobPhone.message}
											label='رقم جوال العمل'
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
											placeholder='الدخل الشهري'
											error={errors.monthlyIncome && errors.monthlyIncome.message}
											label='الدخل الشهري'
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
									label='هل اليتيم مكفول من جهة أخرى؟'
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
											label='اسم المؤسسة'
											placeholder='اسم المؤسسة'
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
											label='مبلغ الكفالة'
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
					<Button type='submit'>{orphan ? 'تعديل' : 'إضافة'}</Button>
				</div>
			</form>
		</div>
	);
}
