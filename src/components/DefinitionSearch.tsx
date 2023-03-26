import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function DefinitionSearch() {
	const [search, setSearch] = useState('Word');
	const navigate = useRouter();
	return (
		<form
			className='flex justify-center space-x-2 max-w-[300px]'
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				navigate.push('/dictionary/' + search);
			}}>
			<input
				type='text'
				className='shrink min-w-0 p-2 rounded'
				placeholder={search}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setSearch(e.target.value);
				}}
			/>
			<button className='p-2 text-sm text-white bg-stone-500 font-semibold rounded border hover:bg-stone-600 focus:ring-2 '>
				Search
			</button>
		</form>
	);
}
