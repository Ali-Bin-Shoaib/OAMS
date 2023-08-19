import {
	Orphan,
	BehaviorInfo,
	BehaviorCriteria,
	EducationInfo,
	OrphanAttendance,
	OrphanActivityExecution,
} from '@prisma/client';
import { CalculateAverage } from 'utils/Calculation';

interface JsonDataProps {
	orphans: (Pick<Orphan, 'id' | 'name' | 'evaluation'> & behavior & education & attendance & activityExecution)[];
}
interface behavior {
	BehaviorInfo: BehaviorInfo & { BehaviorCriteria: Pick<BehaviorCriteria, 'evaluation'>[] }[];
}
interface education {
	EducationInfo: Pick<EducationInfo, 'degree'>[];
}
interface attendance {
	OrphanAttendance: Pick<OrphanAttendance, 'isAttended'>[];
}
interface activityExecution {
	OrphanActivityExecution: Pick<OrphanActivityExecution, 'isAttended' | 'evaluation'>[];
}
export function calculateBehaviorEvaluation(behaviors: behavior['BehaviorInfo']) {
	const evaluations: number[] = [];
	if (behaviors.length === 0) return 0;
	behaviors.map((x) => {
		evaluations.push(CalculateAverage(x.BehaviorCriteria.map((x) => x.evaluation)));
	});
	return CalculateAverage(evaluations);
}
export function calculateEducationEvaluation(education: education['EducationInfo']) {
	if (education.length === 0) return 0;
	const evaluations: number[] = [];
	education.map((x) => {
		switch (x.degree) {
			case 'EXCELLENT':
				evaluations.push(5);
				break;
			case 'VERY_GOOD':
				evaluations.push(4);
				break;
			case 'GOOD':
				evaluations.push(3);
				break;
			case 'ACCEPTED':
				evaluations.push(2);
				break;
			case 'FAIL':
				evaluations.push(1);
				break;
			default:
				console.log('default');
		}
	});
	return CalculateAverage(evaluations);
}
export function calculateAttendanceEvaluation(attendance: attendance['OrphanAttendance']) {
	const evaluations: number[] = [];
	attendance.map((x) => {
		x.isAttended ? evaluations.push(5) : evaluations.push(0);
	});
	return CalculateAverage(evaluations);
}
export function calculateActivityExecutionEvaluation(activityExecution: activityExecution['OrphanActivityExecution']) {
	const evaluations: number[] = [];
	activityExecution.map((x) => {
		switch (x.isAttended) {
			case true:
				evaluations.push(x.evaluation || 0);
				break;
			case false:
				evaluations.push(0);
				break;

			default:
				break;
		}
	});
	return CalculateAverage(evaluations);
}
export function calculateOrphanGeneralEvaluation(orphan: JsonDataProps['orphans'][0]) {
	return CalculateAverage([
		calculateActivityExecutionEvaluation(orphan.OrphanActivityExecution),
		calculateAttendanceEvaluation(orphan.OrphanAttendance),
		calculateBehaviorEvaluation(orphan.BehaviorInfo),
		calculateEducationEvaluation(orphan.EducationInfo),
	]);
}
