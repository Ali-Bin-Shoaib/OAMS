// 'use client'
// import {  } from "@nextui-org/react";
import AddOrphanForm from '@/components/AddOrphanForm';
import { FormEvent } from 'react';

function ManageOrphan() {
	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault();
			const formData = new FormData(e.target as HTMLFormElement);
			const res = await fetch('/api/hello', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					name: formData.get('name'),
					gender: formData.get('gender'),
					birthdate: formData.get('birthdate'),
					birthplace: formData.get('birthplace'),
					isMotherWorks: formData.get('isMotherWorks'),
					motherName: formData.get('motherName'),
					currentAddress: formData.get('currentAddress'),
					fatherDeathDate: formData.get('fatherDeathDate'),
					joinDate: formData.get('joinDate'),
					motherJob: formData.get('motherJob'),
					liveWith: formData.get('liveWith'),
				}),
			});
			const data = await res.json();
			console.log('🚀 ---------------------------------------------------🚀');
			console.log('🚀 ~ file: index.tsx:20 ~ handleSubmit ~ data:', data);
			console.log('🚀 ---------------------------------------------------🚀');
		} catch (error) {
			console.log('🚀 -----------------------------------------------------🚀');
			console.log('🚀 ~ file: index.tsx:33 ~ handleSubmit ~ error:', error);
			console.log('🚀 -----------------------------------------------------🚀');
		}
	};
	enum GENDER {
		MALE,
		FEMALE,
	}
	return (
		<>
			<h1 className='text-3xl'>ManageOrphan</h1>
			<AddOrphanForm />
		</>
	);
}

export default ManageOrphan;
