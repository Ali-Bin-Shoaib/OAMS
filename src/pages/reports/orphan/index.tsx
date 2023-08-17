import { Badge, Center, Select } from '@mantine/core';
import { Attendance, Orphan, OrphanAttendance, User } from '@prisma/client';
import AttendanceTable from 'components/attendance/AttendanceTable';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import SuperJSON from 'superjson';
import { $enum } from 'ts-enum-util';
import { ReportType, _Attendance, _Orphan, _OrphanAttendance } from 'types';
import OrphansTable from 'components/orphans/OrphansTable';
export const getStaticProps: GetStaticProps = async () => {
	try {
		const orphans = await prisma.orphan.findMany();
		const data = { orphans };
		const jsonData = SuperJSON.stringify(data);

		return { props: { jsonData } };
	} catch (error) {
		return { props: {} };
	}
};
interface JsonDataProps {
	orphans: Orphan[];
}
interface Props {
	jsonData: string;
}
function OrphanReportIndex({ jsonData }: Props) {
	const { orphans }: JsonDataProps = SuperJSON.parse<JsonDataProps>(jsonData);

	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) return;
	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<div className=' p-1'>
					<Center>
						<Badge size='xl' color='dark'>
							{new Date().toDateString()}
						</Badge>
					</Center>
				</div>
				<OrphansTable orphans={orphans} />
			</div>
		</>
	);
}
export default OrphanReportIndex;
