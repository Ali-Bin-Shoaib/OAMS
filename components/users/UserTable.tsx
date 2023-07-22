import { useMemo, useRef } from 'react';
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { _Guardian, _Orphan, _User } from '../../types';
import PrintButton from 'components/common/PrintButton';

interface Props {
	users: _User[];
	updateCard(user: _User): void;
}

function UserTable({ users: data, updateCard }: Props) {
	console.log('🚀 ~ file: UserTable.tsx');
	const columns = useMemo<MRT_ColumnDef<_User>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, minSize: 80, size: 80, enableResizing: true },
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
	const table = useMantineReactTable<_User>({
		columns,
		data,
		enableColumnFilterModes: true,
		enableColumnOrdering: true,
		enableFacetedValues: true,
		enableGrouping: true,
		enablePinning: true,
		initialState: { density: 'xs' },
		// paginationDisplayMode: 'pages',
		enableClickToCopy: true,
		enableBottomToolbar: true,
		positionToolbarAlertBanner: 'top',
		mantineTableBodyRowProps: ({ row }) => ({
			onClick: (event) => {
				updateCard(row.original);
			},
			sx: { cursor: 'pointer' },
		}),
		renderTopToolbarCustomActions: ({ table }) => {
			return <PrintButton printRef={table.refs.tableContainerRef} />;
		},
		mantineTableBodyCellProps: { sx: { border: '2px solid #dee2e6' } },
		mantineTableHeadCellProps: { sx: { border: '2px solid #dee2e6' } },
		mantineTableProps: { striped: true, sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' } },
		enableColumnResizing: true,
		columnResizeMode: 'onEnd', //instead of the default "onChange" mode
		// renderTopToolbarCustomActions:
	});
	return <MantineReactTable table={table} />;
	// return (
	// <MantineReactTable
	// 	columns={columns}
	// 	data={users}
	// 	enableTopToolbar
	// renderTopToolbarCustomActions={({ table }) => {
	// 	const handleClick = () => {
	// 		console.info('table', table);
	// 	};
	// 	return (

	// 	);
	// }}
	// 	initialState={{ density: 'xs' }}
	// 	// action
	// 	mantineTableBodyRowProps={({ row }) => ({
	// 		onClick: () => {
	// 			updateCard(row.original);
	// 		},
	// 		sx: { border: '2px solid #dee2e6' },
	// 	})}
	// 	mantineTableBodyCellProps={{
	// 		sx: { border: '2px solid #dee2e6' },
	// 	}}
	// 	mantineTableHeadCellProps={{
	// 		sx: { border: '2px solid #dee2e6' },
	// 	}}
	// 	mantineTableProps={{
	// 		striped: true,
	// 		sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' },
	// 	}}
	// 	enableColumnResizing
	// 	columnResizeMode='onEnd' //instead of the default "onChange" mode
	// />
	// );
}
export default UserTable;
