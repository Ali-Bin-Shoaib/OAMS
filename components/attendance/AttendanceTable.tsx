import { Attendance, Orphan, OrphanAttendance, Prisma } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../types/types';

interface Props {
	attendance: _Attendance[];
}

function AttendanceTable({ attendance }: Props) {
	console.log('🚀 ~ file: ~ AttendanceTable');

	console.log('🚀 ~ file: AttendanceTable.tsx:12 ~ AttendanceTable ~ attendance:', attendance);
	const columns = useMemo<MRT_ColumnDef<_Attendance>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, size: 90 },
			{
				accessorFn: (row) => row.date.toDateString(),
				id: 'date',
				header: 'date',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User.name',
				header: 'taken by',
				maxSize: 300,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.OrphanAttendance.length,
				id: 'OrphanAttendance.length',
				header: 'attended orphans',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={attendance}
				initialState={{ density: 'xs' }}
				// mantineTableBodyRowProps={(row) => ({
				// 	onClick: () => {
				// 	},
				// })}
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableColumnResizing
				columnResizeMode='onEnd'
			/>
		</Container>
	);
}
export default AttendanceTable;
