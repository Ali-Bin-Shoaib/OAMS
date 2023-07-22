import {
	Orphan,
	Prisma,
	Guardian,
	Sponsor,
	Sponsorship,
	User,
	Grade,
	Status,
	UserType,
	Gender,
	PaymentMethod,
	SponsorshipPeriod,
	Quarter,
	ActivityExecutionInfo,
	ActivityGoal,
	ActivityInfo,
	GoalEvaluation,
	Degree,
	Room,
	Wings,
} from '@prisma/client';
import { AxiosResponse } from 'axios';
import prisma from '../lib/prisma';
import { DefaultUser, Session } from 'next-auth';
export enum REQUEST_METHODS {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PUT = 'PUT',
	PATCH = 'PATCH',
}
export enum STATUS_CODE {
	// Informational 1xx
	CONTINUE = 100, // The server has received the request headers and the client should proceed to send the request body.
	SWITCHING_PROTOCOLS = 101, // The requester has asked the server to switch protocols and the server has agreed to do so.
	PROCESSING = 102, // The server is processing the request, but no response is available yet.

	// Successful 2xx
	OK = 200, // The request has succeeded.
	CREATED = 201, // The request has been fulfilled and a new resource has been created.
	ACCEPTED = 202, // The request has been accepted for processing, but the processing has not been completed.
	NON_AUTHORITATIVE_INFORMATION = 203, // The server successfully processed the request, but is returning information that may be from another source.
	NO_CONTENT = 204, // The server successfully processed the request, but is not returning any content.
	RESET_CONTENT = 205, // The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.
	PARTIAL_CONTENT = 206, // The server is delivering only part of the resource due to a range header sent by the client.
	MULTI_STATUS = 207, // The response contains multiple status codes
	ALREADY_REPORTED = 208, // The request was already reported
	IM_USED = 209, // The resource is temporarily unavailable

	// Redirection 3xx
	MULTIPLE_CHOICES = 300, // The request has more than one possible response.
	MOVED_PERMANENTLY = 301, // The resource has permanently moved to a new location.
	FOUND = 302, // The resource has temporarily moved to a new location.
	SEE_OTHER = 303, // The response to the request can be found under a different URI.
	NOT_MODIFIED = 304, // The resource has not been modified since the last request.
	USE_PROXY = 305, // The requested resource must be accessed through the proxy given by the Location field.
	SWITCH_PROXY = 306, // No longer used. Originally meant "Subsequent requests should use the specified proxy."
	TEMPORARY_REDIRECT = 307, // The request should be repeated with another URI, but future requests can still use the original URI.
	PERMANENT_REDIRECT = 308, // The request and all future requests should be repeated using another URI.

	// Client Error 4xx
	BAD_REQUEST = 400, // The server cannot or will not process the request due to an apparent client error.
	UNAUTHORIZED = 401, // Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.
	PAYMENT_REQUIRED = 402, // Reserved for future use.
	FORBIDDEN = 403, // The server understood the request, but is refusing to fulfill it.
	NOT_FOUND = 404, // The requested resource could not be found but may be available in the future.
	METHOD_NOT_ALLOWED = 405, // A request method is not supported for the requested resource.
	NOT_ACCEPTABLE = 406, // The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
	PROXY_AUTHENTICATION_REQUIRED = 407, // The client must first authenticate itself with the proxy.
	REQUEST_TIMEOUT = 408, // The server timed out waiting for the request.
	CONFLICT = 409, // Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
	GONE = 410, // Indicates that the resource requested is no longer available and will not be available again.
	LENGTH_REQUIRED = 411, // The request did not specify the length of its content, which is required by the requested resource.
	PRECONDITION_FAILED = 412, // The server does not meet one of the preconditions that the requester put on the request.
	PAYLOAD_TOO_LARGE = 413, // The request is larger than the server is willing or able to process.
	URI_TOO_LONG = 414, // The URI provided was too long for the server to process.
	UNSUPPORTED_MEDIA_TYPE = 415, // The request entity has a media type which the server or resource does not support.
	RANGE_NOT_SATISFIABLE = 416, // The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
	EXPECTATION_FAILED = 417, // The server cannot meet the requirements of the Expect header field.
	MISDIRECTED_REQUEST = 421, // The request was directed at a server that is not able to produce a response.
	UNPROCESSABLE_ENTITY = 422, // The request was well-formed but was unable to be followed due to semantic errors.
	LOCKED = 423, // The resource that is being accessed is locked.
	FAILED_DEPENDENCY = 424, // The request failed due to a failure of a previous request.
	TOO_EARLY = 425, // Indicates that the server is unwilling to risk processing a request that might be replayed.
	UPGRADE_REQUIRED = 426, // The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
	PRECONDITION_REQUIRED = 428, // The origin server requires the request to be conditional.
	TOO_MANY_REQUESTS = 429, // The user has sent too many requests in a given amount of time.
	REQUEST_HEADER_FIELDS_TOO_LARGE = 431, // The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.
	UNAVAILABLE_FOR_LEGAL_REASONS = 451, // A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.

