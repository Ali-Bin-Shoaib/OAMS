import { ReportType } from 'types';
import moment from 'moment';
import { ActivityExecutionInfo, OrphanActivityExecution } from '@prisma/client';
type activitiesExecution = (ActivityExecutionInfo & { OrphanActivityExecution: OrphanActivityExecution[] })[];
export const filterExecutions = (reportType: ReportType, executions: activitiesExecution) => {
	const currentDate = new Date();
	switch (reportType) {
		case ReportType.Weekly: {
			return executions.filter(
				(x) =>
					moment(currentDate).isoWeek() === moment(x.startDate).isoWeek() &&
					currentDate.getFullYear() === x.startDate.getFullYear()
			);
		}
		case ReportType.Monthly:
			{
				return executions.filter(
					(x) =>
						x.startDate.getUTCMonth() === currentDate.getUTCMonth() &&
						x.startDate.getUTCFullYear() === currentDate.getUTCFullYear()
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
						return executions.filter(
							(x) =>
								[0, 1, 2].includes(x.startDate.getUTCMonth()) && currentDate.getUTCFullYear() === x.startDate.getUTCFullYear()
						);
					}
					case 3:
					case 4:
					case 5: {
						return executions.filter(
							(x) =>
								[3, 4, 5].includes(x.startDate.getUTCMonth()) && currentDate.getUTCFullYear() === x.startDate.getUTCFullYear()
						);
					}
					case 6:
					case 7:
					case 8: {
						return executions.filter(
							(x) =>
								[6, 7, 8].includes(x.startDate.getUTCMonth()) && currentDate.getUTCFullYear() === x.startDate.getUTCFullYear()
						);
					}
					case 9:
					case 10:
					case 11: {
						return executions.filter(
							(x) =>
								[9, 10, 11].includes(x.startDate.getUTCMonth()) && currentDate.getUTCFullYear() === x.startDate.getUTCFullYear()
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
export const filterOrphanExecutions = (
	reportType: ReportType,
	executions: activitiesExecution,
	orphanId: number
): OrphanActivityExecution[] => {
	const filteredExecutions = filterExecutions(reportType, executions);
	const orphanExecutions: OrphanActivityExecution[] = [];

	executions.map((execution) =>
		execution.OrphanActivityExecution.filter(
			(orphanActivityExecution) => orphanActivityExecution.orphanId === orphanId
		).map((x) => orphanExecutions.push(x))
	);

	return orphanExecutions;
};
