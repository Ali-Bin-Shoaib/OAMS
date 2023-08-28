import { Loader } from '@mantine/core';
import {
	Goal,
	ActivityInfo,
	User,
	ActivityExecutionInfo,
	GoalEvaluation,
	OrphanActivityExecution,
	Orphan,
} from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import SuperJSON from 'superjson';
import prisma from '../../../../../lib/prisma';
import { _ActivityExecutionInfo, _ActivityInfo } from '../../../../../types';
import ExecutionForm from 'components/activityExecution/ExecutionForm';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const executionId = Number(params?.executionId);
	console.log(
		'🚀 ~ file: [executionId].tsx:24 ~ constgetServerSideProps:GetServerSideProps= ~ executionId:',
		executionId
	);
	const activityExecution = await prisma.activityExecutionInfo.findFirst({
		where: { id: executionId },
		include: {
			Executor: true,
			ActivityInfo: { include: { User: true } },
			GoalEvaluation: { include: { Goal: true } },
			OrphanActivityExecution: { include: { Orphan: true } },
		},
	});
	// activityExecution.OrphanActivityExecution[0].
	console.log(
		'🚀 ~ file: [id].tsx:33 ~ constgetServerSideProps:GetServerSideProps= ~ activitiesExecution:',
		activityExecution
	);
	const orphans = await prisma.orphan.findMany();
	if (!activityExecution || !orphans) {
		return { notFound: true };
	}
	const data = { activityExecution, orphans };
	const stringData = SuperJSON.stringify(data);
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Edit({ stringData }: Props) {
	const [hydration, setHydration] = useState(false);
	const jsonData = SuperJSON.parse<{
		activityExecution: ActivityExecutionInfo & {
			Executer: User;
			ActivityInfo: ActivityInfo & { User: User };
			GoalEvaluation: (GoalEvaluation & { Goal: Goal })[];
			OrphanActivityExecution: OrphanActivityExecution[];
		};
		orphans: Orphan[];
	}>(stringData);
	const { activityExecution, orphans } = jsonData;
	// console.log('🚀 ~ file: [id].tsx:63 ~ Edit ~ activityExecution:', activityExecution);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<ExecutionForm orphans={orphans} activityExecutionInfo={activityExecution as unknown as _ActivityExecutionInfo} />
		</>
	);
}
export default Edit;
