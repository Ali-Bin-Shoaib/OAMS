import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../../../lib/prisma';
import AppHead from '../../../../../components/common/AppHead';
import { usePageTitle } from '../../../../../hooks/usePageTitle';
import { ActivityInfo, User, ActivityGoal, Goal, Orphan } from '@prisma/client';
import ExecutionForm from '../../../../../components/activityExecution/ExecutionForm';
import { _ActivityInfo } from '../../../../../types/types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	console.log('🚀 ~ file: [activityId].tsx:11 ~ constgetServerSideProps:GetServerSideProps= ~ params:', params);
	const id = Number(params?.id);
	try {
		const activity = await prisma.activityInfo.findFirst({
			where: { id: id },
			// include: { User: { select: { name: true, id: true, type: true } }, ActivityGoal: { include:: true }, orderBy: { id: 'asc' } } },
			// include: { User: true, ActivityGoal: { include: { Goal: true }, orderBy: { id: 'asc' } } },
			include: { User: true, ActivityGoal: { include: { Goal: true }, orderBy: { id: 'asc' } } },
		});
		const orphans = await prisma.orphan.findMany();
		if (!activity || !orphans) {
			return { notFound: true };
		}
		const data = { activity, orphans };
		const stringData = SuperJSON.stringify(data);
		return { props: { stringData } };
	} catch (error) {
		return { notFound: true };
	}
};

interface Props {
	stringData: string;
}
function Create({ stringData }: Props) {
	const title = usePageTitle();
	const { activity, orphans } = SuperJSON.parse<{
		activity: _ActivityInfo;
		orphans: Orphan[];
		//  & {
		//     User: User;
		//     ActivityGoal: (ActivityGoal & {
		//         GoalInfo: Goal;
		//     })[];
		// };
	}>(stringData);

	return (
		<>
			<AppHead title={title} />

			<h1>Create ActivityExecutionInfo </h1>
			<ExecutionForm activityInfo={activity} orphans={orphans} />
		</>
	);
}
export default Create;
