import { Card, CardSection, Title, Text, Rating, Group, Button, SimpleGrid, Container } from '@mantine/core';
import { v4 } from 'uuid';
import DeleteOrphanModal from '../../../components/orphans/modals/DeleteOrphanModal';
import EditOrphanModal from '../../../components/orphans/modals/EditOrphanModal';
import { _Orphan } from '../../../types';
import Image from 'next/image';
import orphanImage from '../../img/simeLogo.png';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Guardian, Orphan, User } from '@prisma/client';

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
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	// export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params) return { notFound: true };
	try {
		const orphan = await prisma.orphan.findUnique({
			where: {
				id: Number(params?.id),
			},
			include: { Guardian: { include: { user: true } } },
		});
		const guardians = await prisma.guardian.findMany({ include: { user: true } });
		if (!orphan || !guardians) return { notFound: true };

		const data = { orphan, guardians };
		return {
			props: { data },
		};
	} catch (error) {
		return { notFound: true };
	}
};
interface Props {
	data: {
		orphan: Orphan & {
			Guardian: Guardian & {
				user: User;
			};
		};
		guardians: (Guardian & {
			user: User;
		})[];
	};
}

function OrphanDetails({ data }: Props) {
	console.log('🚀 ~ file: [id].tsx:30 ~ OrphanDetails ~ data:', data);
	const { orphan, guardians } = data;
	// const [orphan, SetOrphan] = useState<Orphan>(data);

	// if (!orphan) {
	// 	notFound();
	// }
	return (
		<>
			<Card key={v4()} withBorder className=' mx-auto my-2 p-2  '>
				<CardSection className='text-center'>
					<Title>Orphan Info</Title>
					<Image src={orphanImage} width={250} alt='asd' className='rounded-3xl  my-2 ' />
				</CardSection>
				<Container fluid p={10}>
					{/* <Box className='flex flex-wrap'> */}
					<SimpleGrid cols={5}>
						<Text>
							<Text weight={'bold'}>id:</Text>
							{orphan.id}
						</Text>
						<Text>
							<Text weight={'bold'}>name:</Text> {orphan.name || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>birthdate:</Text> {orphan.birthdate?.toUTCString() || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>gender:</Text> {orphan.gender || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>gradeLevel:</Text> {orphan.gradeLevel || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>schoolName:</Text> {orphan.schoolName || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>motherName:</Text> {orphan.motherName || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>birthplace:</Text> {orphan.birthplace}
						</Text>
						<Text>
							<Text weight={'bold'}>joinDate:</Text> {orphan.joinDate?.toUTCString()}
						</Text>
						<Text>
							<Text weight={'bold'}>lastYearPercentage:</Text> {orphan.lastYearPercentage}
						</Text>
						<Text>
							fatherDeathDate:
							{orphan.fatherDeathDate?.toUTCString()}
						</Text>
						<Text>
							<Text weight={'bold'}>fatherWork:</Text> {orphan.fatherWork}
						</Text>
						<Text>
							<Text weight={'bold'}>fatherDeathCos:</Text> {orphan.fatherDeathCos}
						</Text>
						<Text>
							<Text weight={'bold'}>noOfFamilyMembers:</Text> {orphan.noOfFamilyMembers}
						</Text>
						<Text>
							<Text weight={'bold'}>males:</Text> {orphan.males}
						</Text>
						<Text>
							<Text weight={'bold'}>females:</Text> {orphan.females}
						</Text>
						<Text>
							<Text weight={'bold'}>motherName:</Text> {orphan.motherName}
						</Text>
						<Text>
							<Text weight={'bold'}>motherStatus:</Text> {orphan.motherStatus}
						</Text>
						<Text>
							<Text weight={'bold'}>isMotherWorks:</Text> {orphan.isMotherWorks ? 'yes' : 'no'}
						</Text>
						<Text>
							<Text weight={'bold'}>motherJob:</Text> {orphan.motherJob || 'none'}
						</Text>
						<Text>
							<Text weight={'bold'}>motherJobPhone:</Text> {orphan.motherJobPhone || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>monthlyIncome:</Text> {orphan.monthlyIncome || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>liveWith:</Text> {orphan.liveWith || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>homeType:</Text> {orphan.homeType || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>homePhone:</Text> {orphan.homePhone || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>currentAddress:</Text> {orphan.currentAddress || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>isSponsored:</Text> {orphan.isSponsored || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>foundationName:</Text> {orphan.foundationName || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>foundationAmount:</Text> {orphan.foundationAmount || '---'}
						</Text>
						<Text>
							<Text weight={'bold'}>evaluation:</Text> {orphan.evaluation || '---'}
						</Text>
					</SimpleGrid>
					<Group position='center' pt={10}>
						<Rating value={5} fractions={1} readOnly size='lg' />
					</Group>
					{/* </Box> */}

					<Group position='right'>
						<Button.Group>
							<EditOrphanModal orphan={orphan as unknown as _Orphan} guardians={guardians} />
							<DeleteOrphanModal id={orphan.id} />
						</Button.Group>
					</Group>
				</Container>
			</Card>
		</>
	);
}
export default OrphanDetails;
