import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import prisma from '../../../../lib/prisma';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { _Orphan, _UserWithGuardianAndSponsor } from '../../../../types';
import { User } from '@prisma/client';
import UserForm from 'components/users/UserForm';
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	console.log('🚀 ~ file: [id].tsx:8 ~ constgetServerSideProps:GetServerSideProps= ~ context:', context.params);
	if (!context.params) return { notFound: true };
	if (context.params.id === 'create') {
		return { props: {} };
	}
	if (!isNaN(Number(context.params.id)))
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: Number(context.params.id),
				},
			});
			console.log('🚀 ~ file: [id].tsx:22 ~ constgetServerSideProps:GetServerSideProps= ~ user:', user);
			const data = { user };
			return user ? { props: data } : { notFound: true };
		} catch (error) {
			console.log('🚀 ~ file: [id].tsx:21 ~ constgetServerSideProps:GetServerSideProps= ~ error:', error);
			return { notFound: true };
		}
	return { notFound: true };
};

interface Props {
	user: User;
}

function Action({ user }: Props) {
	const [hydration, setHydration] = useState(false);
	useEffect(() => {
		setHydration(true);
	}, [hydration]);

	if (!hydration) return <Loader size={100} />;

	return (
		<>
			<UserForm bigUser={user as _UserWithGuardianAndSponsor} />
		</>
	);
}
export default Action;
