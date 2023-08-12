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
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 100, minSize: 80, size: 80, enableResizing: true },
			{
				accessorFn: (row) => row.name,
				id: 'name',
				header: 'name',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.gender,
				id: 'gender',
				header: 'gender',
				maxSize: 90,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.username,
				id: 'userName',
				header: 'userName',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.password,
				id: 'password',
				header: 'password',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.email,
				id: 'email',
				header: 'email',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.address,
				id: 'address',
				header: 'address',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.phone,
				id: 'phone',
				header: 'phone',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.type,
				id: 'type',
				header: 'type',
				maxSize: 120,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
		],
		[]
	);
	// const table = useMantineReactTable<_User>({
	// 	columns,
	// 	data,
	// 	enableColumnFilterModes: true,
	// 	enableColumnOrdering: true,
	// 	enableFacetedValues: true,
	// 	enableGrouping: true,
	// 	enablePinning: true,
	// 	initialState: { density: 'xs' },
	// 	enableClickToCopy: true,
	// 	enableBottomToolbar: true,
	// 	positionToolbarAlertBanner: 'top',
	// 	mantineTableBodyRowProps: ({ row }) => ({
	// 		onClick: (event) => {
	// 			updateCard(row.original);
	// 		},
	// 		sx: { cursor: 'pointer' },
	// 	}),
	// 	renderTopToolbarCustomActions: ({ table }) => {
	// 		return <PrintButton table={table} handlePrint={} />;
	// 	},
	// 	mantineTableBodyCellProps: { sx: { border: '2px solid #dee2e6' } },
	// 	mantineTableHeadCellProps: { sx: { border: '2px solid #dee2e6' } },
	// 	mantineTableProps: { striped: true, sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' } },
	// 	enableColumnResizing: true,
	// 	columnResizeMode: 'onEnd', //instead of the default "onChange" mode
	// 	enableColumnActions: true,
	// 	enableRowActions: true,
	// 	displayColumnDefOptions: { 'mrt-row-actions': { size: 130 } },
	// 	renderRowActions: ({ row }) => {
	// 		return (
	// 			<Button.Group>
	// 				<DeleteModal id={row.original.id!} title={'User'} url={'api/user/'} />
	// 				<Tooltip label={'Edit'}>
	// 					<Button
	// 						size='xs'
	// 						onClick={() => {
	// 							router.push(serverLink + 'users/action/' + row.original.id);
	// 						}}
	// 						color='yellow'>
	// 						<IconEdit />
	// 					</Button>
	// 				</Tooltip>
	// 			</Button.Group>
	// 		);
	// 	},
	// });
	// return <MantineReactTable table={table} />;
	return (
		<TableComponent
			data={data}
			columns={columns}
			deleteUrl={'api/user/'}
			editUrl={'users/action/'}
			deleteTitle={'User'}
			infoUrl={'users/action/'}
		/>
	);
}
export default UserTable;
