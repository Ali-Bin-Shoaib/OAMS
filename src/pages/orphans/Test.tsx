import React, { useCallback, useMemo, useState } from 'react';
import { MantineReactTable, MantineReactTableProps, MRT_Cell, MRT_ColumnDef, MRT_Row } from 'mantine-react-table';
import { Box, ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { ORPHAN } from '../../../types/types';
import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { Orphan } from '@prisma/client';
import AddOrphanModal from '../../../components/orphans/modals/AddOrphanModal';
export const getStaticProps: GetStaticProps = async () => {
	const orphans = await prisma.orphan.findMany();
	orphans.sort(function (a, b) {
		return a.id > b.id ? 1 : -1;
	});
	const data = JSON.parse(JSON.stringify(orphans));

	return { props: { data }, revalidate: 10 };
};

const Example = ({ data }: { data: Orphan[] }) => {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [tableData, setTableData] = useState<ORPHAN[]>(() => data as ORPHAN[]);

	const [validationErrors, setValidationErrors] = useState<{
		[cellId: string]: string;
	}>({});

	const handleSaveRowEdits: MantineReactTableProps<ORPHAN>['onEditingRowSave'] = async ({
		exitEditingMode,
		row,
		values,
	}) => {
		if (!Object.keys(validationErrors).length) {
			tableData[row.index] = values;
			//send/receive api updates here, then refetch or update local table data for re-render
			setTableData([...tableData]);
			exitEditingMode(); //required to exit editing mode and close modal
		}
	};

	const handleCancelRowEdits = () => {
		setValidationErrors({});
	};

	const handleDeleteRow = useCallback(
		(row: MRT_Row<ORPHAN>) => {
			if (!confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)) {
				return;
			}
			//send api delete request here, then refetch or update local table data for re-render
			tableData.splice(row.index, 1);
			setTableData([...tableData]);
		},
		[tableData]
	);

	const getCommonEditTextInputProps = useCallback(
		(cell: MRT_Cell<ORPHAN>): MRT_ColumnDef<ORPHAN>['mantineEditTextInputProps'] => {
			return {
				error: validationErrors[cell.id],
				onBlur: (event) => {
					// const isValid =
					// 	cell.column.id === 'email'
					// 		? validateEmail(event.target.value)
					// 		: cell.column.id === 'age'
					// 		? validateAge(+event.target.value)
					// 		: validateRequired(event.target.value);
					// if (!isValid) {
					// 	//set validation error for cell if invalid
					// 	setValidationErrors({
					// 		...validationErrors,
					// 		[cell.id]: `${cell.column.columnDef.header} is required`,
					// 	});
					// } else {
					// 	//remove validation error for cell if valid
					// 	delete validationErrors[cell.id];
					// 	setValidationErrors({
					// 		...validationErrors,
					// 	});
					// }
				},
			};
		},
		[validationErrors]
	);

	const columns = useMemo<MRT_ColumnDef<ORPHAN>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				enableColumnOrdering: false,
				enableEditing: false, //disable editing on this column
				// enableSorting: false,
				size: 50,
			},
			{
				accessorKey: 'name',
				header: 'Name',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'image',
				header: 'Image',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'gender',
				header: 'Gender',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
					// type: 'email',
				}),
			},
			{
				accessorKey: 'age',
				header: 'Age',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
					type: 'number',
				}),
			},
			{
				accessorKey: 'birthdate',
				header: 'birthdate',
				size: 10,
			},
			{
				accessorKey: 'birthplace',
				header: 'Birthplace',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'joinDate',
				header: 'Join Date',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'schoolName',
				header: 'schoolName',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'gradeLevel',
				header: 'gradeLevel',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'lastYearPercentage',
				header: 'lastYearPercentage',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'fatherDeathDate',
				header: 'fatherDeathDate',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'fatherWork',
				header: 'fatherWork',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'fatherDeathCos',
				header: 'fatherDeathCos',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'noOfFamilyMembers',
				header: 'noOfFamilyMembers',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'males',
				header: 'males',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'females',
				header: 'females',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},

			{
				accessorKey: 'motherName',
				header: 'motherName',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'motherStatus',
				header: 'motherStatus',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'isMotherWorks',
				header: 'isMotherWorks',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'motherJob',
				header: 'motherJob',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'motherJobPhone',
				header: 'motherJobPhone',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'monthlyIncome',
				header: 'monthlyIncome',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},

			{
				accessorKey: 'liveWith',
				header: 'liveWith',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'homeType',
				header: 'homeType',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'homePhone',
				header: 'homePhone',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'currentAddress',
				header: 'currentAddress',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'isSponsored',
				header: 'isSponsored',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'foundationName',
				header: 'foundationName',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'foundationAmount',
				header: 'foundationAmount',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'evaluation',
				header: 'evaluation',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
			{
				accessorKey: 'guardianId',
				header: 'guardianId',
				size: 50,
				mantineEditTextInputProps: ({ cell }) => ({
					...getCommonEditTextInputProps(cell),
				}),
			},
		],
		[getCommonEditTextInputProps]
	);

	return (
		<>
			<MantineReactTable
				displayColumnDefOptions={{
					'mrt-row-actions': {
						mantineTableHeadCellProps: {
							align: 'center',
						},
						size: 50,
					},
				}}
				columns={columns}
				data={tableData}
				editingMode='modal' //default
				enableColumnOrdering
				enableEditing
				onEditingRowSave={handleSaveRowEdits}
				onEditingRowCancel={handleCancelRowEdits}
				renderRowActions={({ row, table }) => (
					<Box sx={{ display: 'flex', gap: '16px' }}>
						<Tooltip withArrow position='left' label='Edit'>
							<ActionIcon onClick={() => table.setEditingRow(row)}>
								<IconEdit />
							</ActionIcon>
						</Tooltip>
						<Tooltip withArrow position='right' label='Delete'>
							<ActionIcon color='red' onClick={() => handleDeleteRow(row)}>
								<IconTrash />
							</ActionIcon>
						</Tooltip>
					</Box>
				)}
				renderTopToolbarCustomActions={() => (
					// <Button color='teal' onClick={() => setCreateModalOpen(true)} variant='filled'>
					// 	Create New Account
					// </Button>
					<AddOrphanModal />
				)}
			/>
			{/* <CreateNewAccountModal
				columns={columns}
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				onSubmit={handleCreateNewRow}
			/> */}
		</>
	);
};

