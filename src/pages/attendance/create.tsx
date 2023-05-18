import { GetStaticProps } from 'next';
import SuperJSON from 'superjson';
import AttendanceForm from '../../../components/attendance/AttendanceForm';
import prisma from '../../../lib/prisma';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../../types/types';
import { Loader } from '@mantine/core';
import AppHead from '../../../components/common/AppHead';
import { Attendance, Orphan, OrphanAttendance } from '@prisma/client';
export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.findMany();
	//* to use generated types from prisma client
	orphans.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	const orphanAttendance = await prisma.orphanAttendance.findMany({ include: { Attendance: true, Orphan: true } });
	const stringData = SuperJSON.stringify({ orphans, orphanAttendance });
	const x = SuperJSON.parse<jsonData>(stringData);
	console.log('🚀 ~ file: create.tsx:20 ~ constgetStaticProps:GetStaticProps= ~ x:', x);
	return { props: { stringData } };
};
type jsonData = { orphans: _Orphan[]; orphanAttendance: _OrphanAttendance[] };
interface Props {
	stringData: string;
}

function Create({ stringData }: Props) {
	const jsonData: jsonData = SuperJSON.parse(stringData);
	const { orphans, orphanAttendance } = jsonData;
	const [orphanList, setOrphanList] = useState<_Orphan[]>(orphans);
	const [hydration, setHydration] = useState(false);
	// const router = useRouter();
	const title = usePageTitle();
	useEffect(() => {
		setOrphanList(SuperJSON.parse(stringData));
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;
	let test: (OrphanAttendance & { Attendance: Attendance | null; Orphan: _Orphan | null })[] = [];

	return (
		<>
			<AppHead title={title} />
			<AttendanceForm orphans={orphans} />
		</>
	);
}
export default Create;
