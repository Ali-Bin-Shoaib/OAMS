import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { GENDER, STATUS_CODE } from '../../../../types/types';
const data = [
	{
		name: 'ali',
		gender: GENDER.MALE,
		birthdate: new Date('2000,05,21'),
		birthplace: 'makkah',
		liveWith: 'mother',
		currentAddress: 'mukalla',
		fatherDeathDate: new Date('2017,05,18'),
		motherName: 'x',
		isMotherWorks: true,
		motherJob: 'mother',
		joinDate: new Date(),
		evaluation: null,
	},
	{
		name: 'ahmed',
		gender: GENDER.MALE,
		birthdate: new Date('2000,05,21'),
		birthplace: 'makkah',
		liveWith: 'mother',
		currentAddress: 'mukalla',
		fatherDeathDate: new Date('2017,05,18'),
		motherName: 'x',
		isMotherWorks: false,
		motherJob: 'mother',
		joinDate: new Date(),
		evaluation: null,
	},
	{
		name: 'nor',
		gender: GENDER.MALE,
		birthdate: new Date('2000,05,21'),
		birthplace: 'makkah',
		liveWith: 'mother',
		currentAddress: 'mukalla',
		fatherDeathDate: new Date('2017,05,18'),
		motherName: 'x',
		isMotherWorks: false,
		motherJob: 'mother',
		joinDate: new Date(),
		evaluation: null,
	},
];

// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const dumpDate = await prisma.orphan.createMany({ data: data });
	// console.log('🚀 ~ file: orphanList.tsx:40 ~ handler ~ dumpDate:', dumpDate);

	try {
		if (req.method === 'GET') {
			const orphans = await prisma.orphan.findMany();
			console.log(
				'🚀 ~ file: orphanList.tsx:58 ~ handler ~ orphans:',
				orphans
			);
			res.status(STATUS_CODE.Success).json(orphans);
		}
	} catch (error) {
		res.status(STATUS_CODE.BadRequest).json(error);
	}
}
