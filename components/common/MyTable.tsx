import { Orphan, User } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { _Guardian, _Orphan, _User } from '../../types/types';

interface Props {
	array: any[];
	updateCard(object: _User | _Orphan | _Guardian): void;
}

function MyTable({ array, updateCard }: Props) {
	const columns = useMemo<MRT_ColumnDef<(typeof array)[0]>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'id' },
			{ accessorFn: (row) => row.name, id: 'name', header: 'name', maxSize: 300, size: 200, enableResizing: true },

			{ accessorFn: (row) => row.birthdate?.toDateString(), id: 'birthdate', header: 'birthdate' },
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={array}
				initialState={{ density: 'xs' }}
				mantineTableBodyRowProps={({ row }) => ({
					onClick: () => {
						updateCard(row.original);
					},
					sx: { border: '2px solid #dee2e6' },
				})}
				mantineTableBodyCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				mantineTableHeadCellProps={{
					sx: { border: '2px solid #dee2e6' },
				}}
				mantineTableProps={{
					striped: true,
					sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' },
				}}
				enableColumnResizing
				columnResizeMode='onEnd' //instead of the default "onChange" mode
			/>
		</Container>
	);
}
export default MyTable;
