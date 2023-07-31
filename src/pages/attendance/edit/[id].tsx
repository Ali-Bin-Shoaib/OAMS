import { GetServerSideProps, GetStaticProps } from 'next';
import SuperJSON from 'superjson';
import AttendanceForm from '../../../../components/attendance/AttendanceForm';
import prisma from '../../../../lib/prisma';
import { useState, useEffect } from 'react';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../../../types';
import { Loader } from '@mantine/core';
import { Attendance, Orphan, OrphanAttendance, User } from '@prisma/client';
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	console.log('🚀 ~ file: [id].tsx:10 ~ constgetServerSideProps:GetServerSideProps= ~ params:', params);
	const id = Number(params?.id);
	const attendance = await prisma.attendance.findFirst({
		where: { id: id },
		include: {
			OrphanAttendance: { include: { Orphan: { select: { id: true, name: true } } }, orderBy: { isAttended: 'asc' } },
			User: { select: { id: true, name: true } },
		},
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
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<AttendanceForm orphans={orphans as unknown as _Orphan[]} attendance={attendance as unknown as _Attendance} />
		</>
	);
}
export default Edit;
