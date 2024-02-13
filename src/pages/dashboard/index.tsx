import {
	IconActivity,
	IconActivityHeartbeat,
	IconReceipt,
	IconUser,
	IconUserPlus,
	IconUserShield,
	IconUserStar,
} from '@tabler/icons-react';
import MyCard from '../../../components/common/MyCard';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import prisma from '../../../lib/prisma';
import { _Orphan } from '../../../types';
import { Pages } from '../../../shared/links';
import AccessDenied from 'src/pages/auth/accessDenied';
import { authOptions } from '../api/auth/next-auth-options';
import SuperJSON from 'superjson';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
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
	const { data: session, status } = useSession({ required: true });

	if (status !== 'authenticated') return <AccessDenied />;

	return (
		<div className='flex flex-wrap mx-auto justify-evenly'>
			<MyCard
				title={'الأيتام'}
				count={orphans}
				color={'blue'}
				icon={<IconUserStar size={100} />}
				path={Pages.Orphans.link}
			/>
			<MyCard
				title={'الكفلاء'}
				count={sponsors}
				color={'red'}
				icon={<IconUserPlus size={100} />}
				path={Pages.Sponsors.link}
			/>
			<MyCard
				title={'الكفالات'}
				count={sponsorships}
				color={'cyan'}
				icon={<IconReceipt size={100} />}
				path={Pages.Sponsorships.link}
			/>
			<MyCard
				title={'الأوصياء'}
				count={guardians}
				color={'teal'}
				icon={<IconUserShield size={100} />}
				path={Pages.Guardians.link}
			/>
			<MyCard
				title={'الأنشطة'}
				count={activities}
				color={'yellow'}
				icon={<IconActivity size={100} />}
				path={Pages.Activities.link}
			/>
			<MyCard
				title={'الأنشظة المنفّذة'}
				count={activityExecution}
				color={'indigo'}
				icon={<IconActivityHeartbeat size={100} />}
				path={Pages.ActivityExecution.link}
			/>
		</div>
	);
}
