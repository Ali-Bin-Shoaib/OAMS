import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { Behavior } from '../../types';
import TableComponent from 'components/common/TableComponent';
interface Props {
	behavior: Behavior[];
}

export default function BehaviorTable({ behavior }: Props) {
	console.log('🚀 ~ file: ~ BehaviorTable');
	console.log('🚀 ~ file: BehaviorTable.tsx:14 ~ BehaviorTable ~ behavior:', behavior);
	const columns = useMemo<MRT_ColumnDef<Behavior>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 60, size: 50 },
			{
				accessorFn: (row) => row.date.toDateString(),
				id: 'date',
				header: 'التاريخ',
				maxSize: 100,
				size: 90,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.User?.name,
				id: 'User.name',
				header: 'بواسطة',
				maxSize: 150,
				size: 140,
				enableResizing: true,
			},
			{
				accessorFn: (row) =>
					row.BehaviorCriteria &&
					(row.BehaviorCriteria.reduce((total, x) => total + x.evaluation, 0) / row.BehaviorCriteria.length).toFixed(2),
				id: 'behavior.length',
				header: 'التقييم',
				maxSize: 100,
				size: 90,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={behavior}
			columns={columns}
			deleteUrl={'api/behavior/'}
			editUrl={'behavior/edit/'}
			deleteTitle={'Behavior'}
			infoUrl={'behavior/'}
			action={true}
			title='جدول السلوك'
		/>
	);
}
