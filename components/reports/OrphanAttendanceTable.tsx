import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { _Guardian } from '../../types';
import { useRouter } from 'next/router';
import TableComponent from 'components/common/TableComponent';

interface Props {
	guardians: _Guardian[];
}
function OrphanAttendanceTable({ guardians: data }: Props) {
	const columns = useMemo<MRT_ColumnDef<_Guardian>[]>(
		() => [
			{
				accessorFn: (row) => row.userId,
				id: 'id',
				header: 'ID',
				minSize: 80,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.name,
				id: 'name',
				header: 'Name',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.gender,
				id: 'gender',
				header: 'Gender',
				minSize: 80,
				size: 110,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.username,
				id: 'username',
				header: 'Username',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.password,
				id: 'password',
				header: 'Password',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.email,
				id: 'email',
				header: 'Email',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.address,
				id: 'address',
				header: 'Address',
				minSize: 80,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.phone,
				id: 'phone',
				header: 'Phone',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.relationship,
				id: 'relationship',
				header: 'Relationship',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={data}
			columns={columns}
			deleteUrl={'api/attendance/'}
			editUrl={'attendance/edit/'}
			deleteTitle={'Attendance'}
			infoUrl={'attendance/'}
		/>
	);
}
export default OrphanAttendanceTable;
