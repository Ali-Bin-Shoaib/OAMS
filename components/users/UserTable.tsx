import { useMemo, useRef } from 'react';
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { _Guardian, _Orphan, _User } from '../../types';
import PrintButton from 'components/common/PrintButton';
import { Button, Tooltip } from '@mantine/core';
import { IconEdit, IconInfoCircle } from '@tabler/icons-react';
import DeleteModal from 'components/common/DeleteModal';
import router from 'next/router';
import { serverLink } from 'shared/links';
import TableComponent from 'components/common/TableComponent';

interface Props {
	users: _User[];
	updateCard(user: _User): void;
}

function UserTable({ users: data, updateCard }: Props) {
	console.log('🚀 ~ file: UserTable.tsx');
	const columns = useMemo<MRT_ColumnDef<_User>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: '#', maxSize: 100, minSize: 80, size: 80, enableResizing: true },
			{
				accessorFn: (row) => row.name,
				id: 'name',
				header: ' الاسم الكامل',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.gender,
				id: 'gender',
				header: 'الجنس',
				maxSize: 90,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.username,
				id: 'userName',
				header: 'اسم المستخدم',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.password,
				id: 'password',
				header: 'كلمة المرور',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.email,
				id: 'email',
				header: 'البريد الإلكتروني',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.address,
				id: 'address',
				header: 'العنوان',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.phone,
				id: 'phone',
				header: 'رقم الجوال',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.type,
				id: 'type',
				header: 'نوع المستخدم',
				maxSize: 120,
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
			editUrl={'users/action/'}
			deleteTitle={'المستخدم'}
			infoUrl={'users/action/'}
		/>
	);
}
export default UserTable;
