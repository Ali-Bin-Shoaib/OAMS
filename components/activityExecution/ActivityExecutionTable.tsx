import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { _ActivityExecutionInfo, _ActivityInfo, _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import TableComponent from 'components/common/TableComponent';

interface Props {
	activitiesExecutions: _ActivityExecutionInfo[];
	action?: boolean;
}

function ActivityExecutionTable({ activitiesExecutions, action = true }: Props) {
	console.log('🚀 ~ file: ~ ActivityExecutionTable');
	const columns = useMemo<MRT_ColumnDef<_ActivityExecutionInfo>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 60, size: 50 },
			{
				accessorFn: (row) => row.ActivityInfo?.title,
				id: 'title',
				header: 'title',
				maxSize: 100,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.startDate?.toDateString(),
				id: 'date',
				header: 'date',
				maxSize: 110,
				size: 80,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Executor?.name,
				id: 'Executer',
				header: 'Executer',
				maxSize: 100,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.cost,
				id: 'Cost',
				header: 'Cost',
				maxSize: 70,
				size: 70,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row?.OrphanActivityExecution?.filter((x) => x.isAttended).length,
				id: 'Attended Orphans',
				header: 'Attended Orphans',
				maxSize: 100,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.activityEvaluation?.toFixed(2),
				id: 'Evaluation',
				header: 'Evaluation',
				maxSize: 110,
				size: 80,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={activitiesExecutions}
			columns={columns}
			deleteUrl={`api/execute/`}
			editUrl={`activities/execute/edit/`}
			deleteTitle={'Execution'}
			infoUrl={`activities/execute/`}
			action={action}
		/>
	);
}
export default ActivityExecutionTable;
