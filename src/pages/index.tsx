import {
	IconActivity,
	IconActivityHeartbeat,
	IconReceipt,
	IconUser,
	IconUserPlus,
	IconUserShield,
	IconUserStar,
} from '@tabler/icons-react';
import AppHead from '../../components/common/AppHead';
import MyCard from '../../components/common/MyCard';
import { usePageTitle } from '../../hooks/usePageTitle';
import { GetStaticProps } from 'next';
import prisma from '../../lib/prisma';
import { _Orphan } from '../../types/types';
import { serverLink } from '../../shared/links';

export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.count();
	const sponsors = await prisma.sponsor.count();
	const guardians = await prisma.guardian.count();
	const sponsorships = await prisma.sponsorship.count();
	const users = await prisma.user.count();
	const activities = await prisma.activityInfo.count();

	return { props: { orphans, sponsors, guardians, sponsorships, users, activities } };
};
interface Props {
	orphans: number;
	sponsors: number;
	guardians: number;
	sponsorships: number;
	users: number;
	activities: number;
}
export default function Home({ orphans, sponsors, guardians, sponsorships, users, activities }: Props) {
	const title = usePageTitle();
	return (
		<div>
			<AppHead title={title} />
			<div className='flex flex-wrap mx-auto justify-evenly'>
				<MyCard title={'Orphans'} count={orphans} color={'blue'} icon={<IconUserStar size={100} />} />
				<MyCard title={'Sponsors'} count={sponsors} color={'blue'} icon={<IconUserPlus size={100} />} />
				<MyCard title={'Sponsorships'} count={sponsorships} color={'blue'} icon={<IconReceipt size={100} />} />
				<MyCard title={'Guardians'} count={guardians} color={'blue'} icon={<IconUserShield size={100} />} />
				{/* <MyCard title={'Users'} count={users} color={'blue'} icon={<IconUser size={100} />} /> */}
				<MyCard title={'Activities'} count={activities} color={'blue'} icon={<IconActivity size={100} />} />
				<MyCard
					title={'Activities Execution Info'}
					count={50}
					color={'blue'}
					icon={<IconActivityHeartbeat size={80} path={serverLink + 'activities/execute'} />}
				/>
				{/*<MyCard title={'Behavior Info'} count={50} color={'blue'} icon={<IconAdjustments size={80} />} />
				<MyCard title={'Education Info'} count={50} color={'blue'} icon={<IconSchool size={80} />} />
				<MyCard title={'Attendance Info'} count={50} color={'blue'} icon={<IconCalendarCheck size={80} />} /> */}
			</div>
		</div>
	);
}
