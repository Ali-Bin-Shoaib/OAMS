import { Badge, Center, Select } from '@mantine/core';
import { Attendance, Orphan, OrphanAttendance, User } from '@prisma/client';
import AttendanceTable from 'components/attendance/AttendanceTable';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import SuperJSON from 'superjson';
import { $enum } from 'ts-enum-util';
import { ReportType, _Attendance, _OrphanAttendance } from 'types';
import { filterAttendance, filterOrphanAttendance } from './service';
import OrphanAttendanceTable from 'components/attendance/OrphanAttendanceTable';
export const getStaticProps: GetStaticProps = async () => {
	try {
		const attendances = await prisma.attendance.findMany({
			include: {
				OrphanAttendance: { orderBy: { Attendance: { date: 'asc' } } },
				User: { select: { id: true, name: true } },
			},
			orderBy: { id: 'asc' },
		});
		const orphans = await prisma.orphan.findMany({ select: { id: true, name: true } });
		const data = { attendances, orphans };
		const jsonData = SuperJSON.stringify(data);

		return { props: { jsonData } };
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:14 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
		return { props: {} };
	}
};
interface JsonDataProps {
	attendances: (Attendance & { OrphanAttendance: OrphanAttendance[]; User: Pick<User, 'id' | 'name'> })[];
	orphans: Pick<Orphan, 'id' | 'name'>[];
}
interface Props {
	jsonData: string;
}
function AttendanceReportIndex({ jsonData }: Props) {
	const { attendances, orphans }: JsonDataProps = SuperJSON.parse<JsonDataProps>(jsonData);

	const [hydrated, setHydrated] = useState(false);
	const [period, setPeriod] = useState<ReportType>(ReportType.Weekly);
	const [selectedOrphan, setSelectedOrphan] = useState<(typeof orphans)[0]>();
	console.log('🚀 ~ file: index.tsx:42 ~ AttendanceReportIndex ~ selectedOrphan:', selectedOrphan);
	const [orphanAttendance, setOrphanAttendance] = useState<OrphanAttendance[]>();
	const [filteredAttendance, setFilteredAttendance] = useState<JsonDataProps['attendances']>(
		filterAttendance(period, attendances)
	);
	console.log('🚀 ~ file: index.tsx:42 ~ AttendanceReportIndex ~ filteredAttendance:', filteredAttendance.length);
	useEffect(() => {
		selectedOrphan
			? setOrphanAttendance(filterOrphanAttendance(period, attendances, selectedOrphan.id))
			: setOrphanAttendance(undefined);
		setHydrated(true);
	}, [period, selectedOrphan]);
	if (!hydrated) return;
	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<div className='flex flex-wrap justify-center p-3'>
					<Select
						label='Orphans'
						description='select orphan to show his attendance'
						clearable
						m={5}
						searchable
						data={orphans.map((orphan) => ({ label: orphan.name, value: orphan.id.toString() }))}
						onChange={(e) => {
							if (!e) setSelectedOrphan(undefined);
							const orphan = orphans.filter((x) => x.id === Number(e))[0];
							setSelectedOrphan(orphan);
						}}
					/>
					<Select
						label='Type'
						description='select report type'
						// width={'35%'}
						m={5}
						data={$enum(ReportType).map((x) => x)}
						value={period}
						onChange={(e) => {
							$enum(ReportType).map((x) => {
								if (x === e) {
									// if (selectedOrphan) setOrphanAttendance(filterOrphanAttendance(x, attendances, selectedOrphan.id));
									setPeriod(x);
									setFilteredAttendance(filterAttendance(x, attendances));
									return;
								}
							});
						}}
					/>
				</div>
				<div>
					<div className=' p-1'>
						<Center>
							<Badge size='xl' color='dark'>
								{new Date().toDateString()}
							</Badge>
						</Center>
					</div>

					{orphanAttendance ? (
						<OrphanAttendanceTable orphanAttendance={orphanAttendance as unknown as _OrphanAttendance[]} />
					) : (
						<AttendanceTable attendance={filteredAttendance as unknown as _Attendance[]} action={false} />
					)}
				</div>
			</div>
		</>
	);
}
export default AttendanceReportIndex;
