import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Criteria, User } from '@prisma/client';
import MyModal from '../../../components/common/MyModal';
import CriteriaTable from '../../../components/criteria/CriteriaTable';
import CriteriaForm from '../../../components/criteria/CriteriaForm';
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';

// ******************************** CRITERIA PAGE ********************************
// * get Goal from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const criteria = await prisma.criteria.findMany({
		include: { User: { select: { name: true, id: true } } },

		orderBy: { id: 'asc' },
	});
	if (!criteria) return { props: {} };
	criteria.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	return { props: { criteria } };
};
interface Props {
	criteria: (Criteria & { User: User })[];
}
function Index({ criteria }: Props) {
	const [hydration, setHydration] = useState(false);

	useEffect(() => {
		setHydration(true);
	}, []);
	if (!hydration) return <Loader />;
	return (
		<>
			<div>Index</div>
			<MyModal ModelForm={<CriteriaForm />} modalTitle={'Add Criterion'} buttonText={'Add Criterion'} modalSize={'md'} />
			<CriteriaTable criteria={criteria} />
		</>
	);
}
export default Index;
