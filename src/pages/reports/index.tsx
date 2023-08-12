import { Attendance, Orphan, OrphanAttendance, User } from '@prisma/client';
import AttendanceTable from 'components/attendance/AttendanceTable';
import TableComponent from 'components/common/TableComponent';
import prisma from 'lib/prisma';
import { GetServerSideProps, GetStaticProps } from 'next';
import SuperJSON from 'superjson';
import { _Attendance } from 'types';

export const getStaticProps: GetStaticProps = async () => {
	try {
		const attendances = await prisma.attendance.findMany({
			include: { OrphanAttendance: true, User: { select: { id: true, name: true } } },
		});
		const orphans = await prisma.orphan.findMany({ select: { id: true, name: true } });
		const data = { attendances, orphans };
		const jsonData = SuperJSON.stringify(data);
		console.log('🚀 ~ file: index.tsx:12 ~ constgetStaticProps:GetStaticProps= ~ data:', data);
		return { props: { jsonData } };
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:14 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
		return { props: {} };
	}
};
interface JsonDataProps {
	attendances: Attendance & { OrphanAttendance: OrphanAttendance; User: Pick<User, 'id' | 'name'> }[];
	orphans: Pick<Orphan, 'id' | 'name'>[];
}
interface Props {
	jsonData: string;
}
function Index({ jsonData }: Props) {
	const { attendances, orphans }: JsonDataProps = SuperJSON.parse<JsonDataProps>(jsonData);
	console.log('🚀 ~ file: index.tsx:31 ~ Index ~ orphans:', orphans);
	console.log('🚀 ~ file: index.tsx:31 ~ Index ~ attendances:', attendances);
	return (
		<>
			<div className='p-2 m-2 pt-5'>
				<AttendanceTable attendance={attendances as unknown as _Attendance[]} />
			</div>
		</>
	);
}
export default Index;
