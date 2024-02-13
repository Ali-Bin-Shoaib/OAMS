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
import { IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/router';

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
	const router = useRouter();
	// const [orphan, SetOrphan] = useState<Orphan>(data);

	// if (!orphan) {
	// 	notFound();
	// }
	return (
		<>
			<div className='container mx-auto border border-sky-100 shadow px-4 p-2 my-4'>
				<Title className='text-center'>معلومات اليتيم</Title>
				<div className='container text-center'>
					<Image src={orphanImage} width={250} alt='asd' className='rounded-3xl  my-2 ' />{' '}
					<Tooltip label='Evaluation' className='mx-auto py-3 my-3'>
						<Rating value={orphan.evaluation || undefined} fractions={1} readOnly size='lg' />
					</Tooltip>
				</div>
				{/* <Box className='flex flex-wrap'> */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-3'>
					<Text>
						<Text weight={'bold'}>الرقم:</Text>
						{orphan.id}
					</Text>
					<Text>
						<Text weight={'bold'}>الاسم:</Text> {orphan.name || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>تاريخ الميلاد:</Text> {orphan.birthdate?.toUTCString() || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>الحنس:</Text> {orphan.gender || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>المستوى الدراسي:</Text> {orphan.gradeLevel || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>اسم المدرسة:</Text> {orphan.schoolName || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>اسم الأم:</Text> {orphan.motherName || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>مكان الميلاد:</Text> {orphan.birthplace}
					</Text>
					<Text>
						<Text weight={'bold'}>تاريخ الإنضمام:</Text> {orphan.joinDate?.toDateString()}
					</Text>
					<Text>
						<Text weight={'bold'}>نسبة آخر سنة دراسية:</Text> {orphan.lastYearPercentage}
					</Text>
					<Text>
						تاريخ وفاة الأب:
						{orphan.fatherDeathDate?.toUTCString()}
					</Text>
					<Text>
						<Text weight={'bold'}>عمل الأب:</Text> {orphan.fatherWork}
					</Text>
					<Text>
						<Text weight={'bold'}>أسباب وفاة الأب:</Text> {orphan.fatherDeathCos}
					</Text>
					<Text>
						<Text weight={'bold'}>عدد أعضاء العائلة:</Text> {orphan.noOfFamilyMembers}
					</Text>
					<Text>
						<Text weight={'bold'}>الذكور:</Text> {orphan.males}
					</Text>
					<Text>
						<Text weight={'bold'}>الإناث:</Text> {orphan.females}
					</Text>
					<Text>
						<Text weight={'bold'}>اسم الأم:</Text> {orphan.motherName}
					</Text>
					<Text>
						<Text weight={'bold'}>حالة الأم:</Text> {orphan.motherStatus}
					</Text>
					<Text>
						<Text weight={'bold'}>هل الأم تعمل:</Text> {orphan.isMotherWorks ? 'yes' : 'no'}
					</Text>
					<Text>
						<Text weight={'bold'}>عمل الأم:</Text> {orphan.motherJob || 'none'}
					</Text>
					<Text>
						<Text weight={'bold'}>رقم هاتف الأم:</Text> {orphan.motherJobPhone || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>الدخل الشهري:</Text> {orphan.monthlyIncome || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>اليتيم يعيش مع:</Text> {orphan.liveWith || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>نوع المنزل:</Text> {orphan.homeType || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>رقم المنزل:</Text> {orphan.homePhone || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>العنوان الحالي:</Text> {orphan.currentAddress || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>هل اليتيم مكفول:</Text> {orphan.isSponsored || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>اسم المؤسسة:</Text> {orphan.foundationName || '---'}
					</Text>
					<Text>
						<Text weight={'bold'}>مبلغ الكفالة:</Text> {orphan.foundationAmount || '---'}
					</Text>
				</div>
				{/* </Box> */}

				<Group position='right'>
					<Button.Group>
						{/* <EditOrphanModal orphan={orphan as unknown as _Orphan} /> */}
						<Tooltip label='تعديل'>
							<Button color='yellow' size='xs' onClick={() => router.push(`${serverLink}orphans/action/${orphan.id}`)}>
								<IconEdit />
							</Button>
						</Tooltip>
						{/* <DeleteOrphanModal id={orphan.id} /> */}
						<DeleteModal id={orphan.id} title={orphan.name} url={`api/orphan`} redirectUrl={`${Pages.Orphans.link}`} />
					</Button.Group>
				</Group>
			</div>
		</>
	);
}
export default OrphanDetails;
