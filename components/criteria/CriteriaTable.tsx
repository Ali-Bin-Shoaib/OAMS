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
}

function CriteriaTable({ criteria }: Props) {
	console.log('🚀 ~ file: ~ CriteriaTable');
	const router = useRouter();
	const [opened, { open, close }] = useDisclosure(false);
	const [criterion, setCriterion] = useState(null);
	const columns = useMemo<MRT_ColumnDef<Criteria & { User: User }>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: '#', maxSize: 60, size: 30 },
			{
				accessorFn: (row) => row?.title,
				id: 'title',
				header: 'المعيار',
				maxSize: 70,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User',
				header: 'بواسطة',
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
				displayColumnDefOptions={{ 'mrt-row-actions': { size: 1 } }}
				// positionActionsColumn='last'
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'Criteria'} url={'api/criteria/'} />

						<MyModal
							ModelForm={<CriteriaForm criteria={row.original} />}
							modalTitle={'تعديل معيار'}
							buttonColor='yellow'
							icon={<IconEdit />}
							size='xs'
							tooltip='تعديل'
							modalSize={'md'}
							m={0}
						/>

		
					</Button.Group>
				)}
			/>
		</Container>
	);
}
export default CriteriaTable;
