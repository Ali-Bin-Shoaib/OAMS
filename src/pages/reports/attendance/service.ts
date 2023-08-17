import { Attendance, OrphanAttendance, User } from '@prisma/client';
import { ReportType } from 'types';
import moment from 'moment';

type attendance = (Attendance & { OrphanAttendance: OrphanAttendance[]; User: Pick<User, 'id' | 'name'> })[];
export const filterAttendance = (reportType: ReportType, attendances: attendance) => {
	const currentDate = new Date();
	switch (reportType) {
		case ReportType.Weekly: {
			return attendances.filter(
				(x) =>
					moment(currentDate).isoWeek() === moment(x.date).isoWeek() && currentDate.getFullYear() === x.date.getFullYear()
			);
		}
		case ReportType.Monthly:
			{
				return attendances.filter(
					(x) =>
						x.date.getUTCMonth() === currentDate.getUTCMonth() && currentDate.getUTCFullYear() === x.date.getUTCFullYear()
				);
			}
			break;
		case ReportType.Quarterly:
			{
				const currentMonth = currentDate.getUTCMonth();
				switch (currentMonth) {
					case 0:
					case 1:
					case 2: {
						return attendances.filter(
							(x) => [0, 1, 2].includes(x.date.getUTCMonth()) && currentDate.getUTCFullYear() === x.date.getUTCFullYear()
						);
					}
					case 3:
					case 4:
					case 5: {
						return attendances.filter(
							(x) => [3, 4, 5].includes(x.date.getUTCMonth()) && currentDate.getUTCFullYear() === x.date.getUTCFullYear()
						);
					}
					case 6:
					case 7:
					case 8: {
						return attendances.filter(
							(x) => [6, 7, 8].includes(x.date.getUTCMonth()) && currentDate.getUTCFullYear() === x.date.getUTCFullYear()
						);
					}
					case 9:
					case 10:
					case 11: {
						return attendances.filter(
							(x) => [9, 10, 11].includes(x.date.getUTCMonth()) && currentDate.getUTCFullYear() === x.date.getUTCFullYear()
						);
					}
				}
			}
			break;

		default:
			console.error('default');
			break;
	}
	return [];
};
export const filterOrphanAttendance = (
	reportType: ReportType,
	attendance: attendance,
	orphanId: number
): OrphanAttendance[] => {
	const filteredAttendance = filterAttendance(reportType, attendance);
	const orphanAttendance: OrphanAttendance[] = [];
	for (let i = 0; i < filteredAttendance.length; i++) {
		for (let j = 0; j < filteredAttendance[i].OrphanAttendance.length; j++) {
			if (filteredAttendance[i].OrphanAttendance[j].orphanId === orphanId)
				orphanAttendance.push(filteredAttendance[i].OrphanAttendance[j]);
		}
	}
	return orphanAttendance;
};
