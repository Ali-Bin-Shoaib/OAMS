import { Title, Text, Rating, Group, Button, SimpleGrid, Container, Center, Tooltip } from '@mantine/core';
import { v4 } from 'uuid';
import EditOrphanModal from '../../../components/orphans/modals/EditOrphanModal';
import { _Orphan } from '../../../types';
import Image from 'next/image';
import orphanImage from '../../img/simeLogo.png';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Guardian, Orphan, User } from '@prisma/client';
import DeleteModal from '../../../components/common/DeleteModal';
import { Pages, serverLink } from '../../../shared/links';

//*  needed to define possible ids that id parameter can accepts to create static pages for each id at build time
// export const getStaticPaths: GetStaticPaths = async () => {
// 	const data = await prisma.orphan.findMany();
// 	const params: { params: NextParsedUrlQuery }[] = [];
// 	data.forEach((orphan) => {
// 		params.push({ params: { id: orphan.id.toString() } });
// 	});

// 	return {
// 		paths: params,
// 		fallback: false,
// 	};
// };
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	console.log('🚀 ~ file: [id].tsx:28 ~ constgetServerSideProps:GetServerSideProps= ~ context:', context.params?.id);
	if (!context.params) return { notFound: true };
	try {
		const orphan = await prisma.orphan.findUnique({
			where: {
				id: Number(context.params?.id),
			},
			include: { Guardian: { select: { user: { select: { id: true, name: true } } } } },
		});
		const data = { orphan };
		return orphan ? { props: { data } } : { notFound: true };
	} catch (error) {
		console.log('🚀 ~ file: [id].tsx:44 ~ constgetServerSideProps:GetServerSideProps= ~ error:', error);
		return { notFound: true };
	}
};
interface Props {
	data: {
		orphan: Orphan & {
			Guardian: Guardian & {
				user: Pick<User, 'id' | 'name'>;
			};
		};
	};
}

function OrphanDetails({ data }: Props) {
	console.log('🚀 ~ file: [id].tsx:30 ~ OrphanDetails ~ data:', data);
	const { orphan } = data;
	// const [orphan, SetOrphan] = useState<Orphan>(data);

	// if (!orphan) {
	// 	notFound();
	// }
	return (
		<>
			<div className='container mx-auto border border-sky-100 shadow px-4 p-2 my-4'>
				<Title className='text-center'>Orphan Info</Title>
				<div className='container text-center'>
					<Image src={orphanImage} width={250} alt='asd' className='rounded-3xl  my-2 ' />{' '}
					<Tooltip label='Evaluation' className='mx-auto py-3 my-3'>
						<Rating value={orphan.evaluation || undefined} fractions={1} readOnly size='lg' />
					</Tooltip>
				</div>
				{/* <Box className='flex flex-wrap'> */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-3'>
					<Text>
						<Text weight={'bold'}>ID:</Text>
						{orphan.id}
					</Text>
					<Text>
						<Text weight={'bold'}>Name:</Text> {orphan.name || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Birthdate:</Text> {orphan.birthdate?.toUTCString() || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Gender:</Text> {orphan.gender || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Grade Level:</Text> {orphan.gradeLevel || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>School Name:</Text> {orphan.schoolName || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Mother Name:</Text> {orphan.motherName || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Birthplace:</Text> {orphan.birthplace}
					</Text>
					<Text>
						<Text weight={'bold'}>Join Date:</Text> {orphan.joinDate?.toDateString()}
					</Text>
					<Text>
						<Text weight={'bold'}>Last Year Percentage:</Text> {orphan.lastYearPercentage}
					</Text>
					<Text>
						Father Death Date:
						{orphan.fatherDeathDate?.toUTCString()}
					</Text>
					<Text>
						<Text weight={'bold'}>Father Work:</Text> {orphan.fatherWork}
					</Text>
					<Text>
						<Text weight={'bold'}>FatherDeathCos:</Text> {orphan.fatherDeathCos}
					</Text>
					<Text>
						<Text weight={'bold'}>No Of Family Members:</Text> {orphan.noOfFamilyMembers}
					</Text>
					<Text>
						<Text weight={'bold'}>Males:</Text> {orphan.males}
					</Text>
					<Text>
						<Text weight={'bold'}>Females:</Text> {orphan.females}
					</Text>
					<Text>
						<Text weight={'bold'}>Mother Name:</Text> {orphan.motherName}
					</Text>
					<Text>
						<Text weight={'bold'}>Mother Status:</Text> {orphan.motherStatus}
					</Text>
					<Text>
						<Text weight={'bold'}>Is Mother Works:</Text> {orphan.isMotherWorks ? 'yes' : 'no'}
					</Text>
					<Text>
						<Text weight={'bold'}>Mother Job:</Text> {orphan.motherJob || 'none'}
					</Text>
					<Text>
						<Text weight={'bold'}>Mother Job Phone:</Text> {orphan.motherJobPhone || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Monthly Income:</Text> {orphan.monthlyIncome || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Live With:</Text> {orphan.liveWith || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Home Type:</Text> {orphan.homeType || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Home Phone:</Text> {orphan.homePhone || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Current Address:</Text> {orphan.currentAddress || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Is Sponsored:</Text> {orphan.isSponsored || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Foundation Name:</Text> {orphan.foundationName || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>Foundation Amount:</Text> {orphan.foundationAmount || '---'}
					</Text>
				</div>
				{/* </Box> */}

				<Group position='right'>
					<Button.Group>
						<EditOrphanModal orphan={orphan as unknown as _Orphan} />
						{/* <DeleteOrphanModal id={orphan.id} /> */}
						<DeleteModal id={orphan.id} title={'Orphan'} url={`orphan`} redirectUrl={`${Pages.Orphans.link}`} />
					</Button.Group>
				</Group>
			</div>
		</>
	);
}
export default OrphanDetails;
