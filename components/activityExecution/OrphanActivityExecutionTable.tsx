import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import TableComponent from 'components/common/TableComponent';
import { OrphanActivityExecution } from '@prisma/client';

interface Props {
	orphanActivityExecution: { id: number; title: string; startDate: Date; evaluation: number; isAttended: boolean }[];
}

function OrphanActivityExecutionTable({ orphanActivityExecution }: Props) {
	const columns = useMemo<
		MRT_ColumnDef<{ id: number; title: string; startDate: Date; evaluation: number; isAttended: boolean }>[]
	>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 300, size: 90 },
			{
				accessorFn: (row) => row.title,
				id: 'activity',
				header: 'عنوان النشاط',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},

			{
				accessorFn: (row) => (row.isAttended ? 'yes' : 'no'),
				id: 'isAttended',
				header: 'حاضر',
				maxSize: 300,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.evaluation,
				id: 'evaluation',
				header: 'التقييم',
				maxSize: 150,
				size: 130,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.startDate.toDateString(),
				id: 'startDate',
				header: 'تاريخ البداية',
				maxSize: 300,
				size: 200,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={orphanActivityExecution}
			columns={columns}
			deleteUrl={''}
			editUrl={''}
			deleteTitle={''}
			infoUrl={''}
			action={false}
		/>
	);
}
export default OrphanActivityExecutionTable;
