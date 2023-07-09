import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Container } from '@mantine/core';
import { User, EducationInfo, Orphan } from '@prisma/client';
type Education = EducationInfo & { User: User; Orphan: Orphan };
interface Props {
	education: Education[];
}
function EducationTable({ education }: Props) {
	console.log('🚀 ~ file: ~ EducationTable');
	const columns = useMemo<MRT_ColumnDef<Education>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, size: 90 },
			{
				accessorFn: (row) => row.date.toDateString(),
				id: 'date',
				header: 'date',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User.name',
				header: 'taken by',
				maxSize: 300,
				size: 150,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.Orphan.name,
				id: 'Orphan.name',
				header: 'Orphan Name',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<MantineReactTable
				columns={columns}
				data={education}
				initialState={{ density: 'xs' }}
				// mantineTableBodyRowProps={(row) => ({
				// 	onClick: () => {
				// 		// on row click change the card to the clicked attendance and then user can edit or delete.
				// 		router.push(serverLink + 'attendance/' + row.row.original.id);
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
export default EducationTable;
