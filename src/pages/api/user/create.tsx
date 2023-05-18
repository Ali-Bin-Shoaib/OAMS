// CONNECT  DELETE  GET HEAD  OPTIONS PATCH POST  PUT TRACE
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { STATUS_CODE, REQUEST_METHODS, _User, _UserWithGuardianAndSponsor, _Sponsor } from '../../../../types/types';
import { Prisma, User } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === REQUEST_METHODS.POST) {
			const bigUser: _User = req.body;
			const { guardian, sponsor, ...user } = bigUser;
			if (user.type === 'GUARDIAN') {
				const newGuardian = await prisma.user.create({
					data: { ...user, Guardian: { create: guardian } },
				});

				return res.end(res.status(STATUS_CODE.OK).json({ data: newGuardian, msg: 'create Guardian successfully' }));
			}
			if (user.type === 'SPONSOR') {
				const newSponsor = await prisma.user.create({
					data: { ...user, Sponsor: { create: sponsor } },
				});
				console.log('🚀 ~ file: create.tsx:25 ~ handler ~ newSponsor:', newSponsor);
				return res.end(res.status(STATUS_CODE.OK).json({ data: newSponsor, msg: 'create Sponsor successfully' }));
			}
			//* if user type not is guardian nor sponsor create model with provided type in user table only.
			const newUser = await prisma.user.create({ data: user });
			return res.end(res.status(STATUS_CODE.OK).json({ data: newUser, msg: 'create User successfully' }));
		}
	} catch (error) {
		console.log('🚀 ~ file: create.tsx:38 ~ handler ~ error:', error);
		return res.end(res.status(STATUS_CODE.BAD_REQUEST).json(error));
	}
}