interface Props {
	columns: MRT_ColumnDef<ORPHAN>[];
	onClose: () => void;
	onSubmit: (values: ORPHAN) => void;
	open: boolean;
}

//example of creating a mantine dialog modal for creating new rows
// export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }: Props) => {
// 	const [values, setValues] = useState<any>(() =>
// 		columns.reduce((acc, column) => {
// 			acc[column.accessorKey ?? ''] = '';
// 			return acc;
// 		}, {} as any)
// 	);

// 	const handleSubmit = () => {
// 		//put your validation logic here
// 		onSubmit(values);
// 		onClose();
// 	};
// 	return (
// 		<Dialog opened={open}>
// 			<Title ta='center'>Create New Account</Title>
// 			<form onSubmit={(e) => e.preventDefault()}>
// 				<Stack
// 					sx={{
// 						width: '100%',
// 						gap: '24px',
// 					}}>
// 					{columns.map((column) => (
// 						<TextInput
// 							key={column.accessorKey}
// 							label={column.header}
// 							name={column.accessorKey}
// 							onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
// 						/>
// 					))}
// 				</Stack>
// 			</form>
// 			<Flex
// 				sx={{
// 					padding: '20px',
// 					width: '100%',
// 					justifyContent: 'flex-end',
// 					gap: '16px',
// 				}}>
// 				<Button onClick={onClose} variant='subtle'>
// 					Cancel
// 				</Button>
// 				<Button color='teal' onClick={handleSubmit} variant='filled'>
// 					Create New Account
// 				</Button>
// 			</Flex>
// 		</Dialog>
// 	);
// };

// const validateRequired = (value: string) => !!value.length;
// const validateEmail = (email: string) =>
// 	!!email.length &&
// 	email
// 		.toLowerCase()
// 		.match(
// 			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// 		);

export default Example;
