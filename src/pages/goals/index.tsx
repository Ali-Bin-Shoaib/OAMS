import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import SuperJSON from 'superjson';
import { Goal, User } from '@prisma/client';
import GoalTable from '../../../components/goals/GoalTable';
import MyModal from '../../../components/common/MyModal';
import GoalForm from '../../../components/goals/GoalForm';

// ******************************** GOAL PAGE ********************************
// * get Goal from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const goals = await prisma.goal.findMany({
		include: { User: { select: { name: true, id: true } } },
		orderBy: { id: 'asc' },
	});
	if (!goals) return { notFound: true };
	goals.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	// const data = goals;
	// const stringData = SuperJSON.stringify(data);
	return { props: { goals } };
};
interface Props {
	goals: (Goal & { User: User })[];
}
function Index({ goals }: Props) {
	// const jsonData = SuperJSON.parse(props.stringData);
	return (
		<>
			<div>Index</div>
			<MyModal ModelForm={<GoalForm />} modalTitle={'Add Goal'} buttonText={'Add Goal'} modalSize={'md'} />
			<GoalTable goals={goals} />
		</>
	);
}
export default Index;
