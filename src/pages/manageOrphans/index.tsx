import { useEffect, useState, MouseEvent } from 'react';
import { v4 } from 'uuid';
import MyLabel from '@/components/MyLabel';
import { Orphan } from '@prisma/client';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';

//Static Site Generation
// function that fetch data from DB and pass result as props to the page
export const getStaticProps: GetStaticProps = async () => {
	// const res = await fetch('http://localhost:3000/api/orphan/orphanList');
	// const data: Orphan = await res.json();
	const orphans = await prisma.orphan.findMany();
	const data = JSON.parse(JSON.stringify(orphans));

	return { props: { data }, revalidate: 2 };
};

export default function ManageOrphan({ data }: { data: Orphan[] }) {
	const [orphans, setOrphans] = useState<Orphan[]>(data);
	const [orphan, setOrphan] = useState(data[0]);
	// * use hydration to prevent make clint side and ssr html match
	const [hydration, setHydration] = useState(false);
	useEffect(() => {
		setHydration(true);
	}, []);
	const router = useRouter();

	async function handleDelete(id: number): Promise<void> {
		await fetch(`/api/orphan/${id}`, { method: 'DELETE' });
		// router.replace(router.asPath);
	}

	return hydration ? (
		<>
			<div className='flex flex-col '>
				{/* page title */}
				<h1 className='text-center text-2xl'>ManageOrphan</h1>
				{/* add new button */}
				<div className='text-center'>
					<button
						type='button'
						className='p-1.5 rounded bg-blue-500 text-white hover:bg-blue-900'
						onClick={() => router.push('manageOrphans/addOrphan')}>
						<span className='text-2xl align-sub font-bold'>+</span> Add Orphan
					</button>
				</div>
				{orphan ? (
					<>
						{/* card div */}

						<div className='border shadow p-5 flex flex-wrap justify-between min-w-fit max-w-5xl  mx-auto my-5 bg-blue-100'>
							<div>
								<p>
									<MyLabel text='ID' />
									{orphan.id}
								</p>
								<p>
									<MyLabel text='Name' /> {orphan.name}
								</p>
								<p>
									<MyLabel text='Gender' />
									{orphan.gender}
								</p>
								<p>
									<MyLabel text='Birthdate' />
									{new Date(orphan.birthdate).toLocaleDateString()}
								</p>
								<p>
									<MyLabel text='birthplace' /> {orphan.birthplace}
								</p>
								<p>
									<MyLabel text='liveWith ' /> {orphan.liveWith}
								</p>
								<p>
									<MyLabel text='currentAddress' /> {orphan.currentAddress}
								</p>
								<p>
									<MyLabel text='fatherDeathDate' /> {orphan.fatherDeathDate.toString()}
								</p>
								<p>
									<MyLabel text='motherName' /> {orphan.motherName}
								</p>
								<p>
									<MyLabel text='isMotherWorks' /> {orphan.isMotherWorks}
								</p>
								<p>
									<MyLabel text='motherJob' /> {orphan.motherJob}
								</p>
								<p>
									<MyLabel text='joinDate' />
									{new Date(orphan.joinDate).toLocaleString()}
								</p>
							</div>

							{/* edit and delete buttons  */}
							<div className='my-auto'>
								{/* <Modal orphan={orphan} /> */}
								<button className='p-2 mx-2 rounded bg-amber-500 text-white hover:bg-amber-700'>
									Edit
								</button>
								<button
									onClick={() => {
										handleDelete(orphan.id);
										router.replace(router.asPath);
									}}
									className='p-2 mx-2 rounded bg-rose-500 text-white hover:bg-rose-700'>
									Delete
								</button>
							</div>
						</div>

						{/* table */}

						<table className='table m-2 p-2 mx-auto'>
							<thead>
								<tr className='table-row'>
									<th className='table-cell border border-black px-5'>ID</th>
									<th className='table-cell border border-black px-5'>Name</th>
									<th className='table-cell border border-black px-5'>Gender</th>
									<th className='table-cell border border-black px-5'>Birthdate</th>
									<th className='table-cell border border-black px-5'>Birth place</th>
									<th className='table-cell border border-black px-5'>Live with</th>
									<th className='table-cell border border-black px-5'>Current Address</th>
									<th className='table-cell border border-black px-5'>Father Death Date</th>
									<th className='table-cell border border-black px-5'>Mother Name</th>
									<th className='table-cell border border-black px-5'>Is Mother Work</th>
									<th className='table-cell border border-black px-5'>Mother job</th>
									<th className='table-cell border border-black px-5'>Join Date</th>
								</tr>
							</thead>
							<tbody>
								{orphans.map((orphan: Orphan) => (
									<tr
										key={v4()}
										onClick={() => {
											setOrphan(orphan);
										}}>
										<td className='table-cell border border-black px-5'>{orphan.id}</td>
										<td className='table-cell border border-black px-5'>{orphan.name}</td>
										<td className='table-cell border border-black px-5'>{orphan.gender}</td>
										<td className='table-cell border border-black px-5'>
											{new Date(orphan.birthdate).toLocaleDateString()}
										</td>
										<td className='table-cell border border-black px-5'>{orphan.birthplace}</td>
										<td className='table-cell border border-black px-5'>{orphan.liveWith}</td>
										<td className='table-cell border border-black px-5'>{orphan.currentAddress}</td>
										<td className='table-cell border border-black px-5'>
											{orphan.fatherDeathDate ? (
												new Date(orphan.fatherDeathDate).toLocaleDateString()
											) : (
												<h4>no date</h4>
											)}
										</td>
										<td className='table-cell border border-black px-5'>{orphan.motherName}</td>
										<td className='table-cell border border-black px-5'>{orphan.isMotherWorks}</td>
										<td className='table-cell border border-black px-5'>{orphan.motherJob}</td>
										<td className='table-cell border border-black px-5'>
											{new Date(orphan.joinDate).toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<h1 className='text-center text-2xl'>no orphan register</h1>
				)}
			</div>
		</>
	) : (
		<h1>loading...</h1>
	);
}
