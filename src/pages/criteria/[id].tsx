import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';
import { IconInfoCircle } from '@tabler/icons-react';
import MyModal from '../../../components/common/MyModal';
import GoalCard from '../../../components/goals/GoalCard';
import { ActivityGoal, ActivityInfo, Goal, GoalEvaluation, User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	if (!params) return { notFound: true };
	try {
		const goal = await prisma.goal.findUnique({
			where: {
				id: Number(params?.id),
			},
			include: {
				GoalEvaluation: true,
				ActivityGoal: { include: { ActivityInfo: { select: { id: true, title: true } } } },
				User: true,
				_count: true,
			},
		});
		console.log('🚀 ~ file: [id].tsx:17 ~ constgetServerSideProps:GetServerSideProps= ~ goal:', goal);
		if (!goal) return { notFound: true };

		return {
			props: { goal },
		};
	} catch (error) {
		return { notFound: true };
	}
};
interface Props {
	goal?: Goal & {
		GoalEvaluation: GoalEvaluation[];
		ActivityGoal: (ActivityGoal & { ActivityInfo: ActivityInfo })[];
		User: User;
	};
}
function GoalInfo({ goal }: Props) {
	return <GoalCard goal={goal} />;
}
export default GoalInfo;
