import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Button, Container, Tooltip } from '@mantine/core';
import { User, EducationInfo, Orphan } from '@prisma/client';
import { IconEdit, IconInfoCircle } from '@tabler/icons-react';
import router from 'next/router';
import DeleteModal from '../common/DeleteModal';
import { Education, Health } from '../../types';
import TableComponent from 'components/common/TableComponent';
// type Education = EducationInfo & { User: User; Orphan: Orphan };
interface Props {
	health: Health[];
	action?: boolean;
}
function HealthTable({ health, action }: Props) {
	console.log('🚀 ~ file: HealthTable.tsx:15 ~ HealthTable ~ health:', health);
	console.log('🚀 ~ file: ~ HealthTable');
	const columns = useMemo<MRT_ColumnDef<Health>[]>(
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
				accessorFn: (row) => row.User?.name,
				id: 'User.name',
				header: 'بواسطة',
				maxSize: 120,
				size: 100,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.disease,
				id: 'disease',
				header: 'المرض',
				maxSize: 200,
				size: 120,
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.description,
				id: 'description',
				header: 'الوصف',
				maxSize: 200,
				size: 120,
				enableResizing: true,
			},
		],
		[]
	);

	return (
		<TableComponent
			data={health}
			columns={columns}
			deleteUrl={'api/health/'}
			editUrl={'edit/'}
			deleteTitle={'الحالة الصحية'}
			infoUrl={'health/'}
			title='جدول الحالة الصحية'
			action={action}
		/>
	);
}
export default HealthTable;
