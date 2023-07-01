import { Criteria, Goal, User } from '@prisma/client';
import { useMemo, useState } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconEdit } from '@tabler/icons-react';
import DeleteModal from '../common/DeleteModal';
import MyModal from '../common/MyModal';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import CriteriaForm from './CriteriaForm';
import CriteriaCard from './CriteriaCard';
interface Props {
	criteria: (Criteria & { User: User })[];
	updateCard?: (goal?: Goal | undefined) => void;
}

function CriteriaTable({ criteria, updateCard }: Props) {
	console.log('🚀 ~ file: ~ CriteriaTable');
	const router = useRouter();
	const [opened, { open, close }] = useDisclosure(false);
	const [criterion, setCriterion] = useState(null);
	const columns = useMemo<MRT_ColumnDef<Criteria & { User: User }>[]>(
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
				data={criteria}
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
						<DeleteModal id={row.original.id!} title={'Criteria'} url={'api/criteria/'} />

						<MyModal
							ModelForm={<CriteriaForm criteria={row.original} />}
							modalTitle={'Edit Criteria'}
							buttonColor='yellow'
							icon={<IconEdit />}
							size='xs'
							tooltip='Edit'
							modalSize={'md'}
							m={0}
						/>

						{/* <Modal opened={opened} size={'lg'} onClose={close}>
							<Title align='center'>Criteria Info</Title>
							<Divider m={10} p={10} />
							{criteria && <CriteriaCard criterion={criterion} />}
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
										const res = await axios.get<{ data: any; msg: string }>(`${serverLink}api/criteria/${row.original.id}`);
										setCriterion(res.data.data);
										open();
									}}>
									{<IconInfoCircle />}
								</Button>
							</Tooltip>
						</Group> */}
					</Button.Group>
				)}
			/>
		</Container>
	);
}
export default CriteriaTable;
