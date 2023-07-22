import { ActivityGoal, ActivityInfo, Attendance, Orphan, OrphanAttendance, Prisma, User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Box, Button, Container, Rating, Tooltip } from '@mantine/core';
import { _ActivityExecutionInfo, _ActivityInfo, _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import { useRouter } from 'next/router';
import { Pages, serverLink } from '../../shared/links';
import { IconCheckbox, IconEdit, IconInfoCircle, IconTrash } from '@tabler/icons-react';
import DeleteModal from '../common/DeleteModal';
import axios from 'axios';

interface Props {
	activitiesExecutions: _ActivityExecutionInfo[];
	updateCard: (activityExecution?: _ActivityExecutionInfo | undefined) => void;
}

function ActivityExecutionTable({ activitiesExecutions, updateCard }: Props) {
	console.log('🚀 ~ file: ~ ActivityExecutionTable');
	const router = useRouter();

	const columns = useMemo<MRT_ColumnDef<_ActivityExecutionInfo>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 60, size: 30 },
			{
				accessorFn: (row) => row.ActivityInfo?.title,
				id: 'title',
				header: 'title',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.startDate?.toDateString(),
				id: 'date',
				header: 'date',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Executor?.name,
				id: 'Executer',
				header: 'Executer',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.cost,
				id: 'Cost',
				header: 'Cost',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			// {
			// 	accessorFn: (row) => row.note,
			// 	id: 'Note',
			// 	header: 'Note',
			// 	maxSize: 70,
			// 	size: 50,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.description,
			// 	id: 'Description',
			// 	header: 'Description',
			// 	maxSize: 70,
			// 	size: 50,
			// 	enableResizing: true,
			// },
			{
				accessorFn: (row) => row?.OrphanActivityExecution?.filter((x) => x.isAttended).length,
				id: 'Attended Orphans',
				header: 'Attended Orphans',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => {
					// return (
					// 	<Rating
					// 		title={
					// 			row.GoalEvaluation
					// 				? (
					// 						row.GoalEvaluation.reduce((total, goal) => total + goal.evaluation!, 0) / row.GoalEvaluation.length
					// 				  ).toString()
					// 				: '0'
					// 		}
					// 		readOnly
					// 		value={
					// 			row.GoalEvaluation
					// 				? row.GoalEvaluation.reduce((total, goal) => total + goal.evaluation!, 0) / row.GoalEvaluation.length
					// 				: 0
					// 		}
					// 		fractions={2}
					// 	/>
					// );
					return row.GoalEvaluation && row.OrphanActivityExecution
						? (
								(row.GoalEvaluation.reduce((total, goal) => total + goal.evaluation!, 0) / row.GoalEvaluation.length +
									row.OrphanActivityExecution.reduce((total, orphan) => total + orphan?.evaluation!, 0) /
										row.OrphanActivityExecution.length) /
								2
						  ).toFixed(2)
						: 0;
				},
				id: 'Evaluation',
				header: 'Evaluation',
				maxSize: 40,
				size: 40,
				enableResizing: true,
			},
			// {
			// 	accessorFn: (row) => row.ActivityGoal.map((x) => x.GoalInfo.length),
			// 	id: 'GoalTitle',
			// 	header: 'Execution',
			// 	maxSize: 70,
			// 	size: 50,
			// 	enableResizing: true,
			// },
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={activitiesExecutions}
				initialState={{ density: 'xs' }}
				enableColumnResizing
				columnResizeMode='onEnd'
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableRowActions
				enableToolbarInternalActions
				positionActionsColumn='last'
				renderRowActions={({ row }) => (
					<Button.Group>
						{/* <Tooltip label={'Delete'}>
							<Button
								size='xs'
								onClick={() => {
									router.push(`${Pages.ActivityExecution.link}${row.original.id}`);
									const res = deleteExecution(serverLink + 'api/execute/', row.original.id);
									console.log('🚀 ~ file: ActivityExecutionTable.tsx:144 ~ ActivityExecutionTable ~ res:', res);
								}}
								color='red'>
								<IconTrash />
							</Button>
						</Tooltip> */}
						<Tooltip label={'Delete'}>
							<DeleteModal
								id={row.original.id!}
								title={'Activity Execution'}
								url={'api/execute/'}
								// updateCard={updateCard}
							/>
						</Tooltip>

						<Tooltip label={'Edit'}>
							<Button
								size='xs'
								onClick={() => {
									router.push(`${Pages.ActivityExecution.link}edit/${row.original.id}`);
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
					</Button.Group>
				)}
				mantineTableBodyRowProps={(row) => ({
					onClick: () => {
						// on row click change the card to the clicked activities and then user can edit or delete.
						// router.push(serverLink + 'activities/' + row.row.original.id);

						updateCard(row.row.original);
					},
				})}
			/>
		</Container>
	);
}
export default ActivityExecutionTable;

const deleteExecution = async (url = '/', id = -1) => {
	const res = await axios.delete(url + id);
	return res;
};
