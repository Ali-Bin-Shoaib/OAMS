import { Attendance, Orphan, OrphanAttendance, Prisma } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import { useRouter } from 'next/router';
import { serverLink } from '../../shared/links';

interface Props {
	attendance: _Attendance[];
}

function AttendanceTable({ attendance }: Props) {
	console.log('🚀 ~ file: ~ AttendanceTable');
	const router = useRouter();
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
				header: 'Absent orphans',
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
				mantineTableBodyRowProps={(row) => ({
					onClick: () => {
						// on row click change the card to the clicked attendance and then user can edit or delete.
						router.push(serverLink + 'attendance/' + row.row.original.id);
					},
				})}
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
