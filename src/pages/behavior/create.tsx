import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import BehaviorForm from '../../../components/behavior/BehaviorForm';
import { Criteria, Orphan } from '@prisma/client';
import { _Orphan } from '../../../types';
export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.findMany();
	const criteria = await prisma.criteria.findMany();

	orphans.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	return { props: { orphans, criteria } };
};

interface Props {
	orphans: Orphan[];
	criteria: Criteria[];
}

function Create({ orphans, criteria }: Props) {
	const [hydration, setHydration] = useState(false);
	useEffect(() => {
		setHydration(true);
	}, [hydration]);

	if (!hydration || !orphans) return <Loader size={100} />;

	return (
		<>
			<BehaviorForm orphans={orphans} criteria={criteria} />
		</>
	);
}
export default Create;
