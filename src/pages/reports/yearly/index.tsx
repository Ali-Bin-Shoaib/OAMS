import { Badge, Center, Paper } from '@mantine/core';
import {
	Sponsor,
	Sponsorship,
	Orphan,
	User,
	BehaviorCriteria,
	BehaviorInfo,
	EducationInfo,
	OrphanActivityExecution,
	OrphanAttendance,
} from '@prisma/client';
import InfoComponent from 'components/common/infoComponent';
import OrphansTable from 'components/orphans/OrphansTable';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import SuperJSON from 'superjson';

export const getStaticProps: GetStaticProps = async () => {
	const date = new Date();
	try {
		const orphansCount = await prisma.orphan.count({
			where: { joinDate: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const sponsorshipsCount = await prisma.sponsorship.count({
			where: { createdAt: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const attendancesCount = await prisma.attendance.count({
			where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const activitiesCount = await prisma.activityInfo.count({
			where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const executionsCount = await prisma.activityExecutionInfo.count({
			where: { startDate: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const behaviorsCount = await prisma.behaviorInfo.count({
			where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const educationsCount = await prisma.educationInfo.count({
			where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const healthCount = await prisma.healthInfo.count({
			where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const notificationsCount = await prisma.notification.count({
			where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
		});
		const orphans = await prisma.orphan.findMany({
			where: { joinDate: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },

			select: {
				id: true,
				name: true,
				evaluation: true,
				BehaviorInfo: {
					select: { BehaviorCriteria: { select: { evaluation: true } } },
					where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
				},
				EducationInfo: {
					select: { degree: true },
					where: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
				},
				OrphanAttendance: {
					select: { isAttended: true },
					where: {
						Attendance: { date: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) } },
					},
				},
				OrphanActivityExecution: {
					select: { isAttended: true, evaluation: true },
					where: {
						ActivityExecutionInfo: {
							startDate: { gte: new Date(date.getFullYear(), 0, 1), lte: new Date(date.getFullYear(), 11, 31) },
						},
					},
				},
			},
			orderBy: { id: 'asc' },
		});

		const yearData: { label: string; value: number }[] = [
			{ label: 'New Orphans:', value: orphansCount },
			{ label: 'New Sponsorships:', value: sponsorshipsCount },
			{ label: 'New Activities:', value: activitiesCount },
			{ label: 'New Attendance:', value: attendancesCount },
			{ label: 'New Executions:', value: executionsCount },
			{ label: 'New Behaviors:', value: behaviorsCount },
			{ label: 'New Health:', value: healthCount },
			{ label: 'New Notifications:', value: notificationsCount },
		];
		const data = { yearData, orphans };
		const stringData = SuperJSON.stringify(data);
		console.log('🚀 ~ file: index.tsx:73 ~ constgetStaticProps:GetStaticProps= ~ data:', data);
		return { props: { stringData } };
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:15 ~ constgetStaticProps:GetStaticProps= ~ error:', error);
	}
	return { props: {} };
};
interface Props {
	stringData: string;
}
interface JsonData {
	yearData: { label: string; value: number }[];
	orphans: (Pick<Orphan, 'id' | 'name' | 'evaluation'> & {
		BehaviorInfo: BehaviorInfo & { BehaviorCriteria: Pick<BehaviorCriteria, 'evaluation'>[] }[];
		EducationInfo: Pick<EducationInfo, 'degree'>[];
		OrphanAttendance: Pick<OrphanAttendance, 'isAttended'>[];
		OrphanActivityExecution: Pick<OrphanActivityExecution, 'isAttended' | 'evaluation'>[];
	})[];
}
function YearlyReportIndex({ stringData }: Props) {
	const { yearData, orphans } = SuperJSON.parse<JsonData>(stringData);
	console.log('🚀 ~ file: index.tsx:93 ~ YearlyReportIndex ~ orphans:', orphans);
	return (
		<>
			<div className='container mx-auto p-5 '>
				<Center>
					<Badge size='xl'>{new Date().toDateString()}</Badge>
				</Center>
				<Paper shadow='xl'>
					<InfoComponent
						data={yearData.map((x) => ({ label: x.label, value: x.value }))}
						title={new Date().getUTCFullYear() + ' Entries'}
					/>
				</Paper>
			</div>
			<OrphansTable orphans={orphans} />
		</>
	);
}
export default YearlyReportIndex;
