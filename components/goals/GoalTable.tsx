import { ActivityGoal, ActivityInfo, Attendance, Goal, Orphan, OrphanAttendance, Prisma, User } from '@prisma/client';
import { useMemo, useState } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Box, Button, Container, Divider, Group, Modal, Rating, TextInput, Title, Tooltip } from '@mantine/core';
import { _ActivityExecutionInfo, _ActivityInfo, _Attendance, _Orphan, _OrphanAttendance } from '../../types';
import { useRouter } from 'next/router';
import { Pages, serverLink } from '../../shared/links';
import { IconCheckbox, IconEdit, IconInfoCircle, IconTrash } from '@tabler/icons-react';
import DeleteModal from '../common/DeleteModal';
import axios from 'axios';
import MyModal from '../common/MyModal';
import GoalForm from './GoalForm';
import GoalCard from './GoalCard';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { modals } from '@mantine/modals';

interface Props {
	goals: (Goal & { User: User })[];
	updateCard?: (goal?: Goal | undefined) => void;
}

function GoalTable({ goals, updateCard }: Props) {
	console.log('🚀 ~ file: ~ GoalTable');
	const router = useRouter();
	const [opened, { open, close }] = useDisclosure(false);
	const [goalInfo, setGoalInfo] = useState(null);
	const columns = useMemo<MRT_ColumnDef<Goal & { User: User }>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 60, size: 30 },
			{
				accessorFn: (row) => row?.title,
				id: 'title',
				header: 'title',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User',
				header: 'Created by',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={goals}
				initialState={{ density: 'xs' }}
				enableColumnResizing
				columnResizeMode='onEnd'
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableRowActions
				enableToolbarInternalActions
				// positionActionsColumn='last'
				displayColumnDefOptions={{ 'mrt-row-actions': { size: 0 } }}
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'Goal'} url={'api/goal/'} />

						<MyModal
							ModelForm={<GoalForm goal={row.original} />}
							modalTitle={'Edit Goal'}
							buttonColor='yellow'
							icon={<IconEdit />}
							size='xs'
							tooltip='Edit'
							modalSize={'md'}
							m={0}
						/>

						<Modal opened={opened} size={'lg'} onClose={close}>
							<Title align='center'>Goal Info</Title>
							<Divider m={10} p={10} />
							{goalInfo && <GoalCard goal={goalInfo} />}
							<Group position='center'>
								<Button color='gray' m={15} onClick={close}>
									Close
								</Button>
							</Group>
						</Modal>
						<Group>
							<Tooltip label={'Info'}>
								<Button
									size={'xs'}
									onClick={async () => {
										const res = await axios.get<{ data: any; msg: string }>(`${serverLink}api/goal/${row.original.id}`);
										setGoalInfo(res.data.data);
										open();
									}}>
									{<IconInfoCircle />}
								</Button>
							</Tooltip>
						</Group>
					</Button.Group>
				)}
			/>
		</Container>
	);
}
export default GoalTable;
