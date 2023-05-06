import { Card, CardSection, Title, Box, List, Rating, Group, Button, Loader } from '@mantine/core';
import { v4 } from 'uuid';
import DeleteOrphanModal from '../../../components/orphans/modals/DeleteOrphanModal';
import EditOrphanModal from '../../../components/orphans/modals/EditOrphanModal';
import { _Orphan } from '../../../types/types';
import Image from 'next/image';
import orphanImage from '../../img/simeLogo.png';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useState } from 'react';
import { Orphan } from '@prisma/client';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
//*  needed to define possible ids that id parameter can accepts to create static pages for each id at build time
export const getStaticPaths: GetStaticPaths = async () => {
	const data = await prisma.orphan.findMany();
	const params: { params: NextParsedUrlQuery }[] = [];
	data.forEach((orphan) => {
		params.push({ params: { id: orphan.id.toString() } });
	});

	return {
		paths: params,
		fallback: false,
	};
};
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const data = await prisma.orphan.findUnique({
		where: {
			id: Number(params?.id),
		},
	});
	return {
		props: { data },
	};
};
interface Props {
	data: Orphan;
}

function OrphanDetails({ data }: Props) {
	console.log('🚀 ~ file: [id].tsx:30 ~ OrphanDetails ~ data:', data);
	const [orphan, SetOrphan] = useState<Orphan>(data);

	if (!orphan)
		return (
			<Group position='center'>
				<Loader />
			</Group>
		);
	return (
		<>
			<Card key={v4()} withBorder className=' mx-auto my-2 p-2 w-3/6 '>
				<CardSection className='text-center'>
					<Title>Orphan Info</Title>
					<Image src={orphanImage} width={300} alt='asd' className='rounded-3xl  my-2 ' />
				</CardSection>
				<CardSection withBorder className='p-4'>
					<Box className='flex flex-wrap'>
						<List className=''>
							<List.Item className=''>id:{orphan.id}</List.Item>
							<List.Item className=''>name: {orphan.name || '---'}</List.Item>
							<List.Item className=''>birthdate: {orphan.birthdate?.toUTCString() || '---'}</List.Item>

							<List.Item className=''>gender: {orphan.gender || '---'}</List.Item>
							<List.Item className=''>gradeLevel: {orphan.gradeLevel || '---'}</List.Item>
							<List.Item className=''>schoolName: {orphan.schoolName || '---'}</List.Item>
							<List.Item className=''>motherName: {orphan.motherName || '---'}</List.Item>
							<List.Item className=''>birthplace: {orphan.birthplace}</List.Item>
							<List.Item className=''>joinDate: {orphan.joinDate?.toUTCString()}</List.Item>

							<List.Item className=''>lastYearPercentage: {orphan.lastYearPercentage}</List.Item>
							<List.Item className=''>
								fatherDeathDate:
								{orphan.fatherDeathDate?.toUTCString()}
							</List.Item>
							<List.Item className=''>fatherWork: {orphan.fatherWork}</List.Item>
							<List.Item className=''>fatherDeathCos: {orphan.fatherDeathCos}</List.Item>
							<List.Item className=''>noOfFamilyMembers: {orphan.noOfFamilyMembers}</List.Item>
							<List.Item className=''>males: {orphan.males}</List.Item>
							<List.Item className=''>females: {orphan.females}</List.Item>
							<List.Item className=''>motherName: {orphan.motherName}</List.Item>
							<List.Item className=''>motherStatus: {orphan.motherStatus}</List.Item>
							<List.Item className=''>isMotherWorks: {orphan.isMotherWorks ? 'yes' : 'no'}</List.Item>
							<List.Item className=''>motherJob: {orphan.motherJob && 'none'}</List.Item>
							<List.Item className=''>motherJobPhone: {orphan.motherJobPhone}</List.Item>
							<List.Item className=''>monthlyIncome: {orphan.monthlyIncome}</List.Item>
							<List.Item className=''>liveWith: {orphan.liveWith}</List.Item>
							<List.Item className=''>homeType: {orphan.homeType}</List.Item>
							<List.Item className=''>homePhone: {orphan.homePhone}</List.Item>
							<List.Item className=''>currentAddress: {orphan.currentAddress}</List.Item>
							<List.Item className=''>isSponsored: {orphan.isSponsored}</List.Item>
							<List.Item className=''>foundationName: {orphan.foundationName}</List.Item>
							<List.Item className=''>foundationAmount: {orphan.foundationAmount}</List.Item>
							<List.Item className=''>evaluation: {orphan.evaluation || '---'}</List.Item>
						</List>
						<div className='m-auto '>
							<Rating value={5} fractions={1} count={10} readOnly size='xl' />
						</div>
					</Box>

					<Group position='right'>
						<Button.Group>
							<EditOrphanModal orphan={orphan} />
							<DeleteOrphanModal id={orphan.id} />
						</Button.Group>
					</Group>
				</CardSection>
			</Card>
		</>
	);
}
export default OrphanDetails;
