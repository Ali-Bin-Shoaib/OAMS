import { Prisma, User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Tooltip } from '@mantine/core';
import { _Sponsor } from '../../types';
import { IconEdit } from '@tabler/icons-react';
import DeleteModal from 'components/common/DeleteModal';
import router from 'next/router';
import { serverLink } from 'shared/links';
import TableComponent from 'components/common/TableComponent';

interface Props {
	sponsors: _Sponsor[];
	actions?: boolean;
}

function SponsorTable({ sponsors, actions = true }: Props) {
	const columns = useMemo<MRT_ColumnDef<_Sponsor>[]>(
		() => [
			{
				accessorFn: (row) => row.userId,
				id: 'id',
				header: 'id',
				maxSize: 300,
				minSize: 80,
				size: 90,
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
				size: 90,
				enableResizing: true,
			},
			// {
			// 	accessorFn: (row) => row.user.username,
			// 	id: 'userName',
			// 	header: 'userName',
			// 	maxSize: 300,
			// 	minSize: 80,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.user.password,
			// 	id: 'password',
			// 	header: 'password',
			// 	maxSize: 300,
			// 	minSize: 80,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.user.email,
			// 	id: 'email',
			// 	header: 'email',
			// 	maxSize: 300,
			// 	minSize: 80,
			// 	size: 150,
			// 	enableResizing: true,
			// },
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
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.birthdate?.toDateString(),
				id: 'birthdate',
				header: 'birthdate',
				maxSize: 300,
				minSize: 80,
				size: 130,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.identityNumber,
				id: 'identityNumber',
				header: 'identityNumber',
				maxSize: 300,
				minSize: 80,
				size: 150,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={sponsors}
			columns={columns}
			deleteUrl={'api/user/'}
			editUrl={'sponsors/action/'}
			deleteTitle={'Sponsor'}
			infoUrl={'sponsors/'}
			action={actions}
		/>
		// <Container fluid>
		// 	<MantineReactTable
		// 		columns={columns}
		// 		data={sponsors}
		// 		enableRowActions
		// 		displayColumnDefOptions={{ 'mrt-row-actions': { size: 130 } }}
		// 		renderRowActions={({ row }) => {
		// 			return (
		// 				<Button.Group>
		// 					<DeleteModal id={row.original.userId!} title={'Sponsor'} url={'api/user/'} />
		// 					<Tooltip label={'Edit'}>
		// 						<Button
		// 							size='xs'
		// 							onClick={() => {
		// 								router.push(serverLink + 'sponsors/action/' + row.original.userId);
		// 							}}
		// 							color='yellow'>
		// 							<IconEdit />
		// 						</Button>
		// 					</Tooltip>
		// 				</Button.Group>
		// 			);
		// 		}}
		// 		initialState={{ density: 'xs' }}
		// 		enableColumnResizing
		// 		mantineTableBodyCellProps={{
		// 			sx: { border: '2px solid #dee2e6' },
		// 		}}
		// 		mantineTableHeadCellProps={{
		// 			sx: { border: '2px solid #dee2e6' },
		// 		}}
		// 		mantineTableProps={{
		// 			striped: true,
		// 			sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' },
		// 		}}
		// 	/>
		// </Container>
	);
}
export default SponsorTable;
