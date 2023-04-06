import MyLabel from '../common/MyLabel';
import { $enum } from 'ts-enum-util';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Grade, Orphan, Status } from '@prisma/client';
import { v4 } from 'uuid';
export default function OrphanForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<Orphan>();

	const onSubmit: SubmitHandler<Orphan> = async (data) => {
		console.log('🚀 ~ file: orphanForm.tsx:13 ~ constonSubmit:SubmitHandler<Orphan>= ~ data:', data);
		const url = '/api/orphan/create';
		const res = await fetch(url, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((errors) => console.log(errors));
		console.log('🚀 ~ file: orphanForm.tsx:22 ~ constonSubmit:SubmitHandler<Orphan>= ~ res:', res);
	};

	// const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};
	return (
		<>
			<h1 className='text-3xl'>orphanForm</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className=' flex flex-wrap '>
					<div className=' '>
						<h1 className='text-2xl flex-1'>orphan info</h1>
						<MyLabel text='Name'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='ali'
								{...register('name', { required: true })}
							/>
						</MyLabel>
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='image'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='file'
								{...register('image', { required: true })}
							/>
						</MyLabel>
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='gender'>
							<select {...(register('gender'), { required: true })}>
								<option value='MALE'>Male</option>
								<option value='FEMALE'>Female</option>
							</select>
						</MyLabel>
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='age'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='number'
								defaultValue={9}
								{...register('age', { required: true, max: 14, valueAsNumber: true })}
							/>
						</MyLabel>
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='birthplace'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='mukalla'
								{...register('birthplace', { required: true })}
							/>
						</MyLabel>
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='birthdate'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='date'
								{...register('birthdate', { required: true, valueAsDate: true })}
							/>
						</MyLabel>{' '}
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='joinDate'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='date'
								{...register('joinDate', { required: true, valueAsDate: true })}
							/>
						</MyLabel>
						<MyLabel text='liveWith'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='mother'
								{...register('liveWith', { required: true })}
							/>
						</MyLabel>{' '}
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='homeType'>
							<select name='homeType' id='homeType' {...(register('homeType'), { required: true })}>
								<option value='owned'>owned</option>
								<option value='rent'>Rent</option>
							</select>
						</MyLabel>{' '}
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='homePhone'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='tel'
								defaultValue={777888999}
								maxLength={9}
								{...register('homePhone', { required: true, max: 799999999 })}
							/>
						</MyLabel>
						<MyLabel text='currentAddress'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='mukalla'
								{...register('currentAddress', { required: true })}
							/>
						</MyLabel>{' '}
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='isSponsored'>
							<MyLabel text='Yes'>
								<input
									type='radio'
									id='YesSponsored'
									{...register('isSponsored', { required: true })}
									value={'Yes'}
								/>
							</MyLabel>
							<MyLabel text='NoSponsored'>
								<input
									type='radio'
									id='No'
									{...register('isSponsored', { required: true })}
									value={'No'}
									defaultChecked={true}
								/>
							</MyLabel>
						</MyLabel>
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='foundationName'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='foundationName'
								{...register('foundationName')}
							/>
						</MyLabel>
						<MyLabel text='foundationAmount'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='number'
								{...register('foundationAmount', { valueAsNumber: true })}
							/>
						</MyLabel>
					</div>
					<div className=''>
						<h1 className='flex-1 text-2xl block'>school info</h1>
						<MyLabel text='schoolName'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='schoolName'
								{...register('schoolName', { required: true })}
							/>
						</MyLabel>{' '}
						{errors.name && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='gradeLevel'>
							<select {...register('gradeLevel', { required: true })}>
								{$enum(Grade).map((x) => {
									return <option key={v4()}>{x.toString()}</option>;
								})}
							</select>
						</MyLabel>
						{errors.gradeLevel && <span className='text-red-500'>This field is required</span>}
						<MyLabel text='lastYearPercentage'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='number'
								defaultValue={5}
								{...register('lastYearPercentage', { required: true, valueAsNumber: true })}
							/>
						</MyLabel>
					</div>
					<div className=' '>
						<h1 className='flex-1 text-2xl'>father info</h1>
						<MyLabel text='fatherDeathDate'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='date'
								{...register('fatherDeathDate', { required: true, valueAsDate: true })}
							/>
						</MyLabel>
						<MyLabel text='fatherWork'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='fatherWork'
								{...register('fatherWork', { required: true })}
							/>
						</MyLabel>
						<MyLabel text='fatherDeathCos'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='fatherDeathCos'
								{...register('fatherDeathCos', { required: true })}
							/>
						</MyLabel>
						{errors.fatherDeathCos && <span className='text-red-500'>This field is required</span>}
					</div>
					<div className=' '>
						<h1 className='flex-1 text-2xl'>family info</h1>
						<MyLabel text='males'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='number'
								defaultValue={5}
								{...register('males', { required: true, valueAsNumber: true })}
							/>
						</MyLabel>
						<MyLabel text='females'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='number'
								defaultValue={5}
								{...register('females', { required: true, valueAsNumber: true })}
							/>
						</MyLabel>
					</div>
					<div className=' '>
						<h1 className='flex-1 text-2xl'>mother info</h1>
						<MyLabel text='motherName'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='motherName'
								{...register('motherName', { required: true })}
							/>
						</MyLabel>
						<MyLabel text='status'>
							<select name='status' id='status'>
								{$enum(Status).map((x) => {
									return <option key={v4()}>{x.toString()}</option>;
								})}
							</select>
						</MyLabel>
						<MyLabel text='isMotherWorks'>
							<MyLabel text='Yes'>
								<input
									type='radio'
									id='YesWork'
									{...register('isMotherWorks', { required: true })}
									value={'Yes'}
								/>
							</MyLabel>
							<MyLabel text='No'>
								<input
									type='radio'
									id='NoWork'
									{...register('isMotherWorks', { required: true })}
									value={'No'}
									defaultChecked={true}
								/>
							</MyLabel>
						</MyLabel>
						<MyLabel text='motherJob'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='text'
								defaultValue='motherJob'
								{...register('motherJob', { required: true })}
							/>
						</MyLabel>
						<MyLabel text='motherJobPhone'>
							<input
								className='w-auto rounded hover:shadow-lg'
								type='tel'
								defaultValue={5}
								{...register('motherJobPhone', { required: true })}
							/>
						</MyLabel>
					</div>
				</div>
				<button type='submit' className={`text-white p-2 m-1 bg-blue-500 rounded hover:bg-blue-900`}>
					Submit
				</button>
			</form>
		</>
	);
}
