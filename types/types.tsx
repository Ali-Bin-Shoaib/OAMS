import {
	ActivityGoal,
	ActivityInfo,
	Attendance,
	Gender,
	GoalInfo,
	Grade,
	Guardian,
	Orphan,
	OrphanAttendance,
	PaymentMethod,
	Prisma,
	Quarter,
	Sponsor,
	Sponsorship,
	SponsorshipPeriod,
	Status,
	User,
	UserType,
} from '@prisma/client';
import prisma from '../lib/prisma';

export enum REQUEST_METHODS {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PUT = 'PUT',
	PATCH = 'PATCH',
}
export enum STATUS_CODE {
	// 1xx Informational
	CONTINUE = 100, // The request has been received, continuing process
	SWITCHING_PROTOCOLS = 101, // Switching to a new protocol
	PROCESSING = 102, // The request is still being processed

	// 2xx Success
	OK = 200, // The request has been successfully processed
	CREATED = 201, // The request has been fulfilled and has resulted in one or more new resources being created
	ACCEPTED = 202, // The request has been accepted for processing, but the processing has not been completed
	PARTIAL_CONTENT = 206, // The request has been fulfilled for a portion of the resource
	MULTIPLE_CHOICES = 300, // The request could not be fulfilled due to a conflict with the current state of the target resource
	MOVED_PERMANENTLY = 301, // The requested resource has been assigned a new permanent URI
	FOUND = 302, // The requested resource resides temporarily under a different URI
	SEE_OTHER = 303, // The response indicates that the user agent SHOULD NOT automatically redirect the request
	NOT_MODIFIED = 304, // The requested resource has not been modified since the last request
	USE_PROXY = 305, // The request must be repeated through the proxy
	TEMPORARY_REDIRECT = 307, // The request has been temporarily redirected

	// 4xx Client Error
	BAD_REQUEST = 400, // The request could not be understood by the server due to malformed syntax
	UNAUTHORIZED = 401, // The request requires user authentication
	PAYMENT_REQUIRED = 402, // Payment is required
	FORBIDDEN = 403, // The server understood the request, but is refusing to fulfill it
	NOT_FOUND = 404, // The requested resource could not be found
	METHOD_NOT_ALLOWED = 405, // The method specified in the request is not allowed for the requested resource
	NOT_ACCEPTABLE = 406, // The requested resource is not acceptable according to the Accept headers sent in the request
	PROXY_AUTHENTICATION_REQUIRED = 407, // The request requires authentication with the proxy
	REQUEST_TIMEOUT = 408, // The server did not receive a complete request within the time that it was prepared to wait
	CONFLICT = 409, // The request could not be completed due to a conflict with the current state of the target resource
	GONE = 410, // The requested resource is no longer available at the server and no forwarding address is known
	LENGTH_REQUIRED = 411, // The request did not specify the length of the message-body
	PRECONDITION_FAILED = 412, // The request has preconditions that were not met
	PAYLOAD_TOO_LARGE = 413, // The request is larger than the server can handle
	URI_TOO_LONG = 414, // The requested URI is longer than the server can handle
	UNSUPPORTED_MEDIA_TYPE = 415, // The request entity has a media type that the server does not support
	REQUEST_HEADER_FIELDS_TOO_LARGE = 416, // The request header fields are too large for the server to handle
	EXPECTATION_FAILED = 417, // The server cannot meet the expectations given in the Expect request header field
	INSUFFICIENT_STORAGE = 418, // The server is unable to store the request due to insufficient storage
	INTERNAL_SERVER_ERROR = 500, // The server encountered an unexpected condition that prevented it from fulfilling the request
	NOT_IMPLEMENTED = 501, // The server does not support the functionality required to fulfill the request
	BAD_GATEWAY = 502, // The server, while acting as a gateway or proxy, received an invalid response from an upstream server
	SERVICE_UNAVAILABLE = 503, // The server is currently unavailable (overloaded or down)
	GATEWAY_TIMEOUT = 504, // The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server
	HTTP_VERSION_NOT_SUPPORTED = 505, // The server does not support the HTTP protocol version that was used in the request
}
export type orphanWithGuardianAndSponsorshipInfo = Orphan & {
	Guardian?:
	| (Guardian & {
		user?: User;
	})
	| null;
	Sponsorship?: (Sponsorship & {
		Sponsor?: Sponsor & {
			user?: User;
		};
	})[];
};
export interface _Orphan {
	id?: number;
	name: string | undefined;
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
	// guardian?: Guardian;
}

