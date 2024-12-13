import { Card, Button, Group, Tooltip, Text, Divider, ActionIcon } from '@mantine/core';
import { v4 } from 'uuid';
import EditOrphanModal from './modals/EditOrphanModal';
import Image from 'next/image';
import img1 from '../../src/img/simeLogo.png';
import { IconEdit, IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Pages, serverLink } from '../../shared/links';
import { _Orphan, orphanWithGuardianAndSponsorshipInfo } from '../../types';
import DeleteModal from '../common/DeleteModal';
interface Props {
	orphan: orphanWithGuardianAndSponsorshipInfo;
}
function OrphanCard({ orphan }: Props) {
	console.log('🚀 ~ file: ~ OrphanCard ~ OrphanCard');
	const router = useRouter();
	return (
		<>
			<>
				<div>
					<div className='text-center'>
						<Image src={img1} alt={orphan?.name} width={256} height={183} priority />
					</div>
					<Divider />
				</div>
				<h2 className='font-bold text-center text-ellipsis overflow-hidden whitespace-nowrap '>{orphan?.name}</h2>
				<div className='p-2 m-2'>
					<Text size='xl'>الجنس: {orphan?.gender}</Text>
					<Text size='xl'>العمر: {orphan?.age}</Text>
					<Text size='xl'>اسم المدرسة: {orphan?.schoolName}</Text>
					<Text size='xl'>المستوى الدراسي: {orphan?.gradeLevel}</Text>
					<Text size='xl'>التقييم: {orphan?.evaluation}</Text>
					<Text size='xl'>الوصي: {orphan?.Guardian?.user?.name}</Text>
					<Text size='xl'>الكفيل: {orphan?.Sponsorship?.find((x) => x.isActive === true)?.Sponsor?.user?.name}</Text>
				</div>
			</>
			<Divider />
			<Group position='right' p={5}>
				<Button.Group>
					{/* <Tooltip label='Evaluate orphan'>
							<Button>Evaluate</Button>
						</Tooltip> */}
					<Tooltip label='تفاصيل اليتيم'>
						<Button color='gray' onClick={() => router.push(Pages?.Orphans.link + orphan?.id)}>
							<IconInfoCircle />
						</Button>
					</Tooltip>
					<Tooltip label='تعديل'>
						<Button color='yellow' onClick={() => router.push(`${serverLink}orphans/action/${orphan?.id}`)}>
							<IconEdit />
						</Button>
					</Tooltip>
					<DeleteModal id={orphan?.id} title={'Orphan'} url='orphan' size='sm' />
				</Button.Group>
			</Group>
		</>
	);
}
export default OrphanCard;
