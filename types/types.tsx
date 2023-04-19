import { Gender, Grade, Status } from '@prisma/client';

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
}

export interface ORPHAN {
	id?: number | undefined;
	name: string | undefined;
	image?: File | null;
	gender: Gender | undefined;
	age: number | undefined;
	birthplace: string | undefined;
	birthdate: Date | undefined;
	joinDate: Date | undefined;
	schoolName: string;
	gradeLevel: Grade | undefined;
	lastYearPercentage: number;
	fatherDeathDate: Date | undefined;
	fatherWork?: string | undefined;
	fatherDeathCos?: string | undefined;
	noOfFamilyMembers: number | undefined;
	males: number | undefined;
	females: number | undefined;
	motherName: string | undefined;
	motherStatus: Status | undefined;
	isMotherWorks: boolean | string | undefined;
	motherJob?: string | undefined;
	motherJobPhone?: string | undefined;
	monthlyIncome?: number | undefined;
	liveWith: string | undefined;
	homeType: string | undefined;
	homePhone: string | undefined;
	currentAddress: string | undefined;
	isSponsored: boolean | string | undefined;
	foundationName?: string | undefined;
	foundationAmount?: number | undefined;
	evaluation?: number | undefined;
	guardianId?: number | undefined;
}