export interface _UserWithGuardianAndSponsor {
	id?: number;
	name: string | number | readonly string[] | undefined;
	gender: Gender;
	userName: string | number | readonly string[] | undefined;
	password: string | number | readonly string[] | undefined;
	email?: string | number | readonly string[] | undefined;
	address: string | number | readonly string[] | undefined;
	phone: string | number | readonly string[] | undefined;
	type: UserType | undefined;

	guardian?: {
		relationship: string | number | readonly string[] | undefined;
		userId?: number;
		id?: number;
	};
	sponsor?: {
		birthdate: Date | null;
		fax: string | number | readonly string[] | undefined;
		identityNumber: number | '' | undefined;
		userId: number;
	};
}
export interface _SponsorshipWithSponsorAndOrphan {
	id?: number;
	createdAt?: Date;
	startDate?: Date;
	endDate?: Date;
	paymentMethod?: PaymentMethod;
	sponsorshipPeriod?: SponsorshipPeriod;
	isActive: boolean;
	sponsorId?: number;
	orphanId?: number;
}
export type _User = Prisma.UserCreateInput & {
	sponsor?: Prisma.SponsorCreateInput;
	guardian?: Prisma.GuardianCreateInput;
};
export interface _Guardian extends Guardian {
	user: User;
}

export type _Sponsor = Sponsor & { user: User; Sponsorship: Sponsorship[] };

export type _Sponsorship = {
	id?: number;
	createdAt: Date;
	startDate: Date;
	endDate: Date;
	paymentMethod: PaymentMethod;
	sponsorshipPeriod: SponsorshipPeriod;
	// isActive: boolean | undefined;
	isActive: string | number | readonly string[] | undefined;
	sponsorId: string;
	orphanId: string;
};
export type _SponsorshipFormData = {
	sponsorship?: Sponsorship;
	sponsors: (Sponsor & { Sponsorship: Sponsorship[]; user: User })[];
	orphans: Orphan[];
};

export type _Attendance = {
	id?: number;
	date: Date;
	userId: number;
} & {
	OrphanAttendance: (_OrphanAttendance & { Orphan?: _Orphan })[];
	User?: User;
};

export interface _OrphanAttendance {
	id?: number;
	isAttended: boolean;
	absentReason: string | number | readonly string[] | undefined;
	notes: string | number | readonly string[] | undefined;
	returnDay: Date | null;
	justification: string | number | readonly string[] | undefined;
	attendanceId?: number;
	orphanId?: number;
	userId?: number;
}
// let data: _ActivityInfo;
// export type ActivityAndGoals = _ActivityInfo;

export type _ActivityInfo = {
	id?: number;
	date?: Date;
	title?: string | string | number | readonly string[] | undefined;
	budget?: number | '';
	target?: string | number | readonly string[];
	type?: string | number | readonly string[];
	quarter?: Quarter;
	userId?: number | null;
	selectedGoals?: string[] | undefined
} & {
	ActivityGoal?: (_ActivityGoal & { GoalInfo?: _GoalInfo })[];
	User?: User | null;
};
export type _ActivityGoal = {
	id?: number;
	evaluation?: number;
	date?: Date;
	activityInfoId?: number | null;
	goalInfoId?: number | null;
	activityExecutionInfoId?: number | null;
	userId?: number | null;
};

export type _GoalInfo = {
	id?: number;
	title?: string;
	userId?: number | null;
};
