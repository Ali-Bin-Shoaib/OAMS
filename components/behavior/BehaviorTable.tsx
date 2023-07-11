import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Tooltip } from '@mantine/core';
import { useRouter } from 'next/router';
import { serverLink } from '../../shared/links';
import { Behavior } from '../../types';
import { IconEdit, IconInfoCircle, IconCheckbox } from '@tabler/icons-react';
import DeleteModal from '../common/DeleteModal';
interface Props {
	behavior: Behavior[];
}

export default function BehaviorTable({ behavior }: Props) {
	console.log('🚀 ~ file: ~ BehaviorTable');
	console.log('🚀 ~ file: BehaviorTable.tsx:14 ~ BehaviorTable ~ behavior:', behavior);
	const router = useRouter();
	const columns = useMemo<MRT_ColumnDef<Behavior>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 60, size: 50 },
			{
				accessorFn: (row) => row.date.toDateString(),
				id: 'date',
				header: 'date',
				maxSize: 100,
				size: 90,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User.name',
				header: 'taken by',
				maxSize: 150,
				size: 140,
				enableResizing: true,
			},
			{
				accessorFn: (row) =>
					(row.BehaviorCriteria.reduce((total, x) => total + x.evaluation, 0) / row.BehaviorCriteria.length).toFixed(2),
				id: 'behavior.length',
				header: 'evaluation',
				maxSize: 100,
				size: 90,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={behavior}
				initialState={{ density: 'xs' }}
				renderRowActions={({ row }) => (
					<Button.Group>
						<DeleteModal id={row.original.id!} title={'Behavior'} url={'api/behavior/'} />
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
								color='blue'>
								<IconInfoCircle />
							</Button>
						</Tooltip>
					</Button.Group>
				)}
				positionActionsColumn='last'
				enableRowActions
				enableColumnActions
				// mantineTableBodyRowProps={(row) => ({
				// 	onClick: () => {
				// on row click change the card to the clicked attendance and then user can edit or delete.
				// 		router.push(serverLink + 'behavior/' + row.row.original.id);
				// 	},
				// })}
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				enableColumnResizing
				columnResizeMode='onEnd'
			/>
		</Container>
	);
}
