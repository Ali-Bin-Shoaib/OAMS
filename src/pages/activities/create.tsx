import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import ActivityForm from '../../../components/activities/ActivityForm';
import prisma from '../../../lib/prisma';
import { _ActivityInfo } from '../../../types';
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Goal } from '@prisma/client';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	// if(params?.id)
	const goals = await prisma.goal.findMany();
	const stringData = SuperJSON.stringify(goals);
	return { props: { stringData } };
};
interface Props {
	stringData: string;
}

function Create({ stringData }: Props) {
	// const jsonData: { activity: _ActivityInfo; goalsTitle: GoalInfo[] } = SuperJSON.parse(stringData);
	const jsonData: Goal[] = SuperJSON.parse(stringData);
	// const { activity, goalsTitle } = jsonData;
	const goals = jsonData;
	const [hydration, setHydration] = useState(false);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);
	if (!hydration || !jsonData) return <Loader size={100} />;
	return (
		<>
			<ActivityForm goalInfo={goals} />
		</>
	);
}
export default Create;
