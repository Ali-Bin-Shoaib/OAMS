import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import prisma from '../../../../lib/prisma';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { _Orphan } from '../../../../types';
import OrphanForm from 'components/orphans/OrphanForm';
import { Guardian, Orphan, User } from '@prisma/client';
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	console.log('🚀 ~ file: [id].tsx:8 ~ constgetServerSideProps:GetServerSideProps= ~ context:', context.params);
	const guardians = await prisma.guardian.findMany({ select: { user: { select: { id: true, name: true } } } });
	console.log('🚀 ~ file: [id].tsx:11 ~ constgetServerSideProps:GetServerSideProps= ~ guardians:', guardians.length);
	if (!context.params) return { notFound: true };
	if (isNaN(Number(context.params.id))) {
		const data = { guardians };
		return { props: data };
	}
	if (!isNaN(Number(context.params.id)))
		try {
			const orphan = await prisma.orphan.findUnique({
				where: {
					id: Number(context.params.id),
				},
				include: { Guardian: { include: { user: { select: { id: true, name: true } } } } },
			});
			const data = { orphan, guardians };
			return orphan ? { props: data } : { notFound: true };
		} catch (error) {
			console.log('🚀 ~ file: [id].tsx:21 ~ constgetServerSideProps:GetServerSideProps= ~ error:', error);
			return { notFound: true };
		}
	return { notFound: true };

	// return { props: { guardians } };
};

interface Props {
	orphan: Orphan & {
		Guardian: Guardian & {
			user: Pick<User, 'id' | 'name'>;
		};
	};
	guardians: { user: Pick<User, 'id' | 'name'> }[];
}

function Action({ orphan, guardians }: Props) {
	const [hydration, setHydration] = useState(false);
	useEffect(() => {
		setHydration(true);
	}, [hydration]);

	if (!hydration) return <Loader size={100} />;

	return (
		<>
			<OrphanForm orphan={orphan as unknown as _Orphan} guardians={guardians} />
		</>
	);
}
export default Action;
