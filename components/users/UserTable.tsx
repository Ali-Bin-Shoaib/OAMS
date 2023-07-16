import { User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Guardian, _Orphan, _User } from '../../types';

interface Props {
	users: _User[];
	updateCard(user: _User): void;
}

function UserTable({ users, updateCard }: Props) {
	const columns = useMemo<MRT_ColumnDef<(typeof users)[0]>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'id', maxSize: 300, minSize: 80, size: 80, enableResizing: true },
			{
				accessorFn: (row) => row.name,
				id: 'name',
				header: 'name',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.gender,
				id: 'gender',
				header: 'gender',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.username,
				id: 'userName',
				header: 'userName',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.password,
				id: 'password',
				header: 'password',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.email,
				id: 'email',
				header: 'email',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.address,
				id: 'address',
				header: 'address',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.phone,
				id: 'phone',
				header: 'phone',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.type,
				id: 'type',
				header: 'type',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={users}
				initialState={{ density: 'xs' }}
				mantineTableBodyRowProps={({ row }) => ({
					onClick: () => {
						updateCard(row.original);
					},
					sx: { border: '2px solid #dee2e6' },
				})}
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				mantineTableHeadCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				mantineTableProps={{
					striped: true,
					sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' },
				}}
				enableColumnResizing
				columnResizeMode='onEnd' //instead of the default "onChange" mode
			/>
		</Container>
	);
}
export default UserTable;