	// Server Error 5xx
	INTERNAL_SERVER_ERROR = 500, // A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
	NOT_IMPLEMENTED = 501, // The server either does not recognize the request method, or it lacks the ability to fulfill the request.
	BAD_GATEWAY = 502, // The server was acting as a gateway or proxy and received an invalid response from the upstream server.
	SERVICE_UNAVAILABLE = 503, // The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
	GATEWAY_TIMEOUT = 504, // The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
	HTTP_VERSION_NOT_SUPPORTED = 505, // The server does not support the HTTP protocol version used in the request.
	VARIANT_ALSO_NEGOTIATES = 506, // Transparent content negotiation for the request results in a circular reference.
	INSUFFICIENT_STORAGE = 507, // The server is unable to store the representation needed to complete the request.
	LOOP_DETECTED = 508, // The server detected an infinite loop while processing the request.
	NOT_EXTENDED = 510, // Further extensions to the request are required for the server to fulfill it.
	NETWORK_AUTHENTICATION_REQUIRED = 511, // The client needs to authenticate to gain network access.
}
export type ResponseType = { data: any; msg: string };

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
export type _Orphan = {
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
};

export interface _UserWithGuardianAndSponsor {
	id?: number;
	name: string;
	gender: Gender;
	username: string;
	password: string;
	email?: string;
	address: string;
	phone: string;
	type: UserType | undefined;

