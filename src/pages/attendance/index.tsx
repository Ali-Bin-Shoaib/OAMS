import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Button, Loader } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Attendance, _Orphan } from '../../../types';
import AttendanceTable from '../../../components/attendance/AttendanceTable';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import { IconPlus } from '@tabler/icons-react';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const attendance = await prisma.attendance.findMany({
		select: { id: true, date: true, User: { select: { id: true, name: true } }, OrphanAttendance: true },
		orderBy: { id: 'asc' },
	});
	const stringJson = SuperJSON.stringify(attendance);
	return { props: { stringJson } };
};

interface Props {
	stringJson: string;
}
export default function Index({ stringJson }: Props) {
	console.log('Attendance Index');
	const attendance = SuperJSON.parse<_Attendance[]>(stringJson);
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringJson]);

	if (!hydration || !attendance) return <Loader size={100} />;
	return (
		<>
			<div className='text-center'>
				<Button size='xl' m={15} onClick={() => router.push(serverLink + 'attendance/create')}>
					<IconPlus />
					Add new Attendance
				</Button>
			</div>
			<AttendanceTable attendance={attendance} />
		</>
	);
}
