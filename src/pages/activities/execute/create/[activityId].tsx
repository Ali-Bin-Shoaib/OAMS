import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../../../lib/prisma';
import { Orphan } from '@prisma/client';
import ExecutionForm from 'components/activityExecution/ExecutionForm';
import { _ActivityInfo } from '../../../../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	console.log('🚀 ~ file: [activityId].tsx:11 ~ constgetServerSideProps:GetServerSideProps= ~ params:', params);
	const activityId = Number(params?.activityId);
	try {
		const activity = await prisma.activityInfo.findFirst({
			where: { id: activityId },
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
			<h1 className='text-center'>إضافة معلومات تنفيذ النشاط </h1>
			<ExecutionForm activityInfo={activity} orphans={orphans} />
		</>
	);
}
export default Create;
