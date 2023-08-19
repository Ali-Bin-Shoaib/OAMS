import {
	BehaviorCriteria,
	BehaviorInfo,
	EducationInfo,
	Orphan,
	OrphanActivityExecution,
	OrphanAttendance,
} from '@prisma/client';
import { useMemo } from 'react';
import { MRT_ColumnDef } from 'mantine-react-table';
import TableComponent from 'components/common/TableComponent';
import {
	calculateActivityExecutionEvaluation,
	calculateAttendanceEvaluation,
	calculateBehaviorEvaluation,
	calculateEducationEvaluation,
	calculateOrphanGeneralEvaluation,
} from './service';

interface Props {
	orphans: JsonDataProps['orphans'];
}
interface JsonDataProps {
	orphans: (Pick<Orphan, 'id' | 'name' | 'evaluation'> & {
		BehaviorInfo: BehaviorInfo & { BehaviorCriteria: Pick<BehaviorCriteria, 'evaluation'>[] }[];
		EducationInfo: Pick<EducationInfo, 'degree'>[];
		OrphanAttendance: Pick<OrphanAttendance, 'isAttended'>[];
		OrphanActivityExecution: Pick<OrphanActivityExecution, 'isAttended' | 'evaluation'>[];
	})[];
}
function OrphansTable({ orphans }: Props) {
	const columns = useMemo<MRT_ColumnDef<(typeof orphans)[0]>[]>(
		() => [
			{ accessorFn: (row) => row.id, id: 'id', header: 'ID', maxSize: 100, size: 90 },
			{ accessorFn: (row) => row.name, id: 'name', header: 'Name', enableResizing: true },
			{
				accessorFn: (row) => calculateBehaviorEvaluation(row.BehaviorInfo).toFixed(2),
				id: 'BehaviorInfo',
				header: 'Behavior',
				enableResizing: true,
			},
			{
				accessorFn: (row) => calculateEducationEvaluation(row.EducationInfo).toFixed(2),
				id: 'EducationInfo',
				header: 'Education',
				enableResizing: true,
			},
			{
				accessorFn: (row) => calculateAttendanceEvaluation(row.OrphanAttendance).toFixed(2),
				id: 'OrphanAttendance',
				header: 'Attendance',
				enableResizing: true,
			},
			{
				accessorFn: (row) => calculateActivityExecutionEvaluation(row.OrphanActivityExecution).toFixed(2),
				id: 'OrphanActivityExecution',
				header: 'Activity Execution',
				enableResizing: true,
			},
			{
				accessorFn: (row) => row.evaluation?.toFixed(2) || calculateOrphanGeneralEvaluation(row).toFixed(2),
				id: 'evaluation',
				header: 'General Evaluation',
				enableResizing: true,
			},

			// { accessorFn: (row) => row.image, id: 'image', header: 'image', maxSize: 200, size: 100, enableResizing: true },
			// { accessorFn: (row) => row.gender, id: 'gender', header: 'gender', maxSize: 200, size: 120, enableResizing: true },
			// { accessorFn: (row) => row.age, id: 'age', header: 'age', maxSize: 200, size: 100, enableResizing: true },
			// { accessorFn: (row) => row.birthdate?.toDateString(), id: 'birthdate', header: 'birthdate' },
			// {
			// 	accessorFn: (row) => row.birthplace,
			// 	id: 'birthplace',
			// 	header: 'birthplace',
			// 	maxSize: 200,
			// 	size: 130,
			// 	enableResizing: true,
			// },
			// { accessorFn: (row) => row.joinDate?.toDateString(), id: 'joinDate', header: 'joinDate', size: 130, maxSize: 150 },
			// {
			// 	accessorFn: (row) => row.schoolName,
			// 	id: 'schoolName',
			// 	header: 'schoolName',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.gradeLevel,
			// 	id: 'gradeLevel',
			// 	header: 'gradeLevel',
			// 	maxSize: 200,
			// 	size: 130,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.lastYearPercentage,
			// 	id: 'lastYearPercentage',
			// 	header: 'lastYearPercentage',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// { accessorFn: (row) => row.fatherDeathDate?.toDateString(), id: 'fatherDeathDate', header: 'fatherDeathDate' },
			// {
			// 	accessorFn: (row) => row.fatherWork,
			// 	id: 'fatherWork',
			// 	header: 'fatherWork',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.fatherDeathCos,
			// 	id: 'fatherDeathCos',
			// 	header: 'fatherDeathCos',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.noOfFamilyMembers,
			// 	id: 'noOfFamilyMembers',
			// 	header: 'FamilyMembers',
			// 	maxSize: 300,
			// 	size: 180,
			// 	enableResizing: true,
			// },
			// { accessorFn: (row) => row.males, id: 'males', header: 'males', maxSize: 200, size: 100, enableResizing: true },
			// {
			// 	accessorFn: (row) => row.females,
			// 	id: 'females',
			// 	header: 'females',
			// 	maxSize: 200,
			// 	size: 120,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.motherName,
			// 	id: 'motherName',
			// 	header: 'motherName',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.motherStatus,
			// 	id: 'motherStatus',
			// 	header: 'motherStatus',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => (row.isMotherWorks ? 'yes' : 'no'),
			// 	id: 'isMotherWorks',
			// 	header: 'MotherWork',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.motherJob,
			// 	id: 'motherJob',
			// 	header: 'motherJob',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.motherJobPhone,
			// 	id: 'motherJobPhone',
			// 	header: 'motherJobPhone',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.monthlyIncome,
			// 	id: 'monthlyIncome',
			// 	header: 'monthlyIncome',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.liveWith,
			// 	id: 'liveWith',
			// 	header: 'liveWith',
			// 	maxSize: 200,
			// 	size: 130,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.homeType,
			// 	id: 'homeType',
			// 	header: 'homeType',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.homePhone,
			// 	id: 'homePhone',
			// 	header: 'homePhone',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.currentAddress,
			// 	id: 'currentAddress',
			// 	header: 'Address',
			// 	maxSize: 200,
			// 	size: 130,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => (row.isSponsored ? 'yes' : 'no'),
			// 	id: 'isSponsored',
			// 	header: 'isSponsored',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.foundationName,
			// 	id: 'foundationName',
			// 	header: 'foundationName',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.foundationAmount,
			// 	id: 'foundationAmount',
			// 	header: 'foundationAmount',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
			// {
			// 	accessorFn: (row) => row.evaluation,
			// 	id: 'evaluation',
			// 	header: 'evaluation',
			// 	maxSize: 200,
			// 	size: 150,
			// 	enableResizing: true,
			// },
		],
		[]
	);

	return (
		<TableComponent
			data={orphans}
			columns={columns}
			deleteUrl={''}
			editUrl={''}
			deleteTitle={''}
			infoUrl={''}
			action={false}
		/>
	);
}
export default OrphansTable;
