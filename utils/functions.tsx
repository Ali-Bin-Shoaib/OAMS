import { Orphan } from '@prisma/client';

export const strToBool = (value: string) => {
	if (value && typeof value === 'string') {
		if (value.toLowerCase() === 'true' || 'yes') return true;
		if (value.toLowerCase() === 'false' || 'no') return false;
	}
	return value;
};

// export function strToDate(orphans: Orphan[]): Orphan[] {
// 	const v = ['joinDate', 'fatherDeathDate', 'birthdate'];
// 	type key = keyof typeof orphans[0];
// 	orphans.map((orphan) => {
// 		v.map((x) => {
// 			// typeof orphan[x as key] === 'string'
// 			// 	? (orphan[x as key] = new Date(orphan[x as key] as string) | orphan[x as key])
// 			// 	: orphan[x as key];
// 				if (orphan[x as key] === 'string') {
// 					orphan[x as key] = new Date(orphan[x as key] )as string
// 				}
// 				return orphan[x as key];
// 		});
// 	});

// 	return orphans;
// }
