import { $enum } from 'ts-enum-util';
import { FormEvent, useEffect, useState } from 'react';
import { Gender, Grade, Status } from '@prisma/client';
import { v4 } from 'uuid';
import {
	Button,
	FileInput,
	Flex,
	Group,
	NumberInput,
	Radio,
	Select,
	TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';

export default function OrphanForm(): JSX.Element {
	interface FormData {
		id?: number;
		name: string;
		image?: File | null;
		gender: Gender;
		age: number;
		birthplace: string;
		birthdate: Date;
		joinDate?: Date;
		schoolName: string;
		gradeLevel: Grade;
		lastYearPercentage: number;
		fatherDeathDate: Date;
		fatherWork: string;
		fatherDeathCos: string;
		noOfFamilyMembers: number;
		males: number;
		females: number;
		motherName: string;
		motherStatus: Status;
		isMotherWorks: boolean;
		motherJob: string;
		motherJobPhone: string;
		monthlyIncome: number;
		liveWith: string;
		homeType: string;
		homePhone: string;
		currentAddress: string;
		isSponsored: boolean;
		foundationName: string;
		foundationAmount: number;
		evaluation?: number;
		guardianId?: number;
	}

	const [data, setData] = useState<FormData>({
		id: 0,
		name: 'default',
		image: null,
		gender: Gender.FEMALE,
		age: 6,
		birthplace: 'string',
		birthdate: new Date(),
		joinDate: new Date(),
		schoolName: 'string',
		gradeLevel: Grade.EIGHTH,
		lastYearPercentage: 0,
		fatherDeathDate: new Date(),
		fatherWork: 'string',
		fatherDeathCos: 'string',
		noOfFamilyMembers: 0,
		males: 0,
		females: 0,
		motherName: 'string',
		motherStatus: Status.ALIVE,
		isMotherWorks: false,
		motherJob: 'string',
		motherJobPhone: 'string',
		monthlyIncome: 0,
		liveWith: 'string',
		homeType: 'string',
		homePhone: 'string',
		currentAddress: 'string',
		isSponsored: false,
		foundationName: 'string',
		foundationAmount: 0,
		evaluation: 0,
		guardianId: 0,
	});
	const [hydrate, setHydrate] = useState(false);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { ...data },
		// resolver: zodResolver(schema),
	});

	const onSubmit = async (data: FormData) => {
		console.log('🚀 ~ file: orphanForm.tsx:100 ~ onSubmit ~ data:', data);
		console.log(
			'🚀 ~ file: orphanForm.jsx:10 ~ handelSubmit ~ errors.root?.message',
			errors.root?.message
		);
		// const url = '/api/orphan/create/';
		// const res = await fetch(url, {
		// 	method: 'post',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(data),
		// });
	};

	const stringFormatter = (
		target:
			| (EventTarget & HTMLInputElement)
			| (EventTarget & HTMLSelectElement),
		name?: string
	) => {
		const value = target.value;
		switch (name) {
			case 'isMotherWorks':
				if (value && typeof value === 'string') {
					if (value.toLowerCase() === 'true') return true;
					if (value.toLowerCase() === 'false') return false;
				}
				return value;
			case 'birthdate':
				if (value) return new Date(value);
				return value;
			default:
				console.log(`value: ${value} --- name: ${name}`);
				break;
		}
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <h1>...Loading</h1>;
	return (
		<>
			<form
				className=' flex flex-wrap p-2 m-2'
				onSubmit={handleSubmit(onSubmit)}>
				<Flex
					direction={{ base: 'column', sm: 'row' }}
					wrap='wrap'
					gap={{ base: 'sm', sm: 'lg' }}
					justify={{ sm: 'center' }}>
					<Controller
						name='name'
						control={control}
						rules={{ required: 'name is required' }}
						render={({ field }) => {
							return !errors.name ? (
								<TextInput
									{...field}
									label='name'
									placeholder='name'
									withAsterisk
								/>
							) : (
								<TextInput
									{...field}
									label='name'
									placeholder='name'
									error={errors.name.message}
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
							return !errors.image ? (
								<FileInput
									{...field}
									id='image'
									label='image'
									accept='image/*'
									w={200}
									placeholder='choose an image'
									withAsterisk
								/>
							) : (
								<FileInput
									{...field}
									id='image'
									label='image'
									accept='image/*'
									w={200}
									placeholder='choose an image'
									error={errors.image.message}
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
								<Radio.Group {...field} name='gender' label='Gender' withAsterisk>
									<Group mt='md'>
										{$enum(Gender).map((g) => (
											<Radio key={v4()} value={g} label={g.toLocaleLowerCase()} />
										))}
									</Group>
								</Radio.Group>
							);
						}}
					/>

					<TextInput
						name='birthplace'
						label='birthplace'
						placeholder='birthplace'
						withAsterisk
						value={data.birthplace}
						onChange={(e) => {
							setData({ ...data, birthplace: e.target.value });
						}}
					/>
					<DatePickerInput
						valueFormat='D M YYYY'
						name='birthdate'
						label='birthdate'
						placeholder='birthdate'
						w={100}
						onChange={(e) => {
							setData({ ...data, birthdate: e as Date });
							console.log(data);
						}}
					/>
					<DatePickerInput
						valueFormat='D M YYYY'
						name='joinDate'
						label='joinDate'
						placeholder='joinDate'
						w={100}
						onChange={(e) => {
							setData({ ...data, joinDate: e as Date });
							console.log(data);
						}}
					/>
					<TextInput
						label='schoolName'
						placeholder='schoolName'
						withAsterisk
						value={data.schoolName}
						onChange={(e) => {
							setData({ ...data, schoolName: e.target.value });
						}}
					/>
					<Select
						data={$enum(Grade).map((g) => g.toLowerCase())}
						label='grade level'
						value={data.gradeLevel.toString()}
						name='gradeLevel'
						onChange={(e) =>
							setData({ ...data, gradeLevel: e?.toString() as Grade })
						}
					/>
					<NumberInput
						defaultValue={18}
						placeholder='lastYearPercentage'
						label='lastYearPercentage'
						name='lastYearPercentage'
						radius='md'
						size='md'
						withAsterisk
						hideControls
						value={data.lastYearPercentage}
						// onChange={}
					/>

					<Select
						data={['rent', 'owned']}
						label='home type'
						value={data.homeType}
						name='homeType'
						onChange={(e) =>
							setData({ ...data, homeType: e as 'owned' | 'rent' })
						}
					/>

					<Select
						data={$enum(Status).map((s) => s.toLowerCase())}
						label='mother status'
						value={data.motherStatus}
						name='motherStatus'
						onChange={(e) => setData({ ...data, motherStatus: e as Status })}
					/>

					<Radio.Group
						name='isMotherWorks'
						label='isMotherWorks'
						value={data.isMotherWorks ? 'true' : 'false'}
						onChange={(e) =>
							setData({ ...data, isMotherWorks: e === 'true' ? true : false })
						}>
						<Group mt='md'>
							<Radio key={v4()} value={'true'} label={'Yes'} />
							<Radio key={v4()} value={'false'} label={'No'} />
						</Group>
					</Radio.Group>

					<Button type='submit'>Submit</Button>
				</Flex>
			</form>
		</>
	);
}
