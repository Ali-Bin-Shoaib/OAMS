import { ReportType } from 'types';
import moment from 'moment';
import {
	ActivityExecutionInfo,
	ActivityInfo,
	Goal,
	GoalEvaluation,
	Grade,
	Orphan,
	OrphanActivityExecution,
	User,
} from '@prisma/client';

interface JsonDataProps {
	executions: (ActivityExecutionInfo & {
		ActivityInfo: ActivityInfo;
		Executer: Pick<User, 'id' | 'name'>;
		GoalEvaluation: (GoalEvaluation & { Goal: Goal })[];
		OrphanActivityExecution: OrphanActivityExecution[];
	})[];
	orphans: Pick<Orphan, 'id' | 'name'>[];
	activities: Pick<ActivityInfo, 'id' | 'title' | 'target'>[];
}

export const filterExecutionsByType = (reportType: ReportType, executions: JsonDataProps['executions']) => {
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
export const filterExecutionsByLevel = (executions: JsonDataProps['executions'], selectedLevel: Grade) => {
	return executions.filter((x) => x.ActivityInfo.target === selectedLevel);
};
export const filterExecutionsByOrphanId = (executions: JsonDataProps['executions'], orphanId: number) => {
	return executions.filter((x) => x.OrphanActivityExecution.filter((x) => x.orphanId === orphanId));
};
export const filterOrphanExecutions = (executions: JsonDataProps['executions'], orphanId: number) => {
	const orphanExecutions: { id: number; title: string; startDate: Date; evaluation: number; isAttended: boolean }[] = [];
	const tempExecutions: JsonDataProps['executions'] = [];
	executions.filter((execution) => {
		if (execution.OrphanActivityExecution.filter((x) => x.orphanId === orphanId).length !== 0) {
			tempExecutions.push({
				...execution,
				OrphanActivityExecution: execution.OrphanActivityExecution.filter((x) => x.orphanId === orphanId),
			});
		}
	});
	for (let i = 0; i < tempExecutions.length; i++) {
		for (let j = 0; j < tempExecutions[i].OrphanActivityExecution.length; j++) {
			orphanExecutions.push({
				id: tempExecutions[i].OrphanActivityExecution[j].id,
				title: tempExecutions[i].ActivityInfo.title!,
				startDate: tempExecutions[i].startDate,
				evaluation: tempExecutions[i].OrphanActivityExecution[j].evaluation || 0,
				isAttended: tempExecutions[i].OrphanActivityExecution[j].isAttended,
			});
		}
	}

	return orphanExecutions;
};
export const filterOrphanExecutionsByActivity = (
	reportType: ReportType,
	executions: JsonDataProps['executions'],
	orphanId: number,
	activityId: number
): OrphanActivityExecution[] => {
	const filteredExecutions = filterExecutionsByType(reportType, executions);
	const orphanExecutions: OrphanActivityExecution[] = [];

	filteredExecutions.map((execution) =>
		execution.OrphanActivityExecution.filter((x) => x.orphanId === orphanId).map((x) => orphanExecutions.push(x))
	);

	return orphanExecutions;
};
