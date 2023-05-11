import { Gender, Grade, Guardian, Sponsor, Status, User, UserType } from '@prisma/client';

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
	guardian: Guardian;
}

export interface _BigUser {
	id?: number;
	name: string | number | readonly string[] | undefined;
	gender: Gender;
	userName: string | number | readonly string[] | undefined;
	password: string | number | readonly string[] | undefined;
	email?: string | number | readonly string[] | undefined;
	address: string | number | readonly string[] | undefined;
	phone: string | number | readonly string[] | undefined;
	type: UserType | undefined;

	guardian?: { relationship: string | number | readonly string[] | undefined; userId?: number; id?: number };
	sponsor?: {
		birthdate: Date | null;
		fax: string | number | readonly string[] | undefined;
		identityNumber: number | '' | undefined;
		userId: number;
	};
}

export type _User = User & { sponsor?: Sponsor; guardian?: Guardian };
export type _Guardian = Guardian & { user: User };
export type _Sponsor = Sponsor & { user: User };
