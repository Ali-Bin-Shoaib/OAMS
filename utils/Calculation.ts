export function CalculateAverage(arr: number[]) {
	const total = arr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
	return total / arr.length;
}
export function CalculateTotalEvaluation(arr1: number[][] | undefined, arr2: number[][] | undefined) {
	if (arr1 && arr2)
		return CalculateAverage([
			CalculateAverage(arr1.map((x) => CalculateAverage(x.map((y) => y)))),
			CalculateAverage(arr2.map((x) => CalculateAverage(x.map((y) => y)))),
		]);
}
export function CalculateOrphanEvaluation(
	behaviorInfo: number[],
	educationInfo: number[],
	attendanceInfo: number[],
	activityExecutionInfo: number[] | number[][],
	activityExecutionAttendanceInfo: number | boolean
) {
	/** @requires
	 *  orphan behavior info[evaluation]
	 * education info[evaluation]
	 * activity execution info[evaluation]
	 * attendance[evaluation]
	 * */
}
