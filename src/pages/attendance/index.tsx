import { GetStaticProps } from 'next';
import prisma from '../../../lib/prisma';
import { useEffect, useState } from 'react';
import { Button, Loader, TextInput } from '@mantine/core';
import SuperJSON from 'superjson';
import { _Attendance, _Orphan } from '../../../types';
import AttendanceTable from '../../../components/attendance/AttendanceTable';
import { useRouter } from 'next/router';
import { serverLink } from '../../../shared/links';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { DateInput, DatePicker, DatePickerInput } from '@mantine/dates';

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
	const attendance = await prisma.attendance.findMany({
		select: {
			id: true,
			date: true,
			User: { select: { id: true, name: true } },
			OrphanAttendance: { include: { Orphan: { select: { name: true } } } },
		},
		orderBy: { date: 'desc' },
	});
	const stringJson = SuperJSON.stringify(attendance);
	return { props: { stringJson } };
};

interface Props {
	stringJson: string;
}
export default function Index({ stringJson }: Props) {
	console.log('Attendance Index');
	const attendance = SuperJSON.parse<_Attendance[]>(stringJson);
	const [hydration, setHydration] = useState(false);
	const router = useRouter();
	const [searchByName, setSearchByName] = useState<string>('');
	const [searchByDate, setSearchByDate] = useState<Date | undefined>(undefined);
	useEffect(() => {
		setHydration(true);
	}, [hydration, stringJson]);

	if (!hydration) return <Loader size={100} />;
	return (
		<>
			<div className='text-center'>
				<Button size='xl' m={15} onClick={() => router.push(serverLink + 'attendance/create')}>
					<IconPlus />
					Add new Attendance
				</Button>
			</div>
			<div className=' p-0.5 mx-auto my-0.5 flex flex-wrap justify-center'>
				<TextInput
					onChange={(e) => setSearchByName(e.target.value)}
					w={'40%'}
					onBlur={(e) => {
						setSearchByName('');
						e.target.value = '';
					}}
					label='Orphan Name'
					placeholder='Search'
					description='search about orphan by name'
					icon={<IconSearch />}
				/>
				<DateInput
					dateParser={(input) => {
						console.log('🚀 ~ file: index.tsx:66 ~ Index ~ input:', input);
						setSearchByDate(new Date(input));
						return new Date(input);
					}}
					label='Date'
					description='search about orphan by attendance date'
					onChange={(e) => setSearchByDate(e as Date)}
					w={'40%'}
					clearable
					// onBlur={() => setSearchByDate(undefined)}
				/>
			</div>
			<AttendanceTable
				attendance={
					searchByName || searchByDate ? filterAttendance({ attendance, searchByName, searchByDate }) : attendance
				}
			/>
		</>
	);
}
interface filterAttendanceProps {
	attendance: _Attendance[];
	searchByName?: string;
	searchByDate?: Date | undefined;
}
const filterAttendance = ({ attendance, searchByName, searchByDate }: filterAttendanceProps) => {
	console.log('🚀 ~ file: index.tsx:86 ~ filterAttendance ~ searchByDate:', searchByDate);
	let filteredAttendance: _Attendance[] = [];
	for (let i = 0; i < attendance.length; i++) {
		if (searchByName && searchByName !== '') {
			for (let j = 0; j < attendance[i].OrphanAttendance.length; j++) {
				if (attendance[i].OrphanAttendance[j].Orphan?.name?.toLowerCase().includes(searchByName.toLowerCase())) {
					filteredAttendance.push(attendance[i]);
				}
			}
		}
		if (searchByDate) {
			console.log('🚀 ~ file: index.tsx:104 ~ filterAttendance ~ attendance[i].date:', attendance[i].date);
			if (attendance[i].date.toDateString() === searchByDate.toDateString()) {
				console.log('🚀 ~ file: index.tsx:104 ~ filterAttendance ~ searchByDate:', searchByDate);
				filteredAttendance.push(attendance[i]);
			}
		}
	}
	console.log('🚀 ~ file: index.tsx:92 ~ filterAttendance ~ filteredAttendance:', filteredAttendance);
	return filteredAttendance;
};
