import { Degree, Gender, Grade, HomeType, Orphan, Prisma, Quarter, Status, User, UserType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import prisma from '../lib/prisma';

export async function initial() {
	(await prisma.user.count({ where: { type: UserType.ADMIN } })) < 1 && (await createAdmin());
	(await prisma.user.count()) <= 50 && (await createUser(faker.number.int({ max: 50 })));
	(await prisma.guardian.count()) <= 50 && (await createGuardian(faker.number.int({ max: 50 })));
	(await prisma.sponsor.count()) <= 50 && (await createSponsor(faker.number.int({ max: 50 })));
	(await prisma.orphan.count()) <= 50 && (await createOrphan(faker.number.int({ max: 50 })));
	(await prisma.sponsorship.count()) <= 50 && (await createSponsorship(faker.number.int({ max: 50 })));
	(await prisma.criteria.count()) <= 20 && (await createCriteria(faker.number.int({ max: 20 })));
	(await prisma.goal.count()) <= 20 && (await createGoal(faker.number.int({ max: 20 })));
	(await prisma.behaviorInfo.count()) <= 50 && (await createBehavior(faker.number.int({ max: 50 })));
	(await prisma.activityInfo.count()) <= 50 && (await createActivity(faker.number.int({ max: 50 })));
	(await prisma.activityExecutionInfo.count()) <= 50 && (await createExecution(faker.number.int({ max: 50 })));
	(await prisma.attendance.count()) <= 50 && (await createAttendance(faker.number.int({ max: 50 })));
	(await prisma.educationInfo.count()) <= 50 && (await createEducation(faker.number.int({ max: 50 })));
	console.log(
		`🚀 ~ file: functions.tsx:12 ~ initial ~ :admin:${await prisma.user.count({
			where: { type: UserType.ADMIN },
		})} 
			users:${await prisma.user.count()} 
			guardians:${await prisma.guardian.count()} 
			sponsors:${await prisma.sponsor.count()} 
			orphans:${await prisma.orphan.count()} 
			sponsorships:${await prisma.sponsorship.count()} 
			goal:${await prisma.goal.count()} 
			criteria:${await prisma.criteria.count()} 
			activityInfo:${await prisma.activityInfo.count()} 
			ExecutionInfo:${await prisma.activityExecutionInfo.count()} 
			attendance:${await prisma.attendance.count()} 
			educationInfo:${await prisma.educationInfo.count()} 
			behaviors:${await prisma.behaviorInfo.count()} `
	);
}
export async function findAdmin(id?: number): Promise<User> {
	if (id) return await prisma.user.findUnique({ where: { id: id } });
	return await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
}
export async function findOrphan(id?: number): Promise<Orphan | Orphan[]> {
	if (id) return await prisma.orphan.findUnique({ where: { id: id } });
}
export async function findAllOrphans(): Promise<Orphan[]> {
	return await prisma.orphan.findMany();
}

export const createUser = async (number: number) => {
	let userType: UserType;
	const users: Prisma.UserCreateManyInput[] = [];
	for (let i = 0; i < number; i++) {
		while (true) {
			userType = faker.helpers.enumValue(UserType);
			if (userType != UserType.SPONSOR && userType != UserType.GUARDIAN && userType != UserType.ADMIN) break;
		}
		const user: Prisma.UserCreateManyInput = {
			name: faker.person.fullName(),
			gender: faker.helpers.enumValue(Gender),
			userName: faker.internet.userName(),
			password: faker.internet.password(),
			email: faker.internet.email(),
			address: faker.location.city(),
			phone: faker.phone.number('7##-###-###'),
			type: userType,
		};
		users.push(user);
	}
	await prisma.user.createMany({ data: users });
	console.log('🚀 ~ file: functions.tsx:44 ~ createUser ~ newUsers:');
};
export const createAdmin = async () => {
	const admin: Prisma.UserCreateInput = {
		name: faker.person.fullName(),
		gender: faker.helpers.enumValue(Gender),
		userName: faker.internet.userName(),
		password: faker.internet.password(),
		email: faker.internet.email(),
		address: faker.location.city(),
		phone: faker.phone.number('7##-###-###'),
		type: UserType.ADMIN,
	};

	await prisma.user.create({ data: admin });
	console.log('🚀 ~ file: functions.tsx:51 ~ createAdmin ~ createAdmin:');
};
export const createGuardian = async (number: number) => {
	let guardians: Prisma.UserCreateManyInput[] = [];
	for (let i = 0; i < number; i++) {
		const guardian: Prisma.UserCreateInput = {
			name: faker.person.fullName(),
			gender: faker.helpers.enumValue(Gender),
			userName: faker.internet.userName(),
			password: faker.internet.password(),
			email: faker.internet.email(),
			address: faker.location.city(),
			phone: faker.phone.number('7##-###-###'),
			type: UserType.GUARDIAN,
			Guardian: {
				create: { relationship: faker.helpers.arrayElement(['Uncle', 'Mother', 'Aunt', 'Grandfather', 'Grandmother']) },
			},
		};
		guardians.push(guardian);
	}
	guardians.map(async (x) => await prisma.user.create({ data: x }));
	console.log('🚀 ~ file: functions.tsx:68 ~ createGuardian ~ createGuardian:');
};
export const createSponsor = async (number: number) => {
	let sponsors: Prisma.UserCreateManyInput[] = [];
	for (let i = 0; i < number; i++) {
		const sponsor: Prisma.UserCreateInput = {
			name: faker.person.fullName(),
			gender: faker.helpers.enumValue(Gender),
			userName: faker.internet.userName(),
			password: faker.internet.password(),
			email: faker.internet.email(),
			address: faker.location.city(),
			phone: faker.phone.number('7##-###-###'),
			type: UserType.SPONSOR,
			Sponsor: {
				create: {
					identityNumber: faker.phone.number('##########'),
					birthdate: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }),
					fax: faker.phone.number('######'),
				},
			},
		};
		sponsors.push(sponsor);
	}

	sponsors.map(async (x) => await prisma.user.create({ data: x }));
	console.log('🚀 ~ file: functions.tsx:95 ~ createSponsor ~ createSponsor:');
};
export const createOrphan = async (number: number) => {
	const guardians = await prisma.user.findMany({
		include: { Guardian: true, Orphan: true },
		where: { type: { equals: UserType.GUARDIAN } },
	});
	console.log('🚀 ~ file: functions.tsx:109 ~ createOrphan ~ guardians:');
	let orphans: Prisma.OrphanCreateManyInput[] = [];
	for (let i = 0; i < number; i++) {
		let sex: 'MALE' | 'FEMALE' = faker.helpers.enumValue(Gender);
		const orphan: Prisma.OrphanCreateManyInput = {
			name: faker.person.fullName({ sex: sex.toLowerCase() as 'male' | 'female' }),
			gender: sex,
			age: faker.number.int({ min: 6, max: 13 }),
			birthplace: faker.location.city(),
			birthdate: faker.date.between({ from: '2010-01-01T00:00:00.000Z', to: '2017-01-01T00:00:00.000Z' }),
			schoolName: faker.word.words({ count: { min: 2, max: 4 } }),
			gradeLevel: faker.helpers.enumValue(Grade),
			lastYearPercentage: faker.number.float({ min: 50, max: 100, precision: 0.01 }),
			fatherDeathDate: faker.date.past(),
			males: faker.number.int({ max: 10 }),
			females: faker.number.int({ max: 10 }),
			motherName: faker.person.fullName({ sex: 'female' }),
			motherStatus: faker.helpers.enumValue(Status),
			liveWith: faker.helpers.arrayElement(['Uncle', 'Mother', 'Aunt', 'Grandfather', 'Grandmother']),
			homeType: faker.helpers.enumValue(HomeType),
			currentAddress: faker.location.city(),
			guardianId: faker.helpers.arrayElement(guardians).id,
		};
		orphans.push(orphan);
	}

	orphans.map(async (x) => await prisma.orphan.create({ data: x }));
	console.log('🚀 ~ file: functions.tsx:128 ~ createOrphan ~ createOrphan:');
};

