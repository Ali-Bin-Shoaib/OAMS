import { Badge, Center, Select } from '@mantine/core';
import {
	ActivityExecutionInfo,
	ActivityInfo,
	Goal,
	GoalEvaluation,
	Grade,
	Orphan,
	OrphanActivityExecution,
	User,
} from '@prisma/client';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import SuperJSON from 'superjson';
import { $enum } from 'ts-enum-util';
import { ReportType, _ActivityExecutionInfo, _Attendance, _OrphanAttendance } from 'types';
import {
	filterExecutionsByLevel,
	filterExecutionsByOrphanId,
	filterExecutionsByType,
	filterOrphanExecutions,
} from '../../../../utils/activity/service';
import ActivityExecutionTable from 'components/activityExecution/ActivityExecutionTable';
import OrphanActivityExecutionTable from 'components/activityExecution/OrphanActivityExecutionTable';
export const getStaticProps: GetStaticProps = async () => {
	try {
		const executions = await prisma.activityExecutionInfo.findMany({
			include: {
				OrphanActivityExecution: true,
				ActivityInfo: true,
				GoalEvaluation: true,
				Executor: { select: { id: true, name: true } },
			},
			orderBy: { startDate: 'asc' },
		});
		const activities = await prisma.activityInfo.findMany({ select: { id: true, title: true, target: true } });
		const orphans = await prisma.orphan.findMany({ select: { id: true, name: true } });
		const data = { executions, orphans, activities };
		const jsonData = SuperJSON.stringify(data);

		return { props: { jsonData } };
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:14 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
		return { props: {} };
	}
};
interface JsonDataProps {
	executions: (ActivityExecutionInfo & {
		ActivityInfo: ActivityInfo;
		Executer: Pick<User, 'id' | 'name'>;
		GoalEvaluation: (GoalEvaluation & { Goal: Goal })[];
		OrphanActivityExecution: OrphanActivityExecution[];
	})[];
	orphans: Pick<Orphan, 'id' | 'name'>[];
	activities: Pick<ActivityInfo, 'id' | 'title' | 'target'>[];
}
interface Props {
	jsonData: string;
}
interface OrphanExecutionInfo {
	id: number;
	title: string;
	startDate: Date;
	evaluation: number;
	isAttended: boolean;
}

function ActivityReportIndex({ jsonData }: Props) {
	const { executions, orphans, activities }: JsonDataProps = SuperJSON.parse<JsonDataProps>(jsonData);
	const [hydrated, setHydrated] = useState(false);
	const [type, setType] = useState<ReportType | null>(null);
	const [selectedOrphan, setSelectedOrphan] = useState<number | null>(null);
	const [selectedLevel, setSelectedLevel] = useState<Grade | null>(null);
	const [orphanExecutions, setOrphanExecutions] = useState<OrphanExecutionInfo[]>();
	const [filteredExecutions, setFilteredExecutions] = useState<JsonDataProps['executions']>(executions);
	const handleChange = useCallback(() => {
		console.log('🚀 type:', type);
		console.log('🚀 orphanId:', selectedOrphan);
		console.log('🚀 activityId:', selectedLevel);
		if (type && selectedLevel && selectedOrphan) {
			setFilteredExecutions(
				filterExecutionsByOrphanId(
					filterExecutionsByLevel(filterExecutionsByType(type, executions), selectedLevel),
					selectedOrphan
				)
			);
		} else if (type && selectedLevel) {
			setFilteredExecutions(filterExecutionsByLevel(filterExecutionsByType(type, executions), selectedLevel));
		} else if (type && selectedOrphan) {
			setFilteredExecutions(filterExecutionsByOrphanId(filterExecutionsByType(type, executions), selectedOrphan));
		} else if (selectedLevel && selectedOrphan) {
			setFilteredExecutions(
				filterExecutionsByOrphanId(filterExecutionsByLevel(executions, selectedLevel), selectedOrphan)
			);
		} else if (selectedLevel) {
			setFilteredExecutions(filterExecutionsByLevel(executions, selectedLevel));
		} else if (selectedOrphan) {
			setFilteredExecutions(filterExecutionsByOrphanId(executions, selectedOrphan));
		} else if (type) {
			setFilteredExecutions(filterExecutionsByType(type, executions));
		} else {
			setFilteredExecutions(executions);
		}
	}, [executions, selectedLevel, selectedOrphan, type]);

	const updateOrphanExecution = useCallback(() => {
		console.log('🚀 ~  updateOrphanExecution ~ filteredExecutions:', filteredExecutions.length);
		selectedOrphan && setOrphanExecutions(filterOrphanExecutions(filteredExecutions, selectedOrphan));
	}, [filteredExecutions, selectedOrphan]);
	useEffect(() => {
		console.log('+++++++++++++++++++++++++use effect runs');
		!selectedOrphan && setOrphanExecutions(undefined);
		handleChange();
		updateOrphanExecution();
		console.log('🚀 ~  filteredExecutions:', filteredExecutions.length);
		console.log('🚀 ~  orphanExecution:', orphanExecutions?.length);
		setHydrated(true);
	}, [filteredExecutions.length, orphanExecutions?.length, selectedLevel, selectedOrphan, type]);
	if (!hydrated) return;
	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<div className='flex flex-wrap justify-center p-3'>
					<Select
						label='Level'
						description='select education level'
						clearable
						m={5}
						searchable
						data={$enum(Grade).map((x) => x)}
						onChange={(e) => {
							e ? setSelectedLevel(e as Grade) : setSelectedLevel(null);
						}}
					/>
					<Select
						label='Orphans'
						description='select orphan to show his activity executions'
						clearable
						m={5}
						searchable
						data={orphans.map((x) => ({ label: x.name, value: x.id.toString() }))}
						onChange={(e) => {
							e ? setSelectedOrphan(orphans.filter((x) => x.id === Number(e))[0].id) : setSelectedOrphan(null);
						}}
					/>
					<Select
						label='Type'
						description='select report type'
						clearable
						m={5}
						data={$enum(ReportType).map((x) => x)}
						value={type}
						onChange={(e) => {
							e ? setType(e as ReportType) : setType(null);
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
					{orphanExecutions ? (
						<OrphanActivityExecutionTable orphanActivityExecution={orphanExecutions} />
					) : (
						<ActivityExecutionTable
							action={false}
							activitiesExecutions={filteredExecutions as unknown as _ActivityExecutionInfo[]}
						/>
					)}
				</div>
			</div>
		</>
	);
}
export default ActivityReportIndex;
