export function CalculateAverage(arr: number[]) {
	const total = arr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
	return total / arr.length;
}
export function CalculateTotalEvaluation(arr1: number[][], arr2: number[][]) {
	return CalculateAverage([
		CalculateAverage(arr1.map((x) => CalculateAverage(x.map((y) => y)))),
		CalculateAverage(arr2.map((x) => CalculateAverage(x.map((y) => y)))),
	]);
}
