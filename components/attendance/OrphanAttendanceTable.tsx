import { Attendance, Orphan, OrphanAttendance, Prisma } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import TableComponent from 'components/common/TableComponent';

interface Props {
	orphanAttendance: _OrphanAttendance[];
}

function OrphanAttendanceTable({ orphanAttendance }: Props) {
	const columns = useMemo<MRT_ColumnDef<_OrphanAttendance>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, size: 90 },
			// {
			// 	accessorFn: (row) => row.orphanId,
			// 	id: 'Orphan.name',
			// 	header: 'Orphan Name',
			// 	maxSize: 300,
			// 	size: 200,
			// 	enableResizing: true,
			// },

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
			columns={columns}
			deleteUrl={''}
			editUrl={''}
			deleteTitle={''}
			infoUrl={''}
			action={false}
		/>
	);
}
export default OrphanAttendanceTable;
