import MyLabel from '../common/MyLabel';
import { $enum } from 'ts-enum-util';
// import { SubmitHandler, set, useForm } from 'react-hook-form';
import { Gender, Grade, Orphan, Status } from '@prisma/client';
import { v4 } from 'uuid';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import MyInput from '../common/MyInput';
import MyButton from '../common/MyButton';
export default function OrphanForm() {
	let data = {
		image: '',
		gender: Gender.FEMALE,
		birthdate: Date.now(),
		gradeLevel: Grade.EIGHTH,
		status: '',
		isMotherWorks: false,
		homeType: 'rent',
		homePhone: '777777777',
		isSponsored: false,
	};

	const [state, setState] = useState(data);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value: typeof state[keyof typeof state] = e.target.value;
		if (e.target.type === 'radio') {
			if (e.target.checked) {
				value = e.target.value;
			}
		}
		setState({ ...state, [e.target.name]: value });
	};
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};
	useEffect(() => {
		console.log(state);
	}, [state]);
	return (
		<>
			<form className=' flex flex-wrap ' onSubmit={onSubmit}>
				<MyLabel text='image'>
					<MyInput
						name='image'
						type='file'
						id='image'
						className=' border-2'
						onChange={onChange}
						value={Gender.MALE}
					/>
				</MyLabel>
				<MyLabel text='gender'>
					<MyInput onChange={onChange} type='radio' id='male' name='gender' text='Male' />
					<MyInput
						onChange={onChange}
						type='radio'
						id='female'
						name='gender'
						text='Female'
						value={Gender.FEMALE}
					/>
				</MyLabel>
				<MyLabel text='birthdate'>
					<MyInput onChange={onChange} name='birthdate' type='date' id='birthdate' />
				</MyLabel>
				<MyLabel text='gradeLevel'>
					<select>
						{$enum(Grade).map((grade) => {
							return (
								<option key={v4()} value={grade}>
									{grade}
								</option>
							);
						})}
					</select>
				</MyLabel>
				<MyLabel text='status'>
					<select
						onChange={(e) => {
							// console.log(e.target.value);

							setState({ ...state, status: e.target.value });
						}}>
						{$enum(Status).map((state) => {
							return (
								<option key={v4()} value={state}>
									{state}
								</option>
							);
						})}
					</select>
				</MyLabel>
				<MyLabel text='isMotherWorks'>
					<MyInput
						onChange={onChange}
						type='radio'
						id='yes'
						name='isMotherWorks'
						text='yes'
						value={'yes'}
					/>
					<MyInput
						onChange={onChange}
						type='radio'
						id='female'
						name='isMotherWorks'
						text='no'
						value={'no'}
					/>
				</MyLabel>
				<MyLabel text='homeType'>
					<select onChange={(e) => setState({ ...state, homeType: e.target.value })}>
						<option value={'owned'}>Owned</option>
						<option value={'rent'}>Rent</option>
					</select>
				</MyLabel>
				<MyLabel text='homePhone'>
					<MyInput onChange={onChange} name='homePhone' type='tel' id='homePhone' />
				</MyLabel>
				<MyLabel text='isSponsored'>
					<MyInput
						onChange={onChange}
						type='radio'
						id='yes'
						name='isSponsored'
						text='yes'
						value={'yes'}
					/>
					<MyInput onChange={onChange} type='radio' id='no' name='isSponsored' text='no' value={'no'} />
				</MyLabel>
				<div>
					<MyButton color='blue' type='submit' text='Sign up' />
				</div>
			</form>
		</>
	);
}
