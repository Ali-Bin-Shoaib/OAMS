import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import prisma from '../../../lib/prisma';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
interface FormDate {
	title: string;
	content: string;
	id: string | '';
}
interface Notes {
	notes: {
		id: string;
		title: string;
		content: string;
	}[];
}
export default function Index({ notes }: Notes) {
	const router = useRouter();
	const [form, setForm] = useState<FormDate>({ title: '', content: '', id: '' });
	async function createNewNote(data: FormDate) {
		try {
			fetch('/api/note/create', {
				method: 'post',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			}).then(() => {
				setForm({ title: '', content: '', id: '' });
				//to show added notes in the page
				router.replace(router.asPath);
			});
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:20 ~ error:', error);
		}
	}
	async function handleSubmit(data: FormDate) {
		try {
			createNewNote(data);
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:31 ~ error:', error);
		}
	}
	return (
		<>
			<h1 className='text-center font-bold text-2xl mt-4'>Notes</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(form);
				}}
				className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'>
				<input
					type='text'
					placeholder='title'
					defaultValue={form.title}
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					className='border-2 rounded border-gray-600 p-1'
				/>
				<textarea
					placeholder='content'
					defaultValue={form.content}
					onChange={(e) => setForm({ ...form, content: e.target.value })}
					className='border-2 rounded border-gray-600 p-1'
				/>
				<button type='submit' className='bg-blue-500 text-white rounded p-1'>
					Add +
				</button>
			</form>
			<div className='w-auto min-w-25% max-w-full mt-20 mx-auto space-y-6 flex flex-col items-stretch'>
				<ul className='flex flex-wrap w-full'>
					{notes.map((note) => (
						<li
							key={note.id}
							className='w-15'
							onClick={() =>
								fetch('/api/note/' + note.id, {
									method: 'delete',
									body: JSON.stringify(note),
									headers: { 'Content-Type': 'application/json' },
								}).then(() => router.replace(router.asPath))
							}>
							<div className='border p-2 m-2 '>
								<p>{note.id}</p>
								<p>{note.title}</p>
								<p>{note.content}</p>
								<button className='bg-red-700 text-white rounded p-1 mx-a'>X</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
export const getServerSideProps: GetServerSideProps = async () => {
	const notes = await prisma.note.findMany({
		select: {
			title: true,
			id: true,
			content: true,
		},
	});
	return { props: { notes } };
};
