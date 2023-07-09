import { Gender, Grade, HomeType, Prisma, Status, UserType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import prisma from '../lib/prisma';

export async function initial() {
	(await prisma.user.count({ where: { type: UserType.ADMIN } })) < 1 && (await createAdmin());
	(await prisma.user.count()) <= 10 && (await createUser(faker.number.int({ max: 10 })));
	(await prisma.guardian.count()) <= 10 && (await createGuardian(faker.number.int({ max: 10 })));
	(await prisma.sponsor.count()) <= 10 && (await createSponsor(faker.number.int({ max: 10 })));
	(await prisma.orphan.count()) <= 10 && (await createOrphan(faker.number.int({ max: 30 })));
	(await prisma.sponsorship.count()) <= 10 && (await createSponsorship(faker.number.int({ max: 10 })));
	(await prisma.criteria.count()) <= 10 && (await createCriteria(faker.number.int({ max: 10 })));
	(await prisma.goal.count()) <= 10 && (await createGoal(faker.number.int({ max: 10 })));
	(await prisma.behaviorInfo.count()) <= 10 && (await createBehavior(faker.number.int({ max: 10 })));
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
			behaviors:${await prisma.behaviorInfo.count()} `
	);
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
	const newUsers = await prisma.user.createMany({ data: users });
	console.log('🚀 ~ file: functions.tsx:44 ~ createUser ~ newUsers:');
};
export const createAdmin = async () => {
	const admin: Prisma.UserCreateManyInput = {
		name: faker.person.fullName(),
		gender: faker.helpers.enumValue(Gender),
		userName: faker.internet.userName(),
		password: faker.internet.password(),
		email: faker.internet.email(),
		address: faker.location.city(),
		phone: faker.phone.number('7##-###-###'),
		type: UserType.ADMIN,
	};

	const createAdmin = await prisma.user.create({ data: admin });
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
	const createGuardian = guardians.map(async (x) => await prisma.user.create({ data: x }));
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

	const createSponsor = sponsors.map(async (x) => await prisma.user.create({ data: x }));
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

	const createOrphan = orphans.map(async (x) => await prisma.orphan.create({ data: x }));
	console.log('🚀 ~ file: functions.tsx:128 ~ createOrphan ~ createOrphan:');
};

export const createSponsorship = async (number: number) => {
	let orphans = await prisma.orphan.findMany({ include: { Sponsorship: { where: { isActive: false } } } });
	orphans ? orphans : (orphans = await prisma.orphan.findMany({ include: { Sponsorship: true } }));
	const sponsors = await prisma.sponsor.findMany();
	const admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
	let sponsorships: Prisma.SponsorshipCreateManyInput[] = [];

	for (let i = 0; i < number; i++) {
		const date = faker.date.recent();
		const sponsorship: Prisma.SponsorshipCreateInput = {
			startDate: date,
			// endDate: Date().setFullYear(date.getFullYear() + 1),
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

	const createSponsorship = sponsorships.map(async (x) => await prisma.sponsorship.create({ data: x }));
	console.log('🚀 ~ file: functions.tsx:115 ~ createSponsorship ~ createSponsorship:');
};
export const createBehavior = async (number: number) => {
	const orphans = await prisma.orphan.findMany();
	const criteria = await prisma.criteria.findMany();
	const admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
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
};
export const createCriteria = async (number: number) => {
	let admin = await prisma.user.findFirst({ where: { type: UserType.ADMIN } });
	let criteria: Prisma.CriteriaCreateManyInput[] = [];
	for (let i = 0; i < number; i++) {
		const criterion: Prisma.CriteriaCreateManyInput = {
			title: faker.word.sample(),
			userId: admin.id,
		};
		criteria.push(criterion);
	}
	await prisma.criteria.createMany({ data: criteria });
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
export const createActivity = async (number: number) => {};
export const createExecution = async (number: number) => {};
export const createAttendance = async (number: number) => {};
