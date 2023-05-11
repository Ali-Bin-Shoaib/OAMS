import { Prisma, User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Guardian } from '../../types/types';

interface Props {
	guardians: _Guardian[];
	updateCard(guardian: _Guardian): void;
}

function GuardianTable({ guardians, updateCard }: Props) {
	const columns = useMemo<MRT_ColumnDef<_Guardian>[]>(
		() => [
			{
				accessorFn: (row) => row.userId,
				id: 'id',
				header: 'id',
				maxSize: 300,
				minSize: 80,
				size: 80,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.name,
				id: 'name',
				header: 'name',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.gender,
				id: 'gender',
				header: 'gender',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.userName,
				id: 'userName',
				header: 'userName',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.password,
				id: 'password',
				header: 'password',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.email,
				id: 'email',
				header: 'email',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.address,
				id: 'address',
				header: 'address',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.user.phone,
				id: 'phone',
				header: 'phone',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			// {
			// 	accessorFn: (row) => row.type,
			// 	id: 'type',
			// 	header: 'type',
			// 	maxSize: 300,
			// 	minSize: 80,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			{
				accessorFn: (row) => row.relationship,
				id: 'relationship',
				header: 'relationship',
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
				data={guardians}
				initialState={{ density: 'xs' }}
				enableColumnResizing
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
			/>
		</Container>
	);
}
export default GuardianTable;
