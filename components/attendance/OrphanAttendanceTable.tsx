import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import TableComponent from 'components/common/TableComponent';
import { Attendance, OrphanAttendance } from '@prisma/client';

interface Props {
	orphanAttendance: (OrphanAttendance & { Attendance: Pick<Attendance, 'date'> })[];
	actions: boolean;
}

function OrphanAttendanceTable({ orphanAttendance, actions = true }: Props) {
	console.log('🚀 ~ file: OrphanAttendanceTable.tsx:13 ~ OrphanAttendanceTable ~ orphanAttendance:', orphanAttendance);
	const columns = useMemo<MRT_ColumnDef<OrphanAttendance & { Attendance: Pick<Attendance, 'date'> }>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, size: 90 },
			{
				accessorFn: (row) => row.Attendance.date?.toDateString(),
				id: 'Attendance.date',
				header: 'Date',
				maxSize: 100,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => (row.isAttended ? 'yes' : 'no'),
				id: 'isAttended',
				header: 'Is Attended',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.absentReason,
				id: 'absentReason',
				header: 'Absent Reason',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.notes,
				id: 'notes',
				header: 'Notes',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.justification,
				id: 'justification',
				header: 'Justification',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.returnDay?.toDateString(),
				id: 'returnDay',
				header: 'ReturnDay',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={orphanAttendance}
			columns={actions ? columns.filter((x) => x.id !== 'Attendance.date') : columns}
			deleteUrl={''}
			editUrl={''}
			deleteTitle={''}
			infoUrl={''}
			action={false}
			title='Attendance Table'
		/>
	);
}
export default OrphanAttendanceTable;
