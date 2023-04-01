import MyInput from '@/components/MyInput';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { v4 } from 'uuid';
import { GENDER } from '../../../types/types';
import MyLabel from '@/components/MyLabel';
export default function AddOrphan() {
	const router = useRouter();
	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const x = {
				name: form.Name.value,
				gender: form.gender.value,
				birthdate: form.birthdate.value,
				birthplace: form.birthplace.value ,
				currentAddress: form.currentAddress.value ,
				liveWith: form.liveWith.value ,
				fatherDeathDate: form.fatherDeathDate.value ,
				motherName: form.motherName.value ,
				isMotherWorks: form.isMotherWorks.value ,
				motherJob: form.motherJob.value ,
			};
			if(x.isMotherWorks=='true')
			x.isMotherWorks=true;
			else x.isMotherWorks=false;
			console.log("🚀 ~ file: addOrphan.tsx:25 ~ handleSubmit ~ x:", x);

			await fetch('/api/orphan/create', {
				method: 'post',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(x),
			});
		} catch (error) {
			console.log('🚀 ~ file: addOrphan.tsx:38 ~ error:', error);
		}
		router.push('/manageOrphans');
	};
	return (
		<>
			<div className='bg-slate-200 justify-center text-center p-2 mx-96 border border-black m-2'>

				<h1 className='border border-black inline-block text-3xl'>Orphan Info</h1>
				<form action='post' onSubmit={handleSubmit}>
					<MyInput type='text' value='Name' key={v4()} text='Name' />
					<div className='text-start'>
						<MyLabel text='gender' />
						<MyLabel text='male'>
							<input type='radio' value={GENDER.MALE} name='gender' className='p-2 m-2' />
						</MyLabel>
						<MyLabel text='female'>
							<input type='radio' value={GENDER.FEMALE} name='gender' className='p-2 m-2' />
						</MyLabel>
					</div>
					<MyInput type='date' key={v4()} text='birthdate' />
					<MyInput type='text' value='birthplace' key={v4()} text='birthplace' />
					<MyInput type='text' value='liveWith' key={v4()} text='liveWith' />
					<MyInput type='text' value='currentAddress' key={v4()} text='currentAddress' />
					<MyInput type='date' key={v4()} text='fatherDeathDate' />
					<MyInput type='text' value='motherName' key={v4()} text='motherName' />
					<div className='text-start'>
						<MyLabel text='is mother works' />
						<MyLabel text='YES'>
							<input type='radio' value={'true'} name='isMotherWorks' className='p-2 m-2 ' />
						</MyLabel>
						<MyLabel text='NO'>
							<input type='radio'  value={'false'} name='isMotherWorks' className='p-2 m-2' />
						</MyLabel>
					</div>
					<MyInput type='text' value='motherJob' key={v4()} text='motherJob' />
					<MyLabel text='image' />
						<input type='file' name='image'/>
					<button className='bg-blue-600 p-2 m-2 rounded text-white '>submit</button>
				</form>
			</div>
		</>
	);
}
