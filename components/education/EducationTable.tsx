import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { EducationInfo } from '@prisma/client';
import TableComponent from 'components/common/TableComponent';
import { Education } from 'types';
interface Props {
	education: Education[];
	action: boolean;
}
function EducationTable({ education, action }: Props) {
	console.log('🚀 ~ file: ~ EducationTable');
	const columns = useMemo<MRT_ColumnDef<EducationInfo>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: '#', maxSize: 60, size: 50 },
			{
				accessorFn: (row) => row.date.toDateString(),
				id: 'date',
				header: 'التاريخ',
				maxSize: 60,
				size: 50,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.degree,
				id: 'degree',
				header: 'الدرجة',
				maxSize: 65,
				size: 60,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.note,
				id: 'note',
				header: 'ملاحظة',
				maxSize: 120,
				size: 100,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={education}
			columns={columns}
			deleteUrl={'api/education/'}
			editUrl={'education/edit/'}
			deleteTitle={'Education'}
			infoUrl={'education/'}
			action={action}
			title='Education Table'
		/>
	);
}
export default EducationTable;
