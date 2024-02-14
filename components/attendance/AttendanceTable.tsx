import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import TableComponent from 'components/common/TableComponent';

interface Props {
	attendance: _Attendance[];
	action?: boolean;
}

function AttendanceTable({ attendance, action = true }: Props) {
	console.log('🚀 ~ file: ~ AttendanceTable');
	const columns = useMemo<MRT_ColumnDef<_Attendance>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: '#', maxSize: 100, size: 90 },
			{
				accessorFn: (row) => row.date.toDateString(),
				id: 'date',
				header: 'التاريخ',
				maxSize: 110,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User.name',
				header: 'بواسطة',
				maxSize: 120,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.OrphanAttendance.filter((x) => x.isAttended === false).length,
				id: 'OrphanAttendance.length',
				header: 'عدد الغياب',
				maxSize: 110,
				size: 100,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={attendance}
			columns={columns}
			deleteUrl={'api/attendance/'}
			editUrl={'attendance/edit/'}
			deleteTitle={'Attendance'}
			infoUrl={'attendance/'}
			action={action}
		/>
	);
}
export default AttendanceTable;
