import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Criteria, User } from '@prisma/client';
import MyModal from '../../../components/common/MyModal';
import CriteriaTable from '../../../components/criteria/CriteriaTable';
import CriteriaForm from '../../../components/criteria/CriteriaForm';

// ******************************** CRITERIA PAGE ********************************
// * get Goal from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const criteria = await prisma.criteria.findMany({
		include: { User: { select: { name: true, id: true } } },

		orderBy: { id: 'asc' },
	});
	if (!criteria) return { notFound: true };
	criteria.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	return { props: { criteria } };
};
interface Props {
	criteria: (Criteria & { User: User })[];
}
function Index({ criteria }: Props) {
	console.log('🚀 ~ file: index.tsx:25 ~ Index ~ criteria:', criteria);
	return (
		<>
			<div>Index</div>
			<MyModal ModelForm={<CriteriaForm />} modalTitle={'Add Criterion'} buttonText={'Add Criterion'} modalSize={'md'} />
			<CriteriaTable criteria={criteria} />
		</>
	);
}
export default Index;
