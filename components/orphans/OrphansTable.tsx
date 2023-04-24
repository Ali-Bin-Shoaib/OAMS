import { Orphan } from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';

interface Props {
	orphans: Orphan[];
	updateCard(orphan: Orphan): void;
}

function OrphansTable({ orphans, updateCard }: Props) {
	const columns = useMemo<MRT_ColumnDef<Orphan>[]>(
		() => [
			{ accessorKey: 'id', header: 'id', maxSize: 200, size: 90, enableResizing: true },
			{ accessorKey: 'name', header: 'name', maxSize: 200, size: 200, enableResizing: true },
			{ accessorKey: 'image', header: 'image', maxSize: 200, size: 100, enableResizing: true },
			{ accessorKey: 'gender', header: 'gender', maxSize: 200, size: 120, enableResizing: true },
			{ accessorKey: 'age', header: 'age', maxSize: 200, size: 100, enableResizing: true },
			{ accessorKey: 'birthdate', header: 'birthdate', maxSize: 200, size: 150, enableResizing: true },
			{ accessorKey: 'birthplace', header: 'birthplace', maxSize: 200, size: 150, enableResizing: true },
			{ accessorKey: 'joinDate', header: 'joinDate', maxSize: 200, size: 150, enableResizing: true },
			{ accessorKey: 'schoolName', header: 'schoolName', maxSize: 200, size: 150, enableResizing: true },
			{ accessorKey: 'gradeLevel', header: 'gradeLevel', maxSize: 200, size: 150, enableResizing: true },
			{
				accessorKey: 'lastYearPercentage',
				header: 'lastYearPercentage',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{
				accessorKey: 'fatherDeathDate',
				header: 'fatherDeathDate',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{ accessorKey: 'fatherWork', header: 'fatherWork', maxSize: 200, size: 150, enableResizing: true },
			{
				accessorKey: 'fatherDeathCos',
				header: 'fatherDeathCos',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{
				accessorKey: 'noOfFamilyMembers',
				header: 'FamilyMembers',
				maxSize: 300,
				size: 180,

				enableResizing: true,
			},
			{ accessorKey: 'males', header: 'males', maxSize: 200, size: 100, enableResizing: true },
			{ accessorKey: 'females', header: 'females', maxSize: 200, size: 120, enableResizing: true },
			{ accessorKey: 'motherName', header: 'motherName', maxSize: 200, size: 150, enableResizing: true },
			{ accessorKey: 'motherStatus', header: 'motherStatus', maxSize: 200, size: 150, enableResizing: true },
			{
				accessorKey: 'isMotherWorks',
				header: 'MotherWork',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{ accessorKey: 'motherJob', header: 'motherJob', maxSize: 200, size: 150, enableResizing: true },
			{
				accessorKey: 'motherJobPhone',
				header: 'motherJobPhone',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{
				accessorKey: 'monthlyIncome',
				header: 'monthlyIncome',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{ accessorKey: 'liveWith', header: 'liveWith', maxSize: 200, size: 150, enableResizing: true },
			{ accessorKey: 'homeType', header: 'homeType', maxSize: 200, size: 150, enableResizing: true },
			{ accessorKey: 'homePhone', header: 'homePhone', maxSize: 200, size: 150, enableResizing: true },
			{
				accessorKey: 'currentAddress',
				header: 'currentAddress',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{ accessorKey: 'isSponsored', header: 'isSponsored', maxSize: 200, size: 150, enableResizing: true },
			{
				accessorKey: 'foundationName',
				header: 'foundationName',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{
				accessorKey: 'foundationAmount',
				header: 'foundationAmount',
				maxSize: 200,
				size: 150,

				enableResizing: true,
			},
			{ accessorKey: 'evaluation', header: 'evaluation', maxSize: 200, size: 150, enableResizing: true },
		],
		[]
	);

	// const ths = (
	// 	<tr className='cursor-pointer'>
	// 		<th>ID</th>
	// 		<th>Name</th>
	// 		<th>Image</th>
	// 		<th>Gender</th>
	// 		<th>Age</th>
	// 		<th>Birthdate</th>
	// 		<th>Birthplace</th>
	// 		<th>Join Date</th>
	// 		<th>School Name</th>
	// 		<th>Grade Level</th>
	// 		<th>Last Year Percentage</th>
	// 		<th>Father Death Date</th>
	// 		<th>Father Work</th>
	// 		<th>Father Death Cos</th>
	// 		<th>Family Members</th>
	// 		<th>Males</th>
	// 		<th>Females</th>
	// 		<th>Mother Name</th>
	// 		<th>Mother Status</th>
	// 		<th>Mother Works</th>
	// 		<th>Mother Job</th>
	// 		<th>Mother Job Phone</th>
	// 		<th>Monthly Income</th>
	// 		<th>Live With</th>
	// 		<th>Home Type</th>
	// 		<th>Home Phone</th>
	// 		<th>Current Address</th>
	// 		<th>Sponsored</th>
	// 		<th>Foundation Name</th>
	// 		<th>Foundation Amount</th>
	// 		<th>Evaluation</th>
	// 	</tr>
	// );

	// const rows = orphans.map((orphan) => {
	// 	return (
	// 		<tr
	// 			key={v4()}
	// 			className='cursor-pointer'
	// 			onClick={() => {
	// 				updateCard(orphan);
	// 			}}>
	// 			<td className=' '>{orphan.id}</td>
	// 			<td className=''>{orphan.name}</td>
	// 			<td className=''>{orphan.image}</td>
	// 			<td className=''>{orphan.gender}</td>
	// 			<td className=''>{orphan.age}</td>
	// 			<td className=''>{orphan.birthdate as ReactNode}</td>
	// 			<td className=''>{orphan.birthplace}</td>
	// 			<td className=''>{orphan.joinDate as ReactNode}</td>
	// 			<td className=''>{orphan.schoolName}</td>
	// 			<td className=''>{orphan.gradeLevel}</td>
	// 			<td className=''>{orphan.lastYearPercentage}</td>
	// 			<td className=''>{orphan.fatherDeathDate as ReactNode}</td>
	// 			<td className=''>{orphan.fatherWork}</td>
	// 			<td className=''>{orphan.fatherDeathCos}</td>
	// 			<td className=''>{orphan.noOfFamilyMembers}</td>
	// 			<td className=''>{orphan.males}</td>
	// 			<td className=''>{orphan.females}</td>
	// 			<td className=''>{orphan.motherName}</td>
	// 			<td className=''>{orphan.motherStatus}</td>
	// 			<td className=''>{orphan.isMotherWorks}</td>
	// 			<td className=''>{orphan.motherJob}</td>
	// 			<td className=''>{orphan.motherJobPhone}</td>
	// 			<td className=''>{orphan.monthlyIncome}</td>
	// 			<td className=''>{orphan.liveWith}</td>
	// 			<td className=''>{orphan.homeType}</td>
	// 			<td className=''>{orphan.homePhone}</td>
	// 			<td className=''>{orphan.currentAddress}</td>
	// 			<td className=''>{orphan.isSponsored}</td>
	// 			<td className=''>{orphan.foundationName}</td>
	// 			<td className=''>{orphan.foundationAmount}</td>
	// 			<td className=''>{orphan.evaluation}</td>
	// 		</tr>
	// 	);
	// });

	return (
		<MantineReactTable
			columns={columns}
			data={orphans}
			mantineTableBodyRowProps={({ row }) => ({
				onClick: () => {
					updateCard(row._valuesCache);
				},
				sx: { border: '2px solid #000000', padding: '0px', margin: '0px' },
			})}
			mantineTableBodyCellProps={{
				sx: { border: '2px solid #000000', padding: '0px', margin: '0px' },
			}}
			mantineTableHeadCellProps={{
				sx: { border: '2px solid #000000', padding: '0px', margin: '0px' },
			}}
			mantineTableProps={{
				striped: true,
				sx: { border: '2px solid #000000', tableLayout: 'fixed', padding: '0px', margin: '0px' },
			}}
			enableColumnResizing
			columnResizeMode='onEnd' //instead of the default "onChange" mode
		/>
		// <ScrollArea h={300}>
		// 	<Table striped highlightOnHover withBorder withColumnBorders>
		// 		<thead
		// 			style={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white }}
		// 			className='bg-white sticky top-0'>
		// 			{ths}
		// 		</thead>
		// 		<tbody className='h-96 overflow-y-auto'>{rows}</tbody>
		// 	</Table>
		// </ScrollArea>
	);
}
export default OrphansTable;
