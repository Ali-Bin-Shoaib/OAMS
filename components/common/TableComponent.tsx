import { useEffect, useMemo, useRef, useState } from 'react';
import { MRT_ColumnDef, MRT_TableInstance, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { _Guardian, _Orphan, _User } from '../../types';
import PrintButton from 'components/common/PrintButton';
import { Button, Tooltip } from '@mantine/core';
import { IconCheckbox, IconEdit, IconInfoCircle } from '@tabler/icons-react';
import DeleteModal from 'components/common/DeleteModal';
import router from 'next/router';
import { serverLink } from 'shared/links';

interface Props<T> {
	data: T[];
	columns: MRT_ColumnDef<any>[];
	deleteUrl: string;
	editUrl: string;
	deleteTitle: string;
	infoUrl: string;
	executeUrl?: string;
	redirectUrl?: string;
	action?: boolean;
	title?: string;
}

function TableComponent({
	data,
	columns,
	deleteUrl,
	editUrl,
	infoUrl,
	deleteTitle,
	executeUrl,
	redirectUrl,
	action = true,
	title,
}: Props<typeof data>) {
	const [isPrinting, setIsPrinting] = useState(!action);
	const handlePrint = (value: boolean) => setIsPrinting(value);
	const table = useMantineReactTable<any>({
		columns,
		data,
		enableColumnFilterModes: true,
		enableColumnOrdering: true,
		enableFacetedValues: true,
		enableGrouping: true,
		enablePinning: true,
		enableClickToCopy: true,
		enableBottomToolbar: true,
		enableColumnResizing: true,
		enableColumnActions: !isPrinting,
		enableRowActions: !isPrinting,
		columnResizeMode: 'onEnd', //instead of the default "onChange" mode
		initialState: { density: 'xs' },
		positionToolbarAlertBanner: 'top',
		mantineTableBodyCellProps: { sx: { border: '2px solid #dee2e6' } },
		mantineTableHeadCellProps: { sx: { border: '2px solid #dee2e6' } },
		mantineTableProps: { striped: true, sx: { border: '2px solid #dee2e6', tableLayout: 'fixed' } },
		// displayColumnDefOptions: !isPrinting ? { 'mrt-row-actions': { size: 150, enableHiding: true } } : undefined,
		displayColumnDefOptions: !isPrinting ? { 'mrt-row-actions': { enableHiding: true, size: 150 } } : undefined,

		// mantineTableBodyRowProps: ({ row }) => ({
		// 	onClick: (event) => {
		// 		console.log('🚀 ~ file: TableComponent.tsx:111 ~ UserTable ~ event:', event);
		// 	},
		// 	sx: { cursor: 'pointer' },
		// }),
		renderTopToolbarCustomActions: ({ table }) => {
			return (
				<>
					<PrintButton table={table} handlePrint={handlePrint} />
					<h4>{title}</h4>
				</>
			);
		},
		renderRowActions: ({ row }) => {
			return !isPrinting ? (
				<Button.Group>
					<DeleteModal
						id={row.original.user ? row.original.userId : row.original.id!}
						title={deleteTitle}
						url={deleteUrl}
						redirectUrl={redirectUrl}
					/>
					<Tooltip label={'تعديل'}>
						<Button
							size='xs'
							onClick={() => {
								router.push(`${serverLink}${editUrl}${row.original.user ? row.original.userId : row.original.id}`);
							}}
							color='yellow'>
							<IconEdit />
						</Button>
					</Tooltip>
					<Tooltip label={'تفاصيل'}>
						<Button
							size='xs'
							onClick={() => {
								router.push(`${serverLink}${infoUrl}${row.original.user ? row.original.userId : row.original.id}`);
							}}
							color='gray'>
							<IconInfoCircle />
						</Button>
					</Tooltip>
					{executeUrl && (
						<Tooltip label={'تنفيذ'}>
							<Button
								size='xs'
								onClick={() => {
									router.push(`${serverLink}${executeUrl}${row.original.user ? row.original.userId : row.original.id}`);
								}}
								color='green'>
								<IconCheckbox />
							</Button>
						</Tooltip>
					)}{' '}
				</Button.Group>
			) : undefined;
		},
	});
	return <MantineReactTable table={table} />;
}
export default TableComponent;
