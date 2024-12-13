import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { _Guardian } from '../../types';
import { useRouter } from 'next/router';
import TableComponent from 'components/common/TableComponent';

interface Props {
	guardians: _Guardian[];
}
function GuardianTable({ guardians: data }: Props) {
	const columns = useMemo<MRT_ColumnDef<_Guardian>[]>(
		() => [
			{
				accessorFn: (row) => row.userId,
				id: 'id',
				header: '#',
				minSize: 80,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.name,
				id: 'name',
				header: 'الاسم',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.gender,
				id: 'gender',
				header: 'الجنس',
				minSize: 80,
				size: 110,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.username,
				id: 'username',
				header: 'اسم المستخدم',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.password,
				id: 'password',
				header: 'كلمة المرور',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.email,
				id: 'email',
				header: 'البريد الإلكتروني',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.address,
				id: 'address',
				header: 'العنوان',
				minSize: 80,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.phone,
				id: 'phone',
				header: 'الهاتف',
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.relationship,
				id: 'relationship',
				header: 'العلاقة',
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
			deleteUrl={'api/user/'}
			editUrl={'guardians/action/'}
			deleteTitle={'الوصي'}
			infoUrl={'guardians/action/'}
		/>
	);
}
export default GuardianTable;
