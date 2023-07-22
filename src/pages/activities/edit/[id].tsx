import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../../lib/prisma';
import { useState, useEffect } from 'react';
import { _ActivityInfo, _Attendance, _OrphanAttendance } from '../../../../types';
import { Loader } from '@mantine/core';
import ActivityForm from '../../../../components/activities/ActivityForm';
import { ActivityGoal, ActivityInfo, Goal, User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	console.log('🚀 ~ file: [id].tsx:14 ~ constgetServerSideProps:GetServerSideProps= ~ id:', id);
	const activity = await prisma.activityInfo.findFirst({
		where: { id: id },
		include: {
			User: { select: { id: true, name: true, type: true } },
			ActivityGoal: { include: { Goal: true }, orderBy: { id: 'asc' } },
		},
	});
	const goalInfo = await prisma.goal.findMany();

	if (!activity) {
		return { notFound: true };
	}
	// console.log("🚀 ~ file: [id].tsx:16 ~ constgetServerSideProps:GetServerSideProps= ~ activity:", activity);
	const data = { goalInfo, activity };
	const stringData = SuperJSON.stringify({ activity, goalInfo });
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Edit({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const jsonData: {
		goalInfo: Goal[];
		activity: ActivityInfo & {
			User: User;
			ActivityGoal: (ActivityGoal & {
				GoalInfo: Goal;
			})[];
		};
	} = SuperJSON.parse(stringData);
	const { activity, goalInfo } = jsonData;
	console.log('🚀 ~ file: [id].tsx:39 ~ Edit ~ activity:', activity);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<ActivityForm activityInfo={activity as _ActivityInfo} goalInfo={goalInfo} />
		</>
	);
}
export default Edit;
