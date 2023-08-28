import { GetServerSideProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../../lib/prisma';
import { useState, useEffect } from 'react';
import { Health } from '../../../../types';
import { Loader } from '@mantine/core';
import { Orphan } from '@prisma/client';
import HealthForm from '../../../../components/health/HealthForm';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	console.log('🚀 ~ file: [id].tsx:10 ~ constgetServerSideProps:GetServerSideProps= ~ params:', params);
	const healthId = Number(params?.id);
	const health = await prisma.healthInfo.findFirst({
		where: { id: healthId },
		include: { Orphan: true, User: true },
		orderBy: { id: 'asc' },
	});
	const orphans = await prisma.orphan.findMany();
	const data = { orphans, health };
	const stringData = SuperJSON.stringify(data);
	if (!health) {
		return { props: {} };
	}
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Edit({ stringData }: Props) {
	const jsonData: { health: Health; orphans: Orphan[] } = SuperJSON.parse(stringData);
	const { health, orphans } = jsonData;

	const [hydration, setHydration] = useState(false);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<HealthForm orphans={orphans} health={health} />
		</>
	);
}
export default Edit;
