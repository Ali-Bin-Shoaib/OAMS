import { GetServerSideProps, GetStaticProps } from 'next';
import SuperJSON from 'superjson';
import AttendanceForm from '../../../components/attendance/AttendanceForm';
import prisma from '../../../lib/prisma';
import { useState, useEffect } from 'react';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../../types';
import { Loader } from '@mantine/core';
import AppHead from '../../../components/common/AppHead';
import { Attendance, Orphan, OrphanAttendance, User } from '@prisma/client';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	const attendance = await prisma.attendance.findFirst({
		where: { id: id },
		include: { OrphanAttendance: { include: { Orphan: true }, orderBy: { isAttended: 'asc' } }, User: true },
	});
	const orphans = await prisma.orphan.findMany();
	const stringData = SuperJSON.stringify({ orphans, attendance });
	if (!attendance) {
		return { notFound: true };
	}
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}
function Edit({ stringData }: Props) {
	const jsonData: {
		attendance:
			| (Attendance & {
					User: User;
					OrphanAttendance: (OrphanAttendance & {
						Orphan: Orphan;
					})[];
			  })
			| null;
		orphans: Orphan[];
	} = SuperJSON.parse(stringData);
	const { attendance, orphans } = jsonData;

	const [hydration, setHydration] = useState(false);
	const title = usePageTitle();
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<AppHead title={title} />
			<AttendanceForm orphans={orphans as unknown as _Orphan[]} attendance={attendance as unknown as _Attendance} />
		</>
	);
}
export default Edit;
