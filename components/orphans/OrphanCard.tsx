import { Card, Title, CardSection, List, Button } from '@mantine/core';
import { ReactNode } from 'react';
import { v4 } from 'uuid';
import DeleteOrphanModal from './modals/DeleteOrphanModal';
import EditOrphanModal from './modals/EditOrphanModal';
import Image from 'next/image';
import img1 from '../../src/img/1.jpg';
import { Orphan } from '@prisma/client';
interface Props {
	orphan: Orphan;
}
function OrphanCard({ orphan }: Props) {
	return (
		<Card
			key={v4()}
			withBorder
			className=' mx-auto my-2 p-2 w-4/5 bg-slate-200'>
			<Title className='text-center'>Orphan Info</Title>
			<Image
				src={img1}
				width={250}
				alt='asd'
				className='rounded-3xl mx-auto'
			/>
			<CardSection withBorder className='p-4'>
				<List>
					<List.Item className=''>id:{orphan.id}</List.Item>
					<List.Item className=''>name: {orphan.name || 'XXX'}</List.Item>
					<List.Item className=''>
						birthdate: {(orphan.birthdate as ReactNode) || 'XXX'}
					</List.Item>
					<List.Item className=''>gender: {orphan.gender || 'XXX'}</List.Item>
					<List.Item className=''>
						gradeLevel: {orphan.gradeLevel || 'XXX'}
					</List.Item>
					<List.Item className=''>
						schoolName: {orphan.schoolName || 'XXX'}
					</List.Item>
					<List.Item className=''>
						motherName: {orphan.motherName || 'XXX'}
					</List.Item>
					<List.Item className=''>
						evaluation: {orphan.evaluation || 'XXX'}
					</List.Item>
					<List.Item className=''>birthplace: {orphan.birthplace}</List.Item>
					<List.Item className=''>
						joinDate: {orphan.joinDate as ReactNode}
					</List.Item>

					<List.Item className=''>
						lastYearPercentage: {orphan.lastYearPercentage}
					</List.Item>
					<List.Item className=''>
						fatherDeathDate:
						{orphan.fatherDeathDate as ReactNode}
					</List.Item>
					<List.Item className=''>fatherWork: {orphan.fatherWork}</List.Item>
					<List.Item className=''>
						fatherDeathCos: {orphan.fatherDeathCos}
					</List.Item>
					<List.Item className=''>
						noOfFamilyMembers: {orphan.noOfFamilyMembers}
					</List.Item>
					<List.Item className=''>males: {orphan.males}</List.Item>
					<List.Item className=''>females: {orphan.females}</List.Item>
					<List.Item className=''>motherName: {orphan.motherName}</List.Item>
					<List.Item className=''>
						motherStatus: {orphan.motherStatus}
					</List.Item>
					<List.Item className=''>
						isMotherWorks: {orphan.isMotherWorks ? 'yes' : 'no'}
					</List.Item>
					<List.Item className=''>
						motherJob: {orphan.motherJob && 'none'}
					</List.Item>
					<List.Item className=''>
						motherJobPhone: {orphan.motherJobPhone}
					</List.Item>
					<List.Item className=''>
						monthlyIncome: {orphan.monthlyIncome}
					</List.Item>
					<List.Item className=''>liveWith: {orphan.liveWith}</List.Item>
					<List.Item className=''>homeType: {orphan.homeType}</List.Item>
					<List.Item className=''>homePhone: {orphan.homePhone}</List.Item>
					<List.Item className=''>
						currentAddress: {orphan.currentAddress}
					</List.Item>
					<List.Item className=''>isSponsored: {orphan.isSponsored}</List.Item>
					<List.Item className=''>
						foundationName: {orphan.foundationName}
					</List.Item>
					<List.Item className=''>
						foundationAmount: {orphan.foundationAmount}
					</List.Item>
				</List>

				<Button.Group>
					<EditOrphanModal orphan={orphan} />
					<DeleteOrphanModal id={orphan.id} />
				</Button.Group>
			</CardSection>
		</Card>
	);
}
export default OrphanCard;
