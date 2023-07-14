import { Card, Button, Group, Tooltip, Text, Divider } from '@mantine/core';
import { v4 } from 'uuid';
import EditOrphanModal from './modals/EditOrphanModal';
import Image from 'next/image';
import img1 from '../../src/img/simeLogo.png';
import { IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Pages } from '../../shared/links';
import { _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../types';
import DeleteModal from '../common/DeleteModal';
interface Props {
	orphan: orphanWithGuardianAndSponsorshipInfo;
}
function OrphanCard({ orphan }: Props) {
	console.log('🚀 ~ file: OrphanCard.tsx:30 ~ OrphanCard ~ orphan:', orphan);
	console.log('🚀 ~ file: ~ OrphanCard ~ OrphanCard');
	const { Guardian, Sponsorship, ...onlyOrphanInfo } = orphan;
	const router = useRouter();
	return (
		<>
			<>
				<div>
					<div className='text-center'>
						<Image src={img1} alt={orphan.name!} width={256} height={183} />
					</div>
					<Divider />
				</div>
				<h2 className='font-bold text-center text-ellipsis overflow-hidden whitespace-nowrap '>{orphan.name}</h2>
				<div className='p-2 m-2'>
					<Text size='xl'>Gender: {orphan.gender}</Text>
					<Text size='xl'>Age: {orphan.age}</Text>
					<Text size='xl'>School Name: {orphan.schoolName}</Text>
					<Text size='xl'>Grade Level: {orphan.gradeLevel}</Text>
					<Text size='xl'>Evaluation: {orphan.evaluation}</Text>
					<Text size='xl'>Guardian: {orphan?.Guardian?.user?.name}</Text>
					<Text size='xl'>Sponsor: {orphan?.Sponsorship?.find((x) => x.isActive === true)?.Sponsor?.user?.name}</Text>
				</div>
			</>
			<Divider />
			<Group position='right' p={5}>
				<Button.Group>
					{/* <Tooltip label='Evaluate orphan'>
							<Button>Evaluate</Button>
						</Tooltip> */}
					<Tooltip label='Orphan Info'>
						<Button color='gray' onClick={() => router.push(Pages?.Orphans.link + orphan?.id)}>
							<IconInfoCircle />
						</Button>
					</Tooltip>
					<EditOrphanModal orphan={onlyOrphanInfo as unknown as _Orphan} guardians={[]} size='sm' />
					<DeleteModal id={orphan.id} title={'Orphan'} url='api/orphan/' size='sm' />
				</Button.Group>
			</Group>
		</>
	);
}
export default OrphanCard;
