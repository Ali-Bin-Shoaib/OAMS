import { Card, Title, CardSection, List, Button, Group, Box, Rating, Tooltip } from '@mantine/core';
import { v4 } from 'uuid';
import DeleteOrphanModal from './modals/DeleteOrphanModal';
import EditOrphanModal from './modals/EditOrphanModal';
import Image from 'next/image';
import img1 from '../../src/img/simeLogo.png';
import { Orphan } from '@prisma/client';
import { IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Pages } from '../../shared/links';
import { _Orphan } from '../../types/types';
interface Props {
	orphan: _Orphan;
}
function OrphanCard({ orphan }: Props) {
	console.log('🚀 ~ file: ~ OrphanCard ~ OrphanCard');

	const router = useRouter();
	return (
		<Card key={v4()} withBorder mih={150} className=' mx-auto my-2 p-2 w-3/6  '>
			{orphan ? (
				<>
					<CardSection className='text-center'>
						<Title>Orphan Info</Title>
						<Image src={img1} width={300} alt='orphan image' className='rounded-3xl  my-2 ' />
					</CardSection>
					<CardSection withBorder className='p-4'>
						<Box className='flex flex-wrap'>
							<List>
								<List.Item>id:{orphan.id}</List.Item>
								<List.Item>name: {orphan.name || '---'}</List.Item>
								<List.Item>birthdate: {orphan.birthdate?.toUTCString() || '---'}</List.Item>
								<List.Item>gender: {orphan.gender || '---'}</List.Item>
								<List.Item>gradeLevel: {orphan.gradeLevel || '---'}</List.Item>
								<List.Item>schoolName: {orphan.schoolName || '---'}</List.Item>
								{/* <List.Item >motherName: {orphan.motherName || '---'}</List.Item> */}
								{/* <List.Item >birthplace: {orphan.birthplace}</List.Item> */}
								{/* <List.Item >joinDate: {orphan.joinDate?.toUTCString()}</List.Item> */}
								<List.Item>lastYearPercentage: {orphan.lastYearPercentage}</List.Item>
								{/* <List.Item >
									fatherDeathDate:
									{orphan.fatherDeathDate?.toUTCString()}
								</List.Item> */}
								<List.Item>males: {orphan.males}</List.Item>
								<List.Item>females: {orphan.females}</List.Item>
								{/* <List.Item >motherStatus: {orphan.motherStatus}</List.Item>
								<List.Item >liveWith: {orphan.liveWith}</List.Item>
								<List.Item >homePhone: {orphan.homePhone}</List.Item> */}
								<List.Item>currentAddress: {orphan.currentAddress}</List.Item>
								<List.Item>evaluation: {orphan.evaluation || '---'}</List.Item>
							</List>
							<div className='m-auto '>
								<Rating value={orphan.evaluation as number} fractions={1} defaultValue={5} count={10} />
							</div>
						</Box>
						<Group position='right'>
							<Button.Group>
								{/* <Tooltip label='Evaluate orphan'> */}
								<Button>Evaluate</Button>
								{/* </Tooltip> */}
								<Tooltip label='Orphan Info'>
									<Button color='gray' onClick={() => router.push(Pages.Orphans + orphan.id)}>
										<IconInfoCircle />
									</Button>
								</Tooltip>
								<EditOrphanModal orphan={orphan} />
								<DeleteOrphanModal id={orphan.id} />
							</Button.Group>
						</Group>
					</CardSection>
				</>
			) : (
				<Title align='center'>no orphan registered.</Title>
			)}
		</Card>
	);
}
export default OrphanCard;
