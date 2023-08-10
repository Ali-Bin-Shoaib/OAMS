import { Attendance, OrphanAttendance, User } from '@prisma/client';
import prisma from 'lib/prisma';
import { GetServerSideProps, GetStaticProps } from 'next';
import SuperJSON from 'superjson';

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
	attendances: Attendance & { OrphanAttendance: OrphanAttendance; User: Pick<User, 'id' | 'name'> };
}
interface Props {
	jsonData: string;
}
function Index({ jsonData }: Props) {
	console.log('🚀 ~ file: index.tsx:16 ~ Index ~ jsonData:', jsonData);
	return <div>Index</div>;
}
export default Index;
