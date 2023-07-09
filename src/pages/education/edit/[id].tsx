import { GetServerSideProps, GetStaticProps } from 'next';
import SuperJSON from 'superjson';
import prisma from '../../../../lib/prisma';
import { useState, useEffect } from 'react';
import { Education, _Attendance, _Orphan, _OrphanAttendance } from '../../../../types';
import { Loader } from '@mantine/core';
import { Orphan } from '@prisma/client';
import EducationForm from '../../../../components/education/EducationForm';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const educationId = Number(params?.id);
	const education = await prisma.educationInfo.findFirst({
		where: { id: educationId },
		include: { Orphan: true, User: true },
		orderBy: { id: 'asc' },
	});
	const orphans = await prisma.orphan.findMany();
	const data = { orphans, education };
	const stringData = SuperJSON.stringify(data);
	if (!education) {
		return { notFound: true };
	}
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Edit({ stringData }: Props) {
	const jsonData: { education: Education; orphans: Orphan[] } = SuperJSON.parse(stringData);
	const { education, orphans } = jsonData;

	const [hydration, setHydration] = useState(false);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<EducationForm orphans={orphans} education={education} />
		</>
	);
}
export default Edit;
