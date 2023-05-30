import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../lib/prisma';
import { useState, useEffect } from 'react';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { _ActivityInfo, _Attendance, _OrphanAttendance } from '../../../types/types';
import { Loader } from '@mantine/core';
import AppHead from '../../../components/common/AppHead';
import ActivityForm from '../../../components/activities/ActivityForm';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	const activity = await prisma.activityInfo.findFirst({
		where: { id: id },
		include: { User: true, ActivityGoal: { include: { GoalInfo: true }, orderBy: { id: 'asc' } } },
	});

	const stringData = SuperJSON.stringify({ activity });
	if (!activity) {
		return { notFound: true };
	}
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Edit({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const title = usePageTitle();
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	// if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<AppHead title={title} />
			{/* <ActivityForm goalTitles={goalsTitle} activityInfo={activity} /> */}
		</>
	);
}
export default Edit;
