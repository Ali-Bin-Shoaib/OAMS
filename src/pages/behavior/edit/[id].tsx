import { GetServerSideProps, GetStaticProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../../lib/prisma';
import { useState, useEffect } from 'react';
import { Behavior, _Attendance, _Orphan, _OrphanAttendance } from '../../../../types';
import { Loader } from '@mantine/core';
import { Criteria, Orphan } from '@prisma/client';
import BehaviorForm from '../../../../components/behavior/BehaviorForm';
import { useDocumentTitle } from '@mantine/hooks';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const behaviorId = Number(params?.id);
	const behavior = await prisma.behaviorInfo.findFirst({
		where: { id: behaviorId },
		include: { BehaviorCriteria: { include: { Criteria: true }, orderBy: { id: 'asc' } }, User: true },
	});
	const orphans = await prisma.orphan.findMany();
	const criteria = await prisma.criteria.findMany();
	const data = { orphans, behavior, criteria };
	const stringData = SuperJSON.stringify(data);
	if (!behavior) {
		return { notFound: true };
	}
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Edit({ stringData }: Props) {
	const jsonData: { behavior: Behavior; orphans: Orphan[]; criteria: Criteria[] } = SuperJSON.parse(stringData);
	const { behavior, orphans, criteria } = jsonData;

	const [hydration, setHydration] = useState(false);
	const test = useDocumentTitle(title);
	console.log('🚀 ~ file: [id].tsx:38 ~ Edit ~ test:', test);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<BehaviorForm orphans={orphans} behavior={behavior} criteria={criteria} />
		</>
	);
}
export default Edit;
