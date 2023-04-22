import { Table } from '@mantine/core';
import { Orphan } from '@prisma/client';
import { ReactNode } from 'react';
import { v4 } from 'uuid';

interface Props {
	orphans: Orphan[];
	updateCard(orphan: Orphan): void;
}
function OrphansTable({ orphans, updateCard }: Props) {
	const ths = (
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Image</th>
			<th>Gender</th>
			<th>Age</th>
			<th>Birthdate</th>
			<th>Birthplace</th>
			<th>Join Date</th>
			<th>School Name</th>
			<th>Grade Level</th>
			<th>Last Year Percentage</th>
			<th>Father Death Date</th>
			<th>Father Work</th>
			<th>Father Death Cos</th>
			<th>Family Members</th>
			<th>Males</th>
			<th>Females</th>
			<th>Mother Name</th>
			<th>Mother Status</th>
			<th>Is Mother Works</th>
			<th>Mother Job</th>
			<th>Mother Job Phone</th>
			<th>Monthly Income</th>
			<th>Live With</th>
			<th>Home Type</th>
			<th>Home Phone</th>
			<th>Current Address</th>
			<th>Is Sponsored</th>
			<th>Foundation Name</th>
			<th>Foundation Amount</th>
			<th>Evaluation</th>
		</tr>
	);

	const rows = orphans.map((orphan) => {
		return (
			<tr
				key={v4()}
				onClick={() => {
					updateCard(orphan);
				}}>
				<td className='-m-px '>{orphan.id}</td>
				<td className='-m-px'>{orphan.name}</td>
				<td className='-m-px'>{orphan.image}</td>
				<td className='-m-px'>{orphan.gender}</td>
				<td className='-m-px'>{orphan.age}</td>
				<td className='-m-px'>{orphan.birthdate as ReactNode}</td>
				<td className='-m-px'>{orphan.birthplace}</td>
				<td className='-m-px'>{orphan.joinDate as ReactNode}</td>
				<td className='-m-px'>{orphan.schoolName}</td>
				<td className='-m-px'>{orphan.gradeLevel}</td>
				<td className='-m-px'>{orphan.lastYearPercentage}</td>
				<td className='-m-px'>{orphan.fatherDeathDate as ReactNode}</td>
				<td className='-m-px'>{orphan.fatherWork}</td>
				<td className='-m-px'>{orphan.fatherDeathCos}</td>
				<td className='-m-px'>{orphan.noOfFamilyMembers}</td>
				<td className='-m-px'>{orphan.males}</td>
				<td className='-m-px'>{orphan.females}</td>
				<td className='-m-px'>{orphan.motherName}</td>
				<td className='-m-px'>{orphan.motherStatus}</td>
				<td className='-m-px'>{orphan.isMotherWorks}</td>
				<td className='-m-px'>{orphan.motherJob}</td>
				<td className='-m-px'>{orphan.motherJobPhone}</td>
				<td className='-m-px'>{orphan.monthlyIncome}</td>
				<td className='-m-px'>{orphan.liveWith}</td>
				<td className='-m-px'>{orphan.homeType}</td>
				<td className='-m-px'>{orphan.homePhone}</td>
				<td className='-m-px'>{orphan.currentAddress}</td>
				<td className='-m-px'>{orphan.isSponsored}</td>
				<td className='-m-px'>{orphan.foundationName}</td>
				<td className='-m-px'>{orphan.foundationAmount}</td>
				<td className='-m-px'>{orphan.evaluation}</td>
			</tr>
		);
	});

	return (
		<Table striped highlightOnHover withBorder withColumnBorders>
			<thead>{ths}</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
}
export default OrphansTable;
