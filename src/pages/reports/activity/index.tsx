import { Badge, Center, Select } from '@mantine/core';
import { ActivityExecutionInfo, ActivityInfo, Orphan, OrphanActivityExecution } from '@prisma/client';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import SuperJSON from 'superjson';
import { $enum } from 'ts-enum-util';
import { ReportType, _ActivityExecutionInfo, _Attendance, _OrphanAttendance } from 'types';
import { filterExecutions, filterOrphanExecutions } from './service';
import ActivityExecutionTable from 'components/activityExecution/ActivityExecutionTable';
export const getStaticProps: GetStaticProps = async () => {
	try {
		const executions = await prisma.activityExecutionInfo.findMany({
			include: { OrphanActivityExecution: true },
		});
		console.log('🚀 ~ file: index.tsx:16 ~ constgetStaticProps:GetStaticProps= ~ executions:', executions.length);
		const orphans = await prisma.orphan.findMany({ select: { id: true, name: true } });
		const activities = await prisma.activityInfo.findMany({ select: { id: true, title: true } });
		const data = { executions, orphans, activities };
		const jsonData = SuperJSON.stringify(data);

		return { props: { jsonData } };
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:14 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
		return { props: {} };
	}
};
interface JsonDataProps {
	executions: (ActivityExecutionInfo & { OrphanActivityExecution: OrphanActivityExecution[] })[];
	activities: Pick<ActivityInfo, 'id' | 'title'>[];
	orphans: Pick<Orphan, 'id' | 'name'>[];
}
interface Props {
	jsonData: string;
}
function ActivityReportIndex({ jsonData }: Props) {
	const { executions, orphans, activities }: JsonDataProps = SuperJSON.parse<JsonDataProps>(jsonData);
	console.log('🚀 ~ file: index.tsx:41 ~ ActivityReportIndex ~ executions:', executions.length);
	const [hydrated, setHydrated] = useState(false);
	const [period, setPeriod] = useState<ReportType>(ReportType.Weekly);
	const [selectedOrphan, setSelectedOrphan] = useState<(typeof orphans)[0]>();
	const [orphanExecutions, setOrphanExecutions] = useState<OrphanActivityExecution[]>();
	const [filteredExecutions, setFilteredExecutions] = useState<JsonDataProps['executions']>(
		filterExecutions(period, executions)
	);
	console.log('🚀 ~ file: index.tsx:42 ~ AttendanceReportIndex ~ filteredAttendance:', filteredExecutions.length);
	useEffect(() => {
		selectedOrphan
			? setOrphanExecutions(filterOrphanExecutions(period, executions, selectedOrphan.id))
			: setOrphanExecutions(undefined);
		setHydrated(true);
	}, [period, selectedOrphan]);
	if (!hydrated) return;
	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<div className='flex flex-wrap justify-center p-3'>
					<Select
						label='Activity'
						description='select an Activity to show its executions'
						clearable
						m={5}
						searchable
						data={activities.map((x) => ({ label: x.title!, value: x.id.toString() }))}
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
									// if (selectedOrphan) setOrphanAttendance(filterOrphanAttendance(x, activities, selectedOrphan.id));
									setPeriod(x);
									setFilteredExecutions(filterExecutions(x, executions));
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

					<ActivityExecutionTable activitiesExecutions={filteredExecutions as unknown as _ActivityExecutionInfo[]} />
				</div>
			</div>
		</>
	);
}
export default ActivityReportIndex;
