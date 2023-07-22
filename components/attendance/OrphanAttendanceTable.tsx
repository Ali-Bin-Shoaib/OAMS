import { Attendance, Orphan, OrphanAttendance, Prisma } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../types';

interface Props {
	orphanAttendance: _OrphanAttendance[];
}

function OrphanAttendanceTable({ orphanAttendance }: Props) {
	console.log(
		'🚀 ~ file: OrphanAttendanceTable.tsx:12 ~ OrphanAttendanceTable ~ orphanAttendance:',
		orphanAttendance[0]
	);
	const columns = useMemo<MRT_ColumnDef<_OrphanAttendance>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, size: 90 },
			{
				accessorFn: (row) => row.orphanId,
				id: 'Orphan.name',
				header: 'Orphan Name',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},

			{
				accessorFn: (row) => (row.isAttended ? 'yes' : 'no'),
				id: 'isAttended',
				header: 'isAttended',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.absentReason,
				id: 'absentReason',
				header: 'absentReason',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.notes,
				id: 'notes',
				header: 'notes',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.justification,
				id: 'justification',
				header: 'justification',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.returnDay?.toDateString(),
				id: 'returnDay',
				header: 'returnDay',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={orphanAttendance}
				initialState={{ density: 'xs' }}
				mantineTableBodyCellProps={{ sx: { border: '2px solid #dee2e6' } }}
				mantineTableBodyRowProps={{ sx: { border: '2px solid #dee2e6' } }}
				mantineTableBodyProps={{ sx: { border: '2px solid #dee2e6' } }}
				enableColumnResizing
				// columnResizeMode='onEnd'
			/>
		</Container>
	);
}
export default OrphanAttendanceTable;