	Guardian?: {
		relationship: string;
		userId?: number;
		id?: number;
	};
	Sponsor?: {
		birthdate: Date | null;
		fax: string;
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
export type _User = {
	id?: number;
	name: string;
	gender: Gender;
	username: string;
	password: string;
	email?: string | null;
	address: string;
	phone: string;
	type: UserType;
	Guardian?: Prisma.GuardianCreateNestedOneWithoutUserInput;
	Sponsor?: Prisma.SponsorCreateNestedOneWithoutUserInput;
	Orphan?: Prisma.OrphanCreateNestedManyWithoutUserInput;
	Attendance?: Prisma.AttendanceCreateNestedManyWithoutUserInput;
	HealthInfo?: Prisma.HealthInfoCreateNestedManyWithoutUserInput;
	EducationInfo?: Prisma.EducationInfoCreateNestedManyWithoutUserInput;
	ActivityExecutionInfo?: Prisma.ActivityExecutionInfoCreateNestedManyWithoutExecutorInput;
	EmergencyContactInfo?: Prisma.EmergencyContactInfoCreateNestedManyWithoutUserInput;
	Sponsorship?: Prisma.SponsorshipCreateNestedManyWithoutUserInput;
	OrphanAttendance?: Prisma.OrphanAttendanceCreateNestedManyWithoutUserInput;
	BehaviorInfo?: Prisma.BehaviorInfoCreateNestedManyWithoutUserInput;
	Criteria?: Prisma.CriteriaCreateNestedManyWithoutUserInput;
	BehaviorCriteria?: Prisma.BehaviorCriteriaCreateNestedManyWithoutUserInput;
	Room?: Prisma.RoomCreateNestedManyWithoutUserInput;
	Notification?: Prisma.NotificationCreateNestedManyWithoutUserInput;
	ActivityInfo?: Prisma.ActivityInfoCreateNestedManyWithoutUserInput;
	UnAchievedActivity?: Prisma.UnAchievedActivityCreateNestedManyWithoutUserInput;
	ActivityGoal?: Prisma.ActivityGoalCreateNestedManyWithoutUserInput;
	OrphanActivityExecution?: Prisma.OrphanActivityExecutionCreateNestedManyWithoutUserInput;
	Goal?: Prisma.GoalCreateNestedManyWithoutUserInput;

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
	OrphanAttendance: (_OrphanAttendance & { Orphan?: _Orphan })[];
	User?: User;
};

export interface _OrphanAttendance {
	id?: number;
	isAttended: string | number | readonly string[] | undefined;
	absentReason: string | number | readonly string[] | undefined;
	notes: string | number | readonly string[] | undefined;
	returnDay: Date | null;
	justification: string | number | readonly string[] | undefined;
	attendanceId?: number;
	orphanId?: number;
	userId?: number;
}
export type _ActivityInfo = {
	// test: Prisma.ActivityInfoUncheckedCreateInput;
	// id?: number;
	// date?: Date;
	// title?: string | string | number | readonly string[] | undefined;
	// budget?: number | '';
	// target?: string | number | readonly string[];
	// type?: string | number | readonly string[];
	// quarter?: Quarter;
	// userId?: number | null;
	// selectedGoals?: string[] | undefined; //for getting goals ids

	ActivityGoal?: (_ActivityGoal & { Goal?: _Goal })[];
	ActivityExecutionInfo?: _ActivityExecutionInfo[];
	UnAchievedActivity?: _UnAchievedActivity[];
	User?: User | null;

	id?: number;
	date: Date;
	title?: string;
	budget?: number;
	target?: string;
	type?: string;
	quarter?: Quarter;
	userId: number;
	// ActivityGoal?: Prisma.ActivityGoalUncheckedCreateNestedManyWithoutActivityInfoInput;
	// ActivityExecutionInfo?: ActivityExecutionInfoUncheckedCreateNestedManyWithoutActivityInfoInput;
	// UnAchievedActivity?: UnAchievedActivityUncheckedCreateNestedManyWithoutActivityInfoInput;
};
export type _ActivityGoal = {
	id?: number;
	activityInfoId?: number | null;
	goalId: number;
	userId?: number | null;
};

export type _Goal = {
	id?: number;
	title?: string;
	userId?: number | null;
	ActivityGoal?: ActivityGoal[];
	GoalEvaluation?: GoalEvaluation[];
	User?: User;
};
export type _GoalEvaluation = {
	id?: number;
	evaluation?: number;
	date?: Date;
	activityExecutionInfoId?: number;
	goalId: number;
	// ActivityExecutionInfo: Prisma.ActivityExecutionInfoCreateNestedOneWithoutGoalEvaluationInput;
	// Goal: Prisma.GoalCreateNestedOneWithoutGoalEvaluationInput;
};
export type _ActivityExecutionInfo = {
	id?: number;
	cost?: number | '';
	description?: string;
	startDate?: Date;
	note?: string;
	userId: number;
	Executor?: User | undefined;
	activityInfoId: number;
	ActivityInfo?: ActivityInfo & { User: User };
	GoalEvaluation?: (_GoalEvaluation & { Goal?: _Goal })[];
	OrphanActivityExecution?: _OrphanActivityExecution[];
};
export type _OrphanActivityExecution = {
	id?: number;
	evaluation?: number | null;
	isAttended: string | number | readonly string[] | undefined;
	activityExecutionInfoId?: number | null;
	orphanId?: number | null;
	userId?: number | null;
	ActivityExecutionInfo?: ActivityExecutionInfo;
	Orphan?: Orphan;
	User?: User;
};

export type _UnAchievedActivity = {
	id?: number;
	note?: string | null;
	activityInfoId?: number | null;
	userId?: number | null;
};

export type Behavior = {
	id?: number;
	note?: string | '';
	date: Date;
	userId?: number;
	orphanId?: number;
	User?: User;
	// BehaviorCriteria?: { id?: number; evaluation: number; criteriaId: number; userId: number | ''; Criteria: Criteria }[];
	BehaviorCriteria?: Prisma.BehaviorCriteriaUncheckedCreateWithoutBehaviorInfoInput[];
};
export type Education = {
	id?: number;
	date: Date;
	schoolYear?: number;
	scoreSheet?: File | null;
	degree: Degree;
	note?: string;
	User?: User;
	Orphan?: Orphan;
	orphanId?: number;
	userId?: number;
};
export type Health = {
	// test: Prisma.HealthInfoUncheckedCreateInput;
	id?: number;
	date: Date;
	disease?: string;
	description?: string;
	User?: User;
	Orphan?: Orphan;
	orphanId: number;
	userId?: number;
};
export type Contact = {
	id?: number;
	name: string;
	phone: string;
	Orphan?: { id: number; name: string };
	User?: { id: number; name: string };
	// orphanId: number;
	// userId?: number;
};
export type ROOM = {
	id?: number;
	wing?: Wings;
	capacity: number;
	number: number;
	Orphan: { id: number; name: string }[];
	User?: { id: number; name: string };
};
