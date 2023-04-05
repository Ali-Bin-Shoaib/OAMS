import { FormEvent } from 'react';
import MyButton from '../common/MyButton';
import MyInput from '../common/MyInput';
import { useForm } from 'react-hook-form';
export default function orphanForm() {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};
	return (
		<>
			<h1 className='text-3xl'>orphanForm</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(e);
				}}>
				<div className=' flex flex-wrap '>
					<div className=' '>
						<h1 className='text-2xl flex-1'>orphan info</h1>
						<MyInput text='Name' type='text' />
						<MyInput text='image' type='file' />
						<MyInput text='gender' type='text' />
						<MyInput text='age' type='number' />
						<MyInput text='birthplace' type='text' />
						<MyInput text='birthdate' type='date' />
						<MyInput text='joinDate' type='date' />
						<MyInput text='liveWith' type='text' />
						<MyInput text='homeType' type='text' />
						<MyInput text='homePhone' type='text' />
						<MyInput text='currentAddress' type='text' />
						<MyInput text='isSponsored' type='text' />
						<MyInput text='foundationName' type='text' />
						<MyInput text='foundationAmount' type='number' />
					</div>
					<div className=''>
						<h1 className='flex-1 text-2xl block'>school info</h1>
						<MyInput text='schoolName' type='text' />
						<MyInput text='gradeLevel' type='text' />
						<MyInput text='lastYearPercentage' type='number' />
					</div>
					<div className=' '>
						<h1 className='flex-1 text-2xl'>father info</h1>
						<MyInput text='fatherDeathDate' type='date' />
						<MyInput text='fatherWork' type='text' />
						<MyInput text='fatherDeathCos' type='text' />
					</div>
					<div className=' '>
						<h1 className='flex-1 text-2xl'>family info</h1>
						<MyInput text='noOfFamilyMembers' type='number' />
						<MyInput text='males' type='number' />
						<MyInput text='females' type='number' />
						<MyInput text='total' type='number' />
					</div>
					<div className=' '>
						<h1 className='flex-1 text-2xl'>mother info</h1>
						<MyInput text='motherName' type='text' />
						<MyInput text='status' type='text' />
						<MyInput text='isMotherWorks' type='text' />
						<MyInput text='motherJob' type='text' />
						<MyInput text='motherJobPhone' type='text' />
						<MyInput text='monthlyIncome' type='number' />
					</div>
				</div>
				<MyButton text='Submit' type='submit' color='blue' />
			</form>
		</>
	);
}
