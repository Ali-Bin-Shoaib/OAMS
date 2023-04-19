import { GetServerSideProps, GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Orphan } from '@prisma/client';
import AppHead from '../../../components/common/AppHead';
import { v4 } from 'uuid';
import {
	ReactNode,
	useEffect,
	useState,
	createContext,
	useContext,
} from 'react';
import { Button, Card } from '@mantine/core';
import DeleteOrphanModal from '../../../components/orphans/modals/DeleteOrphanModal';
const context = createContext(null);
export default function Index({ data }: { data: Orphan[] }) {
	const x = useContext(context);

	const [cardInfo, setCardInfo] = useState<Orphan>(data[0]);
	useEffect(() => {
		getStaticProps;
		setCardInfo(data[0]);
	}, [data]);
	return (
		<>
			<AppHead title='Orphans' />

			<h1 className='text-3xl'>Orphans index</h1>
			{data.length === 0 ? (
				<p>no orphan registered</p>
			) : (
				<p>no of orphans {data.length}</p>
			)}
			<div>
				<Card
					key={v4()}
					withBorder
					className='mx-auto my-2 p-2 w-3/5 bg-slate-300'>
					<p>name: {cardInfo.name || 'XXX'}</p>
					<p>image: {cardInfo.image || 'XXX'}</p>
					<p>birthdate: {(cardInfo.birthdate as ReactNode) || 'XXX'}</p>
					<p>image: {cardInfo.image || 'XXX'}</p>
					<p>gender: {cardInfo.gender || 'XXX'}</p>
					<p>gradeLevel: {cardInfo.gradeLevel || 'XXX'}</p>
					<p>schoolName: {cardInfo.schoolName || 'XXX'}</p>
					<p>motherName: {cardInfo.motherName || 'XXX'}</p>
					<p>evaluation: {cardInfo.evaluation || 'XXX'}</p>
					<Button.Group>
						<Button color='yellow' onClick={(e) => {}}>
							Edit
						</Button>
						<DeleteOrphanModal id={cardInfo.id} />
					</Button.Group>
				</Card>

				<div>
					<table className='table table-auto '>
						<thead>
							<tr>
								<th className='table-cell border'>ID</th>
								<th className='table-cell border'>Name</th>
								<th className='table-cell border'>Image</th>
								<th className='table-cell border'>Gender</th>
								<th className='table-cell border'>Age</th>
								<th className='table-cell border'>Birthdate</th>
								<th className='table-cell border'>Birthplace</th>
								<th className='table-cell border'>Join Date</th>
								<th className='table-cell border'>School Name</th>
								<th className='table-cell border'>Grade Level</th>
								<th className='table-cell border'>Last Year Percentage</th>
								<th className='table-cell border'>Father Death Date</th>
								<th className='table-cell border'>Father Work</th>
								<th className='table-cell border'>Father Death Cos</th>
								<th className='table-cell border'>Family Members</th>
								<th className='table-cell border'>Males</th>
								<th className='table-cell border'>Females</th>
								<th className='table-cell border'>Mother Name</th>
								<th className='table-cell border'>Mother Status</th>
								<th className='table-cell border'>Is Mother Works</th>
								<th className='table-cell border'>Mother Job</th>
								<th className='table-cell border'>Mother Job Phone</th>
								<th className='table-cell border'>Monthly Income</th>
								<th className='table-cell border'>Live With</th>
								<th className='table-cell border'>Home Type</th>
								<th className='table-cell border'>Home Phone</th>
								<th className='table-cell border'>Current Address</th>
								<th className='table-cell border'>Is Sponsored</th>
								<th className='table-cell border'>Foundation Name</th>
								<th className='table-cell border'>Foundation Amount</th>
								<th className='table-cell border'>Evaluation</th>
							</tr>
						</thead>
						<tbody>
							{data.map((orphan) => {
								return (
									<tr
										key={v4()}
										onClick={() => {
											setCardInfo(orphan);
										}}>
										<td className='table-cell border'>{orphan.id}</td>
										<td className='table-cell border'>{orphan.name}</td>
										<td className='table-cell border'>{orphan.image}</td>
										<td className='table-cell border'>{orphan.gender}</td>
										<td className='table-cell border'>{orphan.age}</td>
										<td className='table-cell border'>
											{orphan.birthdate as ReactNode}
										</td>
										<td className='table-cell border'>{orphan.birthplace}</td>
										<td className='table-cell border'>
											{orphan.joinDate as ReactNode}
										</td>
										<td className='table-cell border'>{orphan.schoolName}</td>
										<td className='table-cell border'>{orphan.gradeLevel}</td>
										<td className='table-cell border'>
											{orphan.lastYearPercentage}
										</td>
										<td className='table-cell border'>
											{orphan.fatherDeathDate as ReactNode}
										</td>
										<td className='table-cell border'>{orphan.fatherWork}</td>
										<td className='table-cell border'>{orphan.fatherDeathCos}</td>
										<td className='table-cell border'>{orphan.noOfFamilyMembers}</td>
										<td className='table-cell border'>{orphan.males}</td>
										<td className='table-cell border'>{orphan.females}</td>
										<td className='table-cell border'>{orphan.motherName}</td>
										<td className='table-cell border'>{orphan.motherStatus}</td>
										<td className='table-cell border'>{orphan.isMotherWorks}</td>
										<td className='table-cell border'>{orphan.motherJob}</td>
										<td className='table-cell border'>{orphan.motherJobPhone}</td>
										<td className='table-cell border'>{orphan.monthlyIncome}</td>
										<td className='table-cell border'>{orphan.liveWith}</td>
										<td className='table-cell border'>{orphan.homeType}</td>
										<td className='table-cell border'>{orphan.homePhone}</td>
										<td className='table-cell border'>{orphan.currentAddress}</td>
										<td className='table-cell border'>{orphan.isSponsored}</td>
										<td className='table-cell border'>{orphan.foundationName}</td>
										<td className='table-cell border'>{orphan.foundationAmount}</td>
										<td className='table-cell border'>{orphan.evaluation}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const res = await prisma.orphan.findMany();
	const data = JSON.parse(JSON.stringify(res));
	// console.log(
	// 	'🚀 ~ file: index.tsx:23 ~ constgetStaticProps:GetStaticProps= ~ data:',
	// 	data
	// );
	//or
	// const url='http://localhost:3000/orphans'
	// fetch(url).then((res)=>res.json()).then((data)=>data)
	return { props: { data } };
};
