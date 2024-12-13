import { Select } from '@mantine/core';
import {
	Orphan,
	BehaviorInfo,
	BehaviorCriteria,
	EducationInfo,
	OrphanAttendance,
	OrphanActivityExecution,
	HealthInfo,
	User,
	Attendance,
	ActivityExecutionInfo,
	ActivityInfo,
} from '@prisma/client';
import OrphanActivityExecutionTable from 'components/activityExecution/OrphanActivityExecutionTable';
import OrphanAttendanceTable from 'components/attendance/OrphanAttendanceTable';
import BehaviorTable from 'components/behavior/BehaviorTable';
import EducationTable from 'components/education/EducationTable';
import HealthTable from 'components/health/HealthTable';
import OrphansTable from 'components/orphans/OrphansTable';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { useCallback, useState } from 'react';
import { Behavior, Education, Health } from 'types';

export const getStaticProps: GetStaticProps = async () => {
	try {
		const orphans = await prisma.orphan.findMany({
			include: {
				BehaviorInfo: { include: { BehaviorCriteria: true, User: { select: { name: true } } } },
				EducationInfo: true,
				HealthInfo: { include: { User: { select: { name: true } } } },
				OrphanActivityExecution: {
					include: { ActivityExecutionInfo: { select: { startDate: true, ActivityInfo: { select: { title: true } } } } },
				},
				OrphanAttendance: { include: { Attendance: { select: { date: true } } } },
			},
			orderBy: { id: 'asc' },
		});
		const data = { orphans };
		return { props: data };
	} catch (error) {
		return { props: {} };
	}
};
interface Props {
	orphans: (Orphan & {
		BehaviorInfo: BehaviorInfo & { BehaviorCriteria: BehaviorCriteria[]; User: User }[];
		EducationInfo: EducationInfo[];
		OrphanAttendance: (OrphanAttendance & { Attendance: Pick<Attendance, 'date'> })[];
		OrphanActivityExecution: (OrphanActivityExecution & {
			ActivityExecutionInfo: Pick<ActivityExecutionInfo, 'startDate'> & { ActivityInfo: Pick<ActivityInfo, 'title'> };
		})[];
		HealthInfo: (HealthInfo & { User: User })[];
	})[];
}
function ComprehensiveReport({ orphans }: Props) {
	console.log('🚀 ~ file: index.tsx:49 ~ ComprehensiveReport ~ orphans:', orphans);
	const [selectedOrphan, setSelectedOrphan] = useState<number | undefined>(undefined);
	console.log('🚀 ~ file: index.tsx:49 ~ ComprehensiveReport ~ selectedOrphan:', selectedOrphan);
	return (
		<>
			<div className='container mx-auto'>
				<Select
					data={orphans.map((x) => ({ label: x.name, value: x.id.toString() }))}
					onChange={(value) => setSelectedOrphan(value ? Number(value) : undefined)}
					w={'50%'}
					label='الأيتام'
					description='اختر يتيم لعرض بياناته.'
					clearable
				/>
			</div>
			<div className='m-2 py-5'>
				<OrphansTable orphans={selectedOrphan ? orphans.filter((x) => x.id === selectedOrphan) : orphans} />
			</div>
			{selectedOrphan && (
				<>
					<div className='m-2 py-5'>
						<EducationTable
							education={
								selectedOrphan ? (orphans.filter((x) => x.id === selectedOrphan)[0].EducationInfo as Education[]) : []
							}
							action={false}
						/>
					</div>
					<div className='m-2 py-5'>
						<BehaviorTable
							behavior={
								selectedOrphan ? (orphans.filter((x) => x.id === selectedOrphan)[0].BehaviorInfo as unknown as Behavior[]) : []
							}
						/>
					</div>
					<div className='m-2 py-5'>
						<HealthTable
							health={
								selectedOrphan ? (orphans.filter((x) => x.id === selectedOrphan)[0].HealthInfo as unknown as Health[]) : []
							}
							action={false}
						/>
					</div>
					<div className='m-2 py-5'>
						<OrphanAttendanceTable
							orphanAttendance={selectedOrphan ? orphans.filter((x) => x.id === selectedOrphan)[0].OrphanAttendance : []}
							actions={false}
						/>
					</div>
					<div className='m-2 py-5'>
						<OrphanActivityExecutionTable
							orphanActivityExecution={
								selectedOrphan
									? (orphans
											.filter((x) => x.id === selectedOrphan)[0]
											.OrphanActivityExecution.map((x) => {
												const { id, ActivityExecutionInfo, activityExecutionInfoId, evaluation, isAttended, orphanId, userId } = x;
												return {
													id,
													evaluation,
													isAttended,
													startDate: ActivityExecutionInfo.startDate,
													title: ActivityExecutionInfo.ActivityInfo.title,
												};
											}) as { id: number; title: string; startDate: Date; evaluation: number; isAttended: boolean }[])
									: []
							}
						/>
					</div>
				</>
			)}
		</>
	);
}
export default ComprehensiveReport;
