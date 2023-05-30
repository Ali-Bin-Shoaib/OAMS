import {
	ActivityGoal,
	ActivityInfo,
	Attendance,
	GoalInfo,
	Orphan,
	OrphanAttendance,
	Prisma,
	User,
} from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _ActivityInfo, _Attendance, _Orphan, _OrphanAttendance } from '../../types/types';
import { useRouter } from 'next/router';
import { serverLink } from '../../shared/links';

interface Props {
	activities: _ActivityInfo[];
}

function ActivityTable({ activities }: Props) {
	console.log('🚀 ~ file: ~ ActivityTable');
	const router = useRouter();
	const columns = useMemo<MRT_ColumnDef<_ActivityInfo>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, size: 90 },
			{
				accessorFn: (row) => row.User?.name,
				id: 'User',
				header: 'User',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.date?.toDateString(),
				id: 'date',
				header: 'date',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.title,
				id: 'title',
				header: 'title',
				maxSize: 300,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.budget,
				id: 'budget',
				header: 'Budget',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.target,
				id: 'target',
				header: 'target',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.type,
				id: 'type',
				header: 'type',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.quarter,
				id: 'quarter',
				header: 'quarter',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => {
					return row.ActivityGoal ? row.ActivityGoal.map((x) => x.GoalInfo?.title).join(' , ') : '0';
				},
				id: 'GoalTitle',
				header: 'Goals',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			// {
			// 	accessorFn: (row) => row.ActivityGoal.map((x) => x.GoalInfo.length),
			// 	id: 'GoalTitle',
			// 	header: 'Execution',
			// 	maxSize: 300,
			// 	size: 120,
			// 	enableResizing: true,
			// },
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={activities}
				initialState={{ density: 'xs' }}
				mantineTableBodyRowProps={(row) => ({
					onClick: () => {
						// on row click change the card to the clicked activities and then user can edit or delete.
						// router.push(serverLink + 'activities/' + row.row.original.id);
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