export const createSponsorship = async (number: number) => {
	let orphans = await prisma.orphan.findMany({ include: { Sponsorship: { where: { isActive: false } } } });
	orphans ? orphans : (orphans = await prisma.orphan.findMany({ include: { Sponsorship: true } }));
	const sponsors = await prisma.sponsor.findMany();
	const admin = await findAdmin();
	let sponsorships: Prisma.SponsorshipCreateManyInput[] = [];

	for (let i = 0; i < number; i++) {
		const date = faker.date.recent();
		const sponsorship: Prisma.SponsorshipCreateInput = {
			startDate: date,
			endDate: faker.date.future({ refDate: date, years: 1 }),
			paymentMethod: 'CASH',
			sponsorshipPeriod: 'ONE_YEAR',
			isActive: faker.helpers.arrayElement([true, false]),
			Orphan: { connect: { id: faker.helpers.arrayElement(orphans).id } },
			Sponsor: { connect: { id: faker.helpers.arrayElement(sponsors).id } },
			User: { connect: { id: admin.id } },
		};
		sponsorships.push(sponsorship);
	}

	sponsorships.map(async (x) => await prisma.sponsorship.create({ data: x }));
	console.log('🚀 ~ file: functions.tsx:115 ~ createSponsorship ~ createSponsorship:');
};
export const createBehavior = async (number: number) => {
	const orphans = await prisma.orphan.findMany();
	const criteria = await prisma.criteria.findMany();
	const admin = await findAdmin();
	let behaviors: Prisma.BehaviorInfoCreateInput[] = [];
	for (let i = 0; i < number; i++) {
		const behavior: Prisma.BehaviorInfoCreateInput = {
			date: faker.date.anytime(),
			note: faker.hacker.phrase(),
			BehaviorCriteria: {
				createMany: {
					data: criteria.map((x) => ({ criteriaId: x.id, evaluation: faker.number.int(5), userId: admin.id })),
				},
			},
			Orphan: { connect: { id: orphans[faker.number.int(orphans.length)].id } },
			User: { connect: { id: admin.id } },
		};
		behaviors.push(behavior);
	}
	behaviors.map(async (x) => await prisma.behaviorInfo.create({ data: x }));
	console.log('🚀 ~ file: CreateEntries.tsx:200 ~ createBehavior ~ behaviors:');
};
export const createCriteria = async (number: number) => {
	const admin = await findAdmin();
	let criteria: Prisma.CriteriaCreateManyInput[] = [];
	for (let i = 0; i < number; i++) {
		const criterion: Prisma.CriteriaCreateManyInput = {
			title: faker.word.sample(),
			userId: admin.id,
		};
		criteria.push(criterion);
	}
	await prisma.criteria.createMany({ data: criteria });
	console.log('🚀 ~ file: CreateEntries.tsx:212 ~ createCriteria ~ criteria:');
};
export const createGoal = async (number: number) => {
	let admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
	let goals: Prisma.GoalCreateManyInput[] = [];
	for (let i = 0; i < number; i++) {
		const goal: Prisma.GoalCreateManyInput = {
			title: faker.word.sample(),
			userId: admin.id,
		};
		goals.push(goal);
	}
	goals.map(async (x) => await prisma.goal.create({ data: x }));
};
export const createActivity = async (number: number) => {
	const goals = await prisma.goal.findMany();
	const admin = await findAdmin();
	let activities: Prisma.ActivityInfoCreateInput[] = [];
	for (let i = 0; i < number; i++) {
		let createActivity: Prisma.ActivityInfoCreateInput = {
			date: faker.date.anytime(),
			ActivityGoal: { create: goals.map((x) => ({ goalId: x.id, userId: admin.id })) },
			budget: Number(faker.number.int({ min: 1000, max: 100000 })),
			quarter: faker.helpers.enumValue(Quarter),
			target: faker.word.noun(),
			title: faker.word.noun(),
			type: faker.word.noun(),
			User: { connect: { id: admin.id } },
		};
		activities.push(createActivity);
	}
	activities.map(async (x) => await prisma.activityInfo.create({ data: x }));
	console.log('🚀 ~ file: CreateEntries.tsx:243 ~ createActivity ~ activities:');
};
export const createExecution = async (number: number) => {
	const activities = await prisma.activityInfo.findMany({ include: { ActivityGoal: true } });
	const orphans = await prisma.orphan.findMany();
	const admin = await findAdmin();
	let executions: Prisma.ActivityExecutionInfoCreateInput[] = [];
	for (let i = 0; i < number; i++) {
		let activityId = faker.number.int({ min: 0, max: activities.length });
		let createExecute: Prisma.ActivityExecutionInfoCreateInput = {
			ActivityInfo: { connect: { id: activities[activityId].id } },
			Executor: { connect: { id: admin.id } },
			cost: Number(faker.number.int({ min: 1000, max: 100000 })),
			description: faker.word.words({ count: { min: 5, max: 500 } }),
			note: faker.word.words({ count: { min: 5, max: 500 } }),
			startDate: faker.date.anytime(),
			GoalEvaluation: {
				create: activities[activityId].ActivityGoal.map((x) => ({
					date: faker.date.anytime(),
					evaluation: faker.number.int(5),
					goalId: x.goalId,
				})),
			},
			OrphanActivityExecution: {
				create: orphans.map((x) => ({
					evaluation: faker.number.int(5),
					isAttended: faker.helpers.arrayElement([true, false]),
					orphanId: x.id,
					userId: admin.id,
				})),
			},
		};
		executions.push(createExecute);
	}
	executions.map(async (x) => await prisma.activityExecutionInfo.create({ data: x }));
	console.log('🚀 ~ file: CreateEntries.tsx:280 ~ createExecution ~ executions:');
};
export const createAttendance = async (number: number) => {
	const admin = await findAdmin();
	const orphans: Orphan[] = await findAllOrphans();
	const attendances: Prisma.AttendanceCreateInput[] = [];
	const orphanAttendance: Prisma.OrphanAttendanceCreateWithoutAttendanceInput[] = orphans.map((x) => ({
		isAttended: faker.helpers.arrayElement([true, false]),
		absentReason: faker.hacker.phrase(),
		justification: faker.hacker.phrase(),
		notes: faker.hacker.phrase(),
		returnDay: faker.date.soon(),
		Orphan: { connect: { id: x.id } },
		User: { connect: { id: admin.id } },
	}));
	for (let i = 0; i < number; i++) {
		const attendance: Prisma.AttendanceCreateInput = {
			User: { connect: { id: admin.id } },
			date: faker.date.anytime(),
			OrphanAttendance: { create: orphanAttendance },
		};
		attendances.push(attendance);
	}
	try {
		attendances.map(async (x) => await prisma.attendance.create({ data: x }));
		console.log('🚀 ~ file: CreateEntries.tsx:306 ~ createAttendance ~ attendances:');
	} catch (error) {
		console.log('🚀 ~ file: CreateEntries.tsx:311 ~ createAttendance ~ error:', error);
	}
};
export const createEducation = async (number: number) => {
	const orphans = await prisma.orphan.findMany();
	const admin = await findAdmin();
	const educations: Prisma.EducationInfoCreateInput[] = [];
	for (let i = 0; i < number; i++) {
		const orphanId = faker.number.int(orphans.length);
		const education: Prisma.EducationInfoCreateInput = {
			date: faker.date.anytime(),
			note: faker.hacker.phrase(),
			schoolYear: faker.number.int({ min: new Date().getFullYear(), max: new Date().getFullYear() + 10 }),
			degree: faker.helpers.enumValue(Degree),
			Orphan: { connect: { id: orphans[orphanId].id } },
			User: { connect: { id: admin.id } },
		};
		educations.push(education);
	}
	educations.map(async (x) => await prisma.educationInfo.create({ data: x }));
	console.log('🚀 ~ file: CreateEntries.tsx:200 ~ createBehavior ~ education:');
};
export const createHealth = async (number: number) => {
	const orphans = await prisma.orphan.findMany();
	const admin = await findAdmin();
	const healthInfos: Prisma.HealthInfoCreateInput[] = [];
	for (let i = 0; i < number; i++) {
		const orphanId = faker.number.int(orphans.length);
		const health: Prisma.HealthInfoCreateInput = {
			date: faker.date.anytime(),
			description: faker.hacker.phrase(),
			disease: faker.hacker.phrase(),
			Orphan: { connect: { id: orphans[orphanId].id } },
			User: { connect: { id: admin.id } },
		};
		healthInfos.push(health);
	}
	healthInfos.map(async (x) => await prisma.healthInfo.create({ data: x }));
	console.log('🚀 ~ file: CreateEntries.tsx:358 ~ createHealth ~ healthInfos:');
};
