import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Tooltip } from '@mantine/core';
import { User, EducationInfo, Orphan } from '@prisma/client';
import { IconEdit, IconInfoCircle } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../common/DeleteModal';
import { Education } from '../../types';
// type Education = EducationInfo & { User: User; Orphan: Orphan };
interface Props {
	education: Education[];
}
function EducationTable({ education }: Props) {
	console.log('🚀 ~ file: ~ EducationTable');
	const columns = useMemo<MRT_ColumnDef<Education>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 60, size: 50 },
			{
				accessorFn: (row) => row.date.toDateString(),
				id: 'date',
				header: 'Date',
				maxSize: 60,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User.name',
				header: 'Taken By',
				maxSize: 120,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Orphan?.name,
				id: 'Orphan.name',
				header: 'Orphan Name',
				maxSize: 200,
				size: 120,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			{/* @ts-ignore */}
			<MantineReactTable
				columns={columns}
				data={education}
				initialState={{ density: 'xs' }}
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableColumnResizing
				columnResizeMode='onEnd'
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'Education'} url={'api/education/'} />
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
					</Button.Group>
				)}
				// positionActionsColumn='last'
				enableRowActions
			/>
		</Container>
	);
}
export default EducationTable;
