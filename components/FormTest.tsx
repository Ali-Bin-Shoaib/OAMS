import { $enum } from 'ts-enum-util';
import { useEffect, useState } from 'react';
import { Gender, Grade, Orphan, Status } from '@prisma/client';
import { v4 } from 'uuid';
import { Button, Card, Checkbox, FileInput, Flex, NumberInput, Radio, Select, TextInput, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

interface Props {
	orphan?: Orphan;
}
export default function OrphanForm({ orphan }: Props): JSX.Element {
	const [hydrate, setHydrate] = useState(false);
	const form = useForm<Orphan>({
		validate: {
			name: (value) => (value ? null : 'Name is required'),
			image: (value) => (value ? null : 'image is required'),
			age: (value) => (value! > 14 || value! < 6 ? null : 'Age must be between 6 and 14'),
		},
	});
	const handleError = (errors: typeof form.errors) => {
		if (errors.name) {
			notifications.show({ message: 'Please fill name field', color: 'red' });
		} else if (errors.image) {
			notifications.show({ message: 'Please provide a valid image', color: 'red' });
		} else if (errors.age) {
			notifications.show({ message: 'Please provide a valid age', color: 'red' });
		}
	};

	const onSubmit = async (data: Orphan) => {
		console.log('🚀 ~ file: FormTest.tsx:22 ~ onSubmit ~ data:', data);

		// if (!orphan) {
		// 	console.log('orphan not exist.');

		// 	const url = '/api/orphan/create/';
		// 	const res = await fetch(url, {
		// 		method: 'post',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify(data),
		// 	});
		// } else {
		// 	console.log('orphan exist.', orphan);

		// 	const url = '/api/orphan/' + orphan.id;
		// 	const res = await fetch(url, {
		// 		method: 'put',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify(data),
		// 	});
		// }
	};

	useEffect(() => {
		setHydrate(true);
	}, [hydrate]);

	if (!hydrate) return <h1>...Loading</h1>;
	return (
		<>
			<form className=' flex flex-wrap p-2 m-2 ' onSubmit={form.onSubmit(onSubmit, handleError)}>
				<Card withBorder>
					<Flex direction={{ base: 'column', sm: 'row' }} wrap='wrap' gap={{ base: 'sm', sm: 'lg' }} justify={{ sm: 'center' }}>
						<div>
							<TextInput {...form.getInputProps('name')} label='name' placeholder='name' withAsterisk size='md' />
						</div>

						<div>
							<FileInput
								size='md'
								{...form.getInputProps('image')}
								id='image'
								label='image'
								accept='image/*'
								defaultValue={null}
								w={200}
								placeholder='choose an image'
								withAsterisk
							/>
						</div>

						<Radio.Group {...form.getInputProps('gender')} name='gender' label='Gender' withAsterisk size='md'>
							{$enum(Gender).map((g) => (
								<Radio key={v4()} {...form.getInputProps('gender')} value={g} p={5} label={g.toLowerCase()} />
							))}
						</Radio.Group>

						<div>
							<NumberInput {...form.getInputProps('age')} size='md' hideControls label='age' placeholder='age' w={99} withAsterisk />
						</div>

						<div>
							<TextInput {...form.getInputProps('birthplace')} size='md' label='birthplace' placeholder='birthplace' withAsterisk />
						</div>

						<div>
							<DatePickerInput
								{...form.getInputProps('birthdate')}
								size='md'
								valueFormat='YYYY MM D'
								onChange={(e) => console.log(e)}
								name='birthdate'
								label='birthdate'
								placeholder='birthdate'
								w={100}
								withAsterisk
							/>
						</div>

						<div>
							<DatePickerInput
								{...form.getInputProps('joinDate')}
								size='md'
								valueFormat='D M YYYY'
								name='joinDate'
								label='joinDate'
								placeholder='joinDate'
								w={100}
							/>
						</div>

						<div>
							<TextInput {...form.getInputProps('schoolName')} size='md' label='schoolName' placeholder='schoolName' withAsterisk />
						</div>

						<div>
							<Select {...form.getInputProps('gradeLevel')} size='md' data={$enum(Grade).map((g) => g)} label='grade level' name='gradeLevel' />
						</div>

						<div>
							<NumberInput
								{...form.getInputProps('lastYearPercentage')}
								size='md'
								placeholder='lastYearPercentage'
								label='lastYearPercentage'
								name='lastYearPercentage'
								withAsterisk
								precision={2}
								hideControls
							/>
						</div>

						<div>
							<DatePickerInput
								{...form.getInputProps('fatherDeathDate')}
								size='md'
								valueFormat='D M YYYY'
								name='fatherDeathDate'
								label='fatherDeathDate'
								placeholder='fatherDeathDate'
								w={120}
							/>
						</div>

						<div>
							<TextInput {...form.getInputProps('fatherWork')} size='md' label='fatherWork' placeholder='fatherWork' withAsterisk />
						</div>

						<div>
							<Textarea {...form.getInputProps('fatherDeathCos')} size='md' label='fatherDeathCos' placeholder='fatherDeathCos' withAsterisk />
						</div>

						<div>
							<NumberInput
								{...form.getInputProps('noOfFamilyMembers')}
								size='md'
								hideControls
								label='noOfFamilyMembers'
								placeholder='noOfFamilyMembers'
								withAsterisk
							/>
						</div>

						<div>
							<NumberInput {...form.getInputProps('males')} size='md' hideControls label='males' placeholder='males' w={99} withAsterisk />
						</div>

						<div>
							<NumberInput {...form.getInputProps('females')} size='md' hideControls label='females' placeholder='females' w={99} withAsterisk />
						</div>

						<div>
							<TextInput {...form.getInputProps('motherName')} size='md' label='motherName' placeholder='motherName' withAsterisk />
						</div>

						<div>
							<Select
								{...form.getInputProps('motherStatus')}
								size='md'
								data={$enum(Status).map((s) => s)}
								label='mother status'
								name='motherStatus'
							/>
						</div>

						<div>
							<Checkbox label='is mother works' {...form.getInputProps('isMotherWorks')} size='md' />
						</div>

						{orphan?.isMotherWorks && (
							<>
								<div>
									<TextInput {...form.getInputProps('motherJob')} size='md' label='motherJob' name='motherJob' />
								</div>

								<div>
									<TextInput {...form.getInputProps('motherJobPhone')} size='md' type='tel' label='mother job Phone' name='motherJobPhone' />
								</div>

								<div>
									<NumberInput
										{...form.getInputProps('monthlyIncome')}
										size='md'
										placeholder='monthlyIncome'
										label='monthlyIncome'
										name='monthlyIncome'
										precision={2}
										hideControls
									/>
								</div>
							</>
						)}

						<div>
							<TextInput {...form.getInputProps('liveWith')} size='md' label='liveWith' name='liveWith' withAsterisk />
						</div>

						<div>
							<Select {...form.getInputProps('homeType')} size='md' data={['Rent', 'Owned']} label='home type' name='homeType' />
						</div>

						<div>
							<TextInput
								{...form.getInputProps('homePhone')}
								size='md'
								type='tel'
								label='homePhone'
								name='homePhone'
								placeholder='514640'
								withAsterisk
							/>
						</div>

						<div>
							<TextInput
								{...form.getInputProps('currentAddress')}
								size='md'
								label='currentAddress'
								name='currentAddress'
								placeholder='currentAddress'
								withAsterisk
							/>
						</div>
						<div>
							<Checkbox label='isSponsored' {...form.getInputProps('isSponsored')} size='md' />
						</div>

						{orphan?.isSponsored && (
							<>
								<div>
									<TextInput
										{...form.getInputProps('foundationName')}
										size='md'
										label='foundationName'
										name='foundationName'
										placeholder='foundationName'
									/>
								</div>

								<div>
									<NumberInput
										{...form.getInputProps('foundationAmount')}
										size='md'
										placeholder='15000.00'
										label='foundationAmount'
										name='foundationAmount'
										precision={2}
										hideControls
										withAsterisk
									/>
								</div>
							</>
						)}
						<Button type='submit' size='md'>
							Submit
						</Button>
					</Flex>
				</Card>
			</form>
		</>
	);
}
