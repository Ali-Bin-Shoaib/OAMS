import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import ActivityForm from '../../../components/activities/ActivityForm';
import prisma from '../../../lib/prisma';
import { _ActivityInfo } from '../../../types/types';
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { usePageTitle } from '../../../hooks/usePageTitle';
import AppHead from '../../../components/common/AppHead';
import { GoalInfo } from '@prisma/client';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const goalInfo = await prisma.goalInfo.findMany();
	const stringData = SuperJSON.stringify(goalInfo);
	return { props: { stringData } };
};
interface Props {
	stringData: string;
}

function Create({ stringData }: Props) {
	// const jsonData: { activity: _ActivityInfo; goalsTitle: GoalInfo[] } = SuperJSON.parse(stringData);
	const jsonData: GoalInfo[] = SuperJSON.parse(stringData);
	// const { activity, goalsTitle } = jsonData;
	const goals = jsonData;
	const [hydration, setHydration] = useState(false);
	const title = usePageTitle();
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);
	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<>
			<AppHead title={title} />
			<ActivityForm goalInfo={goals} />
		</>
	);
}
export default Create;
