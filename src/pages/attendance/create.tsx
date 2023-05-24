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
	const stringData = SuperJSON.stringify(orphans);

	const x = SuperJSON.parse<_Orphan[]>(stringData);
	return { props: { stringData } };
};

interface Props {
	stringData: string;
}

function Create({ stringData }: Props) {
	const jsonData: _Orphan[] = SuperJSON.parse(stringData);
	const orphans = jsonData;

	// const [orphanList, setOrphanList] = useState<_Orphan[]>(orphans);
	const [hydration, setHydration] = useState(false);
	const title = usePageTitle();
	useEffect(() => {
		// setOrphanList(SuperJSON.parse(stringData));
		setHydration(true);
	}, [hydration, stringData]);

	if (!hydration || !jsonData) return <Loader size={100} />;

	return (
		<>
			<AppHead title={title} />
			<AttendanceForm orphans={orphans} />
		</>
	);
}
export default Create;
