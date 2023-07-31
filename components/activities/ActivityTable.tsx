import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Tooltip } from '@mantine/core';
import { _ActivityInfo, _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import { useRouter } from 'next/router';
import { IconEdit, IconTrash, IconInfoCircle, IconCheckbox } from '@tabler/icons-react';
import DeleteModal from '../common/DeleteModal';

interface Props {
	activities: _ActivityInfo[];
	updateCard: (activityInfo: _ActivityInfo | null) => void;
}

function ActivityTable({ activities, updateCard }: Props) {
	console.log('🚀 ~ file: ~ ActivityTable');
	const router = useRouter();
	const columns = useMemo<MRT_ColumnDef<_ActivityInfo>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 50, size: 50 },
			{
				accessorFn: (row) => row.title,
				id: 'title',
				header: 'title',
				maxSize: 60,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.date?.toDateString(),
				id: 'date',
				header: 'date',
				maxSize: 60,
				size: 50,
				enableResizing: true,
			},

			{
				accessorFn: (row) => row.budget,
				id: 'budget',
				header: 'Budget',
				maxSize: 60,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.quarter,
				id: 'quarter',
				header: 'quarter',
				maxSize: 60,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User',
				header: 'User',
				maxSize: 80,
				size: 70,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				enableRowActions
				enableToolbarInternalActions
				// displayColumnDefOptions={{ 'mrt-row-actions': { size: 130 } }}
				// positionActionsColumn='last'
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'activity'} url={'api/activity/'} />

						<Tooltip label={'Edit'}>
							<Button
								size='xs'
								onClick={() => {
									router.push(`${router.asPath}/edit/${row.original.id}`);
								}}
								color='yellow'>
								<IconEdit />
							</Button>
						</Tooltip>
						<Tooltip label={'Info'}>
							<Button
								size='xs'
								onClick={() => {
									router.push(`${router.asPath}/${row.original.id}`);
								}}
								color='gray'>
								<IconInfoCircle />
							</Button>
						</Tooltip>
						<Tooltip label={'Execute'}>
							<Button
								size='xs'
								onClick={() => {
									router.push(`${router.asPath}/execute/create/${row.original.id}`);
								}}
								color='green'>
								<IconCheckbox />
							</Button>
						</Tooltip>
					</Button.Group>
				)}
				data={activities}
				initialState={{ density: 'xs' }}
				mantineTableBodyRowProps={(row) => ({
					onClick: () => {
						// on row click change the card to the clicked activities and then user can edit or delete.
						// router.push(serverLink + 'activities/' + row.row.original.id);
						// updateCard(row.row.original);
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
export default ActivityTable;
