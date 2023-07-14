import {
	IconActivity,
	IconActivityHeartbeat,
	IconReceipt,
	IconUser,
	IconUserPlus,
	IconUserShield,
	IconUserStar,
} from '@tabler/icons-react';
import MyCard from '../../components/common/MyCard';
import { GetStaticProps } from 'next';
import prisma from '../../lib/prisma';
import { _Orphan } from '../../types';
import { Pages } from '../../shared/links';

export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.count();
	const sponsors = await prisma.sponsor.count();
	const guardians = await prisma.guardian.count();
	const sponsorships = await prisma.sponsorship.count();
	const users = await prisma.user.count();
	const activities = await prisma.activityInfo.count();
	const activityExecution = await prisma.activityExecutionInfo.count();

	return { props: { orphans, sponsors, guardians, sponsorships, users, activities, activityExecution } };
};
interface Props {
	orphans: number;
	sponsors: number;
	guardians: number;
	sponsorships: number;
	users: number;
	activities: number;
	activityExecution: number;
}
export default function Home({ orphans, sponsors, guardians, sponsorships, activityExecution, activities }: Props) {
	return (
		<div>
			<div className='flex flex-wrap mx-auto justify-evenly'>
				<MyCard
					title={'Orphans'}
					count={orphans}
					color={'blue'}
					icon={<IconUserStar size={100} />}
					path={Pages.Orphans.link}
				/>
				<MyCard
					title={'Sponsors'}
					count={sponsors}
					color={'red'}
					icon={<IconUserPlus size={100} />}
					path={Pages.Sponsors.link}
				/>
				<MyCard
					title={'Sponsorships'}
					count={sponsorships}
					color={'cyan'}
					icon={<IconReceipt size={100} />}
					path={Pages.Sponsorships.link}
				/>
				<MyCard
					title={'Guardians'}
					count={guardians}
					color={'teal'}
					icon={<IconUserShield size={100} />}
					path={Pages.Guardians.link}
				/>
				<MyCard
					title={'Activities'}
					count={activities}
					color={'yellow'}
					icon={<IconActivity size={100} />}
					path={Pages.Activities.link}
				/>
				<MyCard
					title={'Activities Execution'}
					count={activityExecution}
					color={'indigo'}
					icon={<IconActivityHeartbeat size={100} />}
					path={Pages.ActivityExecution.link}
				/>
			</div>
		</div>
	);
}
