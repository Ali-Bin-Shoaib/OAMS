import { Select } from '@mantine/core';
import { Attendance, Orphan, OrphanAttendance, User } from '@prisma/client';
import AttendanceTable from 'components/attendance/AttendanceTable';
import TableComponent from 'components/common/TableComponent';
import prisma from 'lib/prisma';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useState } from 'react';
import SuperJSON from 'superjson';
import { $enum } from 'ts-enum-util';
import { AttendanceReportType, _Attendance } from 'types';

export const getStaticProps: GetStaticProps = async () => {
	try {
		const attendances = await prisma.attendance.findMany({
			include: { OrphanAttendance: true, User: { select: { id: true, name: true } } },
		});
		const orphans = await prisma.orphan.findMany({ select: { id: true, name: true } });
		const data = { attendances, orphans };
		const jsonData = SuperJSON.stringify(data);
		console.log('🚀 ~ file: index.tsx:12 ~ constgetStaticProps:GetStaticProps= ~ data:', data);
		return { props: { jsonData } };
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:14 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
		return { props: {} };
	}
};
interface JsonDataProps {
	attendances: Attendance & { OrphanAttendance: OrphanAttendance[]; User: Pick<User, 'id' | 'name'> }[];
	orphans: Pick<Orphan, 'id' | 'name'>[];
}
interface Props {
	jsonData: string;
}
function AttendanceReportIndex({ jsonData }: Props) {
	const { attendances, orphans }: JsonDataProps = SuperJSON.parse<JsonDataProps>(jsonData);
	const [period, setPeriod] = useState(AttendanceReportType.Weekly);
	const [selectedOrphan, setSelectedOrphan] = useState<string>();
	const [filteredAttendance, setFilteredAttendance] = useState<
		//  (Attendance & { OrphanAttendance: OrphanAttendance, User: Pick<User, 'id' | 'name'> })[];
		Attendance & { OrphanAttendance: OrphanAttendance[]; User: Pick<User, 'id' | 'name'> }[]
	>(filterAttendance(AttendanceReportType.Weekly, attendances));

	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<div className='flex flex-wrap justify-center p-3'>
					<Select
						label='Orphans'
						description='select orphan to show his attendance'
						// width={'35%'}
						m={5}
						searchable
						data={orphans.map((orphan) => ({ label: orphan.name, value: orphan.id.toString() }))}
						onChange={(e) => {
							console.log('e', e);
						}}
					/>
					<Select
						label='Type'
						description='select report type'
						// width={'35%'}
						m={5}
						data={$enum(AttendanceReportType).map((x) => x)}
						value={period}
						onChange={(e) => {
							$enum(AttendanceReportType).map((x) => {
								if (x === e) {
									setPeriod(x);
									return;
								}
							});
						}}
					/>
				</div>
				<AttendanceTable attendance={attendances as unknown as _Attendance[]} action={false} />
			</div>
		</>
	);
}
export default AttendanceReportIndex;
const filterAttendance = (
	type: AttendanceReportType,
	attendances: Attendance & { OrphanAttendance: OrphanAttendance[]; User: Pick<User, 'id' | 'name'> }[]
) => {
	console.log('🚀 ~ file: index.tsx:75 ~ filterAttendance ~ type:', type);
	const currentDate = new Date();
	console.log('🚀 ~ file: index.tsx:65 ~ AttendanceReportIndex ~ currentDate:', currentDate);
	switch (type) {
		case AttendanceReportType.Weekly:
			{
				currentDate.getMonth();
				console.log('🚀 ~ file: index.tsx:81 ~ filterAttendance ~ currentDate.getMonth():', currentDate.getMonth());
			}
			break;
		case AttendanceReportType.Quarterly:
			{
			}
			break;
		case AttendanceReportType.Monthly:
			{
			}
			break;

		default:
			console.log('default');
			break;
	}
	return attendances;
};
