import { Prisma, UserType } from '@prisma/client';
import { $enum } from 'ts-enum-util';
import { _BigUser } from '../types/types';
import { faker } from '@faker-js/faker/locale/ar';

export const generateDumpData = (type: UserType, number: number) => {
	const dumpData = [];
	switch (type) {
		case UserType.SPONSOR:
			let flag = false;
			let type;
			while (flag) {
				let n = Number(faker.random.numeric());
				if (n < 7) {
					type = $enum(UserType)[Number(faker.random.numeric())];
					flag = true;
				}
			}
			for (let i = 0; i < number; i++) {
				const user: _BigUser = {
					name: faker.name.fullName(),
					gender: faker.name.sex() == 'male' ? 'MALE' : 'FEMALE',
					userName: faker.name.fullName(),
					password: faker.random.alphaNumeric(8),
					email: faker.internet.email(),
					address: `${faker.address.country()}/${faker.address.cityName()}`,
					phone: faker.phone.number('7##-###-###'),
					type: type,
					Guardian: {
						relationship: faker.rando,
					},
					Sponsor: {},
				};
				console.log('🚀 ~ file: functions.tsx:32 ~ generateDumpData ~ user:', user);
			}

			break;
		case UserType.GUARDIAN:
			break;
		default:
			console.log('not valid type');

			break;
	}
	console.log(type);
};
