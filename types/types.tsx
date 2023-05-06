import { Gender, Grade, Prisma, Status } from '@prisma/client';

export enum REQUEST_METHODS {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PUT = 'PUT',
	PATCH = 'PATCH',
}
export enum STATUS_CODE {
	NotFound = 404,
	Success = 200,
	Accepted = 202,
	BadRequest = 400,
	UnexpectedError = 500,
}
export interface _Orphan {
	id?: number;
	name: string;
	image: File | null;
	gender: string | undefined;
	age: number | '';
	birthplace: string;
	birthdate: Date | null;
	joinDate: Date | null;
	schoolName: string;
	gradeLevel: Grade | null;
	lastYearPercentage: number | '';
	fatherDeathDate: Date | null;
	fatherWork: string;
	fatherDeathCos: string;
	noOfFamilyMembers: number | '';
	males: number | '';
	females: number | '';
	motherName: string;
	motherStatus: Status | null;
	isMotherWorks: string | number | readonly string[] | undefined;
	motherJob: string;
	motherJobPhone: string;
	monthlyIncome: number | '';
	liveWith: string;
	homeType: string;
	homePhone: string;
	currentAddress: string;
	isSponsored: string | number | readonly string[] | undefined;
	foundationName: string;
	foundationAmount: number | '';
	evaluation: number | '';
	guardianId: number | '';
}
