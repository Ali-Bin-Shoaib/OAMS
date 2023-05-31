import {
	Card,
	Title,
	CardSection,
	List,
	Button,
	Group,
	Box,
	Rating,
	Tooltip,
	Text,
	Grid,
	Badge,
	Divider,
} from '@mantine/core';
import { v4 } from 'uuid';
import DeleteOrphanModal from './modals/DeleteOrphanModal';
import EditOrphanModal from './modals/EditOrphanModal';
import Image from 'next/image';
import img1 from '../../src/img/simeLogo.png';
import { Orphan } from '@prisma/client';
import { IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Pages } from '../../shared/links';
import { _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../types/types';
interface Props {
	orphan: orphanWithGuardianAndSponsorshipInfo;
}
function OrphanCard({ orphan }: Props) {
	console.log('🚀 ~ file: ~ OrphanCard ~ OrphanCard');
	const { Guardian, Sponsorship, ...onlyOrphanInfo } = orphan;
	const router = useRouter();
	return (
		<>
			<Card key={v4()} withBorder mih={625} shadow='md' radius='md' padding='md' className=' mx-auto my-2 p-2 w-5/6'>
				{/* <div className='m-auto '>
				<Rating value={orphan.evaluation as number} fractions={1} defaultValue={5} count={10} />
			</div> */}

				<div>
					<div className='text-center'>
						<Image src={img1} alt={orphan.name!} width={250} height={250} />
					</div>
					<Divider />
				</div>
				<Title order={2} className='text-center'>
					{orphan.name}
				</Title>

				<div className='p-2 m-2'>
					<Text size='xl'>Gender: {orphan.gender}</Text>
					<Text size='xl'>Age: {orphan.age}</Text>
					<Text size='xl'>School Name: {orphan.schoolName}</Text>
					<Text size='xl'>Grade Level: {orphan.gradeLevel}</Text>
					<Text size='xl'>Evaluation: {orphan.evaluation}</Text>
					<Text size='xl'>Guardian: {orphan.Guardian?.user.name}</Text>
					<Text size='xl'>Sponsor: {orphan.Sponsorship.find((x) => x.isActive === true)?.Sponsor.user.name}</Text>
				</div>
				<Divider />

				<Group position='right'>
					<Button.Group>
						<Tooltip label='Evaluate orphan'>
							<Button>Evaluate</Button>
						</Tooltip>

						<Tooltip label='Orphan Info'>
							<Button color='gray' onClick={() => router.push(Pages.Orphans + orphan.id)}>
								<IconInfoCircle />
							</Button>
						</Tooltip>
						<EditOrphanModal orphan={onlyOrphanInfo as unknown as _Orphan} guardians={[]} />
						<DeleteOrphanModal id={orphan.id} />
					</Button.Group>
				</Group>
			</Card>
		</>
		// <InfoCard orphan={orphan} />
	);
}
export default OrphanCard;



// 	return (
// 		<Card key={v4()} withBorder mih={150} shadow='md' radius='md' padding='md' className=' mx-auto my-2 p-2 w-3/6'>
// 			{/* <div className='m-auto '>
// 				<Rating value={orphan.evaluation as number} fractions={1} defaultValue={5} count={10} />
// 			</div> */}
// 			<Title order={3} style={{ marginBottom: 10 }}>
// 				{orphan.name}
// 			</Title>
// 			<Text size='sm'>{orphan.name}</Text>

// 			<div>
// 				<Text>Gender:{orphan.gender}</Text>
// 				{/* <Badge color='teal' variant='filled' style={{ marginRight: 10 }}>
// 					Orphans: {orphan.age}
// 				</Badge>
// 				<Badge color='indigo' variant='filled' style={{ marginRight: 10 }}>
// 					Sponsors: {orphan.schoolName}
// 				</Badge>
// 				<Badge color='cyan' variant='filled' style={{ marginRight: 10 }}>
// 					Users: {orphan.name}
// 				</Badge>
// 				<Badge color='purple' variant='filled' style={{ marginRight: 10 }}>
// 					Activities: {orphan.name}
// 				</Badge>
// 				<Badge color='red' variant='filled' style={{ marginRight: 10 }}>
// 					Attendance: {orphan.name}
// 				</Badge> */}
// 			</div>

// 			<Group position='right'>
// 				<Button.Group>
// 					<Tooltip label='Evaluate orphan'>
// 						<Button>Evaluate</Button>
// 					</Tooltip>

// 					<Tooltip label='Orphan Info'>
// 						<Button color='gray' onClick={() => router.push(Pages.Orphans + orphan.id)}>
// 							<IconInfoCircle />
// 						</Button>
// 					</Tooltip>
// 					<EditOrphanModal orphan={orphan} />
// 					<DeleteOrphanModal id={orphan.id} />
// 				</Button.Group>
// 			</Group>
// 		</Card>
// 	);
// }
